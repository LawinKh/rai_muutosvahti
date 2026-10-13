/*
 * RAI Muutosvahti – sääntöpohjainen agentti
 * ------------------------------------------------------------
 *  1. Rajaa asiakkaan tiedot ammattilaisen roolin ja arviointitilanteen
 *     mukaan (käyttötarkoitussidonnaisuus). Agentti käsittelee vain sallitut tiedot.
 *  2. Muodostaa lähtötilanteen (palvelutarpeen arviointi / palvelupäätös)
 *     ja sen jälkeen kertyneet tiedot RAI-arvioinnin osa-alueittain.
 *  3. Tunnistaa lähtötilanteeseen nähden mahdolliset muutokset säännöillä.
 *     Jokaisella havainnolla on sääntö (peruste), ajankohta, lähteet,
 *     vastanäyttö ja varmuus.
 *  4. Ehdottaa tarkistettavia asioita ja rakenteisia arviointeja.
 *     Ammattilainen päättää aina.
 *
 * Aineistossa ei ole RAI-mittareita. Agentti ei tee RAI-arviointia, ei muuta
 * RAI-tuloksia, ei tee diagnooseja eikä päätä hoidosta tai palveluista.
 * Raja-arvot ovat demon sääntöjä, eivät kliinisiä tai virallisia RAI-rajoja.
 */
