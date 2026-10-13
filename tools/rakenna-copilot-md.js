/*
 * RAI Muutosvahti – Copilot Studio -tietopohja Markdownina
 * Ajo projektin juuresta:  node tools/rakenna-copilot-md.js
 * Tulos: data/copilot-tietopohja.md (RAI-007-agentin tietolähde)
 *
 * Tietopohja muodostetaan sovelluksen omalla agentilla (js/agent.js), joten se vastaa
 * sovelluksen näkymiä. Jokaiselle asiakkaalle tehdään jokaisen roolin RAI-seuranta-arvion
 * näkymä roolin käyttöoikeuksilla. Otsikot ja rivit toistavat asiakkaan ja roolin, jotta
 * Copilot Studion haku löytää oikean kohdan yksittäisestäkin palasta.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const juuri = path.join(__dirname, "..");
global.window = global;
for (const f of ["js/data.js", "js/agent.js"]) {
  // eslint-disable-next-line no-eval
  (0, eval)(fs.readFileSync(path.join(juuri, f), "utf8"));
}
const A = window.RAIAgent, D = window.RAI_DATA;
const { fmtPvm } = A.util;

const TILANNE = "rai";
const ROOLI_GEN = { hoitaja: "sairaanhoitajan", laakari: "lääkärin", fysioterapeutti: "fysioterapeutin", sosiaalityontekija: "sosiaalityöntekijän" };
const ROOLI_LYHYT = { hoitaja: "Sairaanhoitaja", laakari: "Lääkäri", fysioterapeutti: "Fysioterapeutti", sosiaalityontekija: "Sosiaalityöntekijä" };
const ROOLIT = Object.keys(A.ROOLIT).filter((r) => A.ROOLIT[r].tilanteet.includes(TILANNE));
for (const r of ROOLIT) if (!ROOLI_GEN[r]) throw new Error(`Roolilta ${r} puuttuu nimi (ROOLI_GEN)`);

const TILA = { punainen: "▲ Merkittävä kielteinen muutos", keltainen: "◆ Seurattava muutos", vihrea: "↑ Merkittävä myönteinen muutos", neutraali: "= Ei muutoksia lähtötilanteeseen" };
const SYMBOLI = { merkittava: "▲", seurattava: "◆", myonteinen: "↑", tiedoksi: "ℹ" };
const OIKEUS = {
  kaynnit: ["Terveydenhuollon käynnit", (v) => (v === "koko" ? "kaikki tiedot" : "vain määrät ja kiireellisyys")],
  dx: ["Diagnoosit"], laakkeet: ["Lääkitys"], lab: ["Laboratoriotulokset"],
  muistiinpano: ["Käyntimuistiinpanot", (v) => (v === "koko" ? "koko teksti" : "vain toimintakykyosio")],
  sosTapahtumat: ["Sosiaalihuollon asiakkuus"], sosTekstit: ["Päätös- ja suunnitelmatekstit"],
  kotihoito: ["Kotihoidon käynnit ja suunniteltu palvelu"], lomakkeet: ["Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT)"]
};

const nimi = (a) => `Asiakas ${a.id.slice(-4)}`;
const sukupuoli = (s) => ({ MIES: "mies", NAINEN: "nainen" }[s] || s.toLowerCase());
const kieli = (k) => ({ fi: "suomi", sv: "ruotsi" }[k] || k);
const iso = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const yksiRivi = (s) => String(s ?? "").replace(/\s*\n+\s*/g, " ").replace(/\|/g, "/").trim();
const hoitosuhde = (r, a) => r !== "hoitaja" || a.lahto.palvelu === "Säännöllinen kotihoito";
const seurantaTeksti = (s) => (s.jaljella < 0 ? `myöhässä ${-s.jaljella} vrk` : `${s.jaljella} vrk jäljellä`);
const maarat = (an) => ({
  m: an.signaalit.filter((s) => s.taso === "merkittava").length,
  s: an.signaalit.filter((s) => s.taso === "seurattava").length,
  y: an.signaalit.filter((s) => s.taso === "myonteinen").length
});
const maaraTeksti = (q) => `${q.m} merkittävää, ${q.s} seurattavaa, ${q.y} myönteistä`;
const sallitut = (o) => Object.entries(OIKEUS).filter(([k]) => o[k]).map(([k, [n, f]]) => (f ? `${n} (${f(o[k])})` : n));
const kielletyt = (o) => Object.entries(OIKEUS).filter(([k]) => !o[k]).map(([, [n]]) => n);

const out = [];
const W = (s = "") => out.push(s);

const analyysit = new Map();
const analyysi = (a, r) => {
  const k = a.id + "|" + r;
  if (!analyysit.has(k)) analyysit.set(k, A.analysoi(a, r, TILANNE));
  return analyysit.get(k);
};

/* ---------- 1. Yleiset tiedot ---------- */
W("# RAI Muutosvahti – RAI-007-agentin tietopohja");
W();
W(`Tietopohja: ${D.asiakkaat.length} asiakasta, ${ROOLIT.length} roolia (${ROOLIT.map((r) => ROOLI_LYHYT[r].toLowerCase()).join(", ")}). Viitepäivä ("tänään") ${fmtPvm(D.viitepaiva)}. Aineistoversio ${D.versio}, sääntöversio ${A.SAANTOVERSIO}, muodostettu ${fmtPvm(new Date().toISOString())}.`);
W();
W("Kaikki tiedot ovat synteettisiä (LUVN / Veil.AI hackathon -aineisto). Henkilöt eivät ole oikeita. Aineistossa ei ole RAI-mittareita: lähtötilanteena on palvelutarpeen arviointi ja palvelupäätös. Tietopohja on RAI-arviointia edeltävä esitietokooste, ei RAI-arviointi, RAI-tulos, diagnoosi, riskiluokitus eikä hoito- tai palvelupäätös. Ammattilainen arvioi tietojen merkityksen ja päättää jatkotoimista.");
W();
W("## Tietopohjan rakenne");
W("1. Yleiset tiedot: roolit ja käyttöoikeudet, tilat, varmuus, RAI-osa-alueet, säännöt ja rakenteiset kyselyt.");
W("2. Asiakasyhteenveto: kaikkien asiakkaiden tila roolettain, tarkistamisjärjestys roolettain ja myöhässä olevat RAI-seuranta-arviot.");
W("3. Asiakkaat: perustiedot, lähtötilanne, RAI-seuranta-arvion ajankohta, hoitosuhteet ja jokaisen roolin RAI-seuranta-arvion näkymä.");
W();

W("## Roolit ja käyttöoikeudet");
W("Jokainen rooli näkee vain käyttötarkoitukseensa kuuluvat tiedot. Roolin näkymä perustuu vain roolin sallimiin tietoihin. Painotetut osa-alueet ovat roolin keskeisiä RAI-osa-alueita; RAI-seuranta-arvio kattaa silti kaikki osa-alueet.");
W();
for (const r of ROOLIT) {
  const R = A.ROOLIT[r];
  const o = { ...R.oikeudet };
  const painotus = (R.raiPainotus || A.ALUEET.map((x) => x.id)).map((id) => A.ALUE[id].nimi);
  W(`### Rooli: ${ROOLI_LYHYT[r]}`);
  W(`- Roolin nimi sovelluksessa: ${R.nimi} (${R.kuvaus}).`);
  W(`- Arviointitilanteet: ${R.tilanteet.map((t) => A.TILANTEET[t].nimi).join(", ")}. Tämä tietopohja sisältää roolin RAI-seuranta-arvion näkymän.`);
  W(`- Hoitosuhde: ${r === "hoitaja" ? "vain säännöllisen kotihoidon asiakkaat. Palveluasumisen asiakkaisiin sairaanhoitajalla ei ole hoitosuhdetta." : `kaikki ${D.asiakkaat.length} asiakasta.`}`);
  W(`- ${ROOLI_LYHYT[r]} näkee: ${sallitut(o).join("; ")}.`);
  W(`- ${ROOLI_LYHYT[r]} ei näe: ${kielletyt(o).length ? kielletyt(o).join("; ") : "–"}.`);
  W(`- ${iso(ROOLI_GEN[r])} painotetut RAI-osa-alueet: ${R.raiPainotus ? painotus.join(", ") : "kaikki osa-alueet (RAI-arvioija)"}.`);
  W();
}