(function () {
  "use strict";

  const SAANTOVERSIO = "luvn-2026.10";
  const D = window.RAI_DATA;
  const PAIVA = 86400000;

  /* ---------- apurit ---------- */
  const pv = (s) => Date.parse(s.slice(0, 10) + "T00:00:00Z");
  const erotusPv = (a, b) => Math.round((pv(a) - pv(b)) / PAIVA);
  const lisaaPv = (s, n) => new Date(pv(s) + n * PAIVA).toISOString().slice(0, 10);
  const lisaaKk = (s, n) => { const d = new Date(pv(s)); d.setUTCMonth(d.getUTCMonth() + n); return d.toISOString().slice(0, 10); };
  const fmtPvm = (s) => { if (!s) return "–"; const [y, m, d] = s.slice(0, 10).split("-"); return `${+d}.${+m}.${y}`; };
  const fmtNum = (n, des = 1) => Number(n).toFixed(des).replace(".", ",");
  const ainutlaatuiset = (a) => [...new Set(a)];
  const isoAlku = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const pieni = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const lkm = (n, yks, mon) => `${n} ${n === 1 ? yks : mon}`;

  /* ---------- RAI-arvioinnin osa-alueet (kiinteä järjestys) ---------- */
  const ALUEET = [
    { id: "arki", nimi: "Arjessa selviytyminen ja avuntarve" },
    { id: "liikkuminen", nimi: "Liikkuminen ja kaatumiset" },
    { id: "kognitio", nimi: "Kognitio" },
    { id: "kommunikointi", nimi: "Kommunikointi ja aistit" },
    { id: "mieliala", nimi: "Mieliala ja uni" },
    { id: "sosiaalinen", nimi: "Sosiaalinen osallistuminen ja elintavat" },
    { id: "kipu", nimi: "Kipu" },
    { id: "ravitsemus", nimi: "Ravitsemus" },
    { id: "terveys", nimi: "Terveydentila ja lääkitys" },
    { id: "palvelut", nimi: "Palvelujen käyttö" }
  ];
  const ALUE = Object.fromEntries(ALUEET.map((a) => [a.id, a]));

  /* ---------- roolit, oikeudet ja arviointitilanteet ----------
   * Oikeudet kuvaavat, mitä tietoja rooli saa käsitellä (RBAC).
   * Tilanne voi rajata tietoja edelleen (käyttötarkoitus).
   */
  const ROOLIT = {
    hoitaja: {
      nimi: "Sairaanhoitaja, kotihoito",
      kuvaus: "Omahoitaja ja RAI-arvioija",
      oikeudet: { kaynnit: "koko", dx: true, laakkeet: true, lab: true, muistiinpano: "koko", sosTapahtumat: true, sosTekstit: true, kotihoito: true, lomakkeet: true },
      tilanteet: ["rai", "laake"]
    },
    laakari: {
      nimi: "Lääkäri",
      kuvaus: "Kotihoidon ja palveluasumisen lääkäri",
      oikeudet: { kaynnit: "koko", dx: true, laakkeet: true, lab: true, muistiinpano: "koko", sosTapahtumat: true, sosTekstit: false, kotihoito: true, lomakkeet: true },
      tilanteet: ["vastaanotto", "laake"]
    },
    ohjaaja: {
      nimi: "Asiakasohjaaja, sosiaalihuolto",
      kuvaus: "Ikääntyneiden palvelujen palvelutarpeen arviointi",
      oikeudet: { kaynnit: "maarat", dx: false, laakkeet: false, lab: false, muistiinpano: "toimintakyky", sosTapahtumat: true, sosTekstit: true, kotihoito: true, lomakkeet: false },
      tilanteet: ["pta"]
    }
  };

  const TILANTEET = {
    rai: {
      nimi: "RAI-seuranta-arvio",
      kuvaus: "Valmistautuminen RAI-seuranta-arvioon: kaikki osa-alueet lähtötilanteeseen verrattuna.",
      alueet: ALUEET.map((a) => a.id),
      rajaus: {}
    },
    laake: {
      nimi: "Lääkehoidon arviointi",
      kuvaus: "Lääkitys, kaatumisriskiä mahdollisesti lisäävät lääkkeet ja niihin liittyvät muutokset.",
      alueet: ["terveys", "liikkuminen", "mieliala", "kognitio", "kipu"],
      rajaus: { sosTekstit: false }
    },
    vastaanotto: {
      nimi: "Lääkärin vastaanotto",
      kuvaus: "Terveydentila, lääkitys, tutkimustulokset ja toimintakyvyn muutokset.",
      alueet: ["terveys", "kipu", "mieliala", "liikkuminen", "kognitio", "palvelut"],
      rajaus: {}
    },
    pta: {
      nimi: "Palvelutarpeen arviointi",
      kuvaus: "Arjessa selviytyminen, toimintakyky, liikkuminen ja avuntarve. Terveystiedoista vain toimintakykyä kuvaavat tiedot.",
      alueet: ["arki", "liikkuminen", "kognitio", "kommunikointi", "sosiaalinen", "palvelut"],
      rajaus: {}
    }
  };

  function oikeudet(rooliId, tilanneId) {
    const o = { ...ROOLIT[rooliId].oikeudet };
    for (const [k, v] of Object.entries(TILANTEET[tilanneId].rajaus)) if (v === false) o[k] = false;
    return o;
  }

  /* ---------- koodistot (vain demon säännöt) ---------- */
  const YHTEYSTAPA = { R10: "Vastaanottokäynti", R20: "Kotikäynti", R52: "Etäasiointi" };
  const KIIRE = { E: "kiireetön", 5: "akuutti- tai kiirevastaanotto" };
  const KAYTTOTAPA = { "SÄÄNNÖLLINEN": "säännöllinen", "TARVITTAESSA": "tarvittaessa" };

  // ICD-10 → RAI-osa-alue (karkea demojako)
  function dxAlue(k) {
    if (k === "R29.6" || /^[ST]/.test(k) || k === "R42") return "liikkuminen";
    if (/^F0|^G30|^R41/.test(k)) return "kognitio";
    if (/^H6|^H9|^H5[34]|^H25/.test(k)) return "kommunikointi";
    if (/^F3|^F4|^G47/.test(k)) return "mieliala";
    if (/^M|^R51|^R52|^R10/.test(k)) return "kipu";
    if (/^E4[0-6]|^R63/.test(k)) return "ravitsemus";
    return "terveys";
  }
  const dxNimi = (k) => D.dxNimet[k] || k;
  const dxTeksti = (k) => `${k} ${dxNimi(k)}`;
  const onKaatuminen = (k) => k === "R29.6";
  const onVamma = (k) => /^[ST]/.test(k);
  const onMurtuma = (k) => /murtuma/i.test(dxNimi(k));
  const onMieliala = (k) => /^F3|^F4/.test(k);
  const onUni = (k) => /^G47/.test(k);
  const onKipu = (k) => dxAlue(k) === "kipu";
  const onKuulo = (k) => dxAlue(k) === "kommunikointi";

  // ATC-ryhmät
  const FRID = /^(N05|N06|N03|N02A|N04|C02|C03|C07|C08|C09|G04CA|R06A)/;   // kaatumisriskiä mahdollisesti lisäävät
  const MIELIALALAAKE = /^(N06A|N05B|N05C)/;
  const KIPULAAKE = /^(N02|M01|M02)/;

  /* ---------- muistiinpanon osiot ---------- */
  function osiot(teksti) {
    const out = {};
    let nyk = null;
    for (const rivi of String(teksti || "").split("\n")) {
      const m = rivi.match(/^##\s+(.+?)\s*$/);
      if (m) { nyk = m[1].toUpperCase(); out[nyk] = ""; continue; }
      if (nyk) out[nyk] += (out[nyk] ? "\n" : "") + rivi;
    }
    for (const k of Object.keys(out)) out[k] = out[k].trim();
    return out;
  }

  // Toimintakykykuvauksen tulkinta: osa-alue + suunta (heikentynyt / säilynyt)
  const TK_ALUE = [
    [/kaatumisen pelko|kävel|portai|liikku|asennonmuuto|huimau|apuväl/i, "liikkuminen"],
    [/asioin|arjen|arki|itsestä huolehti|pukemi|sukkien|tehtävi|kotiasi/i, "arki"],
    [/keskitty|muist/i, "kognitio"],
    [/kuule|kuulo|näkö|puhe/i, "kommunikointi"],
    [/kipu|kivu|särky|arkuus|kivulia/i, "kipu"],
    [/yöun|väsymy|lepoa|mieli/i, "mieliala"]
  ];
  const TK_HEIKKO = /vaikeutu|rajoittu|rajoittaa|hidastu|haittaa|hankala|pelko|välttä|vähentyny|ei onnistu|kivulias|heikentyny|tarvitsee/i;
  const TK_HYVA = /onnistu(vat|u)\s+(omatoimisesti|itsenäisesti)|onnistuvat\b|onnistuu ilman|ennallaan/i;
  function tulkitseToimintakyky(teksti) {
    if (!teksti) return null;
    const alueet = TK_ALUE.filter(([re]) => re.test(teksti)).map(([, a]) => a);
    const heikko = TK_HEIKKO.test(teksti);
    return {
      alue: alueet[0] || "arki",
      alueet: ainutlaatuiset(alueet.length ? alueet : ["arki"]),
      suunta: heikko ? "heikentynyt" : TK_HYVA.test(teksti) ? "säilynyt" : "neutraali",
      tilapainen: /tilapäi/i.test(teksti)
    };
  }

  /* =====================================================================
   * 1. RAJAUS: rooli + tilanne → näkymä asiakkaan tietoihin
   * ===================================================================== */
  function rajaa(a, o) {
    const t = a.terv, s = a.sos;
    const kaynnit = t.kaynnit.map((k) => ({
      ...k,
      dx: o.dx ? k.dx : [],
      tp: o.kaynnit === "koko" ? k.tp : []
    }));
    let note = null;
    if (t.muistiinpano && o.muistiinpano) {
      const os = osiot(t.muistiinpano.teksti);
      note = { ...t.muistiinpano, osiot: o.muistiinpano === "koko" ? os : { TOIMINTAKYKY: os.TOIMINTAKYKY || "" }, rajattu: o.muistiinpano !== "koko" };
    }
    return {
      perus: a,
      o,
      kaynnit,
      laakkeet: o.laakkeet ? t.laakkeet : [],
      lab: o.lab ? t.lab : [],
      note,
      sosTapahtumat: o.sosTapahtumat ? s.tapahtumat : [],
      kaynnitKk: o.kotihoito ? s.kaynnitKk : [],
      suunniteltu: o.kotihoito ? s.suunniteltu : [],
      paatosteksti: o.sosTekstit ? s.paatosteksti : null,
      suunnitelma: o.sosTekstit ? s.suunnitelma : null
    };
  }

  /* =====================================================================
   * 2. LÄHTEET: jokaiselle tietueelle kuvaus, jotta havainnot voidaan jäljittää
   * ===================================================================== */
  function rakennaLahteet(v) {
    const L = {};
    const lisaa = (id, x) => { L[id] = { id, ...x }; };
    for (const k of v.kaynnit) {
      const dx = k.dx.map((d) => dxTeksti(d.k)).join("; ");
      lisaa(k.id, {
        tyyppi: "kaynti", pvm: k.pvm, jarj: "Terveydenhuolto · avohoitokäynti",
        otsikko: `${YHTEYSTAPA[k.tapa] || k.tapa}, ${KIIRE[k.kiire] || k.kiire}`,
        teksti: `${k.kesto} min${dx ? " · " + dx : ""}${k.tp.length ? " · Toimenpiteet: " + k.tp.join(", ") : ""}`,
        tieto: k
      });
    }
    for (const l of v.laakkeet) lisaa(l.id, {
      tyyppi: "laake", pvm: l.alku, jarj: "Terveydenhuolto · lääkitys",
      otsikko: `${l.aine} (${l.atc})`,
      teksti: `${KAYTTOTAPA[l.tapa] || l.tapa}, ${fmtPvm(l.alku)}–${l.loppu ? fmtPvm(l.loppu) : "toistaiseksi"}${l.resepti ? " · reseptilääke" : ""}`,
      tieto: l
    });
    for (const l of v.lab) lisaa(l.id, {
      tyyppi: "lab", pvm: l.pvm, jarj: "Terveydenhuolto · laboratoriotulos",
      otsikko: l.tutkimus, teksti: `${fmtNum(l.arvo)} ${l.yksikko}`, tieto: l
    });
    if (v.note) lisaa(v.note.id, {
      tyyppi: "muistiinpano", pvm: v.note.pvm, jarj: "Terveydenhuolto · käyntimuistiinpano",
      otsikko: `Käyntimuistiinpano (${v.note.rooli})`,
      teksti: v.note.rajattu ? "Näytetään vain toimintakykyä kuvaava osio." : `${v.note.tyyppi}, ${pieni(v.note.kiire)}`,
      tieto: v.note
    });
    for (const s of v.sosTapahtumat) lisaa(s.id, {
      tyyppi: "sos", pvm: s.pvm, jarj: "Sosiaalihuolto · asiakkuus",
      otsikko: `${SOS_LAJI[s.laji] || s.laji}: ${s.nimi}`,
      teksti: sosKuvaus(s), tieto: s
    });
    for (const k of v.kaynnitKk) lisaa("KH-" + k.kk, {
      tyyppi: "kotihoito", pvm: k.kk + "-01", jarj: "Sosiaalihuolto · kotihoidon käynnit (kuukausikooste)",
      otsikko: `Kotihoito ${kkNimi(k.kk)}`,
      teksti: `${k.kotikaynnit} kotikäyntiä${k.muut ? `, ${k.muut} muuta kontaktia` : ""}, yhteensä ${k.min} min`, tieto: k
    });
    for (const s of v.suunniteltu) lisaa(s.id, {
      tyyppi: "suunniteltu", pvm: s.pvm, jarj: "Sosiaalihuolto · kotihoidon suunniteltu palvelu",
      otsikko: s.palvelu, teksti: `${s.maara} ${s.yksikko}a / ${s.aikayksikko}`, tieto: s
    });
    if (v.paatosteksti) lisaa(v.paatosteksti.id + "-T", {
      tyyppi: "teksti", pvm: v.paatosteksti.pvm, jarj: "Sosiaalihuolto · päätös", otsikko: "Päätösluonnos", teksti: "Päätösteksti", tieto: v.paatosteksti
    });
    if (v.suunnitelma) lisaa(v.suunnitelma.id, {
      tyyppi: "teksti", pvm: v.suunnitelma.pvm, jarj: "Sosiaalihuolto · toteuttamissuunnitelma", otsikko: "Toteuttamissuunnitelma", teksti: "Suunnitelmateksti", tieto: v.suunnitelma
    });
    return L;
  }
  const SOS_LAJI = { vireilletulo: "Vireilletulo", selvitys: "Selvitys", paatos: "Päätös", palvelu: "Palvelu", asumisjakso: "Asumisjakso" };
  const KK = ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"];
  const kkNimi = (kk) => `${KK[+kk.slice(5, 7) - 1]} ${kk.slice(0, 4)}`;
  function sosKuvaus(s) {
    if (s.laji === "vireilletulo") return `${s.tehtava}${s.kiireellinen ? " · kiireellinen" : ""}`;
    if (s.laji === "selvitys") return `${fmtPvm(s.pvm)}–${s.loppu ? fmtPvm(s.loppu) : "kesken"} · ${s.tehtava}`;
    if (s.laji === "paatos") return `Ratkaisu: ${s.ratkaisu}${s.alku ? ` · voimassa ${fmtPvm(s.alku)}–${s.loppu ? fmtPvm(s.loppu) : ""}` : ""}`;
    if (s.laji === "palvelu") return `Alkanut ${fmtPvm(s.pvm)}${s.loppu ? `, päättynyt ${fmtPvm(s.loppu)}` : ", voimassa"}${s.keskeytetty ? ` · keskeytetty (${s.keskeytys || "syy ei tiedossa"})` : ""}`;
    if (s.laji === "asumisjakso") return `Alkanut ${fmtPvm(s.pvm)}${s.loppu ? `, päättynyt ${fmtPvm(s.loppu)}` : ", voimassa"}`;
    return "";
  }

  /* =====================================================================
   * 3. KONTEKSTI
   * ===================================================================== */
  function konteksti(v, viite) {
    const a = v.perus;
    const L = a.lahto.pvm;
    const jalkeen = (p) => p > L && p <= viite;
    const ennen = (p) => p <= L && p >= lisaaPv(L, -365);
    const kaynnitJ = v.kaynnit.filter((k) => jalkeen(k.pvm));
    const kaynnitE = v.kaynnit.filter((k) => ennen(k.pvm));
    const dxRivit = (kk) => kk.flatMap((k) => k.dx.map((d) => ({ ...d, pvm: k.pvm, kontakti: k.id, kiire: k.kiire })));
    return {
      v, a, L, viite,
      jaksoPv: Math.max(1, erotusPv(viite, L)),
      kaynnitJ, kaynnitE,
      dxJ: dxRivit(kaynnitJ), dxE: dxRivit(kaynnitE),
      noteJ: v.note && jalkeen(v.note.pvm) ? v.note : null,
      noteE: v.note && v.note.pvm <= L ? v.note : null,
      sosJ: v.sosTapahtumat.filter((s) => jalkeen(s.pvm))
    };
  }

  function aktiivisetSaannolliset(laakkeet, pvm) {
    const m = new Map();
    for (const l of laakkeet) if (l.tapa === "SÄÄNNÖLLINEN" && l.alku <= pvm && (!l.loppu || l.loppu >= pvm)) m.set(l.atc, l);
    return m;
  }
  function laakemuutokset(ctx) {
    const lp = ctx.v.laakkeet;
    const lahto = aktiivisetSaannolliset(lp, ctx.L);
    const nyt = aktiivisetSaannolliset(lp, ctx.viite);
    const aloitetut = new Map();
    for (const l of lp) if (l.alku > ctx.L && l.alku <= ctx.viite && !lahto.has(l.atc) && !aloitetut.has(l.atc)) aloitetut.set(l.atc, l);
    const lopetetut = [...lahto.values()].filter((l) => !nyt.has(l.atc));
    return { lahto, nyt, aloitetut: [...aloitetut.values()], lopetetut };
  }

  /* =====================================================================
   * 4. SÄÄNNÖT
   * Jokainen sääntö palauttaa havainnon tai null.
   * havainto = { taso: merkittava|seurattava|tiedoksi, otsikko, mitaMuuttui,
   *   perustelu, havaittu, lahteet[{id, ote}], vastanaytto[{id, ote}],
   *   varmuus, tarkistettavat[], ehdotukset[] }
   * ===================================================================== */
  const ote = (id, teksti) => ({ id, ote: teksti });
  const dxOte = (d) => ote(d.kontakti, `${dxTeksti(d.k)}${d.kiire !== "E" ? " (kiireellinen käynti)" : ""}`);
  const paivat = (rivit) => ainutlaatuiset(rivit.map((r) => r.pvm)).sort();
  function toimintakykyVastanaytto(ctx, alue) {
    const n = ctx.noteJ;
    if (!n) return [];
    const tk = n.osiot.TOIMINTAKYKY;
    const t = tulkitseToimintakyky(tk);
    if (t && t.suunta === "säilynyt" && (alue === "arki" || t.alueet.includes(alue))) return [ote(n.id, `Toimintakyky (${fmtPvm(n.pvm)}): ${tk}`)];
    return [];
  }

  const SAANNOT = [
    {
      id: "KAATUMINEN", alue: "liikkuminen", nimi: "Kaatumistaipumus kirjattu",
      peruste: "Kaatumistaipumus (R29.6) kirjattu käynnin diagnoosiksi lähtötilanteen jälkeen. Jos sitä ei ole kirjattu lähtötilannetta edeltäneen 12 kk:n aikana → merkittävä, muuten seurattava.",
      tiedot: "Terveydenhuollon käynnit ja diagnoosit",
      rajoitteet: "Kaatumiset kirjautuvat vain, jos asiakas hakeutuu terveysasemalle. Kotona tapahtuneet kaatumiset ilman käyntiä eivät näy (aliedustus).",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => onKaatuminen(d.k));
        if (!j.length) return null;
        const e = ctx.dxE.filter((d) => onKaatuminen(d.k));
        const pv = paivat(j);
        const uusi = e.length === 0;
        return {
          taso: uusi ? "merkittava" : "seurattava",
          varmuus: "selvä",
          otsikko: uusi ? "Kaatumistaipumus kirjattu lähtötilanteen jälkeen" : "Kaatumistaipumus kirjattu edelleen",
          mitaMuuttui: `Kaatumistaipumus kirjattu ${lkm(pv.length, "käynnillä", "käynnillä")} (${pv.map(fmtPvm).join(", ")}). Lähtötilannetta edeltäneen vuoden aikana: ${e.length ? lkm(paivat(e).length, "kirjaus", "kirjausta") : "ei kirjauksia"}.`,
          perustelu: "Diagnoosikoodi on kirjattu terveysaseman käynnillä.",
          havaittu: pv[0],
          lahteet: j.map(dxOte),
          vastanaytto: [],
          tarkistettavat: ["Kaatumisten olosuhteet ja asiakkaan oma kuvaus.", "Kotiympäristön turvallisuus ja apuvälineet.", "Lääkitys, joka voi lisätä kaatumisriskiä."],
          ehdotukset: ["Kaatumisriskin arviointi", "Hoito- ja palvelusuunnitelman tarkistus"]
        };
      }
    },
    {
      id: "VAMMA", alue: "liikkuminen", nimi: "Tapaturmat ja vammat",
      peruste: "Vammadiagnoosi (S- tai T-koodi) lähtötilanteen jälkeen. Murtuma tai vammoja ≥ 2 eri päivänä → merkittävä, 1 → seurattava.",
      tiedot: "Terveydenhuollon käynnit ja diagnoosit, käyntimuistiinpanon tulosyy",
      rajoitteet: "Vamman syntytapa (esim. kaatuminen) ei selviä diagnoosikoodista. Havainto ei kerro, liittyykö vamma toimintakyvyn muutokseen.",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => onVamma(d.k));
        if (!j.length) return null;
        const pv = paivat(j);
        const murtuma = j.some((d) => onMurtuma(d.k));
        const tulosyy = ctx.noteJ?.osiot["TULOSYY JA ESITIEDOT"] || "";
        const kaatui = /kaatu|liukastu|kompastu/i.test(tulosyy);
        const lahteet = j.map(dxOte);
        if (ctx.noteJ && tulosyy && pv.includes(ctx.noteJ.pvm)) lahteet.push(ote(ctx.noteJ.id, `Tulosyy: ${tulosyy}`));
        return {
          taso: murtuma || pv.length >= 2 ? "merkittava" : "seurattava",
          varmuus: kaatui ? "selvä" : "kohtalainen",
          otsikko: murtuma ? "Murtuma lähtötilanteen jälkeen" : pv.length >= 2 ? "Toistuvia vammoja lähtötilanteen jälkeen" : "Vamma lähtötilanteen jälkeen",
          mitaMuuttui: `${lkm(pv.length, "käynti", "käyntiä")} vamman vuoksi: ${ainutlaatuiset(j.map((d) => dxTeksti(d.k))).join("; ")}.`,
          perustelu: kaatui ? "Käyntimuistiinpanon tulosyyssä mainitaan kaatuminen tai liukastuminen." : "Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.",
          havaittu: pv[0],
          lahteet,
          vastanaytto: [],
          tarkistettavat: ["Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?", "Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?"],
          ehdotukset: murtuma ? ["Kaatumisriskin arviointi", "Uuden RAI-arvioinnin tarpeen arviointi"] : ["Kaatumisriskin arviointi"]
        };
      }
    },
    {
      id: "HUIMAUS", alue: "liikkuminen", nimi: "Huimaus",
      peruste: "Huimaus (R42) kirjattu lähtötilanteen jälkeen tai toimintakykykuvauksessa mainitaan huimaus → seurattava. Jos samalla on aloitettu kaatumisriskiä mahdollisesti lisäävä lääke → merkittävä.",
      tiedot: "Diagnoosit, käyntimuistiinpanon toimintakykyosio, lääkitys",
      rajoitteet: "Huimauksen syy ei selviä aineistosta.",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => d.k === "R42");
        const tk = ctx.noteJ?.osiot.TOIMINTAKYKY || "";
        const tkHuimaus = /huimau/i.test(tk);
        if (!j.length && !tkHuimaus) return null;
        const lm = laakemuutokset(ctx).aloitetut.filter((l) => FRID.test(l.atc));
        const lahteet = j.map(dxOte);
        if (tkHuimaus) lahteet.push(ote(ctx.noteJ.id, `Toimintakyky: ${tk}`));
        lahteet.push(...lm.map((l) => ote(l.id, `Aloitettu ${fmtPvm(l.alku)}: ${l.aine} (${l.atc}) – kaatumisriskiä mahdollisesti lisäävä lääkeryhmä`)));
        const pv = paivat([...j, ...(tkHuimaus ? [{ pvm: ctx.noteJ.pvm }] : [])]);
        return {
          taso: lm.length ? "merkittava" : "seurattava",
          varmuus: j.length && tkHuimaus ? "selvä" : "kohtalainen",
          otsikko: "Huimausta lähtötilanteen jälkeen",
          mitaMuuttui: `Huimaus kirjattu ${pv.map(fmtPvm).join(", ")}.${tkHuimaus ? " Asiakkaan oman kuvauksen mukaan huimaus vaikuttaa liikkumiseen." : ""}${lm.length ? ` Samalla jaksolla aloitettu ${lm.map((l) => l.aine).join(", ")}.` : ""}`,
          perustelu: "Huimaus voi lisätä kaatumisriskiä ja vaikuttaa liikkumiseen.",
          havaittu: pv[0],
          lahteet,
          vastanaytto: [],
          tarkistettavat: ["Milloin huimaus ilmenee ja rajoittaako se liikkumista?", lm.length ? "Lääkityksen ajallinen yhteys huimaukseen (lääkärin arvio)." : "Onko lääkitystä muutettu?"],
          ehdotukset: ["Kaatumisriskin arviointi", ...(lm.length ? ["Lääkehoidon arviointi"] : [])]
        };
      }
    },
    {
      id: "MIELIALA", alue: "mieliala", nimi: "Mielialaan liittyvät kirjaukset",
      peruste: "Masennus- tai ahdistuneisuusdiagnoosi (F32–F41) tai mielialalääkkeen (N06A, N05B, N05C) aloitus lähtötilanteen jälkeen, kun vastaavaa ei ollut lähtötilanteessa. Molemmat → merkittävä, toinen → seurattava. Lähtötilanteessa jo kirjattu → seurattava.",
      tiedot: "Diagnoosit, lääkitys",
      rajoitteet: "Diagnoosikoodi ei kerro oireiden vaikeusastetta. Lääkkeen käyttöaihe ei näy aineistossa.",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => onMieliala(d.k));
        const e = ctx.dxE.filter((d) => onMieliala(d.k));
        const lm = laakemuutokset(ctx);
        const uudet = lm.aloitetut.filter((l) => MIELIALALAAKE.test(l.atc));
        const lahtoLaake = [...lm.lahto.values()].filter((l) => MIELIALALAAKE.test(l.atc));
        if (!j.length && !uudet.length) return null;
        const uusiDx = j.length && !e.length;
        const taso = (uusiDx || (j.length && !lahtoLaake.length)) && uudet.length ? "merkittava" : "seurattava";
        const lahteet = [...j.map(dxOte), ...uudet.map((l) => ote(l.id, `Aloitettu ${fmtPvm(l.alku)}: ${l.aine} (${l.atc})`))];
        const unet = ctx.dxJ.filter((d) => onUni(d.k));
        lahteet.push(...unet.map(dxOte));
        const pv = paivat([...j, ...uudet.map((l) => ({ pvm: l.alku }))]);
        const f41 = j.some((d) => /^F41/.test(d.k));
        const f32 = j.some((d) => /^F3/.test(d.k)) || uudet.some((l) => /^N06A/.test(l.atc));
        return {
          taso,
          varmuus: e.length || lahtoLaake.length ? "ristiriitainen" : "kohtalainen",
          otsikko: uusiDx ? "Mielialaan liittyvä uusi kirjaus" : "Mielialaan liittyviä kirjauksia",
          mitaMuuttui: [
            j.length ? `Kirjattu ${ainutlaatuiset(j.map((d) => dxTeksti(d.k))).join("; ")} (${paivat(j).map(fmtPvm).join(", ")}).` : "",
            uudet.length ? `Aloitettu ${uudet.map((l) => `${l.aine} ${fmtPvm(l.alku)}`).join(", ")}.` : "",
            unet.length ? "Lisäksi kirjattu univaikeuksia." : ""
          ].filter(Boolean).join(" "),
          perustelu: e.length || lahtoLaake.length
            ? "Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion."
            : "Lähtötilanteessa ei ollut vastaavia kirjauksia.",
          havaittu: pv[0],
          lahteet,
          vastanaytto: [
            ...e.map((d) => ote(d.kontakti, `Jo ennen lähtötilannetta: ${dxTeksti(d.k)} (${fmtPvm(d.pvm)})`)),
            ...lahtoLaake.map((l) => ote(l.id, `Lähtötilanteessa käytössä: ${l.aine} (${l.atc})`))
          ],
          tarkistettavat: ["Asiakkaan oma kokemus mielialasta ja jaksamisesta.", "Vaikuttaako mieliala arjen toimiin ja osallistumiseen?"],
          ehdotukset: [...(f32 || !f41 ? ["lomake:PHQ-9"] : []), ...(f41 ? ["lomake:GAD-7"] : [])]
        };
      }
    },
    {
      id: "UNI", alue: "mieliala", nimi: "Univaikeudet",
      peruste: "Unihäiriö (G47) kirjattu lähtötilanteen jälkeen, kun sitä ei ollut lähtötilanteessa, eikä mielialasääntö jo kata sitä → seurattava.",
      tiedot: "Diagnoosit",
      rajoitteet: "Yksittäinen kirjaus voi liittyä tilapäiseen vaivaan.",
      aja(ctx, aiemmat) {
        if (aiemmat.some((s) => s.saanto === "MIELIALA")) return null;
        const j = ctx.dxJ.filter((d) => onUni(d.k));
        if (!j.length || ctx.dxE.some((d) => onUni(d.k))) return null;
        return {
          taso: "seurattava", varmuus: "epävarma",
          otsikko: "Univaikeuksia lähtötilanteen jälkeen",
          mitaMuuttui: `Kirjattu ${dxTeksti(j[0].k)} (${paivat(j).map(fmtPvm).join(", ")}).`,
          perustelu: "Univaikeudet voivat vaikuttaa jaksamiseen, mielialaan ja kaatumisriskiin.",
          havaittu: paivat(j)[0], lahteet: j.map(dxOte), vastanaytto: [],
          tarkistettavat: ["Onko univaikeus jatkuvaa vai tilapäistä?"],
          ehdotukset: []
        };
      }
    },
    {
      id: "KIPU", alue: "kipu", nimi: "Kipuun liittyvät käynnit",
      peruste: "Kipuun liittyvä diagnoosi (M-, R10-, R51-koodit) ≥ 2 eri päivänä lähtötilanteen jälkeen tai 1 kerta, kun toimintakykykuvauksessa kipu rajoittaa toimintaa → seurattava.",
      tiedot: "Diagnoosit, käyntimuistiinpanon toimintakykyosio, kipulääkkeet",
      rajoitteet: "Kivun voimakkuutta ei ole aineistossa mitattu.",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => onKipu(d.k));
        const tk = ctx.noteJ?.osiot.TOIMINTAKYKY || "";
        const tkKipu = /kipu|kivu|särky|kivulia|arkuus/i.test(tk) && TK_HEIKKO.test(tk);
        const pv = paivat(j);
        if (!(pv.length >= 2 || (pv.length >= 1 && tkKipu))) return null;
        const uudet = laakemuutokset(ctx).aloitetut.filter((l) => KIPULAAKE.test(l.atc));
        const lahteet = [...j.map(dxOte), ...uudet.map((l) => ote(l.id, `Aloitettu ${fmtPvm(l.alku)}: ${l.aine} (${KAYTTOTAPA[l.tapa] || l.tapa})`))];
        if (tkKipu) lahteet.push(ote(ctx.noteJ.id, `Toimintakyky: ${tk}`));
        return {
          taso: "seurattava", varmuus: "kohtalainen",
          otsikko: "Kipu toistuu lähtötilanteen jälkeen",
          mitaMuuttui: `${lkm(pv.length, "käynti", "käyntiä")} kivun vuoksi: ${ainutlaatuiset(j.map((d) => dxTeksti(d.k))).join("; ")}.${tkKipu ? " Asiakkaan mukaan kipu rajoittaa toimintaa." : ""}`,
          perustelu: "Toistuva kipu voi vaikuttaa liikkumiseen ja arjessa selviytymiseen.",
          havaittu: pv[0], lahteet, vastanaytto: toimintakykyVastanaytto(ctx, "kipu"),
          tarkistettavat: ["Rajoittaako kipu liikkumista tai päivittäisiä toimia?", "Toteutuuko kivunhoito suunnitellusti?"],
          ehdotukset: []
        };
      }
    },
    {
      id: "TOIMINTAKYKY", alue: "arki", nimi: "Toimintakyvyn kuvaus käyntimuistiinpanossa",
      peruste: "Lähtötilanteen jälkeisen käyntimuistiinpanon toimintakykyosiossa kuvataan toiminnan vaikeutumista, rajoittumista tai pelkoa → seurattava. ”Tilapäisesti” → epävarma.",
      tiedot: "Käyntimuistiinpanon toimintakykyosio (vapaa teksti)",
      rajoitteet: "Perustuu avainsanoihin ja asiakkaan omaan kuvaukseen yhdellä käynnillä. Vapaan tekstin tulkinta voi tuottaa virhehälytyksiä.",
      aja(ctx, aiemmat) {
        const n = ctx.noteJ;
        const tk = n?.osiot.TOIMINTAKYKY;
        const t = tulkitseToimintakyky(tk);
        if (!t || t.suunta !== "heikentynyt") return null;
        // ei toisteta, jos sama teksti on jo toisen havainnon lähteenä
        if (aiemmat.some((s) => s.lahteet.some((l) => l.id === n.id) && s.alue === t.alue)) return null;
        const e = ctx.noteE;
        return {
          alue: t.alue,
          taso: "seurattava", varmuus: t.tilapainen ? "epävarma" : "kohtalainen",
          otsikko: `Toimintakyvyn vaikeutumista kuvattu: ${pieni(ALUE[t.alue].nimi)}`,
          mitaMuuttui: `Käynnillä ${fmtPvm(n.pvm)}: ”${tk}”`,
          perustelu: t.tilapainen ? "Kuvauksen mukaan muutos on tilapäinen." : "Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.",
          havaittu: n.pvm,
          lahteet: [ote(n.id, `Toimintakyky: ${tk}`)],
          vastanaytto: [],
          tarkistettavat: ["Onko muutos pysyvä vai tilapäinen?", "Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?"],
          ehdotukset: t.alue === "arki" || t.alue === "liikkuminen" ? ["Hoito- ja palvelusuunnitelman tarkistus"] : []
        };
      }
    },
    {
      id: "KIIREELLISET", alue: "palvelut", nimi: "Kiireelliset käynnit",
      peruste: "Vähintään 2 kiireellistä käyntiä lähtötilanteen jälkeen, ja vuoteen suhteutettu määrä on suurempi kuin lähtötilannetta edeltäneen 12 kk:n aikana → seurattava. Vähintään kaksinkertainen → merkittävä. Yksittäinen kiireellinen käynti ei nosta havaintoa.",
      tiedot: "Terveydenhuollon käynnit (kiireellisyys)",
      rajoitteet: "Lyhyellä seurantajaksolla yksittäinen käynti painaa paljon, siksi vaaditaan vähintään kaksi. Käyntien syyt eivät näy ilman diagnooseja.",
      aja(ctx) {
        const j = ctx.kaynnitJ.filter((k) => k.kiire !== "E");
        if (j.length < 2) return null;
        const e = ctx.kaynnitE.filter((k) => k.kiire !== "E");
        const vuosiJ = (j.length / ctx.jaksoPv) * 365;
        if (vuosiJ <= e.length) return null;
        const taso = vuosiJ >= 2 * Math.max(1, e.length) ? "merkittava" : "seurattava";
        return {
          taso, varmuus: ctx.jaksoPv < 120 ? "epävarma" : "selvä",
          otsikko: "Kiireelliset käynnit lisääntyneet",
          mitaMuuttui: `${lkm(j.length, "kiireellinen käynti", "kiireellistä käyntiä")} ${ctx.jaksoPv} vrk:n aikana (noin ${fmtNum(vuosiJ)} / vuosi). Lähtötilannetta edeltäneen vuoden aikana ${e.length}.`,
          perustelu: "Laskettu käyntien kiireellisyysluokasta. Käyntien sisältöä ei tulkita.",
          havaittu: j[0].pvm,
          lahteet: j.map((k) => ote(k.id, `${YHTEYSTAPA[k.tapa] || k.tapa}, ${KIIRE[k.kiire] || k.kiire}${k.dx.length ? " · " + k.dx.map((d) => dxTeksti(d.k)).join("; ") : ""}`)),
          vastanaytto: [],
          tarkistettavat: ["Mikä on johtanut kiireellisiin käynteihin?", "Vastaako nykyinen palvelu asiakkaan tarvetta?"],
          ehdotukset: []
        };
      }
    },
    {
      id: "LAAKITYS", alue: "terveys", nimi: "Lääkitysmuutokset",
      peruste: "Säännöllisessä lääkityksessä uusi vaikuttava aine tai lopetettu aine lähtötilanteeseen verrattuna → seurattava. Uusi kaatumisriskiä mahdollisesti lisäävä lääke (FRID) mainitaan erikseen. ≥ 3 uutta säännöllistä ainetta → merkittävä.",
      tiedot: "Lääkitys (vaikuttava aine, ATC, käyttötapa, aloitus- ja lopetuspäivä)",
      rajoitteet: "Reseptien uusinnat näkyvät aineistossa uusina riveinä; muutos lasketaan vaikuttavan aineen tasolla. Käyttöaihe ei näy.",
      aja(ctx) {
        const lm = laakemuutokset(ctx);
        const uudetS = lm.aloitetut.filter((l) => l.tapa === "SÄÄNNÖLLINEN");
        if (!uudetS.length && !lm.lopetetut.length) return null;
        const frid = uudetS.filter((l) => FRID.test(l.atc));
        return {
          taso: uudetS.length >= 3 ? "merkittava" : "seurattava", varmuus: "selvä",
          otsikko: "Säännöllinen lääkitys muuttunut",
          mitaMuuttui: [
            `Säännöllisiä lääkeaineita lähtötilanteessa ${lm.lahto.size}, nyt ${lm.nyt.size}.`,
            uudetS.length ? `Jakson aikana aloitettu: ${uudetS.map((l) => `${l.aine} (${fmtPvm(l.alku)}${l.loppu && l.loppu < ctx.viite ? `–${fmtPvm(l.loppu)}` : ""})`).join(", ")}.` : "",
            lm.lopetetut.length ? `Päättynyt: ${lm.lopetetut.map((l) => l.aine).join(", ")}.` : "",
            frid.length ? `Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: ${frid.map((l) => l.aine).join(", ")}.` : ""
          ].filter(Boolean).join(" "),
          perustelu: "Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.",
          havaittu: [...uudetS.map((l) => l.alku), ...lm.lopetetut.map((l) => l.loppu)].filter(Boolean).sort()[0] || ctx.viite,
          lahteet: [...uudetS.map((l) => ote(l.id, `Aloitettu ${fmtPvm(l.alku)}: ${l.aine} (${l.atc}), säännöllinen`)), ...lm.lopetetut.map((l) => ote(l.id, `Päättynyt ${fmtPvm(l.loppu)}: ${l.aine} (${l.atc})`))],
          vastanaytto: [],
          tarkistettavat: ["Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?", ...(frid.length ? ["Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen."] : [])],
          ehdotukset: ["Lääkehoidon arviointi"]
        };
      }
    },
    {
      id: "LAB", alue: "terveys", nimi: "Laboratoriotulosten muutos",
      peruste: "Viimeisin tulos lähtötilanteen jälkeen verrattuna viimeisimpään ennen lähtötilannetta: B-HbA1c nousu ≥ 6 mmol/mol, P-Krea nousu ≥ 25 %, fP-Gluk nousu ≥ 1,5 mmol/l → seurattava.",
      tiedot: "Laboratoriotulokset",
      rajoitteet: "Aineistossa ei ole viitearvoja. Vertailu vaatii tuloksen sekä ennen että jälkeen lähtötilanteen.",
      aja(ctx) {
        const RAJA = { "B-HbA1c": (a, b) => b - a >= 6, "P-Krea": (a, b) => b >= a * 1.25, "fP-Gluk": (a, b) => b - a >= 1.5 };
        const muutokset = [];
        for (const t of Object.keys(RAJA)) {
          const sarja = ctx.v.lab.filter((l) => l.tutkimus === t);
          const e = sarja.filter((l) => l.pvm <= ctx.L).pop();
          const j = sarja.filter((l) => l.pvm > ctx.L && l.pvm <= ctx.viite).pop();
          if (e && j && RAJA[t](e.arvo, j.arvo)) muutokset.push({ t, e, j });
        }
        if (!muutokset.length) return null;
        return {
          taso: "seurattava", varmuus: "selvä",
          otsikko: "Laboratoriotulos muuttunut lähtötasosta",
          mitaMuuttui: muutokset.map((m) => `${m.t}: ${fmtNum(m.e.arvo)} → ${fmtNum(m.j.arvo)} ${m.j.yksikko}`).join("; ") + ".",
          perustelu: "Muutos lasketaan lähtötilannetta edeltäneeseen tulokseen.",
          havaittu: muutokset[0].j.pvm,
          lahteet: muutokset.flatMap((m) => [ote(m.e.id, `${m.t} ${fmtPvm(m.e.pvm)}: ${fmtNum(m.e.arvo)} ${m.e.yksikko} (lähtötaso)`), ote(m.j.id, `${m.t} ${fmtPvm(m.j.pvm)}: ${fmtNum(m.j.arvo)} ${m.j.yksikko}`)]),
          vastanaytto: [],
          tarkistettavat: ["Lääkärin arvio tuloksen merkityksestä."],
          ehdotukset: []
        };
      }
    },
    {
      id: "KUULO", alue: "kommunikointi", nimi: "Kuuloon liittyvä kirjaus",
      peruste: "Kuuloon tai korvaan liittyvä diagnoosi (H60–H95) lähtötilanteen jälkeen → tiedoksi.",
      tiedot: "Diagnoosit",
      rajoitteet: "Usein tilapäinen vaiva.",
      aja(ctx) {
        const j = ctx.dxJ.filter((d) => onKuulo(d.k));
        if (!j.length) return null;
        return {
          taso: "tiedoksi", varmuus: "kohtalainen",
          otsikko: "Kuuloon liittyvä kirjaus",
          mitaMuuttui: `Kirjattu ${ainutlaatuiset(j.map((d) => dxTeksti(d.k))).join("; ")} (${paivat(j).map(fmtPvm).join(", ")}).`,
          perustelu: "Kuulo vaikuttaa kommunikointiin ja ohjeiden ymmärtämiseen.",
          havaittu: paivat(j)[0], lahteet: j.map(dxOte), vastanaytto: [],
          tarkistettavat: ["Kuuleeko asiakas puhetta normaalisti?"], ehdotukset: []
        };
      }
    },
    {
      id: "AVUNTARVE", alue: "arki", nimi: "Kotihoidon käyntimäärän muutos",
      peruste: "Kotihoidon kotikäynnit tai käyttöaika: kolmen viimeisen täyden kuukauden keskiarvo verrattuna palvelun kolmen ensimmäisen täyden kuukauden keskiarvoon. Muutos ≥ 20 % → seurattava, ≥ 40 % → merkittävä.",
      tiedot: "Sosiaalihuollon kontaktit (kuukausikooste)",
      rajoitteet: "Toteutunut käyntimäärä riippuu myös resursseista ja asiakkaan poissaoloista. Vaatii vähintään 6 täyttä palvelukuukautta.",
      aja(ctx) {
        const alku = ctx.v.sosTapahtumat.find((s) => s.laji === "palvelu" && s.nimi === "Säännöllinen kotihoito");
        if (!alku) return null;
        const alkuKk = alku.pvm.slice(0, 7), nytKk = ctx.viite.slice(0, 7);
        const taydet = ctx.v.kaynnitKk.filter((k) => k.kk > alkuKk && k.kk < nytKk);
        if (taydet.length < 6) return null;
        const ka = (r, f) => r.reduce((n, k) => n + k[f], 0) / r.length;
        const ens = taydet.slice(0, 3), viim = taydet.slice(-3);
        const dK = ka(viim, "kotikaynnit") / Math.max(1, ka(ens, "kotikaynnit")) - 1;
        const dM = ka(viim, "min") / Math.max(1, ka(ens, "min")) - 1;
        const d = Math.abs(dK) >= Math.abs(dM) ? dK : dM;
        if (Math.abs(d) < 0.2) return null;
        return {
          taso: Math.abs(d) >= 0.4 ? "merkittava" : "seurattava", varmuus: "kohtalainen",
          otsikko: d > 0 ? "Kotihoidon käyntimäärä kasvanut" : "Kotihoidon käyntimäärä vähentynyt",
          mitaMuuttui: `Kotikäyntejä keskimäärin ${fmtNum(ka(ens, "kotikaynnit"))} → ${fmtNum(ka(viim, "kotikaynnit"))} / kk, aikaa ${Math.round(ka(ens, "min"))} → ${Math.round(ka(viim, "min"))} min / kk.`,
          perustelu: "Toteutunut käyntimäärä kuvaa avuntarvetta vain osittain.",
          havaittu: viim[0].kk + "-01",
          lahteet: [...ens, ...viim].map((k) => ote("KH-" + k.kk, `${kkNimi(k.kk)}: ${k.kotikaynnit} kotikäyntiä, ${k.min} min`)),
          vastanaytto: [],
          tarkistettavat: ["Vastaako suunniteltu palvelu toteutunutta?"], ehdotukset: ["Hoito- ja palvelusuunnitelman tarkistus"]
        };
      }
    },
    {
      id: "PALVELUMUUTOS", alue: "arki", nimi: "Palveluprosessin muutos",
      peruste: "Lähtötilanteen jälkeen uusi vireilletulo tai päätös → merkittävä. Palvelu päättynyt, palvelussa merkintä keskeytyksestä tai kotihoidon käyntejä ei ole kirjattu kahteen viimeiseen täyteen kuukauteen, vaikka palvelu on voimassa → seurattava.",
      tiedot: "Sosiaalihuollon vireilletulot, päätökset, palvelut ja kotihoidon käynnit (kuukausikooste)",
      rajoitteet: "Keskeytyksen ajankohtaa ja syytä ei ole aineistossa; se päätellään viimeisestä kuukaudesta, jolta käyntejä on kirjattu.",
      aja(ctx) {
        const uudet = ctx.sosJ.filter((s) => (s.laji === "vireilletulo" || s.laji === "paatos") && s.id !== ctx.a.lahto.paatos);
        const palvelu = ctx.v.sosTapahtumat.find((s) => s.laji === "palvelu" && s.nimi === "Säännöllinen kotihoito" && !s.loppu);
        const kesk = ctx.v.sosTapahtumat.filter((s) => s.laji === "palvelu" && s.keskeytetty);
        const paattyneet = ctx.v.sosTapahtumat.filter((s) => (s.laji === "palvelu" || s.laji === "asumisjakso") && s.loppu && s.loppu > ctx.L && s.loppu <= ctx.viite)
          .filter((s, i, arr) => arr.findIndex((x) => x.nimi === s.nimi) === i);
        const kk = ctx.v.kaynnitKk.filter((k) => k.kotikaynnit > 0);
        const viimKk = kk.length ? kk[kk.length - 1].kk : null;
        const raja = lisaaKk(ctx.viite.slice(0, 7) + "-01", -2).slice(0, 7);
        const tauko = palvelu && viimKk && viimKk < raja;
        if (!uudet.length && !kesk.length && !tauko && !paattyneet.length) return null;
        const lahteet = [...uudet, ...kesk].map((s) => ote(s.id, `${SOS_LAJI[s.laji]}: ${s.nimi}${s.keskeytetty ? ` – keskeytetty (${s.keskeytys || "syy ei tiedossa"})` : ""}`));
        lahteet.push(...paattyneet.filter((s) => !kesk.includes(s)).map((s) => ote(s.id, `${SOS_LAJI[s.laji]}: ${s.nimi} – päättynyt ${fmtPvm(s.loppu)}`)));
        if (tauko) lahteet.push(ote("KH-" + viimKk, `Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: ${kkNimi(viimKk)}`));
        return {
          taso: uudet.length ? "merkittava" : "seurattava", varmuus: uudet.length || paattyneet.length ? "selvä" : tauko && kesk.length ? "kohtalainen" : "epävarma",
          otsikko: uudet.length ? "Uusi sosiaalihuollon asia vireillä" : paattyneet.length ? `${paattyneet[0].nimi} päättynyt` : tauko ? "Kotihoidon käynnit keskeytyneet" : "Palvelussa keskeytysmerkintä",
          mitaMuuttui: [
            ...uudet.map((s) => `${SOS_LAJI[s.laji]} ${fmtPvm(s.pvm)}: ${s.nimi}.`),
            ...paattyneet.map((s) => `${s.nimi} päättyi ${fmtPvm(s.loppu)} lähtötilanteen jälkeen.`),
            ...kesk.map((s) => `${s.nimi}: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa).`),
            tauko ? `Kotihoidon käyntejä ei ole kirjattu ${kkNimi(viimKk)} jälkeen, vaikka palvelu on voimassa.` : ""
          ].filter(Boolean).join(" "),
          perustelu: "Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).",
          havaittu: uudet[0]?.pvm || paattyneet[0]?.loppu || (tauko ? lisaaKk(viimKk + "-01", 1) : ctx.viite),
          lahteet, vastanaytto: [],
          tarkistettavat: uudet.length ? ["Mikä on johtanut uuteen asiaan?"] : paattyneet.length ? ["Miksi palvelu päättyi ja miten asiakas pärjää nyt?", "Onko asiakkaalla muuta tukea?"] : ["Mistä keskeytys johtui ja onko palvelu jatkunut?", "Onko asiakkaan tilanne muuttunut keskeytyksen aikana?"],
          ehdotukset: ["Palvelutarpeen arvioinnin päivittäminen"]
        };
      }
    },
    /* ---------- myönteisen suunnan säännöt (vihreä) ---------- */
    {
      id: "KIIREELLISET_VAH", alue: "palvelut", nimi: "Kiireelliset käynnit vähentyneet", suunta: "myonteinen",
      peruste: "Lähtötilannetta edeltäneen 12 kk:n aikana vähintään 2 kiireellistä käyntiä, ja vuoteen suhteutettu määrä lähtötilanteen jälkeen on enintään puolet siitä (seurantaa vähintään 90 vrk) → myönteinen muutos.",
      tiedot: "Terveydenhuollon käynnit (kiireellisyys)",
      rajoitteet: "Käyntien väheneminen voi johtua myös siitä, että asiakas hakeutuu muualle hoitoon.",
      aja(ctx) {
        const e = ctx.kaynnitE.filter((k) => k.kiire !== "E");
        if (e.length < 2 || ctx.jaksoPv < 90) return null;
        const j = ctx.kaynnitJ.filter((k) => k.kiire !== "E");
        const vuosiJ = (j.length / ctx.jaksoPv) * 365;
        if (vuosiJ > e.length / 2) return null;
        return {
          taso: "myonteinen", varmuus: "kohtalainen",
          otsikko: "Kiireelliset käynnit vähentyneet",
          mitaMuuttui: `Kiireellisiä käyntejä lähtötilannetta edeltäneen vuoden aikana ${e.length}, lähtötilanteen jälkeen ${j.length} (${ctx.jaksoPv} vrk, noin ${fmtNum(vuosiJ)} / vuosi).`,
          perustelu: "Vähentynyt kiireellisen hoidon tarve voi kertoa voinnin vakiintumisesta.",
          havaittu: ctx.viite,
          lahteet: e.map((k) => ote(k.id, `Ennen lähtötilannetta: ${YHTEYSTAPA[k.tapa] || k.tapa}, ${KIIRE[k.kiire] || k.kiire}`)),
          vastanaytto: j.map((k) => ote(k.id, `Lähtötilanteen jälkeen: ${YHTEYSTAPA[k.tapa] || k.tapa}, ${KIIRE[k.kiire] || k.kiire}`)),
          tarkistettavat: [], ehdotukset: []
        };
      }
    },
    {
      id: "KAATUMINEN_EI", alue: "liikkuminen", nimi: "Ei kaatumis- tai vammakirjauksia", suunta: "myonteinen",
      peruste: "Kaatumistaipumus (R29.6) tai vamma (S/T) kirjattu lähtötilannetta edeltäneen 12 kk:n aikana, mutta ei lähtötilanteen jälkeen (seurantaa vähintään 120 vrk) → myönteinen muutos, varmuus epävarma.",
      tiedot: "Terveydenhuollon käynnit ja diagnoosit",
      rajoitteet: "Kirjauksen puuttuminen ei todista, ettei kaatumisia olisi ollut – kotona tapahtuneet kaatumiset ilman käyntiä eivät näy.",
      aja(ctx) {
        if (ctx.jaksoPv < 120) return null;
        const e = ctx.dxE.filter((d) => onKaatuminen(d.k) || onVamma(d.k));
        const j = ctx.dxJ.filter((d) => onKaatuminen(d.k) || onVamma(d.k));
        if (!e.length || j.length) return null;
        return {
          taso: "myonteinen", varmuus: "epävarma",
          otsikko: "Ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen",
          mitaMuuttui: `Ennen lähtötilannetta kirjattu ${ainutlaatuiset(e.map((d) => dxTeksti(d.k))).join("; ")} (${paivat(e).map(fmtPvm).join(", ")}). Lähtötilanteen jälkeen ${ctx.jaksoPv} vrk:n aikana ei vastaavia kirjauksia.`,
          perustelu: "Kaatumisiin liittyvien käyntien puuttuminen voi kertoa tilanteen vakiintumisesta, mutta varmista asiakkaalta.",
          havaittu: ctx.viite, lahteet: e.map(dxOte), vastanaytto: [],
          tarkistettavat: ["Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?"], ehdotukset: []
        };
      }
    },
    {
      id: "MIELIALA_EI", alue: "mieliala", nimi: "Ei uusia mielialakirjauksia", suunta: "myonteinen",
      peruste: "Masennus- tai ahdistuneisuusdiagnoosi kirjattu lähtötilannetta edeltäneen 12 kk:n aikana, mutta ei lähtötilanteen jälkeen, eikä uutta mielialalääkettä ole aloitettu (seurantaa vähintään 120 vrk) → myönteinen muutos, varmuus epävarma.",
      tiedot: "Diagnoosit, lääkitys",
      rajoitteet: "Diagnoosin puuttuminen ei kerro oireiden poistumisesta.",
      aja(ctx, aiemmat) {
        if (ctx.jaksoPv < 120 || aiemmat.some((s) => s.saanto === "MIELIALA")) return null;
        const e = ctx.dxE.filter((d) => onMieliala(d.k));
        if (!e.length || ctx.dxJ.some((d) => onMieliala(d.k))) return null;
        return {
          taso: "myonteinen", varmuus: "epävarma",
          otsikko: "Ei uusia mielialaan liittyviä kirjauksia",
          mitaMuuttui: `Ennen lähtötilannetta kirjattu ${ainutlaatuiset(e.map((d) => dxTeksti(d.k))).join("; ")}. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.`,
          perustelu: "Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.",
          havaittu: ctx.viite, lahteet: e.map(dxOte), vastanaytto: [],
          tarkistettavat: ["Asiakkaan oma kokemus mielialasta."], ehdotukset: []
        };
      }
    },
    {
      id: "LAB_PARANNUS", alue: "terveys", nimi: "Laboratoriotulos kohentunut", suunta: "myonteinen",
      peruste: "Viimeisin tulos lähtötilanteen jälkeen verrattuna viimeisimpään ennen lähtötilannetta: B-HbA1c lasku ≥ 6 mmol/mol, P-Krea lasku ≥ 25 %, fP-Gluk lasku ≥ 1,5 mmol/l → myönteinen muutos.",
      tiedot: "Laboratoriotulokset",
      rajoitteet: "Aineistossa ei ole viitearvoja; lasku ei aina ole myönteinen (lääkärin arvio).",
      aja(ctx) {
        const RAJA = { "B-HbA1c": (a, b) => a - b >= 6, "P-Krea": (a, b) => b <= a * 0.75, "fP-Gluk": (a, b) => a - b >= 1.5 };
        const m = [];
        for (const t of Object.keys(RAJA)) {
          const s = ctx.v.lab.filter((l) => l.tutkimus === t);
          const e = s.filter((l) => l.pvm <= ctx.L).pop(), j = s.filter((l) => l.pvm > ctx.L && l.pvm <= ctx.viite).pop();
          if (e && j && RAJA[t](e.arvo, j.arvo)) m.push({ t, e, j });
        }
        if (!m.length) return null;
        return {
          taso: "myonteinen", varmuus: "selvä",
          otsikko: "Laboratoriotulos kohentunut lähtötasosta",
          mitaMuuttui: m.map((x) => `${x.t}: ${fmtNum(x.e.arvo)} → ${fmtNum(x.j.arvo)} ${x.j.yksikko}`).join("; ") + ".",
          perustelu: "Muutos lasketaan lähtötilannetta edeltäneeseen tulokseen.",
          havaittu: m[0].j.pvm,
          lahteet: m.flatMap((x) => [ote(x.e.id, `${x.t} ${fmtPvm(x.e.pvm)}: ${fmtNum(x.e.arvo)} ${x.e.yksikko} (lähtötaso)`), ote(x.j.id, `${x.t} ${fmtPvm(x.j.pvm)}: ${fmtNum(x.j.arvo)} ${x.j.yksikko}`)]),
          vastanaytto: [], tarkistettavat: ["Lääkärin arvio tuloksen merkityksestä."], ehdotukset: []
        };
      }
    },
    {
      id: "SEURANTA", alue: "arki", nimi: "RAI-seuranta-arvion ajankohta",
      peruste: "RAI-seuranta-arvio noin 6 kk välein tai asiakkaan tilanteen olennaisesti muuttuessa. 6 kk lähtötilanteesta täyttynyt tai täyttyy 30 vrk:n sisällä → tiedoksi.",
      tiedot: "Lähtötilanteen päivämäärä",
      rajoitteet: "Aineistossa ei ole tietoa tehdyistä RAI-arvioinneista.",
      aja(ctx) {
        const era = lisaaKk(ctx.L, 6);
        const jaljella = erotusPv(era, ctx.viite);
        if (jaljella > 30) return null;
        return {
          taso: "tiedoksi", varmuus: "selvä",
          otsikko: jaljella < 0 ? "RAI-seuranta-arvio ajankohtainen" : "RAI-seuranta-arvio lähestyy",
          mitaMuuttui: jaljella < 0 ? `6 kk lähtötilanteesta täyttyi ${fmtPvm(era)}.` : `6 kk lähtötilanteesta täyttyy ${fmtPvm(era)} (${jaljella} vrk).`,
          perustelu: `Lähtötilanne ${fmtPvm(ctx.L)}.`,
          havaittu: ctx.viite > era ? era : ctx.viite,
          lahteet: [ote(ctx.a.lahto.paatos, `Palvelupäätös ${fmtPvm(ctx.L)}`)], vastanaytto: [],
          tarkistettavat: [], ehdotukset: []
        };
      }
    }
  ];

  const TASO = { merkittava: 4, seurattava: 3, myonteinen: 2, tiedoksi: 1 };
  const TASO_NIMI = { merkittava: "Merkittävä kielteinen muutos", seurattava: "Seurattava muutos", myonteinen: "Merkittävä myönteinen muutos", tiedoksi: "Tiedoksi" };

  /* =====================================================================
   * 5. OSA-ALUEIDEN KOOSTE: lähtötilanne ja sen jälkeen kertynyt tieto
   * ===================================================================== */
  function alueKooste(ctx, laake) {
    const a = ctx.a, v = ctx.v;
    const R = Object.fromEntries(ALUEET.map((x) => [x.id, { lahto: [], jalkeen: [] }]));
    const f = (alue, kohta, teksti, id, pvm) => R[alue][kohta].push({ teksti, id: id || null, pvm: pvm || null });

    // Arki: palvelu, tuen tarve, suunniteltu ja toteutunut kotihoito
    f("arki", "lahto", `${a.lahto.palvelu} myönnetty ${fmtPvm(a.lahto.pvm)}${a.lahto.voimassa ? ` (${a.lahto.voimassa})` : ""}.`, v.sosTapahtumat.length ? a.lahto.paatos : null, a.lahto.pvm);
    if (a.lahto.tuenTarve.length) f("arki", "lahto", `Tuen tarpeen luokitus: ${a.lahto.tuenTarve.join("; ")}.`, v.paatosteksti ? v.paatosteksti.id + "-T" : null);
    const suun = v.suunniteltu.filter((s) => s.pvm <= lisaaPv(ctx.L, 60));
    if (suun.length) f("arki", "lahto", `Suunniteltu kotihoito ${suun[0].maara} min / vrk.`, suun[0].id, suun[0].pvm);
    for (const s of v.suunniteltu.filter((x) => !suun.includes(x))) f("arki", "jalkeen", `Suunniteltu kotihoito muutettu: ${s.maara} min / vrk.`, s.id, s.pvm);
    const kk = v.kaynnitKk.filter((k) => k.kk < ctx.viite.slice(0, 7));
    if (kk.length) {
      const viim = kk[kk.length - 1];
      f("arki", "jalkeen", `Kotihoito ${kkNimi(viim.kk)}: ${viim.kotikaynnit} kotikäyntiä, ${viim.min} min${viim.kk < lisaaKk(ctx.viite.slice(0, 7) + "-01", -1).slice(0, 7) ? " (viimeisin kuukausi, jolta käyntejä on kirjattu)" : ""}.`, "KH-" + viim.kk, viim.kk + "-01");
    }
    for (const s of ctx.sosJ.filter((x) => x.laji !== "palvelu" && x.laji !== "asumisjakso" && x.id !== a.lahto.paatos)) f("arki", "jalkeen", `${SOS_LAJI[s.laji]}: ${s.nimi}.`, s.id, s.pvm);

    // Muistiinpanon toimintakyky: ennen lähtötilannetta → lähtö, jälkeen → jälkeen
    for (const [n, kohta] of [[ctx.noteE, "lahto"], [ctx.noteJ, "jalkeen"]]) {
      if (!n) continue;
      const tk = n.osiot.TOIMINTAKYKY;
      const t = tulkitseToimintakyky(tk);
      if (t) for (const al of t.alueet) f(al, kohta, `Toimintakyky (${n.rooli}, ${fmtPvm(n.pvm)}): ${tk}`, n.id, n.pvm);
      const el = n.osiot["TERVEYTEEN VAIKUTTAVAT TEKIJÄT"];
      if (el) f("sosiaalinen", kohta, `${el}`, n.id, n.pvm);
    }

    // Kognitio: muistiin liittyvä tuen konteksti päätöksestä
    if (a.lahto.muisti && v.sosTapahtumat.length) f("kognitio", "lahto", `Muistiin liittyvä tuen tarve: ${a.lahto.muisti.split(";")[0]}.`, v.paatosteksti ? v.paatosteksti.id + "-T" : a.lahto.paatos, a.lahto.pvm);
    // Kommunikointi: asiointikieli
    f("kommunikointi", "lahto", `Asiointikieli: ${a.kieli === "sv" ? "ruotsi" : a.kieli === "fi" ? "suomi" : a.kieli}.`);

    // Diagnoosit osa-alueittain
    const dxRyhma = (rivit, kohta) => {
      const per = {};
      for (const d of rivit) {
        const al = dxAlue(d.k);
        (per[al] ||= new Map());
        if (!per[al].has(d.k)) per[al].set(d.k, []);
        per[al].get(d.k).push(d);
      }
      for (const [al, m] of Object.entries(per))
        for (const [k, rr] of m) f(al, kohta, `${dxTeksti(k)} – ${lkm(paivat(rr).length, "käynti", "käyntiä")} (${paivat(rr).map(fmtPvm).join(", ")})`, rr[rr.length - 1].kontakti, rr[rr.length - 1].pvm);
    };
    dxRyhma(ctx.dxE, "lahto");
    dxRyhma(ctx.dxJ, "jalkeen");

    // Lääkitys
    if (v.o.laakkeet) {
      const l0 = [...laake.lahto.values()];
      f("terveys", "lahto", l0.length ? `Säännöllinen lääkitys (${l0.length}): ${l0.map((l) => l.aine).join(", ")}.` : "Ei säännöllistä lääkitystä.", l0[0]?.id);
      const l1 = [...laake.nyt.values()];
      f("terveys", "jalkeen", l1.length ? `Säännöllinen lääkitys nyt (${l1.length}): ${l1.map((l) => l.aine).join(", ")}.` : "Ei voimassa olevaa säännöllistä lääkitystä.", l1[0]?.id);
      const fridN = l1.filter((l) => FRID.test(l.atc));
      if (fridN.length) f("liikkuminen", "jalkeen", `Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: ${fridN.map((l) => l.aine).join(", ")}.`, fridN[0].id);
      const mood0 = l0.filter((l) => MIELIALALAAKE.test(l.atc)), mood1 = l1.filter((l) => MIELIALALAAKE.test(l.atc));
      if (mood0.length) f("mieliala", "lahto", `Mielialalääke käytössä: ${mood0.map((l) => l.aine).join(", ")}.`, mood0[0].id);
      if (mood1.length) f("mieliala", "jalkeen", `Mielialalääke käytössä: ${mood1.map((l) => l.aine).join(", ")}.`, mood1[0].id);
      const kipuL = v.laakkeet.filter((l) => KIPULAAKE.test(l.atc) && l.alku > ctx.L && l.alku <= ctx.viite);
      for (const l of kipuL) f("kipu", "jalkeen", `${l.aine} ${KAYTTOTAPA[l.tapa] || l.tapa} (${fmtPvm(l.alku)}).`, l.id, l.alku);
    }
    // Laboratorio
    if (v.o.lab) {
      for (const t of ainutlaatuiset(v.lab.map((l) => l.tutkimus))) {
        const s = v.lab.filter((l) => l.tutkimus === t);
        const e = s.filter((l) => l.pvm <= ctx.L).pop(), j = s.filter((l) => l.pvm > ctx.L && l.pvm <= ctx.viite).pop();
        if (e) f("terveys", "lahto", `${t} ${fmtNum(e.arvo)} ${e.yksikko} (${fmtPvm(e.pvm)}).`, e.id, e.pvm);
        if (j) f("terveys", "jalkeen", `${t} ${fmtNum(j.arvo)} ${j.yksikko} (${fmtPvm(j.pvm)}).`, j.id, j.pvm);
      }
    }
    // Palvelujen käyttö
    const kuv = (kk) => {
      const kiire = kk.filter((k) => k.kiire !== "E").length, eta = kk.filter((k) => k.tapa === "R52").length;
      return `${lkm(kk.length, "käynti", "käyntiä")} terveysasemalla (kiireellisiä ${kiire}${eta ? `, etäasiointeja ${eta}` : ""})`;
    };
    f("palvelut", "lahto", `${kuv(ctx.kaynnitE)} lähtötilannetta edeltäneen 12 kk:n aikana.`);
    f("palvelut", "jalkeen", `${kuv(ctx.kaynnitJ)} ${ctx.jaksoPv} vrk:n aikana lähtötilanteen jälkeen.`, ctx.kaynnitJ[ctx.kaynnitJ.length - 1]?.id);

    return R;
  }

  /* =====================================================================
   * 6. PÄÄFUNKTIO
   * ===================================================================== */
  function analysoi(asiakas, rooliId, tilanneId, viite = D.viitepaiva) {
    const o = oikeudet(rooliId, tilanneId);
    const v = rajaa(asiakas, o);
    const ctx = konteksti(v, viite);
    const lahteet = rakennaLahteet(v);
    const laake = laakemuutokset(ctx);
    const signaalit = [];
    for (const s of SAANNOT) {
      const h = s.aja(ctx, signaalit);
      if (!h) continue;
      // varmistetaan, että jokainen lähde on roolille näkyvä
      h.lahteet = h.lahteet.filter((l) => lahteet[l.id]);
      h.vastanaytto = h.vastanaytto.filter((l) => lahteet[l.id]);
      if (!h.lahteet.length) continue;
      signaalit.push({ saanto: s.id, alue: h.alue || s.alue, peruste: s.peruste, ...h, avain: `${asiakas.id}:${s.id}` });
    }
    signaalit.sort((x, y) => TASO[y.taso] - TASO[x.taso] || x.havaittu.localeCompare(y.havaittu));
    const tila = signaalit.some((s) => s.taso === "merkittava") ? "punainen" : signaalit.some((s) => s.taso === "seurattava") ? "keltainen" : signaalit.some((s) => s.taso === "myonteinen") ? "vihrea" : "neutraali";

    const kooste = alueKooste(ctx, laake);
    const tilanne = TILANTEET[tilanneId];
    const alueet = ALUEET.map((x) => ({
      ...x,
      olennainen: tilanne.alueet.includes(x.id),
      lahto: kooste[x.id].lahto,
      jalkeen: kooste[x.id].jalkeen,
      signaalit: signaalit.filter((s) => s.alue === x.id)
    }));

    const tarkistettavat = [];
    if (tila === "punainen") tarkistettavat.push("Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.");
    for (const s of signaalit) for (const q of s.tarkistettavat) if (!tarkistettavat.includes(q)) tarkistettavat.push(q);
    const ehdotukset = ainutlaatuiset(signaalit.flatMap((s) => s.ehdotukset));

    const era = lisaaKk(ctx.L, 6);
    return {
      asiakasId: asiakas.id, rooliId, tilanneId, viite, saantoversio: SAANTOVERSIO,
      oikeudet: o, nakyma: v, lahteet, tila, signaalit, alueet,
      tarkistettavat: tarkistettavat.slice(0, 8), ehdotukset,
      lahtoPvm: ctx.L, jaksoPv: ctx.jaksoPv,
      seuranta: { erapaiva: era, jaljella: erotusPv(era, viite) },
      tilasto: {
        kaynnit: ctx.kaynnitJ.length,
        kiireelliset: ctx.kaynnitJ.filter((k) => k.kiire !== "E").length,
        laakeAloitukset: laake.aloitetut.length,
        tietueet: Object.values(lahteet).filter((l) => l.pvm > ctx.L && l.pvm <= viite).length
      },
      tilannekuva: koonti(asiakas, ctx, signaalit, tila, o)
    };
  }

  function koonti(a, ctx, signaalit, tila, o) {
    const alku = `Lähtötilanne: ${pieni(a.lahto.palvelu)} myönnetty ${fmtPvm(ctx.L)} (${ctx.jaksoPv} vrk sitten). Sen jälkeen ${lkm(ctx.kaynnitJ.length, "terveysaseman käynti", "terveysaseman käyntiä")}${o.dx ? "" : " (diagnoosit eivät ole tämän käyttötarkoituksen tietoja)"}.`;
    const m = signaalit.filter((s) => s.taso === "merkittava"), s2 = signaalit.filter((s) => s.taso === "seurattava"), my = signaalit.filter((s) => s.taso === "myonteinen");
    const myTeksti = my.length ? ` Myönteiseen suuntaan: ${my.map((x) => pieni(x.otsikko)).join("; ")}.` : "";
    if (tila === "neutraali") return `${alku} Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.`;
    if (tila === "vihrea") return `${alku} Tiedoissa ei tunnistettu kielteisiä muutoksia.${myTeksti} Ammattilainen arvioi, vastaako havainto asiakkaan omaa kokemusta.`;
    const osat = [alku];
    if (m.length) osat.push(`Merkittäviä muutoksia tarkistettavaksi: ${m.map((x) => pieni(x.otsikko)).join("; ")}.`);
    if (s2.length) osat.push(`Seurattavia muutoksia: ${s2.map((x) => pieni(x.otsikko)).join("; ")}.`);
    if (my.length) osat.push(myTeksti.trim());
    const ep = signaalit.filter((x) => x.varmuus === "epävarma" || x.varmuus === "ristiriitainen");
    if (ep.length) osat.push(`Osa havainnoista on epävarmoja tai ristiriitaisia (${ep.map((x) => pieni(x.otsikko)).join("; ")}).`);
    osat.push("Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.");
    return osat.join(" ");
  }

  /* ---------- vastuullisuustarkistin: tuotos ei saa sisältää päätöksiä tai diagnooseja ---------- */
  const KIELLETYT = [
    { re: /\bdiagnoosi(ksi)? on\b|\bsairastaa\b|\bon todettu\b/i, syy: "Diagnoosiin viittaava ilmaus" },
    { re: /\bRAI[- ]?(pisteet|tulos|luokka) (on|ovat|nousee|laskee|muuttuu)\b/i, syy: "RAI-tuloksen muuttaminen" },
    { re: /\b(päätetään|on päätetty|myönnetään|evätään|lopetetaan palvelu)\b/i, syy: "Palvelu- tai hoitopäätös" },
    { re: /\b(aloita|lopeta|muuta) (lääke|lääkitys|annos)/i, syy: "Itsenäinen hoitotoimenpide" },
    { re: /\briskipisteet\b|\briskiluokka\b/i, syy: "Riskipisteytys" }
  ];
  const vastuullisuustarkistus = (t) => KIELLETYT.filter((k) => k.re.test(t)).map((k) => k.syy);

  window.RAIAgent = {
    analysoi, osiot, SAANNOT, ALUEET, ALUE, ROOLIT, TILANTEET, TASO, TASO_NIMI, SAANTOVERSIO,
    vastuullisuustarkistus, dxTeksti, dxAlue, FRID, MIELIALALAAKE, KIPULAAKE, YHTEYSTAPA, KIIRE, KAYTTOTAPA, SOS_LAJI, kkNimi,
    util: { fmtPvm, fmtNum, erotusPv, lisaaPv, lisaaKk, isoAlku }
  };
})();