W("## Tilat");
W("Tila kuvaa tarkistamisen tarvetta, ei asiakkaan riskiä tai palvelutarvetta.");
for (const t of Object.values(TILA)) W(`- ${t}`);
W("- ℹ Tiedoksi: esimerkiksi RAI-seuranta-arvion ajankohta.");
W();
W("## Varmuus");
W("- selvä: rakenteinen tieto (diagnoosikoodi, lääketietue, mittaus).");
W("- kohtalainen: tulkinta vaatii tarkistusta.");
W("- epävarma: yksittäinen tai tilapäinen tieto, tai tiedon puuttumiseen perustuva päätelmä.");
W("- ristiriitainen: tiedoissa on myös havaintoa vastaan puhuvaa tietoa (vastanäyttö).");
W();
W("## RAI-arvioinnin osa-alueet");
W(A.ALUEET.map((x, i) => `${i + 1}. ${x.nimi}`).join("\n"));
W();
W("## Säännöt");
W("Agentin säännöt vertaavat lähtötilannetta (palvelutarpeen arviointi ja palvelupäätös) sen jälkeen kertyneisiin tietoihin. Raja-arvot ovat demon sääntöjä, eivät kliinisiä tai virallisia RAI-rajoja.");
W();
for (const s of A.SAANNOT) {
  W(`### Sääntö ${s.id}: ${s.nimi}`);
  W(`- Osa-alue: ${A.ALUE[s.alue].nimi}. Suunta: ${s.suunta === "myonteinen" ? "myönteinen" : "kielteinen tai seurattava"}.`);
  W(`- Peruste: ${yksiRivi(s.peruste)}`);
  if (s.tiedot) W(`- Käytetyt tiedot: ${yksiRivi(s.tiedot)}`);
  if (s.rajoitteet) W(`- Rajoitteet: ${yksiRivi(s.rajoitteet)}`);
  W();
}
W("## Rakenteiset kyselyt");
W("Kyselyt täytetään asiakkaan kanssa. Agentti ei tulkitse pistemäärää. Kyselyt kuuluvat vain roolien, joilla on oikeus rakenteisiin kyselyihin, käyttöön (" + ROOLIT.filter((r) => A.ROOLIT[r].oikeudet.lomakkeet).map((r) => ROOLI_LYHYT[r].toLowerCase()).join(", ") + ").");
W();
for (const l of D.lomakkeet) {
  W(`### Kysely ${l.id}: ${l.nimi}`);
  W(`- Pistealue ${l.min}–${l.max}. ${yksiRivi(l.kuvaus)}`);
  if (l.ohje) W(`- Ohje: ${yksiRivi(l.ohje)}`);
  W(`- Kysymykset: ${l.kysymykset.map((q, i) => `(${i + 1}) ${yksiRivi(q.teksti)}`).join(" ")}`);
  W();
}

/* ---------- 2. Asiakasyhteenveto ---------- */
W("# Asiakasyhteenveto");
W();
W(`| Asiakas | Ikä, sukupuoli, palvelu, kunta | Lähtötilanne | RAI-seuranta-arvio | ${ROOLIT.map((r) => ROOLI_LYHYT[r]).join(" | ")} |`);
W(`|---|---|---|---|${ROOLIT.map(() => "---").join("|")}|`);
for (const a of D.asiakkaat) {
  const s = analyysi(a, "laakari").seuranta;
  const solut = ROOLIT.map((r) => {
    if (!hoitosuhde(r, a)) return "Ei hoitosuhdetta";
    const an = analyysi(a, r);
    return `${TILA[an.tila]} (${maaraTeksti(maarat(an))})`;
  });
  W(`| ${nimi(a)} | ${a.ika} v, ${sukupuoli(a.sukupuoli)}, ${a.lahto.palvelu}, ${a.kotikunta} | ${fmtPvm(a.lahto.pvm)} | ${seurantaTeksti(s)} (määräpäivä ${fmtPvm(s.erapaiva)}) | ${solut.join(" | ")} |`);
}
W();
W("## Tarkistamisjärjestys roolettain");
W("Järjestys: eniten merkittäviä kielteisiä muutoksia ensin, sitten seurattavia, sitten myönteisiä. Järjestys ei ole riskiluokitus.");
W();
for (const r of ROOLIT) {
  const rivit = D.asiakkaat.filter((a) => hoitosuhde(r, a)).map((a) => ({ a, an: analyysi(a, r), q: maarat(analyysi(a, r)) }))
    .sort((x, y) => y.q.m - x.q.m || y.q.s - x.q.s || y.q.y - x.q.y || nimi(x.a).localeCompare(nimi(y.a)));
  W(`### ${iso(ROOLI_GEN[r])} tarkistamisjärjestys (RAI-seuranta-arvio)`);
  rivit.forEach(({ a, an, q }, i) => W(`${i + 1}. ${nimi(a)}: ${TILA[an.tila]} – ${maaraTeksti(q)}${q.m ? `. Ensimmäisenä: ${an.signaalit[0].otsikko}` : ""}`));
  W();
}
W("## RAI-seuranta-arviot myöhässä");
const myohassa = D.asiakkaat.map((a) => ({ a, s: analyysi(a, "laakari").seuranta })).filter((x) => x.s.jaljella < 0).sort((x, y) => x.s.jaljella - y.s.jaljella);
if (!myohassa.length) W("Ei myöhässä olevia RAI-seuranta-arvioita.");
for (const { a, s } of myohassa) W(`- ${nimi(a)}: RAI-seuranta-arvio ${seurantaTeksti(s)} (määräpäivä ${fmtPvm(s.erapaiva)}, lähtötilanne ${fmtPvm(a.lahto.pvm)}).`);
W();

/* ---------- 3. Asiakkaat ---------- */
W("# Asiakkaat");
W();
for (const a of D.asiakkaat) {
  const nm = nimi(a);
  const L = a.lahto;
  const s = analyysi(a, "laakari").seuranta;
  W(`## ${nm}`);
  W();
  W(`**${nm} – perustiedot:** ${a.ika}-vuotias ${sukupuoli(a.sukupuoli)}, ${a.kotikunta}, asiointikieli ${kieli(a.kieli)}. Palvelu: ${L.palvelu}. Tunniste ${a.id} (synteettinen).`);
  W();
  W(`**${nm} – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös ${fmtPvm(L.pvm)}.${L.vireilletulo ? ` Vireille ${L.vireilletulo}.` : ""}${L.arviointijakso ? ` Arviointijakso ${L.arviointijakso}.` : ""}${L.voimassa ? ` Päätös voimassa ${L.voimassa}.` : ""} Tuen tarve: ${(L.tuenTarve || []).join("; ") || "–"}.${L.muisti ? ` Muistiin liittyvä tuen tarve: ${L.muisti.split(";")[0]}.` : ""}`);
  W();
  W(`**${nm} – RAI-seuranta-arvio:** ${seurantaTeksti(s)}, määräpäivä ${fmtPvm(s.erapaiva)} (6 kk lähtötilanteesta).`);
  W();
  W(`**${nm} – hoitosuhteet:** ${ROOLIT.map((r) => `${ROOLI_LYHYT[r].toLowerCase()} ${hoitosuhde(r, a) ? "kyllä" : "ei (palveluasumisen asiakas)"}`).join(", ")}.`);
  W();

  for (const r of ROOLIT) {
    const rn = `${ROOLI_GEN[r]} näkymä`;
    W(`### ${nm} – ${rn} (RAI-seuranta-arvio)`);
    W();
    if (!hoitosuhde(r, a)) {
      W(`${nm}: sairaanhoitajalla ei ole hoitosuhdetta tähän asiakkaaseen (palveluasumisen asiakas), joten sairaanhoitajan näkymää ei ole.`);
      W();
      continue;
    }
    const an = analyysi(a, r);
    const q = maarat(an);
    W(`**${nm}, ${rn} – tila:** ${TILA[an.tila]} (${maaraTeksti(q)}).`);
    W();
    W(`**${nm}, ${rn} – tilannekuva:** ${an.tilannekuva}`);
    W();
    const ei = kielletyt(an.oikeudet);
    if (ei.length) { W(`*${iso(ROOLI_GEN[r])} näkymässä ei ole: ${ei.join("; ")} (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*`); W(); }

    if (an.signaalit.length) {
      W(`#### ${nm}, ${rn} – havainnot`);
      W();
      for (const h of an.signaalit) {
        const lahde = (l) => { const x = an.lahteet[l.id]; return `${x ? fmtPvm(x.pvm) + ", " + x.jarj : l.id}: ${yksiRivi(l.ote)}`; };
        W(`- **${SYMBOLI[h.taso]} ${h.otsikko}** (${nm}, ${rn}). Taso: ${A.TASO_NIMI[h.taso]}. Osa-alue: ${A.ALUE[h.alue].nimi}. Havaittu ${fmtPvm(h.havaittu)}. Varmuus: ${h.varmuus}. Sääntö ${h.saanto}.`);
        W(`  - Mitä on mahdollisesti muuttunut: ${yksiRivi(h.mitaMuuttui)}`);
        if (h.perustelu) W(`  - Miksi tarkistaa: ${yksiRivi(h.perustelu)}`);
        W(`  - Lähteet: ${h.lahteet.map(lahde).join("; ")}`);
        if (h.vastanaytto.length) W(`  - Vastanäyttö: ${h.vastanaytto.map(lahde).join("; ")}`);
        if (h.tarkistettavat.length) W(`  - Tarkista: ${h.tarkistettavat.map(yksiRivi).join(" ")}`);
        const ehd = h.ehdotukset.map((e) => e.replace(/^lomake:/, "Rakenteinen kysely ")).filter((e) => an.oikeudet.lomakkeet || !/^Rakenteinen kysely/.test(e));
        if (ehd.length) W(`  - Ehdotetut jatkoaskeleet (ammattilainen päättää): ${ehd.join("; ")}`);
      }
      W();
    } else {
      W(`${nm}, ${rn}: ei sääntöjen mukaisia havaintoja.`);
      W();
    }

    W(`#### ${nm}, ${rn} – RAI-osa-alueet`);
    W();
    const jarj = [...an.alueet.filter((x) => x.olennainen), ...an.alueet.filter((x) => !x.olennainen)];
    for (const al of jarj) {
      const fakta = (f) => yksiRivi(f.teksti).replace(/\.+$/, "");
      const lahto = al.lahto.map(fakta).join("; ");
      const jalk = al.jalkeen.map(fakta).join("; ");
      const merkki = al.olennainen ? "painotettu" : "muu osa-alue";
      if (!lahto && !jalk) { W(`- ${al.nimi} (${nm}, ${ROOLI_LYHYT[r].toLowerCase()}, ${merkki}): ei tätä osa-aluetta kuvaavaa tietoa ${ROOLI_GEN[r]} näkymässä.`); continue; }
      W(`- ${al.nimi} (${nm}, ${ROOLI_LYHYT[r].toLowerCase()}, ${merkki}). Lähtötilanne ja sitä edeltävä vuosi: ${lahto || "ei kirjauksia"}. Lähtötilanteen jälkeen: ${jalk || "ei uusia kirjauksia"}.`);
    }
    W();
    if (an.tarkistettavat.length) {
      W(`#### ${nm}, ${rn} – valmistaudu kohtaamiseen`);
      W();
      for (const t of an.tarkistettavat) W(`- ${yksiRivi(t)}`);
      W();
    }
  }
}

const kohde = path.join(juuri, "data", "copilot-tietopohja.md");
fs.writeFileSync(kohde, out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n", "utf8");
console.log(`Kirjoitettu ${path.relative(juuri, kohde)} (${(fs.statSync(kohde).size / 1024).toFixed(0)} kt, ${D.asiakkaat.length} asiakasta, roolit: ${ROOLIT.join(", ")})`);
