/*
 * RAI Muutosvahti – käyttöliittymä
 *   Kirjautuminen  -> paikallinen käyttäjävarasto (salasanat suolattuina SHA-256-tiivisteinä)
 *   #/                Omat asiakkaat (koontinäkymä, hoitosuhteen mukaan)
 *   #/asiakas/:id     Esitietokooste RAI-osa-alueittain, rooli + arviointitilanne
 *   #/saannot         Agentin säännöt, virhehälytysten seuranta ja vinoumat
 *   #/tietoa          Käyttötarkoitus, luokittelu, käyttöoikeudet ja tietosuoja
 *   #/loki            Käyttöloki
 * Asiakasaineisto luetaan staattisesta synteettisestä tiedostosta (js/data.js).
 * Selaimen paikalliseen muistiin tallennetaan vain käyttäjät, ammattilaisen arviot ja loki.
 */
(function () {
  "use strict";

  const A = window.RAIAgent;
  const D = window.RAI_DATA;
  const { fmtPvm, fmtNum, erotusPv, lisaaKk } = A.util;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = $("#root");

  const COPILOT_URL =
    "https://copilotstudio.microsoft.com/environments/264bfa46-2de4-e3f7-a759-925d0f71914b/bots/kl_testiannahelpdesk_-QrDI8/webchat?__version__=2&enableFileAttachment=false&cliAgent=true";

  /* =====================================================================
   * PAIKALLINEN TALLENNUS (ei asiakasaineistoa)
   * ===================================================================== */
  const PREFIX = "raimv2:";
  const Varasto = {
    lue(k, oletus) { try { const v = localStorage.getItem(PREFIX + k); return v ? JSON.parse(v) : oletus; } catch { return oletus; } },
    kirjoita(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); return true; } catch { return false; } },
    poista(k) { try { localStorage.removeItem(PREFIX + k); } catch { /* ei tallennusta */ } },
    tyhjenna() {
      try { Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k)); } catch { /* ei tallennusta */ }
      try { Object.keys(sessionStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => sessionStorage.removeItem(k)); } catch { /* ei tallennusta */ }
    },
    koko() { try { return Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).reduce((n, k) => n + k.length + localStorage.getItem(k).length, 0) * 2; } catch { return 0; } }
  };
  const Istuntovarasto = {
    lue(k, o) { try { const v = sessionStorage.getItem(PREFIX + k); return v ? JSON.parse(v) : o; } catch { return o; } },
    kirjoita(k, v) { try { sessionStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch { /* ei tallennusta */ } }
  };

  /* =====================================================================
   * KÄYTTÄJÄT JA ISTUNTO
   * ===================================================================== */
  const DEMO_SALASANA = "Muutosvahti2026";
  const DEMO_KAYTTAJAT = [
    { tunnus: "sanna", nimi: "Sanna Sairaanhoitaja", rooli: "hoitaja", yksikko: "Kotihoito, Länsi-Uusimaa (demo)", hoitosuhde: "kotihoito" },
    { tunnus: "lauri", nimi: "Lauri Lääkäri", rooli: "laakari", yksikko: "Kotihoidon ja palveluasumisen lääkäripalvelut (demo)", hoitosuhde: "kaikki" },
    { tunnus: "outi", nimi: "Outi Ohjaaja", rooli: "ohjaaja", yksikko: "Ikääntyneiden asiakasohjaus (demo)", hoitosuhde: "kaikki" }
  ];
  const HOITOSUHDE = {
    kotihoito: { kuvaus: "Säännöllisen kotihoidon asiakkaat", ehto: (a) => a.lahto.palvelu === "Säännöllinen kotihoito" },
    kaikki: { kuvaus: "Kotihoidon ja ympärivuorokautisen palveluasumisen asiakkaat", ehto: () => true }
  };

  const satunnainen = () => {
    const b = new Uint8Array(16);
    crypto.getRandomValues(b);
    return [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };
  async function tiiviste(salasana, suola) {
    const data = new TextEncoder().encode(suola + ":" + salasana);
    if (!(window.crypto && crypto.subtle)) throw new Error("Selain ei tue SHA-256-tiivistettä (Web Crypto).");
    const h = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function alustaVarasto() {
    const nyk = Varasto.lue("kayttajat", null);
    if (nyk && nyk.length === DEMO_KAYTTAJAT.length && nyk.every((u) => DEMO_KAYTTAJAT.some((d) => d.tunnus === u.tunnus))) return;
    const lista = [];
    for (const u of DEMO_KAYTTAJAT) {
      const suola = satunnainen();
      lista.push({ ...u, suola, tiiviste: await tiiviste(DEMO_SALASANA, suola) });
    }
    Varasto.kirjoita("kayttajat", lista);
  }
  const Istunto = {
    lue() {
      const i = Istuntovarasto.lue("istunto", null) || Varasto.lue("istunto", null);
      return i && Date.now() < i.vanhenee ? i : null;
    },
    luo(tunnus, muista) {
      const i = { tunnus, alkoi: Date.now(), vanhenee: Date.now() + (muista ? 7 * 24 : 8) * 3600000 };
      if (muista) Varasto.kirjoita("istunto", i); else Istuntovarasto.kirjoita("istunto", i);
      return i;
    },
    lopeta() { Varasto.poista("istunto"); try { sessionStorage.removeItem(PREFIX + "istunto"); } catch { /* ei tallennusta */ } }
  };

  /* =====================================================================
   * TILA
   * ===================================================================== */
  const S = {
    kayttaja: null,
    tilanne: null,
    arviot: {},      // signaalikohtainen ammattilaisen arvio
    paatokset: {},   // asiakaskohtaiset jatkotoimet
    lomakkeet: {},   // rakenteiset arviot (PHQ-9, GAD-7, AUDIT)
    loki: [],
    analyysit: new Map(),
    suodatin: { haku: "", tila: "kaikki", palvelu: "kaikki", ind: "kaikki" },
    tl: "muutos",
    kv: { jakso: "kaikki", alue: "kaikki", kh: "kotikaynnit", mittari: null, laake: "kaikki", taulukko: false },
    asiakasId: null
  };
  const rooli = () => A.ROOLIT[S.kayttaja.rooli];

  function lataaTila() {
    S.arviot = Varasto.lue("arviot", {});
    S.paatokset = Varasto.lue("paatokset", {});
    S.lomakkeet = Varasto.lue("lomakkeet", {});
    S.loki = Varasto.lue("loki", []);
    const t = Istuntovarasto.lue("tilanne:" + S.kayttaja.tunnus, null);
    S.tilanne = rooli().tilanteet.includes(t) ? t : rooli().tilanteet[0];
    S.analyysit.clear();
  }
  const omatAsiakkaat = () => D.asiakkaat.filter((a) => HOITOSUHDE[S.kayttaja.hoitosuhde].ehto(a));
  const onHoitosuhde = (id) => omatAsiakkaat().some((a) => a.id === id);
  const asiakas = (id) => D.asiakkaat.find((a) => a.id === id);
  function analyysi(id, tilanne = S.tilanne) {
    const k = `${id}|${S.kayttaja.rooli}|${tilanne}`;
    if (!S.analyysit.has(k)) S.analyysit.set(k, A.analysoi(asiakas(id), S.kayttaja.rooli, tilanne));
    return S.analyysit.get(k);
  }
  const omatAnalyysit = () => omatAsiakkaat().map((a) => ({ a, an: analyysi(a.id) }));

  function lokiin(t) {
    S.loki.unshift({ aika: new Date().toISOString(), kuka: S.kayttaja?.nimi || "–", rooli: S.kayttaja ? rooli().nimi : "–", tilanne: S.tilanne ? A.TILANTEET[S.tilanne].nimi : "–", ...t });
    S.loki = S.loki.slice(0, 500);
    Varasto.kirjoita("loki", S.loki);
  }

  /* =====================================================================
   * APURIT
   * ===================================================================== */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nimikirjaimet = (n) => n.split(/\s+/).map((x) => x[0]).slice(0, 2).join("").toUpperCase();
  const opt = (v, t, cur) => `<option value="${esc(v)}"${String(v) === String(cur) ? " selected" : ""}>${esc(t)}</option>`;
  const nimi = (a) => `Asiakas ${a.id.slice(-4)}`;
  const tunnus = (a) => a.id.slice(-2);
  const sukupuoli = (s) => ({ MIES: "mies", NAINEN: "nainen" }[s] || s.toLowerCase());
  const kieli = (k) => ({ fi: "suomi", sv: "ruotsi" }[k] || k);
  const PALVELU_LYHYT = { "Säännöllinen kotihoito": "Kotihoito", "Ympärivuorokautinen palveluasuminen": "Palveluasuminen" };
  const TASO_TILA = { merkittava: "punainen", seurattava: "keltainen", myonteinen: "vihrea", tiedoksi: "info" };

  const IKONI = {
    punainen: '<svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 15 14.5H1z"/></svg>',
    keltainen: '<svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1 15 8 8 15 1 8z"/></svg>',
    vihrea: '<svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 14.5 8H10.5v6.5h-5V8H1.5z"/></svg>',
    neutraali: '<svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="4.5" width="12" height="2.6" rx="1.3"/><rect x="2" y="9" width="12" height="2.6" rx="1.3"/></svg>',
    info: '<svg class="status__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5"/></svg>'
  };
  const LYHYT = { punainen: "Kielteinen muutos", keltainen: "Seurattava muutos", vihrea: "Myönteinen muutos", neutraali: "Ei muutoksia", info: "Tiedoksi" };
  const PITKA = { punainen: "Merkittävä kielteinen muutos", keltainen: "Seurattava muutos", vihrea: "Merkittävä myönteinen muutos", neutraali: "Ei muutoksia lähtötilanteeseen", info: "Tiedoksi" };
  const status = (t, pitka = false, luokka = "", piilota = false) => `<span class="status status--${t} ${luokka}"${piilota ? ' aria-hidden="true"' : ""}>${IKONI[t]}${esc(pitka ? PITKA[t] : LYHYT[t])}</span>`;
  const VARMUUS = {
    "selvä": "Havainto perustuu rakenteiseen tietoon (esim. diagnoosikoodi, lääketietue).",
    "kohtalainen": "Havainto perustuu tietoon, jonka tulkinta vaatii tarkistusta.",
    "epävarma": "Havainto perustuu yksittäiseen tai tilapäiseksi kuvattuun tietoon – varmista ennen johtopäätöksiä.",
    "ristiriitainen": "Tiedoissa on myös havaintoa vastaan puhuvaa tietoa."
  };
  const varmuusChip = (v) => `<span class="chip${v === "epävarma" || v === "ristiriitainen" ? " chip--warn" : ""}" title="${esc(VARMUUS[v])}">Varmuus: ${esc(v)}</span>`;

  const SVG = {
    kello: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    logo: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8"/><path d="M5 18h6l3-8 4 13 3-7h6"/></svg>',
    lataa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>',
    roska: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    ulos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/></svg>',
    lukko: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    tahti: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>',
    teema: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor"/></svg>',
    lahde: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg>'
  };

  function toast(otsikko, teksti, taso = "") {
    const el = document.createElement("div");
    el.className = "toast" + (taso ? " toast--" + taso : "");
    el.innerHTML = `<strong>${esc(otsikko)}</strong>${esc(teksti)}`;
    $("#toasts").appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }

  const arvioitu = (s) => !!S.arviot[s.avain];

  /* ---------- indikaattorit (violetti): ajoitus ja työjono, eivät muutoksia ---------- */
  const IND_IKONI = {
    aika: '<svg class="ind__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><path d="M8 4.5V8l2.4 1.6"/></svg>',
    jono: '<svg class="ind__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="2.5" width="11" height="11" rx="2.5"/><path d="M5.2 8.2 7.2 10 10.8 6"/></svg>',
    palvelu: '<svg class="ind__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 7.5 8 3l5.5 4.5V13h-11z"/><path d="M6 10.5h4"/></svg>'
  };
  function indikaattorit(a, an) {
    const out = [];
    const j = an.seuranta.jaljella;
    if (j < 0) out.push({ id: "rai", ikoni: "aika", teksti: `RAI-arvio myöhässä ${-j} vrk`, tt: `RAI-seuranta-arvio olisi ollut ajankohtainen ${fmtPvm(an.seuranta.erapaiva)} (6 kk lähtötilanteesta ${fmtPvm(an.lahtoPvm)}). Aineistossa ei ole tietoa tehdyistä RAI-arvioinneista.` });
    else if (j <= 30) out.push({ id: "rai", ikoni: "aika", teksti: `RAI-arvio ${j} vrk:n päästä`, tt: `RAI-seuranta-arvio ajankohtainen ${fmtPvm(an.seuranta.erapaiva)}.` });
    const avoin = an.signaalit.filter((s) => (s.taso === "merkittava" || s.taso === "seurattava") && !arvioitu(s)).length;
    if (avoin) out.push({ id: "jono", ikoni: "jono", teksti: `${avoin} havaintoa arvioimatta`, tt: "Merkittäviä tai seurattavia havaintoja, joita ammattilainen ei ole vielä arvioinut." });
    const loppu = an.nakyma.sosTapahtumat.filter((s) => (s.laji === "palvelu") && s.loppu && s.loppu > an.lahtoPvm && s.loppu <= an.viite).pop();
    if (loppu) out.push({ id: "palvelu", ikoni: "palvelu", teksti: `${PALVELU_LYHYT[loppu.nimi] || loppu.nimi} päättynyt ${erotusPv(an.viite, loppu.loppu)} vrk sitten`, tt: `${loppu.nimi} päättyi ${fmtPvm(loppu.loppu)}.` });
    return out;
  }
  const indHtml = (lista) => (lista.length ? `<div class="inds">${lista.map((i) => `<span class="ind" data-tt="${esc(i.tt)}">${IND_IKONI[i.ikoni]}${esc(i.teksti)}</span>`).join("")}</div>` : "");
  function avoimetSignaalit() {
    const out = [];
    for (const { a, an } of omatAnalyysit())
      for (const s of an.signaalit) if ((s.taso === "merkittava" || s.taso === "seurattava") && !arvioitu(s)) out.push({ a, s });
    return out.sort((x, y) => A.TASO[y.s.taso] - A.TASO[x.s.taso] || y.s.havaittu.localeCompare(x.s.havaittu));
  }

  /* =====================================================================
   * TEEMA
   * ===================================================================== */
  // Kaksi tilaa: vaalea ja tumma. Ensimmäisellä kerralla lähtötila otetaan käyttöjärjestelmän asetuksesta.
  const TEEMAT = {
    light: { nimi: "Vaalea", seuraava: "dark", ikoni: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>' },
    dark: { nimi: "Tumma", seuraava: "light", ikoni: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/></svg>' }
  };
  const teemaTila = () => {
    const t = Varasto.lue("teema", null);
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  function asetaTeema(t) { document.documentElement.setAttribute("data-theme", t); }
  asetaTeema(teemaTila());
  const teemaNappi = (lisa = "") => {
    const t = TEEMAT[teemaTila()];
    return `<button class="themebtn${lisa}" type="button" data-teema aria-label="Teema: ${t.nimi}. Vaihda teemaksi ${TEEMAT[t.seuraava].nimi.toLowerCase()}." title="Teema: ${t.nimi} – vaihda">${t.ikoni}<span>${t.nimi}</span></button>`;
  };
  function vaihdaTeema() {
    const uusi = TEEMAT[teemaTila()].seuraava;
    Varasto.kirjoita("teema", uusi);
    asetaTeema(uusi);
    $$("[data-teema]").forEach((b) => { b.outerHTML = teemaNappi(b.classList.contains("themebtn--login") ? " themebtn--login" : ""); });
    sidoTeemaNapit();
    $("[data-teema]")?.focus();
  }
  function sidoTeemaNapit() { $$("[data-teema]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); vaihdaTeema(); })); }

  /* =====================================================================
   * KIRJAUTUMINEN
   * ===================================================================== */
  let epaonnistuneet = 0, lukittuAsti = 0;

  function nakymaKirjautuminen(virhe = "", tunnusArvo = "") {
    document.title = "Kirjaudu – RAI Muutosvahti";
    const kayttajat = Varasto.lue("kayttajat", []);
    root.innerHTML = `
      ${teemaNappi(" themebtn--login")}
      <div class="login">
        <section class="login__hero">
          <a class="login__brand" href="index.html" aria-label="RAI Muutosvahti – etusivulle">${SVG.logo}<span>RAI Muutosvahti</span></a>
          <div style="position:relative;z-index:1">
            <p class="eyebrow" style="color:var(--hero-ink-2)">Haaste 1.1 · Esitietojen koonti</p>
            <h1 class="login__title">Oikeat tiedot oikealle ammattilaiselle.</h1>
            <p class="login__lead">Muutosvahti kokoaa ikääntyneen asiakkaan esitiedot sosiaali- ja terveydenhuollon tiedoista valmiiksi RAI-arvioinnin osa-alueittain – roolisi ja arviointitilanteesi mukaan. Lähtötilanteeseen nähden mahdollisesti muuttuneet tiedot nostetaan tarkistettavaksi lähteineen.</p>
          </div>
          <div class="login__card">
            <p class="eyebrow">AI ei päätä. AI huomaa. Ammattilainen arvioi.</p>
            <ol class="login__steps">
              <li>Lähtötilanne</li><li>Uusi tieto eri järjestel&shy;mistä</li><li>Rooli&shy;kohtainen kooste</li><li>Havainto lähteineen</li><li>Ammattilaisen arvio</li>
            </ol>
          </div>
          <p class="login__foot">Synteettinen aineisto: LUVN / Veil.AI hackathon-data · SOTE AI Hackathon 2026</p>
        </section>
        <section class="login__formwrap">
          <div class="login__form">
            <h2>Kirjaudu sisään</h2>
            <p class="muted">Näet asiakkaat, joihin sinulla on hoito- tai asiakassuhde.</p>
            <form id="loginForm" novalidate>
              ${virhe ? `<div class="login__err" role="alert">${esc(virhe)}</div>` : ""}
              <label class="field">Käyttäjätunnus
                <input name="tunnus" id="lTunnus" value="${esc(tunnusArvo)}" autocomplete="username" required autocapitalize="off" spellcheck="false">
              </label>
              <label class="field">Salasana
                <input name="salasana" id="lSalasana" type="password" autocomplete="current-password" required>
              </label>
              <label class="check"><input type="checkbox" name="muista"> Muista minut tällä laitteella (7 vrk)</label>
              <button class="btn btn--primary btn--block" type="submit">Kirjaudu</button>
            </form>
            <div class="demo-users">
              <p>Demotunnukset (salasana <strong>${esc(DEMO_SALASANA)}</strong>):</p>
              ${kayttajat.map((u) => `
                <button class="demo-user" type="button" data-demo="${esc(u.tunnus)}">
                  <span class="avatar">${esc(nimikirjaimet(u.nimi))}</span>
                  <div><strong>${esc(u.nimi)}</strong><span>${esc(A.ROOLIT[u.rooli].nimi)} · tunnus ${esc(u.tunnus)}</span></div>
                </button>`).join("")}
            </div>
            <p class="local-note">${SVG.lukko}<span>Demo: tunnukset ja omat arviosi tallennetaan vain tämän selaimen paikalliseen muistiin, salasanat suolattuina SHA-256-tiivisteinä. Asiakastietoja ei tallenneta selaimeen. Tuotannossa kirjautuminen Entra ID:llä tai Suomi.fi-tunnistuksella.</span></p>
          </div>
        </section>
      </div>`;

    sidoTeemaNapit();
    $$("[data-demo]").forEach((b) => b.addEventListener("click", () => {
      $("#lTunnus").value = b.dataset.demo;
      $("#lSalasana").value = DEMO_SALASANA;
      $("#lSalasana").focus();
    }));
    $("#loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const tun = String(fd.get("tunnus") || "").trim().toLowerCase();
      if (Date.now() < lukittuAsti) return nakymaKirjautuminen(`Liian monta epäonnistunutta yritystä. Yritä uudelleen ${Math.ceil((lukittuAsti - Date.now()) / 1000)} sekunnin kuluttua.`, tun);
      const u = Varasto.lue("kayttajat", []).find((x) => x.tunnus === tun);
      let ok = false;
      try { ok = !!u && (await tiiviste(String(fd.get("salasana") || ""), u.suola)) === u.tiiviste; } catch (err) { return nakymaKirjautuminen(err.message, tun); }
      if (!ok) {
        if (++epaonnistuneet >= 5) { lukittuAsti = Date.now() + 30000; epaonnistuneet = 0; }
        return nakymaKirjautuminen("Käyttäjätunnus tai salasana on virheellinen.", tun);
      }
      epaonnistuneet = 0;
      Istunto.luo(u.tunnus, !!fd.get("muista"));
      kaynnistaSovellus(u);
      lokiin({ asiakas: "–", toimenpide: "Kirjautuminen" });
      toast(`Tervetuloa, ${u.nimi.split(" ")[0]}`, `Esitiedot on koottu valmiiksi ${omatAsiakkaat().length} asiakkaalle.`);
    });
    setTimeout(() => (tunnusArvo ? $("#lSalasana") : $("#lTunnus"))?.focus(), 30);
  }

  function kirjauduUlos() {
    lokiin({ asiakas: "–", toimenpide: "Uloskirjautuminen" });
    Istunto.lopeta();
    S.kayttaja = null;
    location.replace("index.html");
  }

  /* =====================================================================
   * SOVELLUSKEHYS
   * ===================================================================== */
  let kehysKuuntelijat = false;

  function kaynnistaSovellus(u) {
    S.kayttaja = u;
    lataaTila();
    root.innerHTML = `
      <header class="topbar">
        <div class="topbar__inner">
          <a class="brand" href="#/">${SVG.logo}<span>RAI Muutosvahti</span></a>
          <nav class="nav" aria-label="Päävalikko">
            <a href="#/" data-nav="koti">Omat asiakkaat</a>
            <a href="#/saannot" data-nav="saannot">Säännöt ja laatu</a>
            <a href="#/tietoa" data-nav="tietoa">Käyttötarkoitus</a>
            <a href="#/loki" data-nav="loki">Loki</a>
          </nav>
          <div class="topbar__right">
            ${teemaNappi()}
            <button class="iconbtn" id="bell" type="button" aria-haspopup="true" aria-expanded="false">${SVG.kello}<span class="badge" id="bellCount" hidden></span></button>
            <button class="userbtn" id="userBtn" type="button" aria-haspopup="true" aria-expanded="false">
              <span class="avatar">${esc(nimikirjaimet(u.nimi))}</span>
              <span class="userbtn__txt"><strong>${esc(u.nimi)}</strong>${esc(rooli().nimi)}</span>
            </button>
            <div class="popover" id="ilmoitukset" role="dialog" aria-label="Tarkistettavat muutokset" hidden></div>
            <div class="popover menu" id="menu" role="menu" hidden></div>
          </div>
        </div>
      </header>
      <main id="app" tabindex="-1"></main>
      <footer class="footer">RAI Muutosvahti · Esitietojen koonti ikääntyneiden palveluihin · Sääntöversio ${esc(A.SAANTOVERSIO)} · Synteettinen aineisto (LUVN / Veil.AI) · AI ei päätä – ammattilainen arvioi ja päättää.</footer>
      <button class="fab" id="fab" type="button" aria-expanded="false" aria-controls="chat">${SVG.chat}<span>Kysy avustajalta</span></button>
      <section class="chat" id="chat" role="dialog" aria-modal="false" aria-labelledby="chatTitle" aria-describedby="chatDesc" hidden>
        <div class="chat__head">
          <div><strong id="chatTitle">Muutosvahdin avustaja</strong><span class="sr" id="chatDesc">Tekoälyavustaja. Sulje Esc-näppäimellä.</span><span>Tekoälyavustaja · ei tee päätöksiä</span></div>
          <button type="button" id="chatClose" aria-label="Sulje">×</button>
        </div>
        <div class="chat__tabs seg" role="group" aria-label="Avustajan valinta">
          <button type="button" data-chattab="paikallinen" aria-pressed="true">Paikallinen avustaja</button>
          <button type="button" data-chattab="copilot" aria-pressed="false">Copilot Studio</button>
        </div>
        <div class="chat__body" id="chatLocal">
          <div class="chat__log" id="chatLog" aria-live="polite"></div>
          <div class="chat__chips" id="chatChips"></div>
          <form class="chat__form" id="chatForm"><input id="chatInput" autocomplete="off" placeholder="Kysy esim. ”mikä on muuttunut?”" aria-label="Kysymys"><button class="btn btn--primary btn--small" type="submit">Lähetä</button></form>
        </div>
        <div class="chat__body" id="chatCopilot" hidden>
          <p class="small muted chat__note">Copilot Studio -agentti vaatii verkkoyhteyden ja organisaation DLP-hyväksynnän upotukselle. Demo toimii ilman sitä paikallisella avustajalla.</p>
          <button class="btn btn--small" type="button" id="copilotLoad">Avaa Copilot Studio -agentti</button>
        </div>
      </section>
      <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
        <div class="modal__box"><div class="modal__head"><h2 id="modalTitle"></h2><button type="button" class="modal__close" id="modalClose" aria-label="Sulje">×</button></div><div class="modal__body" id="modalBody"></div></div>
      </div>`;

    sidoTeemaNapit();
    $("#bell").addEventListener("click", (e) => { e.stopPropagation(); const auki = $("#ilmoitukset").hidden; suljePopoverit(); $("#ilmoitukset").hidden = !auki; $("#bell").setAttribute("aria-expanded", String(auki)); });
    $("#userBtn").addEventListener("click", (e) => { e.stopPropagation(); const auki = $("#menu").hidden; suljePopoverit(); if (auki) piirraValikko(); $("#menu").hidden = !auki; $("#userBtn").setAttribute("aria-expanded", String(auki)); });
    $("#fab").addEventListener("click", () => avaaChat(!$("#chat").hidden ? false : true));
    $("#chatClose").addEventListener("click", () => avaaChat(false));
    $$("[data-chattab]").forEach((b) => b.addEventListener("click", () => {
      $$("[data-chattab]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $("#chatLocal").hidden = b.dataset.chattab !== "paikallinen";
      $("#chatCopilot").hidden = b.dataset.chattab !== "copilot";
    }));
    $("#copilotLoad").addEventListener("click", (e) => {
      e.target.insertAdjacentHTML("afterend", `<iframe src="${esc(COPILOT_URL)}" title="Copilot Studio -agentti"></iframe>`);
      e.target.remove();
      lokiin({ asiakas: "–", toimenpide: "Copilot Studio -agentti avattu" });
    });
    $("#chatForm").addEventListener("submit", (e) => { e.preventDefault(); const q = $("#chatInput").value.trim(); if (q) { $("#chatInput").value = ""; kysy(q); } });
    $("#modalClose").addEventListener("click", suljeModal);
    $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") suljeModal(); });

    if (!kehysKuuntelijat) {
      kehysKuuntelijat = true;
      document.addEventListener("click", (e) => { if (!e.target.closest(".popover")) suljePopoverit(); });
      document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        suljePopoverit();
        if ($("#modal") && !$("#modal").hidden) return suljeModal();
        if ($("#chat")) avaaChat(false);
      });
    }
    chatAloitus();
    reitti();
  }

  function suljePopoverit() {
    if (!$("#menu")) return;
    $("#ilmoitukset").hidden = true; $("#menu").hidden = true;
    $("#bell").setAttribute("aria-expanded", "false"); $("#userBtn").setAttribute("aria-expanded", "false");
  }

  function piirraValikko() {
    const u = S.kayttaja;
    const kt = Math.max(1, Math.round(Varasto.koko() / 1024));
    $("#menu").innerHTML = `
      <div class="menu__head"><span class="avatar">${esc(nimikirjaimet(u.nimi))}</span><div><strong>${esc(u.nimi)}</strong><span class="small muted">${esc(rooli().nimi)} · ${esc(u.yksikko)}</span></div></div>
      <button type="button" data-m="vie" role="menuitem">${SVG.lataa}Lataa omat arviot ja loki (JSON)</button>
      <button type="button" data-m="tyhjenna" role="menuitem">${SVG.roska}Tyhjennä paikallinen muisti</button>
      <hr>
      <button type="button" data-m="ulos" role="menuitem">${SVG.ulos}Kirjaudu ulos</button>
      <p class="menu__store">Selaimeen tallennettu ${kt} kt: tunnukset (tiivisteinä), ${Object.keys(S.arviot).length} havaintoarviota, ${Object.values(S.paatokset).flat().length} jatkotoimikirjausta, ${S.loki.length} lokimerkintää. Ei asiakastietoja.</p>`;
    $$("[data-m]", $("#menu")).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); valikko(b.dataset.m); }));
  }
  function valikko(m) {
    suljePopoverit();
    if (m === "ulos") return kirjauduUlos();
    if (m === "vie") {
      const blob = new Blob([JSON.stringify({ viety: new Date().toISOString(), kayttaja: S.kayttaja.tunnus, arviot: S.arviot, paatokset: S.paatokset, lomakkeet: S.lomakkeet, loki: S.loki }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const l = document.createElement("a");
      l.href = url; l.download = "rai-muutosvahti-arviot.json"; l.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      lokiin({ asiakas: "–", toimenpide: "Arviot ja loki ladattu" });
      return;
    }
    if (m === "tyhjenna") {
      if (!confirm("Tyhjennetäänkö kaikki tämän sovelluksen paikalliset tiedot (arviot, loki, tunnukset)? Sinut kirjataan ulos.")) return;
      Varasto.tyhjenna();
      S.kayttaja = null;
      history.replaceState(null, "", location.pathname);
      alustaVarasto().then(() => nakymaKirjautuminen());
    }
  }

  function paivitaYlapalkki() {
    const c = $("#bellCount");
    if (!c) return;
    const avoimet = avoimetSignaalit();
    c.hidden = avoimet.length === 0;
    c.textContent = avoimet.length;
    $("#bell").setAttribute("aria-label", `Tarkistettavat muutokset: ${avoimet.length}`);
    $("#ilmoitukset").innerHTML = `
      <h2>Tarkistamatta <span class="small muted">${avoimet.length} · ${esc(A.TILANTEET[S.tilanne].nimi)}</span></h2>
      ${avoimet.length === 0 ? '<p class="okbox">Kaikki havainnot on arvioitu.</p>' : ""}
      ${avoimet.slice(0, 30).map(({ a, s }) => `
        <a class="ilm" href="#/asiakas/${esc(a.id)}?s=${esc(s.saanto)}">
          <span class="ilm__top">${status(TASO_TILA[s.taso])}<span class="small muted">${fmtPvm(s.havaittu)}</span></span>
          <strong>${esc(nimi(a))}</strong> – ${esc(s.otsikko)}
        </a>`).join("")}`;
  }

  /* ---------- reititys ---------- */
  function reitti() {
    if (!S.kayttaja || !$("#app")) return;
    const app = $("#app");
    const h = location.hash.replace(/^#/, "") || "/";
    const [polku, kysely] = h.split("?");
    const params = new URLSearchParams(kysely || "");
    const osat = polku.split("/").filter(Boolean);
    $$(".nav a").forEach((a) => a.removeAttribute("aria-current"));
    const nav = (n) => $(`[data-nav="${n}"]`)?.setAttribute("aria-current", "page");
    S.asiakasId = null;
    if (osat[0] === "asiakas" && asiakas(osat[1])) {
      nav("koti");
      const t = params.get("t");
      if (t && rooli().tilanteet.includes(t) && t !== S.tilanne) vaihdaTilanne(t, false);
      nakymaAsiakas(app, osat[1], params.get("s"));
    } else if (osat[0] === "saannot") { nav("saannot"); document.title = "Säännöt ja laatu – RAI Muutosvahti"; nakymaSaannot(app); }
    else if (osat[0] === "tietoa") { nav("tietoa"); document.title = "Käyttötarkoitus ja tietosuoja – RAI Muutosvahti"; nakymaTietoa(app); }
    else if (osat[0] === "loki") { nav("loki"); document.title = "Käyttöloki – RAI Muutosvahti"; nakymaLoki(app); }
    else { nav("koti"); document.title = "Omat asiakkaat – RAI Muutosvahti"; nakymaKoti(app); }
    paivitaYlapalkki();
    paivitaChatChipit();
  }
  window.addEventListener("hashchange", () => {
    if (!S.kayttaja) return;
    reitti();
    window.scrollTo(0, 0);
    $("#app")?.focus({ preventScroll: true });
  });
  function vaihdaTilanne(t, piirra = true) {
    S.tilanne = t;
    Istuntovarasto.kirjoita("tilanne:" + S.kayttaja.tunnus, t);
    if (piirra) reitti();
  }

  /* =====================================================================
   * RAI-VÄLI: lähtötilanne → seuranta-arvio → tänään
   * ===================================================================== */
  function signaaliTasot(an) {
    const m = new Map();
    for (const s of an.signaalit) {
      if (s.taso === "tiedoksi") continue;
      const t = TASO_TILA[s.taso];
      const PRI = { punainen: 3, keltainen: 2, vihrea: 1 };
      for (const l of s.lahteet) if (!m.has(l.id) || PRI[t] > PRI[m.get(l.id)]) m.set(l.id, t);
    }
    return m;
  }
  function aikajanaTietueet(an) {
    // lääkerivien uusinnat suodatetaan: näytetään aineen ensimmäinen rivi ja havaintoihin liittyvät
    const tasot = signaaliTasot(an);
    const nahdyt = new Set();
    return Object.values(an.lahteet)
      .filter((l) => l.pvm && l.tyyppi !== "teksti")
      .sort((x, y) => x.pvm.localeCompare(y.pvm))
      .filter((l) => {
        if (l.tyyppi !== "laake") return true;
        const k = l.tieto.atc + l.tieto.tapa;
        const eka = !nahdyt.has(k); nahdyt.add(k);
        return eka || tasot.has(l.id);
      });
  }
  function raiVali(a, an, iso = false) {
    const alku = an.lahtoPvm;
    const era = an.seuranta.erapaiva;
    const tanaan = an.viite;
    const loppu = era > tanaan ? era : tanaan;
    const pituus = Math.max(1, erotusPv(loppu, alku));
    const kohta = (d) => Math.min(100, Math.max(0, (erotusPv(d, alku) / pituus) * 100));
    const taso = signaaliTasot(an);
    const tap = aikajanaTietueet(an).filter((l) => l.pvm > alku && l.pvm <= tanaan && l.tyyppi !== "kotihoito")
      .sort((x, y) => ({ punainen: 3, keltainen: 2, vihrea: 1 }[taso.get(x.id)] || 0) - ({ punainen: 3, keltainen: 2, vihrea: 1 }[taso.get(y.id)] || 0));
    // Päällekkäisyyden esto: merkki siirtyy janan alle omalle kaistalle, jos se osuisi
    // jo sijoitettuun merkkiin. Vakavimmat sijoitetaan ensin, jolloin ne jäävät janalle.
    const vali = iso ? 1.9 : 5, askel = iso ? 22 : 15;
    const kaistat = [];
    const sijoitus = new Map();
    for (const l of [...tap].reverse()) {
      const x = kohta(l.pvm);
      let k = kaistat.findIndex((kk) => kk.every((q) => Math.abs(q - x) >= vali));
      if (k < 0) { kaistat.push([]); k = kaistat.length - 1; }
      kaistat[k].push(x);
      sijoitus.set(l.id, k);
    }
    const lisakaistat = Math.max(0, kaistat.length - 1);
    const pisteet = tap.map((l) => `<span class="raibar__ev${taso.has(l.id) ? " raibar__ev--" + taso.get(l.id) : ""}${sijoitus.get(l.id) ? " raibar__ev--kaista" : ""}" style="left:${kohta(l.pvm).toFixed(2)}%${sijoitus.get(l.id) ? `;top:calc(50% + ${sijoitus.get(l.id) * askel}px);--nousu:${sijoitus.get(l.id) * askel}px` : ""}" data-tt="${esc(fmtPvm(l.pvm) + " · " + l.otsikko + (taso.has(l.id) ? " · " + PITKA[taso.get(l.id)].toLowerCase() : ""))}"${iso ? ` data-lahde="${esc(l.id)}" role="button" tabindex="0" aria-label="${esc(fmtPvm(l.pvm) + ": " + l.otsikko + (taso.has(l.id) ? ", " + PITKA[taso.get(l.id)].toLowerCase() : "") + ". Avaa lähde.")}"` : ""}></span>`).join("");
    const t = kohta(tanaan), e = kohta(era);
    const yli = an.seuranta.jaljella < 0;
    return `<div class="raibar${iso ? " raibar--lg" : ""}${yli ? " raibar--over" : ""}" role="${iso ? "group" : "img"}" aria-label="Lähtötilanne ${fmtPvm(alku)}, seuranta-arvio ${fmtPvm(era)}. Lähtötilanteen jälkeen ${tap.length} tietuetta.">
      <div class="raibar__track">
        <div class="raibar__fill" style="width:${t.toFixed(2)}%"></div>
        <span class="raibar__start"></span>
        <span class="raibar__due" style="left:${e.toFixed(2)}%" data-tt="RAI-seuranta-arvio 6 kk: ${esc(fmtPvm(era))}"></span>
        ${pisteet}
        <span class="raibar__today" style="left:${t.toFixed(2)}%"></span>
      </div>
      <div class="raibar__labels"${lisakaistat ? ` style="margin-top:calc(.55rem + ${lisakaistat * askel}px)"` : ""}>
        ${iso ? `<span class="raibar__todaylbl" style="left:${Math.min(94, Math.max(6, t)).toFixed(2)}%${lisakaistat ? `;top:calc(-3.1rem - ${lisakaistat * askel}px)` : ""}">Tänään ${fmtPvm(tanaan)}</span>` : ""}
        <span><strong>Lähtötilanne</strong> ${fmtPvm(alku)}</span>
        <span>${yli ? `<strong>Seuranta-arvio ajankohtainen</strong> (${fmtPvm(era)})` : `Seuranta-arvio ${fmtPvm(era)}`}</span>
      </div>
    </div>`;
  }

  /* =====================================================================
   * NÄKYMÄ: Omat asiakkaat
   * ===================================================================== */
  function tilanneValitsin(id = "tilanneSel") {
    const r = rooli();
    if (r.tilanteet.length < 2) return `<span class="ctx__val">${esc(A.TILANTEET[S.tilanne].nimi)}</span>`;
    return `<select id="${id}" class="ctx__select" aria-label="Arviointitilanne">${r.tilanteet.map((t) => opt(t, A.TILANTEET[t].nimi, S.tilanne)).join("")}</select>`;
  }

  function nakymaKoti(app) {
    const u = S.kayttaja;
    const rivit = omatAnalyysit();
    const lkm = { punainen: 0, keltainen: 0, vihrea: 0, neutraali: 0 };
    rivit.forEach(({ an }) => lkm[an.tila]++);
    const tietueet = rivit.reduce((n, { an }) => n + Object.keys(an.lahteet).length, 0);
    const avoimet = avoimetSignaalit().length;
    const kiireelliset = rivit.filter(({ an }) => an.tila === "punainen").sort(muutosJarjestys);
    const f = S.suodatin;
    const palvelut = [...new Set(rivit.map(({ a }) => a.lahto.palvelu))];
    const jarj = new Set(rivit.flatMap(({ an }) => Object.values(an.lahteet).map((l) => l.jarj.split(" · ")[0])));

    app.innerHTML = `
      <section class="hero">
        <div style="position:relative;z-index:1">
          <p class="eyebrow">Hei ${esc(u.nimi.split(" ")[0])} · ${esc(rooli().nimi)}</p>
          <h1>Esitiedot valmiina ennen kohtaamista</h1>
          <p class="hero__lead">Muutosvahti on koonnut asiakkaidesi esitiedot ${[...jarj].map((j) => ({ Terveydenhuolto: "terveydenhuollon", Sosiaalihuolto: "sosiaalihuollon" }[j] || j.toLowerCase())).join(" ja ")} tiedoista valmiiksi – vain ne tiedot, jotka ovat roolisi ja arviointitilanteen kannalta olennaisia ja sallittuja. Lähtötilanteeseen nähden mahdollisesti muuttuneet asiat on nostettu tarkistettavaksi.</p>
          <div class="ctx ctx--hero">
            <span class="ctx__lbl">Arviointitilanne</span>${tilanneValitsin()}
            <span class="ctx__desc">${esc(A.TILANTEET[S.tilanne].kuvaus)}</span>
          </div>
        </div>
        <div class="hero__viz">
          ${donitsi(lkm, rivit.length)}
          <ul class="legend">
            ${["punainen", "keltainen", "vihrea", "neutraali"].map((t) => `<li><button type="button" data-tila="${t}" aria-pressed="${f.tila === t}">${status(t, true)}<strong>${lkm[t]}</strong></button></li>`).join("")}
          </ul>
          <div class="hero__vizfoot">
            <span><strong>${tietueet}</strong> tietuetta koottu automaattisesti</span>
            <span><strong>${avoimet}</strong> havaintoa arvioimatta</span>
            <span class="hero__ind">${IND_IKONI.aika}<strong>${rivit.filter(({ an }) => an.seuranta.jaljella < 0).length}</strong> RAI-arviota myöhässä</span>
          </div>
          <p class="hero__note">Värit kuvaavat tarkistamisen tarvetta, eivät asiakkaan riskiä tai palvelutarvetta.</p>
        </div>
      </section>

      ${kiireelliset.length ? `
        <div class="section-title"><h2>Tarkista nämä ensin</h2><span class="muted small">Eniten merkittäviä kielteisiä muutoksia ensin</span></div>
        <div class="featured">${kiireelliset.map(({ a, an }) => asiakaskortti(a, an, true)).join("")}</div>` : ""}

      <div class="section-title" id="kaikki"><h2>Kaikki omat asiakkaat</h2><span class="muted small">${rivit.length} asiakasta · ${esc(HOITOSUHDE[u.hoitosuhde].kuvaus.toLowerCase())} · järjestys: ▲ merkittävät kielteiset, ◆ seurattavat, ↑ myönteiset</span></div>
      <div class="toolbar">
        <label class="field field--search">Hae<input type="search" id="fHaku" value="${esc(f.haku)}" placeholder="Asiakasnumero tai kunta" autocomplete="off"></label>
        <div class="field field--seg">Tarkistamisen tarve
          <div class="seg" role="group" aria-label="Tarkistamisen tarve">
            <button type="button" data-seg="kaikki" aria-pressed="${f.tila === "kaikki"}">Kaikki</button>
            ${["punainen", "keltainen", "vihrea", "neutraali"].map((t) => `<button type="button" data-seg="${t}" aria-pressed="${f.tila === t}"><span class="status status--${t}">${IKONI[t]}</span>${{ punainen: "Kielteinen", keltainen: "Seurattava", vihrea: "Myönteinen", neutraali: "Ei muutoksia" }[t]}</button>`).join("")}
          </div>
        </div>
        <label class="field">Palvelu<select id="fPalvelu">${opt("kaikki", "Kaikki palvelut", f.palvelu)}${palvelut.map((p) => opt(p, p, f.palvelu)).join("")}</select></label>
        <label class="field">Indikaattori<select id="fInd">${[["kaikki", "Kaikki"], ["rai", "RAI-arvio myöhässä tai lähestyy"], ["jono", "Havaintoja arvioimatta"], ["palvelu", "Palvelu päättynyt"]].map(([k, n]) => opt(k, n, f.ind)).join("")}</select></label>
      </div>
      <div class="cards" id="lista"></div>`;

    $("#tilanneSel")?.addEventListener("change", (e) => { vaihdaTilanne(e.target.value); lokiin({ asiakas: "–", toimenpide: "Arviointitilanne vaihdettu", kommentti: A.TILANTEET[e.target.value].nimi }); });
    $$("[data-tila]", app).forEach((b) => b.addEventListener("click", () => { f.tila = f.tila === b.dataset.tila ? "kaikki" : b.dataset.tila; nakymaKoti(app); $("#kaikki").scrollIntoView({ behavior: "smooth", block: "start" }); }));
    $$("[data-seg]", app).forEach((b) => b.addEventListener("click", () => { f.tila = b.dataset.seg; $$("[data-seg]", app).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); piirraLista(); }));
    $("#fHaku").addEventListener("input", (e) => { f.haku = e.target.value; piirraLista(); });
    $("#fPalvelu").addEventListener("change", (e) => { f.palvelu = e.target.value; piirraLista(); });
    $("#fInd").addEventListener("change", (e) => { f.ind = e.target.value; piirraLista(); });
    piirraLista();
  }

  function donitsi(lkm, yht) {
    const r = 62, C = 2 * Math.PI * r, rako = 3;
    const osat = ["punainen", "keltainen", "vihrea", "neutraali"].filter((t) => lkm[t] > 0);
    let siirto = 0;
    const kaaret = osat.map((t) => {
      const pit = (lkm[t] / Math.max(1, yht)) * C;
      const nakyva = Math.max(0.5, pit - (osat.length > 1 ? rako : 0));
      const s = `<circle class="seg seg--${t}" cx="80" cy="80" r="${r}" stroke-dasharray="${nakyva.toFixed(2)} ${(C - nakyva).toFixed(2)}" stroke-dashoffset="${(-siirto).toFixed(2)}" data-tt="${esc(PITKA[t])}: ${lkm[t]} asiakasta" data-tila="${t}"></circle>`;
      siirto += pit;
      return s;
    }).join("");
    return `<svg class="donut" viewBox="0 0 160 160" role="img" aria-label="${yht} asiakasta: ${lkm.punainen} merkittävä kielteinen muutos, ${lkm.keltainen} seurattava muutos, ${lkm.vihrea} merkittävä myönteinen muutos, ${lkm.neutraali} ei muutoksia.">
      <circle class="track" cx="80" cy="80" r="${r}"></circle>
      <g transform="rotate(-90 80 80)">${kaaret}</g>
      <text x="80" y="80" text-anchor="middle" font-size="36" font-weight="700">${lkm.punainen + lkm.keltainen}</text>
      <text x="80" y="100" text-anchor="middle" font-size="11" style="fill:var(--muted)">/ ${yht} tarkistettavaa</text>
    </svg>`;
  }

  function asiakaskortti(a, an, iso = false) {
    const sig = an.signaalit.filter((s) => s.taso !== "tiedoksi");
    const arv = sig.filter(arvioitu).length;
    const paa = sig[0];
    const chipit = sig.slice(iso ? 1 : 0, iso ? 4 : 3);
    return `<article class="ccard ccard--${an.tila}${iso ? " ccard--featured" : ""}">
      <div class="ccard__top">
        <span class="avatar avatar--${an.tila}">${esc(tunnus(a))}</span>
        <div class="ccard__name"><strong><a class="ccard__link" href="#/asiakas/${esc(a.id)}">${esc(nimi(a))}<span class="sr">, ${esc(PITKA[an.tila].toLowerCase())}</span></a></strong><span>${a.ika} v · ${esc(sukupuoli(a.sukupuoli))} · ${esc(a.kotikunta)} · ${esc(PALVELU_LYHYT[a.lahto.palvelu] || a.lahto.palvelu)}</span>${status(an.tila, false, "", true)}</div>
        ${maaraHtml(an)}
      </div>
      ${indHtml(indikaattorit(a, an))}
      ${iso && paa ? `<p class="ccard__lead"><strong>${esc(paa.otsikko)}.</strong> ${esc(paa.mitaMuuttui)}</p>` : ""}
      ${raiVali(a, an)}
      ${sig.length === 0 ? '<p class="ccard__lead small">Ei sääntöjen mukaan tarkistettavia muutoksia lähtötilanteeseen nähden.</p>' : chipit.length ? `<div class="ccard__chips">${chipit.map((s) => `<span class="chip"><span class="status status--${TASO_TILA[s.taso]}">${IKONI[TASO_TILA[s.taso]]}</span> ${esc(s.otsikko)}</span>`).join("")}</div>` : ""}
      <div class="ccard__foot"><span>${an.tilasto.tietueet} uutta tietuetta</span><span>${sig.length ? `${arv}/${sig.length} arvioitu` : "Ei arvioitavaa"}</span></div>
    </article>`;
  }

  // Muutosmäärät ja järjestys: eniten merkittäviä kielteisiä, sitten seurattavia, sitten myönteisiä
  const maarat = (an) => ({
    m: an.signaalit.filter((s) => s.taso === "merkittava").length,
    s: an.signaalit.filter((s) => s.taso === "seurattava").length,
    y: an.signaalit.filter((s) => s.taso === "myonteinen").length
  });
  const muutosJarjestys = (x, y) => { const a = maarat(x.an), b = maarat(y.an); return b.m - a.m || b.s - a.s || b.y - a.y || x.a.id.localeCompare(y.a.id); };
  function maaraHtml(an) {
    const n = maarat(an);
    const osa = (luokka, ikoni, arvo, nimi) => `<span class="ccount__i ccount__i--${luokka}${arvo ? "" : " ccount__i--nolla"}"><span class="status status--${luokka}">${IKONI[ikoni]}</span>${arvo}<span class="sr"> ${nimi}</span></span>`;
    return `<div class="ccount" title="Merkittävät kielteiset · seurattavat · myönteiset muutokset">${osa("punainen", "punainen", n.m, "merkittävää kielteistä muutosta")}${n.s ? osa("keltainen", "keltainen", n.s, "seurattavaa muutosta") : ""}${n.y ? osa("vihrea", "vihrea", n.y, "myönteistä muutosta") : ""}</div>`;
  }

  function piirraLista() {
    const f = S.suodatin;
    const q = f.haku.trim().toLowerCase();
    const rivit = omatAnalyysit()
      .filter(({ a, an }) => (f.tila === "kaikki" || an.tila === f.tila) && (f.palvelu === "kaikki" || a.lahto.palvelu === f.palvelu) && (f.ind === "kaikki" || indikaattorit(a, an).some((i) => i.id === f.ind)) && (!q || a.id.toLowerCase().includes(q) || a.kotikunta.toLowerCase().includes(q) || nimi(a).toLowerCase().includes(q)))
      .sort(muutosJarjestys);
    $("#lista").innerHTML = rivit.length ? rivit.map(({ a, an }) => asiakaskortti(a, an)).join("") : '<p class="empty">Ei hakua vastaavia asiakkaita.</p>';
  }

  /* =====================================================================
   * NÄKYMÄ: Asiakkaan esitietokooste
   * ===================================================================== */
  const OIKEUS_NIMI = [
    ["kaynnit", "Terveydenhuollon käynnit", (v) => (v === "koko" ? "kaikki tiedot" : v === "maarat" ? "vain määrät ja kiireellisyys" : "ei")],
    ["dx", "Diagnoosit"], ["laakkeet", "Lääkitys"], ["lab", "Laboratoriotulokset"],
    ["muistiinpano", "Käyntimuistiinpanot", (v) => (v === "koko" ? "koko teksti" : v === "toimintakyky" ? "vain toimintakykyosio" : "ei")],
    ["sosTapahtumat", "Sosiaalihuollon asiakkuus"], ["sosTekstit", "Päätös- ja suunnitelmatekstit"], ["kotihoito", "Kotihoidon käynnit ja suunnitelma"]
  ];

  function nakymaAsiakas(app, id, avaaSaanto) {
    const a = asiakas(id);
    if (!onHoitosuhde(id)) {
      lokiin({ asiakas: nimi(a), toimenpide: "Pääsy estetty", kommentti: "Ei hoito- tai asiakassuhdetta" });
      document.title = "Ei käyttöoikeutta – RAI Muutosvahti";
      app.innerHTML = `<a class="back" href="#/">← Omat asiakkaat</a>
        <section class="card denied">${SVG.lukko}<div><h1>Ei käyttöoikeutta</h1>
        <p>Sinulla ei ole hoito- tai asiakassuhdetta asiakkaaseen ${esc(nimi(a))}. Käyttöoikeudet perustuvat hoitosuhteeseen (${esc(HOITOSUHDE[S.kayttaja.hoitosuhde].kuvaus.toLowerCase())}).</p>
        <p class="small muted">Yritys on kirjattu käyttölokiin.</p></div></section>`;
      return;
    }
    S.asiakasId = id;
    const an = analyysi(id);
    const v = an.nakyma;
    document.title = `${nimi(a)} – RAI Muutosvahti`;
    if (Istuntovarasto.lue("viimeksiAvattu", null) !== id + S.tilanne) {
      lokiin({ asiakas: nimi(a), toimenpide: "Esitietokooste avattu" });
      Istuntovarasto.kirjoita("viimeksiAvattu", id + S.tilanne);
    }
    const olennaiset = an.alueet.filter((x) => x.olennainen);
    const muut = an.alueet.filter((x) => !x.olennainen);
    const jarjestelmat = jarjestelmaKooste(an);
    const tarkistus = A.vastuullisuustarkistus(an.tilannekuva + " " + an.signaalit.map((s) => s.mitaMuuttui).join(" "));

    app.innerHTML = `
      <a class="back" href="#/">← Omat asiakkaat</a>
      <section class="card">
        <div class="chead">
          <span class="avatar avatar--lg avatar--${an.tila}">${esc(tunnus(a))}</span>
          <div class="chead__name">
            <h1>${esc(nimi(a))}</h1>
            <div class="chead__meta"><span>${a.ika} v</span><span>${esc(sukupuoli(a.sukupuoli))}</span><span>${esc(a.kotikunta)}</span><span>Asiointikieli: ${esc(kieli(a.kieli))}</span><span>${esc(a.lahto.palvelu)}</span><span class="muted">${esc(a.id)}</span></div>
          </div>
          <div class="chead__status">${status(an.tila, true, "pill")}${indHtml(indikaattorit(a, an))}</div>
        </div>
        <div class="ctx">
          <span class="ctx__lbl">Rooli</span><span class="ctx__val">${esc(rooli().nimi)}</span>
          <span class="ctx__lbl">Arviointitilanne</span>${tilanneValitsin("tilanneSelA")}
          <details class="ctx__rights"><summary>Mitä tietoja näytetään?</summary>
            <p class="small muted">${esc(A.TILANTEET[S.tilanne].kuvaus)} Agentti käsittelee vain alla sallittuja tietoja (käyttötarkoitussidonnaisuus).</p>
            <ul class="rights">${OIKEUS_NIMI.map(([k, n, f]) => { const val = an.oikeudet[k]; const ok = !!val; return `<li class="${ok ? "ok" : "no"}"><span aria-hidden="true">${ok ? "✓" : "–"}</span>${esc(n)}${f ? `: ${esc(f(val))}` : ok ? "" : ": ei tämän käyttötarkoituksen tieto"}</li>`; }).join("")}</ul>
          </details>
        </div>
        <div class="watch">
          <h2>Lähtötilanteesta tähän päivään</h2>
          <p class="small muted">Lähtötilanteena on palvelutarpeen arviointi ja palvelupäätös ${fmtPvm(an.lahtoPvm)} (aineistossa ei ole RAI-mittareita). Pisteet ovat lähtötilanteen jälkeen kertyneitä tietueita – värilliset liittyvät havaintoihin. Valitse piste avataksesi lähteen.</p>
          ${raiVali(a, an, true)}
          <div class="raikey"><span><i></i>Tietue</span><span><i class="o"></i>Seurattava muutos</span><span><i class="r"></i>Merkittävä kielteinen muutos</span><span><i class="g"></i>Merkittävä myönteinen muutos</span><span><i class="d"></i>Seuranta-arvio 6 kk</span><span><i class="t"></i>Tänään</span></div>
        </div>
      </section>

      <div class="layout">
        <div>
          <section class="card">
            <div class="insight">
              <span class="insight__icon">${SVG.tahti}</span>
              <div>
                <h2>Tilannekuva <span class="ai-badge" title="Sääntöpohjaisen agentin tuottama kooste">Tekoälyn kooste</span></h2>
                <p>${esc(an.tilannekuva)}</p>
                <p class="small muted" style="margin-top:.6rem">Koottu automaattisesti ${Object.keys(an.lahteet).length} tietueesta ${jarjestelmat.length} lähdejärjestelmästä ilman erillisiä hakuja. ${tarkistus.length ? `<strong>Vastuullisuustarkistus: ${esc(tarkistus.join(", "))}</strong>` : "Vastuullisuustarkistus: ei diagnoosi-, päätös- tai pisteytysilmaisuja."}</p>
              </div>
            </div>
          </section>

          <div class="section-title"><h2>Esitietokooste RAI-osa-alueittain</h2><span class="muted small">Kiinteä RAI-järjestys – ei tekoälyn tärkeysjärjestystä</span></div>
          ${olennaiset.map((al) => alueKortti(a, an, al, avaaSaanto)).join("")}
          ${muut.length ? `<details class="card more-domains"><summary><strong>Muut osa-alueet (${muut.length})</strong> <span class="small muted">– eivät ole tämän arviointitilanteen kannalta keskeisiä</span></summary>${muut.map((al) => alueKortti(a, an, al, avaaSaanto)).join("")}</details>` : ""}

          <section class="card" id="kaaviot">
            <div class="card__head"><h2>Kehitys kaavioina</h2><span class="small muted">Vain tämän roolin ja tilanteen sallimat tiedot</span></div>
            <div class="vizfilters" role="group" aria-label="Kaavioiden suodattimet">
              <div class="field field--seg">Aikaväli
                <div class="seg">${[["kaikki", "12 kk ennen + jälkeen"], ["jalkeen", "Lähtötilanteen jälkeen"]].map(([k, t]) => `<button type="button" data-kvjakso="${k}" aria-pressed="${S.kv.jakso === k}">${t}</button>`).join("")}</div>
              </div>
              <label class="check vizfilters__table"><input type="checkbox" id="kvTaulukko"${S.kv.taulukko ? " checked" : ""}> Näytä taulukkona</label>
            </div>
            <div class="vizgrid" id="vizgrid"></div>
          </section>

          <section class="card">
            <div class="card__head">
              <h2>Aikajana</h2>
              <div class="seg" role="group" aria-label="Näytä">
                ${[["muutos", "Havaintoihin liittyvät"], ["jalkeen", "Lähtötilanteen jälkeen"], ["kaikki", "Kaikki (myös 12 kk ennen)"]].map(([k, t]) => `<button type="button" data-tl="${k}" aria-pressed="${S.tl === k}">${t}</button>`).join("")}
              </div>
            </div>
            <ol class="timeline" id="timeline"></ol>
          </section>
        </div>

        <aside class="aside">
          <section class="card">
            <h2>Valmistaudu kohtaamiseen</h2>
            <p class="small muted">Tarkistettavat asiat havaintojen perusteella.</p>
            ${an.tarkistettavat.length ? `<ol class="questions">${an.tarkistettavat.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>` : `<p class="small">Ei erityisiä tarkistettavia asioita. Seuranta-arvio ${fmtPvm(an.seuranta.erapaiva)}.</p>`}
          </section>

          <section class="card">
            <h2>Ehdotetut jatkoaskeleet</h2>
            <p class="small muted">Ehdotuksia – ammattilainen päättää, tarvitaanko niitä.</p>
            ${ehdotuksetHtml(a, an)}
          </section>

          ${paatosHtml(a, an)}

          <section class="card">
            <h2>Lähdejärjestelmät</h2>
            <p class="small muted">Yhteydet on demossa mallinnettu synteettisellä aineistolla.</p>
            <ul class="systems">${jarjestelmat.map((j) => `<li><strong>${esc(j.nimi)}</strong><span>${esc(j.kuvaus)}</span></li>`).join("")}</ul>
          </section>
        </aside>
      </div>`;

    $("#tilanneSelA")?.addEventListener("change", (e) => {
      vaihdaTilanne(e.target.value, false);
      lokiin({ asiakas: nimi(a), toimenpide: "Arviointitilanne vaihdettu", kommentti: A.TILANTEET[e.target.value].nimi });
      history.replaceState(null, "", `#/asiakas/${id}`);
      reitti();
    });
    piirraAikajana(an);
    piirraKaaviot(an);
    $$("[data-kvjakso]", app).forEach((b) => b.addEventListener("click", () => { S.kv.jakso = b.dataset.kvjakso; $$("[data-kvjakso]", app).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); piirraKaaviot(an); }));
    $("#kvTaulukko").addEventListener("change", (e) => { S.kv.taulukko = e.target.checked; piirraKaaviot(an); });
    $$("[data-tl]", app).forEach((b) => b.addEventListener("click", () => { S.tl = b.dataset.tl; $$("[data-tl]", app).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); piirraAikajana(an); }));
    sidoLahdelinkit(app, a, an);

    $$("form[data-arvio]", app).forEach((form) => form.addEventListener("submit", (e) => {
      e.preventDefault();
      const s = an.signaalit.find((x) => x.avain === form.dataset.arvio);
      const fd = new FormData(form);
      if (!fd.get("tulos")) return toast("Valitse arvio", "Pitääkö havainto paikkansa?");
      S.arviot[s.avain] = { tulos: fd.get("tulos"), kommentti: String(fd.get("kommentti") || "").trim(), aika: new Date().toISOString(), kuka: S.kayttaja.nimi, rooli: rooli().nimi, tilanne: A.TILANTEET[S.tilanne].nimi, saanto: s.saanto };
      Varasto.kirjoita("arviot", S.arviot);
      lokiin({ asiakas: nimi(a), toimenpide: "Havainto arvioitu", kommentti: `${s.otsikko}: ${ARVIO_NIMI[fd.get("tulos")]}` });
      toast("Arvio tallennettu", `${s.otsikko}: ${ARVIO_NIMI[fd.get("tulos")]}`);
      nakymaAsiakas(app, id, s.saanto);
      paivitaYlapalkki();
    }));
    $$("[data-peru]", app).forEach((b) => b.addEventListener("click", () => {
      delete S.arviot[b.dataset.peru];
      Varasto.kirjoita("arviot", S.arviot);
      nakymaAsiakas(app, id, b.dataset.saanto);
      paivitaYlapalkki();
    }));
    $("#paatosForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const toimet = fd.getAll("toimi");
      if (!toimet.length) return toast("Valitse jatkotoimi", "Valitse vähintään yksi vaihtoehto.");
      (S.paatokset[id] ||= []).unshift({ toimet, kommentti: String(fd.get("kommentti") || "").trim(), aika: new Date().toISOString(), kuka: S.kayttaja.nimi, rooli: rooli().nimi, tilanne: A.TILANTEET[S.tilanne].nimi });
      Varasto.kirjoita("paatokset", S.paatokset);
      lokiin({ asiakas: nimi(a), toimenpide: "Jatkotoimet kirjattu", kommentti: toimet.join("; ") });
      toast("Jatkotoimet kirjattu", toimet.join("; "));
      nakymaAsiakas(app, id);
    });
    $$("[data-lomake]", app).forEach((b) => b.addEventListener("click", () => avaaLomake(a, b.dataset.lomake)));

    if (avaaSaanto) {
      const el = app.querySelector(`details[data-saanto="${CSS.escape(avaaSaanto)}"]`);
      if (el) { el.open = true; el.closest("details.more-domains")?.setAttribute("open", ""); setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }
    }
  }

  function jarjestelmaKooste(an) {
    const ryh = {};
    for (const l of Object.values(an.lahteet)) {
      const [j, osa] = l.jarj.split(" · ");
      (ryh[j] ||= {});
      ryh[j][osa] = (ryh[j][osa] || 0) + 1;
    }
    const NIMI = { Terveydenhuolto: "Terveydenhuollon potilastiedot", Sosiaalihuolto: "Sosiaalihuollon asiakastiedot" };
    const out = Object.entries(ryh).map(([j, osat]) => ({ nimi: NIMI[j] || j, kuvaus: Object.entries(osat).map(([o, n]) => `${o} ${n}`).join(" · ") }));
    if (an.oikeudet.lomakkeet) out.push({ nimi: "Esitieto- ja arviointilomakkeet", kuvaus: `${D.lomakkeet.map((l) => l.id).join(", ")} – täytettävissä` });
    return out;
  }

  /* ---------- osa-aluekortti ---------- */
  function alueKortti(a, an, al, avaaSaanto) {
    const sig = al.signaalit;
    const t = sig.some((s) => s.taso === "merkittava") ? "punainen" : sig.some((s) => s.taso === "seurattava") ? "keltainen" : sig.some((s) => s.taso === "myonteinen") ? "vihrea" : sig.length ? "info" : null;
    const tyhja = !al.lahto.length && !al.jalkeen.length && !sig.length;
    const lomakkeet = (S.lomakkeet[a.id] || []).filter((l) => (l.id === "AUDIT" ? al.id === "terveys" : al.id === "mieliala"));
    const fakta = (f) => `<li>${esc(f.teksti)}${f.id && an.lahteet[f.id] ? ` <button type="button" class="srcbtn" data-lahde="${esc(f.id)}" aria-label="Avaa lähde">${SVG.lahde}lähde</button>` : ""}</li>`;
    const merkki = t ? status(t, false) : tyhja ? '<span class="chip">Ei tietoa aineistossa</span>' : '<span class="status status--neutraali">' + IKONI.neutraali + "Ei muutoksia</span>";
    return `<section class="card domain${t ? " domain--" + t : ""}" id="alue-${esc(al.id)}">
      <div class="domain__head"><h3>${esc(al.nimi)}</h3>${merkki}</div>
      ${tyhja ? `<p class="small muted">Käytettävissä olevissa tiedoissa ei ole tätä osa-aluetta kuvaavaa tietoa${al.id === "ravitsemus" ? " (esim. paino tai ruokahalu)" : ""}. Tarkista tarvittaessa asiakkaan kanssa.</p>` : `
      <div class="domain__cols">
        <div><p class="label">Lähtötilanne (${fmtPvm(an.lahtoPvm)} ja sitä edeltävä vuosi)</p>${al.lahto.length ? `<ul class="facts">${al.lahto.map(fakta).join("")}</ul>` : '<p class="small muted">Ei kirjauksia.</p>'}</div>
        <div><p class="label">Lähtötilanteen jälkeen</p>${al.jalkeen.length || lomakkeet.length ? `<ul class="facts">${al.jalkeen.map(fakta).join("")}${lomakkeet.map((l) => `<li class="facts__own">Ammattilaisen kirjaama ${esc(l.id)}: <strong>${l.pisteet} / ${l.max}</strong> (${fmtPvm(l.aika.slice(0, 10))}, ${esc(l.kuka)})</li>`).join("")}</ul>` : '<p class="small muted">Ei uusia kirjauksia.</p>'}</div>
      </div>`}
      ${sig.map((s) => signaaliHtml(s, an, s.saanto === avaaSaanto)).join("")}
    </section>`;
  }

  const ARVIO_NIMI = { oikea: "Pitää paikkansa", virhe: "Ei pidä paikkaansa (virhehälytys)", epavarma: "Epäselvä – selvitetään" };

  function signaaliHtml(s, an, auki) {
    const k = S.arviot[s.avain];
    const info = s.taso === "tiedoksi";
    const t = TASO_TILA[s.taso];
    const lahde = (l) => {
      const L = an.lahteet[l.id];
      return `<li><span class="src__meta">${fmtPvm(L.pvm)} · ${esc(L.jarj)}</span>${esc(l.ote)} <button type="button" data-lahde="${esc(l.id)}">avaa lähde</button></li>`;
    };
    return `<details class="signal signal--${t}" data-saanto="${esc(s.saanto)}"${auki ? " open" : ""}>
      <summary>
        <span class="signal__title">${esc(s.otsikko)}</span>
        <svg class="signal__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        <span class="signal__sub">${status(t)}<span>· havaittu ${fmtPvm(s.havaittu)}</span>${info ? "" : varmuusChip(s.varmuus)}${k ? `<span class="chip">✔ ${esc(ARVIO_NIMI[k.tulos])}</span>` : ""}</span>
      </summary>
      <div class="signal__body">
        <p class="label">Mitä on mahdollisesti muuttunut</p><p>${esc(s.mitaMuuttui)}</p>
        <p class="label">Miksi tarkistaa</p><p>${esc(s.perustelu)}</p>
        <p class="label">Mihin havainto perustuu</p>
        <ul class="src">${s.lahteet.map(lahde).join("")}</ul>
        ${s.vastanaytto.length ? `<p class="label">Huomioi myös (vastanäyttö)</p><ul class="src">${s.vastanaytto.map(lahde).join("")}</ul>` : ""}
        <details class="rule"><summary>Sääntö ${esc(s.saanto)}</summary><p class="small">${esc(s.peruste)}</p></details>
        ${s.tarkistettavat.length ? `<p class="label">Tarkista</p><ul>${s.tarkistettavat.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}
        ${info ? "" : `<div class="ack">${k
          ? `<div class="ack__done">✔ <strong>${esc(ARVIO_NIMI[k.tulos])}</strong> – ${esc(k.kuka)} (${esc(k.rooli)}), ${new Date(k.aika).toLocaleString("fi-FI")}${k.kommentti ? `<br>”${esc(k.kommentti)}”` : ""}<br><button class="btn btn--small" type="button" data-peru="${esc(s.avain)}" data-saanto="${esc(s.saanto)}" style="margin-top:.45rem">Muuta arviota</button></div>`
          : `<form data-arvio="${esc(s.avain)}">
              <fieldset class="radios"><legend class="label">Oma arviosi havainnosta: ${esc(s.otsikko)}</legend>${Object.entries(ARVIO_NIMI).map(([v, n]) => `<label class="check"><input type="radio" name="tulos" value="${v}"> ${esc(n)}</label>`).join("")}</fieldset>
              <label class="field" style="margin:.5rem 0">Kommentti (valinnainen)<input name="kommentti" maxlength="300" autocomplete="off"></label>
              <button class="btn btn--primary btn--small" type="submit">Tallenna arvio</button>
            </form>`}</div>`}
      </div>
    </details>`;
  }

  /* ---------- ehdotukset ja rakenteiset lomakkeet ---------- */
  function ehdotuksetHtml(a, an) {
    const lomakeIdt = an.ehdotukset.filter((e) => e.startsWith("lomake:")).map((e) => e.slice(7));
    const muut = an.ehdotukset.filter((e) => !e.startsWith("lomake:"));
    const tehty = S.lomakkeet[a.id] || [];
    let html = "";
    if (muut.length) html += `<ul class="nextsteps">${muut.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>`;
    if (an.oikeudet.lomakkeet) {
      if (lomakeIdt.length) html += `<p class="label">Ehdotetut rakenteiset arvioinnit</p><div class="btnrow">${lomakeIdt.map((id) => `<button class="btn btn--small btn--primary" type="button" data-lomake="${esc(id)}">Täytä ${esc(id)}</button>`).join("")}</div>`;
      const muutL = D.lomakkeet.filter((l) => !lomakeIdt.includes(l.id));
      html += `<p class="label">Muut käytettävissä olevat lomakkeet</p><div class="btnrow">${muutL.map((l) => `<button class="btn btn--small" type="button" data-lomake="${esc(l.id)}">${esc(l.id)}</button>`).join("")}</div>`;
      if (tehty.length) html += `<p class="label">Kirjatut arvioinnit</p><ul class="nextsteps">${tehty.map((l) => `<li>${esc(l.id)}: <strong>${l.pisteet} / ${l.max}</strong> – ${fmtPvm(l.aika.slice(0, 10))}, ${esc(l.kuka)}</li>`).join("")}</ul>`;
    } else {
      html += `<p class="small muted">Rakenteiset terveyskyselyt (PHQ-9, GAD-7, AUDIT) eivät kuulu tämän roolin käyttötarkoitukseen.</p>`;
    }
    return html || '<p class="small">Ei ehdotuksia.</p>';
  }

  function avaaLomake(a, lomakeId) {
    const L = D.lomakkeet.find((l) => l.id === lomakeId);
    avaaModal(`${L.nimi} – ${nimi(a)}`, `
      <p class="small muted">${esc(L.ohje || "")}</p>
      <p class="small muted">Lomake: hackathon_data/${esc(L.lahde.slice(0, 60))}… · Pistemäärä ${L.min}–${L.max}. Muutosvahti laskee vain summan; tuloksen tulkinta kuuluu ammattilaiselle.</p>
      <form id="lomakeForm" class="qform">
        ${L.kysymykset.map((q, i) => `<fieldset><legend>${esc(q.teksti)}</legend>${q.vaihtoehdot.map((v, j) => `<label class="check"><input type="radio" name="q${i}" value="${j}" required> ${esc(v.teksti)}</label>`).join("")}</fieldset>`).join("")}
        <div class="qform__sum">Pistemäärä: <strong id="lomakeSumma">0</strong> / ${L.max} <span class="small muted" id="lomakeVastattu">0/${L.kysymykset.length} vastattu</span></div>
        <div class="btnrow"><button class="btn btn--primary" type="submit">Tallenna arviointi</button><button class="btn" type="button" id="lomakePeru">Peruuta</button></div>
      </form>`);
    const form = $("#lomakeForm");
    const laske = () => {
      let summa = 0, vastattu = 0;
      L.kysymykset.forEach((q, i) => { const v = form.querySelector(`input[name="q${i}"]:checked`); if (v) { vastattu++; if (q.pisteytetty) summa += q.vaihtoehdot[+v.value].pisteet || 0; } });
      $("#lomakeSumma").textContent = summa;
      $("#lomakeVastattu").textContent = `${vastattu}/${L.kysymykset.length} vastattu`;
      return { summa, vastattu };
    };
    form.addEventListener("change", laske);
    $("#lomakePeru").addEventListener("click", suljeModal);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { summa, vastattu } = laske();
      if (vastattu < L.kysymykset.length) return toast("Lomake kesken", "Vastaa kaikkiin kysymyksiin.");
      (S.lomakkeet[a.id] ||= []).unshift({ id: L.id, pisteet: summa, max: L.max, aika: new Date().toISOString(), kuka: S.kayttaja.nimi, rooli: rooli().nimi, vastaukset: L.kysymykset.map((_, i) => +form.querySelector(`input[name="q${i}"]:checked`).value) });
      Varasto.kirjoita("lomakkeet", S.lomakkeet);
      lokiin({ asiakas: nimi(a), toimenpide: `${L.id} kirjattu`, kommentti: `${summa}/${L.max}` });
      suljeModal();
      toast(`${L.id} tallennettu`, `${summa} / ${L.max} pistettä`);
      reitti();
    });
  }

  /* ---------- ammattilaisen arvio ja jatkotoimet ---------- */
  const JATKOTOIMET = [
    "Ei jatkotoimia – tilanne vastaa lähtötilannetta",
    "Asia selvitetään asiakkaan kanssa",
    "Hoito- ja palvelusuunnitelma tarkistetaan",
    "Uusi RAI-arviointi käynnistetään",
    "Konsultoidaan lääkäriä / hoitajaa",
    "Palvelutarve arvioidaan uudelleen"
  ];
  function paatosHtml(a, an) {
    const hist = S.paatokset[a.id] || [];
    const arvioimatta = an.signaalit.filter((s) => s.taso !== "tiedoksi" && !arvioitu(s)).length;
    return `<section class="card">
      <h2>Ammattilaisen arvio ja jatkotoimet</h2>
      <p class="small muted">Sinä päätät. Kirjaus on ihmisen valvonnan keino ja tallentuu lokiin.${arvioimatta ? ` ${arvioimatta} havaintoa on vielä arvioimatta.` : ""}</p>
      <form id="paatosForm">
        <fieldset class="checks"><legend class="label">Jatkotoimet (valitse yksi tai useampi)</legend>${JATKOTOIMET.map((t) => `<label class="check"><input type="checkbox" name="toimi" value="${esc(t)}"> ${esc(t)}</label>`).join("")}</fieldset>
        <label class="field" style="margin:.6rem 0">Perustelu / kommentti<textarea name="kommentti" maxlength="600" placeholder="Oma arviosi tilanteesta"></textarea></label>
        <button class="btn btn--primary btn--small" type="submit">Kirjaa jatkotoimet</button>
      </form>
      ${hist.length ? `<p class="label">Aiemmat kirjaukset</p><ul class="history">${hist.map((p) => `<li><span class="src__meta">${new Date(p.aika).toLocaleString("fi-FI")} · ${esc(p.kuka)}, ${esc(p.rooli)} · ${esc(p.tilanne)}</span>${p.toimet.map(esc).join("; ")}${p.kommentti ? `<br><em>”${esc(p.kommentti)}”</em>` : ""}</li>`).join("")}</ul>` : ""}
    </section>`;
  }

  /* ---------- aikajana ---------- */
  function piirraAikajana(an) {
    const tasot = signaaliTasot(an);
    const L = an.lahtoPvm;
    let tap = aikajanaTietueet(an).filter((l) => l.pvm <= an.viite);
    if (S.tl === "muutos") tap = tap.filter((l) => tasot.has(l.id));
    else if (S.tl === "jalkeen") tap = tap.filter((l) => l.pvm > L);
    tap.sort((x, y) => y.pvm.localeCompare(x.pvm));
    const jalkeen = tap.filter((l) => l.pvm > L), ennen = tap.filter((l) => l.pvm <= L);
    const rivi = (l) => {
      const ts = tasot.get(l.id);
      return `<li class="tl${ts ? " tl--" + ts : ""}" id="tl-${esc(l.id)}">
        <span class="tl__date">${l.tyyppi === "kotihoito" ? esc(l.pvm.slice(5, 7) + "/" + l.pvm.slice(0, 4)) : fmtPvm(l.pvm)}</span><span class="tl__dot" aria-hidden="true"></span>
        <span class="tl__text"><button type="button" class="tl__open" data-lahde="${esc(l.id)}">${esc(l.otsikko)}</button> <span class="tl__desc">${esc(l.teksti)}</span><span class="tl__src">${esc(l.jarj)}${ts ? ` · <strong>${esc(LYHYT[ts].toLowerCase())}</strong>` : ""}</span></span>
      </li>`;
    };
    $("#timeline").innerHTML =
      (jalkeen.length ? jalkeen.map(rivi).join("") : `<li class="muted small tl__empty">${S.tl === "muutos" ? "Ei havaintoihin liittyviä tietueita." : "Ei tietueita lähtötilanteen jälkeen."}</li>`) +
      `<li class="tl tl--rai"><span class="tl__date">${fmtPvm(L)}</span><span class="tl__dot" aria-hidden="true"></span><span class="tl__text"><strong>Lähtötilanne: palvelutarpeen arviointi ja palvelupäätös</strong><span class="tl__src">Sosiaalihuolto · ${esc(an.nakyma.perus.lahto.palvelu)}</span></span></li>` +
      ennen.map(rivi).join("");
    sidoLahdelinkit($("#timeline"), null, an);
  }

  /* ---------- kaaviot ----------
   * Neljä kaaviota, jokainen vain jos rooli saa nähdä tiedot:
   * terveysaseman käynnit (pinottu, kiireellisyys), kotihoidon käynnit,
   * laboratoriotulokset ja säännöllinen lääkitys aikajanana.
   * Jokaisessa lähtötilanteen ja tämän päivän merkki.
   */
  const KK_LYH = ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"];
  function kuukaudet(alku, loppu) {
    const out = [];
    let [y, m] = alku.slice(0, 7).split("-").map(Number);
    const [ly, lm] = loppu.slice(0, 7).split("-").map(Number);
    while (y < ly || (y === ly && m <= lm)) { out.push(`${y}-${String(m).padStart(2, "0")}`); if (++m > 12) { m = 1; y++; } }
    return out;
  }
  const kkTeksti = (kk) => `${KK_LYH[+kk.slice(5, 7) - 1]} ${kk.slice(2, 4)}`;
  const paivatKk = (kk) => new Date(Date.UTC(+kk.slice(0, 4), +kk.slice(5, 7), 0)).getUTCDate();

  // yhteinen kehys: aika-akseli kuukausina, y-akseli, lähtötilanne- ja tänään-merkit
  function kehys(an, kk, ymax, korkeus = 190, yNimi = "", L = 40) {
    const W = 640, H = korkeus, R = 14, T = 16, B = 28;
    const x0 = Date.parse(kk[0] + "-01T00:00:00Z"), x1 = Date.parse(kk[kk.length - 1] + "-01T00:00:00Z") + paivatKk(kk[kk.length - 1]) * 86400000;
    const X = (d) => L + ((Date.parse(d.slice(0, 10) + "T00:00:00Z") - x0) / (x1 - x0)) * (W - L - R);
    const kaista = (W - L - R) / kk.length;
    const Xk = (m) => L + kk.indexOf(m) * kaista;
    const Y = (v) => T + (1 - v / (ymax || 1)) * (H - T - B);
    const askel = ymax <= 5 ? 1 : Math.ceil(ymax / 4 / (ymax > 50 ? 10 : 1)) * (ymax > 50 ? 10 : 1);
    let grid = "";
    for (let v = 0; v <= ymax + 1e-9; v += askel) grid += `<line class="grid" x1="${L}" x2="${W - R}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${L - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmtLuku(v)}</text>`;
    const nayta = Math.max(1, Math.ceil(kk.length / 9));
    const xak = kk.map((m, i) => (i % nayta === 0 ? `<text x="${(Xk(m) + kaista / 2).toFixed(1)}" y="${H - 9}" text-anchor="middle">${kkTeksti(m)}</text>` : "")).join("");
    const merkki = (d, teksti, luokka) => (d >= kk[0] + "-01" ? `<line class="${luokka}" x1="${X(d).toFixed(1)}" x2="${X(d).toFixed(1)}" y1="${T - 6}" y2="${H - B}"/><text class="viz__mlabel" x="${(X(d) > W - R - 70 ? X(d) - 4 : X(d) + 4).toFixed(1)}" y="${T - 4}"${X(d) > W - R - 70 ? ' text-anchor="end"' : ""}>${teksti}</text>` : "");
    const merkit = merkki(an.lahtoPvm, "Lähtötilanne", "viz__base") + merkki(an.viite, "Tänään", "viz__today");
    return { W, H, L, R, T, B, X, Xk, Y, kaista, alku: `<svg class="chart viz" viewBox="0 0 ${W} ${H}" role="img"${yNimi ? ` aria-label="${esc(yNimi)}"` : ""}>${grid}${xak}`, merkit };
  }
  const fmtLuku = (v) => (Number.isInteger(v) ? String(v) : fmtNum(v));
  const taulukko = (otsikot, rivit) => `<div class="table-wrap"><table class="dtable dtable--viz"><thead><tr>${otsikot.map((o) => `<th>${esc(o)}</th>`).join("")}</tr></thead><tbody>${rivit.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
  const vizKortti = (id, otsikko, kuvaus, ohjaimet, sisalto, legenda = "") =>
    `<figure class="vizcard" id="${id}"><div class="vizcard__head"><div><figcaption><strong>${esc(otsikko)}</strong></figcaption><span class="small muted">${esc(kuvaus)}</span></div>${ohjaimet}</div>${legenda}${sisalto}</figure>`;

  /* Mittarit viivakaavioon. Jokaisella mittarilla vertailutaso (katkoviiva). */
  function mittarit(an, kk) {
    const v = an.nakyma, L = an.lahtoPvm, viite = an.viite, out = [];
    const nykyKk = viite.slice(0, 7);
    const vrk = (m) => (m === nykyKk ? +viite.slice(8, 10) : paivatKk(m));
    const keski = (m) => `${m}-15`;
    // kotihoito: palvelun voimassaolon kuukaudet
    const palvelu = v.sosTapahtumat.find((s) => s.laji === "palvelu" && s.nimi === "Säännöllinen kotihoito");
    if (an.oikeudet.kotihoito && palvelu && v.kaynnitKk.length) {
      const per = Object.fromEntries(v.kaynnitKk.map((k) => [k.kk, k]));
      const kuukaudetP = kk.filter((m) => m >= palvelu.pvm.slice(0, 7) && m <= (palvelu.loppu || viite).slice(0, 7));
      const suun = v.suunniteltu[0];
      const piste = (m, arvo, yks) => ({ x: keski(m), arvo, nimike: A.kkNimi(m), kesken: m === nykyKk, tt: `${A.kkNimi(m)}: ${fmtNum(arvo)} ${yks}${m === nykyKk ? " (kuukausi kesken)" : ""}` });
      out.push({
        id: "kh_min", nimi: "Kotihoidon käyttöaika (min/vrk)", yks: "min/vrk", desim: 1,
        kuvaus: "Toteutunut kotihoidon aika vuorokautta kohden kuukausittain · katkoviiva = lähtötilanteessa suunniteltu määrä",
        pisteet: kuukaudetP.map((m) => piste(m, (per[m]?.min || 0) / vrk(m), "min/vrk")),
        ref: suun ? { arvo: suun.maara, teksti: `Lähtötilanne ${suun.maara} min/vrk` } : null
      });
      const kaynnit = kuukaudetP.map((m) => piste(m, (per[m]?.kotikaynnit || 0) / vrk(m), "käyntiä/vrk"));
      const eka = kaynnit.find((p) => p.x.slice(0, 7) > palvelu.pvm.slice(0, 7));
      out.push({
        id: "kh_kaynnit", nimi: "Kotikäynnit (käyntiä/vrk)", yks: "käyntiä/vrk", desim: 2,
        kuvaus: "Kotikäyntien määrä vuorokautta kohden · katkoviiva = ensimmäinen täysi palvelukuukausi",
        pisteet: kaynnit,
        ref: eka ? { arvo: eka.arvo, teksti: `Alkutaso ${fmtNum(eka.arvo, 2)} käyntiä/vrk` } : null
      });
    }
    // terveysaseman käynnit liukuvana 3 kk summana
    if (an.oikeudet.kaynnit) {
      const kaikkiKk = kuukaudet(A.util.lisaaPv(kk[0] + "-01", -62), viite);
      const lkmKk = (m) => v.kaynnit.filter((k) => k.pvm.slice(0, 7) === m && k.pvm <= viite).length;
      const ennen = v.kaynnit.filter((k) => k.pvm <= L && k.pvm > A.util.lisaaPv(L, -365)).length;
      out.push({
        id: "tk_kaynnit", nimi: "Terveysaseman käynnit (3 kk liukuva)", yks: "käyntiä / 3 kk", desim: 0,
        kuvaus: "Käyntien määrä kolmen kuukauden jaksoissa · katkoviiva = lähtötilannetta edeltäneen vuoden keskitaso",
        pisteet: kk.map((m) => { const i = kaikkiKk.indexOf(m); const s = lkmKk(kaikkiKk[i]) + lkmKk(kaikkiKk[i - 1]) + lkmKk(kaikkiKk[i - 2]); return { x: keski(m), arvo: s, nimike: A.kkNimi(m), kesken: m === nykyKk, tt: `${A.kkNimi(kaikkiKk[i - 2])}–${A.kkNimi(m)}: ${s} käyntiä` }; }),
        ref: { arvo: Math.round((ennen / 4) * 10) / 10, teksti: `Ennen lähtötilannetta ${fmtNum(ennen / 4)} / 3 kk` }
      });
    }
    // säännöllisten lääkeaineiden määrä
    if (an.oikeudet.laakkeet && v.laakkeet.length) {
      const lkm = (d) => new Set(v.laakkeet.filter((l) => l.tapa === "SÄÄNNÖLLINEN" && l.alku <= d && (!l.loppu || l.loppu >= d)).map((l) => l.atc)).size;
      const loppu = (m) => (m === nykyKk ? viite : `${m}-${String(paivatKk(m)).padStart(2, "0")}`);
      out.push({
        id: "laake_lkm", nimi: "Säännölliset lääkeaineet (lkm)", yks: "lääkeainetta", desim: 0,
        kuvaus: "Voimassa olevien säännöllisten lääkeaineiden määrä kuukauden lopussa · katkoviiva = lähtötilanne",
        pisteet: kk.map((m) => ({ x: keski(m), arvo: lkm(loppu(m)), nimike: A.kkNimi(m), tt: `${A.kkNimi(m)}: ${lkm(loppu(m))} lääkeainetta` })),
        ref: { arvo: lkm(L), teksti: `Lähtötilanne ${lkm(L)}` }
      });
    }
    // laboratoriotulokset
    if (an.oikeudet.lab) {
      for (const t of [...new Set(v.lab.map((l) => l.tutkimus))].sort()) {
        const s = v.lab.filter((l) => l.tutkimus === t);
        const lahto = s.filter((l) => l.pvm <= L).pop();
        const yks = s[0].yksikko;
        out.push({
          id: "lab_" + t, nimi: `${t} (${yks})`, yks, desim: 1,
          kuvaus: "Laboratoriotulokset · aineistossa ei ole viitearvoja · katkoviiva = viimeisin tulos ennen lähtötilannetta",
          pisteet: s.filter((l) => l.pvm >= kk[0] + "-01" && l.pvm <= viite).map((l) => ({ x: l.pvm, arvo: l.arvo, nimike: fmtPvm(l.pvm), tt: `${fmtPvm(l.pvm)}: ${fmtNum(l.arvo)} ${yks}` })),
          ref: lahto ? { arvo: lahto.arvo, teksti: `Lähtötaso ${fmtNum(lahto.arvo)} ${yks}` } : null
        });
      }
    }
    return out;
  }

  // viivakaavio: y-akseli arvojen mukaan (ei aina nollasta), ontot pisteet, viimeisin arvo korostettuna
  function viivaKaavio(an, kk, m) {
    const f = kehys(an, kk, 1, 220, m.nimi, 46);
    const arvot = [...m.pisteet.map((p) => p.arvo), ...(m.ref ? [m.ref.arvo] : [])];
    let lo = Math.min(...arvot), hi = Math.max(...arvot);
    const vali = hi - lo || Math.max(1, Math.abs(hi) * 0.2);
    lo = lo - vali * 0.15; hi = hi + vali * 0.2;
    if (lo < 0 || Math.min(...arvot) <= vali * 0.5) lo = 0;
    const Y = (val) => f.T + (1 - (val - lo) / (hi - lo)) * (f.H - f.T - f.B);
    let grid = "";
    for (let i = 0; i <= 3; i++) {
      const val = lo + ((hi - lo) * i) / 3;
      grid += `<line class="grid" x1="${f.L}" x2="${f.W - f.R}" y1="${Y(val).toFixed(1)}" y2="${Y(val).toFixed(1)}"/><text x="${f.L - 6}" y="${(Y(val) + 4).toFixed(1)}" text-anchor="end">${fmtNum(val, hi - lo >= 10 ? 0 : 1)}</text>`;
    }
    const svgAlku = f.alku.replace(/<line class="grid"[^>]*\/><text[^>]*>[^<]*<\/text>/g, "").replace(/(<svg[^>]*>)/, `$1${grid}`);
    const pts = m.pisteet.map((p) => ({ ...p, cx: f.X(p.x), cy: Y(p.arvo) }));
    const polku = pts.map((p, i) => `${i ? "L" : "M"}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");
    const ref = m.ref ? `<line class="ref" x1="${f.L}" x2="${f.W - f.R}" y1="${Y(m.ref.arvo).toFixed(1)}" y2="${Y(m.ref.arvo).toFixed(1)}"/><text x="${f.W - f.R}" y="${(Y(m.ref.arvo) - 6).toFixed(1)}" text-anchor="end">${esc(m.ref.teksti)}</text>` : "";
    const viim = pts[pts.length - 1];
    const merkit = pts.map((p, i) => `<g data-tt="${esc(p.tt)}"><circle class="hit" cx="${p.cx.toFixed(1)}" cy="${p.cy.toFixed(1)}" r="12"/><circle class="${i === pts.length - 1 ? "viz__last" : "viz__pt"}" cx="${p.cx.toFixed(1)}" cy="${p.cy.toFixed(1)}" r="${i === pts.length - 1 ? 6 : 4.5}"/></g>`).join("");
    const leima = `<text class="viz__val" x="${(viim.cx - 10).toFixed(1)}" y="${(viim.cy - 12).toFixed(1)}" text-anchor="end">${fmtNum(viim.arvo, m.desim)} ${esc(m.yks)}</text>`;
    return `${svgAlku}${ref}${pts.length > 1 ? `<path class="line" d="${polku}"/>` : ""}${merkit}${leima}${f.merkit}</svg>`;
  }

  function piirraKaaviot(an) {    const v = an.nakyma;
    const alku = S.kv.jakso === "jalkeen" ? an.lahtoPvm : A.util.lisaaPv(an.lahtoPvm, -365);
    const kk = kuukaudet(alku, an.viite);
    const sisalla = (p) => p >= kk[0] + "-01" && p <= an.viite;
    const osat = [];

    // 1. terveysaseman käynnit kuukausittain, pinottuna kiireellisyyden mukaan
    if (an.oikeudet.kaynnit) {
      const alueet = an.oikeudet.dx ? A.ALUEET.filter((al) => v.kaynnit.some((k) => k.dx.some((d) => alueDx(d.k) === al.id))) : [];
      if (S.kv.alue !== "kaikki" && !alueet.some((al) => al.id === S.kv.alue)) S.kv.alue = "kaikki";
      const kaynnit = v.kaynnit.filter((k) => sisalla(k.pvm) && (S.kv.alue === "kaikki" || k.dx.some((d) => alueDx(d.k) === S.kv.alue)));
      const per = Object.fromEntries(kk.map((m) => [m, { e: 0, k: 0 }]));
      for (const k of kaynnit) per[k.pvm.slice(0, 7)][k.kiire === "E" ? "e" : "k"]++;
      const ymax = Math.max(2, ...kk.map((m) => per[m].e + per[m].k));
      const f = kehys(an, kk, ymax, 190, "Terveysaseman käynnit kuukausittain");
      const lev = Math.max(4, Math.min(26, f.kaista - 6));
      const palkit = kk.map((m) => {
        const { e, k } = per[m];
        if (!e && !k) return "";
        const x = f.Xk(m) + (f.kaista - lev) / 2;
        const yE = f.Y(e), yK = f.Y(e + k);
        const tt = `${A.kkNimi(m)}: ${e} kiireetöntä, ${k} kiireellistä`;
        return `<g data-tt="${esc(tt)}"><rect class="hit" x="${(f.Xk(m)).toFixed(1)}" y="${f.T}" width="${f.kaista.toFixed(1)}" height="${f.H - f.T - f.B}"/>
          ${e ? `<rect class="viz__s1" x="${x.toFixed(1)}" y="${yE.toFixed(1)}" width="${lev.toFixed(1)}" height="${(f.Y(0) - yE).toFixed(1)}" rx="${k ? 0 : 3}"/>` : ""}
          ${k ? `<rect class="viz__s2" x="${x.toFixed(1)}" y="${yK.toFixed(1)}" width="${lev.toFixed(1)}" height="${Math.max(0, f.Y(e) - yK - (e ? 2 : 0)).toFixed(1)}" rx="3"/>` : ""}</g>`;
      }).join("");
      const ohj = alueet.length ? `<label class="field vizfield">RAI-osa-alue (diagnoosi)<select data-kv="alue">${opt("kaikki", "Kaikki käynnit", S.kv.alue)}${alueet.map((al) => opt(al.id, al.nimi, S.kv.alue)).join("")}</select></label>` : "";
      const leg = `<div class="vizlegend"><span><i class="viz__s1"></i>Kiireetön</span><span><i class="viz__s2"></i>Kiireellinen</span></div>`;
      const sis = S.kv.taulukko
        ? taulukko(["Kuukausi", "Kiireetön", "Kiireellinen"], kk.map((m) => [A.kkNimi(m), per[m].e, per[m].k]))
        : `${f.alku}${palkit}${f.merkit}</svg>`;
      const kJ = kaynnit.filter((k) => k.pvm > an.lahtoPvm), kE = kaynnit.filter((k) => k.pvm <= an.lahtoPvm);
      const yht = `Yhteenveto: ${S.kv.jakso === "kaikki" ? `ennen lähtötilannetta ${kE.length} käyntiä (kiireellisiä ${kE.filter((k) => k.kiire !== "E").length}), ` : ""}lähtötilanteen jälkeen ${kJ.length} käyntiä (kiireellisiä ${kJ.filter((k) => k.kiire !== "E").length}).`;
      osat.push(vizKortti("viz-kaynnit", "Terveysaseman käynnit", `${kaynnit.length} käyntiä valitulla aikavälillä${S.kv.alue !== "kaikki" ? " · " + A.ALUE[S.kv.alue].nimi.toLowerCase() : ""}`, ohj, `<p class="vizsum">${esc(yht)}</p>${sis}`, leg));
    }

    // 2. kotihoidon käynnit kuukausittain
    if (an.oikeudet.kotihoito && v.kaynnitKk.length) {
      const mitta = S.kv.kh;
      const per = Object.fromEntries(v.kaynnitKk.map((k) => [k.kk, k]));
      const arvo = (m) => (per[m] ? (mitta === "min" ? per[m].min : per[m].kotikaynnit) : 0);
      const suun = v.suunniteltu[0];
      const suunKk = (m) => (suun && m >= suun.pvm.slice(0, 7) ? suun.maara * paivatKk(m) : null);
      const ymax = Math.max(1, ...kk.map(arvo), ...(mitta === "min" ? kk.map((m) => suunKk(m) || 0) : []));
      const f = kehys(an, kk, ymax, 190, "Kotihoidon käynnit kuukausittain");
      const lev = Math.max(4, Math.min(26, f.kaista - 6));
      const palkit = kk.map((m) => {
        const val = arvo(m);
        const tt = `${A.kkNimi(m)}: ${per[m] ? `${per[m].kotikaynnit} kotikäyntiä, ${per[m].min} min` : "ei kirjattuja käyntejä"}${suunKk(m) ? ` · suunniteltu ${suunKk(m)} min` : ""}${m === an.viite.slice(0, 7) ? " (kuukausi kesken)" : ""}`;
        const x = f.Xk(m) + (f.kaista - lev) / 2;
        return `<g data-tt="${esc(tt)}"><rect class="hit" x="${f.Xk(m).toFixed(1)}" y="${f.T}" width="${f.kaista.toFixed(1)}" height="${f.H - f.T - f.B}"/>${val ? `<rect class="viz__s1${m === an.viite.slice(0, 7) ? " viz__partial" : ""}" x="${x.toFixed(1)}" y="${f.Y(val).toFixed(1)}" width="${lev.toFixed(1)}" height="${(f.Y(0) - f.Y(val)).toFixed(1)}" rx="3"/>` : ""}</g>`;
      }).join("");
      const suunViiva = mitta === "min" ? kk.map((m) => (suunKk(m) ? `<line class="viz__plan" x1="${f.Xk(m).toFixed(1)}" x2="${(f.Xk(m) + f.kaista).toFixed(1)}" y1="${f.Y(suunKk(m)).toFixed(1)}" y2="${f.Y(suunKk(m)).toFixed(1)}"/>` : "")).join("") : "";
      const ohj = `<div class="seg" role="group" aria-label="Mittari">${[["kotikaynnit", "Kotikäynnit"], ["min", "Minuutit"]].map(([k, t]) => `<button type="button" data-kvkh="${k}" aria-pressed="${mitta === k}">${t}</button>`).join("")}</div>`;
      const leg = mitta === "min" && suun ? `<div class="vizlegend"><span><i class="viz__s1"></i>Toteutunut</span><span><i class="viz__planlbl"></i>Suunniteltu (${suun.maara} min / vrk)</span></div>` : "";
      const sis = S.kv.taulukko
        ? taulukko(["Kuukausi", "Kotikäynnit", "Minuutit", "Suunniteltu min"], kk.map((m) => [A.kkNimi(m), per[m]?.kotikaynnit ?? 0, per[m]?.min ?? 0, suunKk(m) ?? "–"]))
        : `${f.alku}${palkit}${suunViiva}${f.merkit}</svg>`;
      const taydet = kk.filter((m) => m < an.viite.slice(0, 7) && per[m]);
      const vm = taydet[taydet.length - 1];
      const yht = vm ? `Yhteenveto: viimeisin täysi kuukausi, jolta käyntejä on kirjattu, ${A.kkNimi(vm)}: ${per[vm].kotikaynnit} kotikäyntiä, ${per[vm].min} min (${fmtNum(per[vm].min / paivatKk(vm))} min/vrk)${suun ? `; suunniteltu ${suun.maara} min/vrk` : ""}.` : "Yhteenveto: ei kirjattuja käyntejä valitulla aikavälillä.";
      osat.push(vizKortti("viz-kotihoito", "Kotihoidon käynnit", "Kuukausikooste sosiaalihuollon kontakteista · kuluva kuukausi on kesken", ohj, `<p class="vizsum">${esc(yht)}</p>${sis}`, leg));
    }

    // 3. mittarit viivakaaviona lähtötilanteeseen verrattuna
    const mitat = mittarit(an, kk);
    if (mitat.length) {
      if (!mitat.some((m) => m.id === S.kv.mittari)) S.kv.mittari = mitat[0].id;
      const m = mitat.find((x) => x.id === S.kv.mittari);
      const ohj = `<label class="field vizfield">Mittari<select data-kv="mittari">${mitat.map((x) => opt(x.id, x.nimi, S.kv.mittari)).join("")}</select></label>`;
      const sis = S.kv.taulukko
        ? taulukko(["Ajankohta", `${m.nimi}`], [...(m.ref ? [[`${m.ref.teksti} (vertailutaso)`, fmtNum(m.ref.arvo, m.desim)]] : []), ...m.pisteet.map((p) => [p.nimike, fmtNum(p.arvo, m.desim) + (p.kesken ? " (kesken)" : "")])])
        : m.pisteet.length ? viivaKaavio(an, kk, m) : `<p class="small muted">Ei arvoja valitulla aikavälillä.</p>`;
      const av = m.pisteet.map((x) => x.arvo);
      const yht = av.length ? `Yhteenveto: ${m.nimi} vaihteli ${fmtNum(Math.min(...av), m.desim)}–${fmtNum(Math.max(...av), m.desim)} ${m.yks}, viimeisin ${fmtNum(av[av.length - 1], m.desim)} ${m.yks}${m.ref ? `; vertailutaso ${fmtNum(m.ref.arvo, m.desim)} ${m.yks}` : ""}.` : "Yhteenveto: ei arvoja valitulla aikavälillä.";
      osat.push(vizKortti("viz-mittari", "Kehitys lähtötilanteeseen verrattuna", m.kuvaus, ohj, `<p class="vizsum">${esc(yht)}</p>${sis}`));
    }
    // 4. säännöllinen ja tarvittaessa otettava lääkitys aikajanana
    if (an.oikeudet.laakkeet && v.laakkeet.length) {
      const RYHMA = { kaikki: () => true, frid: (l) => A.FRID.test(l.atc), mieli: (l) => A.MIELIALALAAKE.test(l.atc), kipu: (l) => A.KIPULAAKE.test(l.atc) };
      const lop = an.viite;
      const rivit = new Map();
      for (const l of v.laakkeet.filter(RYHMA[S.kv.laake] || RYHMA.kaikki)) {
        const a = l.alku < kk[0] + "-01" ? kk[0] + "-01" : l.alku, b = !l.loppu || l.loppu > lop ? lop : l.loppu;
        if (a > b) continue;
        const k = `${l.aine}|${l.tapa}`;
        if (!rivit.has(k)) rivit.set(k, { aine: l.aine, atc: l.atc, tapa: l.tapa, jaksot: [] });
        const j = rivit.get(k).jaksot, ed = j[j.length - 1];
        if (ed && erotusPv(a, ed.b) <= 2) ed.b = b > ed.b ? b : ed.b; else j.push({ a, b, id: l.id });
      }
      const lista = [...rivit.values()].sort((x, y) => x.tapa.localeCompare(y.tapa) || x.aine.localeCompare(y.aine, "fi"));
      const rk = 24, korkeus = Math.max(80, lista.length * rk + 44);
      const f = kehys(an, kk, 1, korkeus, "Lääkitys aikajanana", 118);
      const svgAlku = f.alku.replace(/<line class="grid"[^>]*\/><text[^>]*>[^<]*<\/text>/g, "");
      const palkit = lista.map((r, i) => {
        const y = f.T + i * rk + 3;
        return `<text x="${f.L - 6}" y="${y + 13}" text-anchor="end" class="viz__rowlbl">${esc(r.aine.length > 20 ? r.aine.slice(0, 19) + "…" : r.aine)}</text>` +
          r.jaksot.map((j) => `<rect class="${r.tapa === "SÄÄNNÖLLINEN" ? "viz__s1" : "viz__prn"}" x="${f.X(j.a).toFixed(1)}" y="${y}" width="${Math.max(4, f.X(j.b) - f.X(j.a)).toFixed(1)}" height="16" rx="4" data-tt="${esc(`${r.aine} (${r.atc}), ${A.KAYTTOTAPA[r.tapa] || r.tapa}: ${fmtPvm(j.a)}–${fmtPvm(j.b)}`)}"/>`).join("");
      }).join("");
      const ohj = `<label class="field vizfield">Lääkeryhmä<select data-kv="laake">${[["kaikki", "Kaikki"], ["frid", "Kaatumisriskiä mahdollisesti lisäävät"], ["mieli", "Mielialalääkkeet"], ["kipu", "Kipulääkkeet"]].map(([k, t]) => opt(k, t, S.kv.laake)).join("")}</select></label>`;
      const leg = `<div class="vizlegend"><span><i class="viz__s1"></i>Säännöllinen</span><span><i class="viz__prn"></i>Tarvittaessa</span></div>`;
      const sis = S.kv.taulukko
        ? taulukko(["Lääke", "Käyttötapa", "Jaksot"], lista.map((r) => [`${r.aine} (${r.atc})`, A.KAYTTOTAPA[r.tapa] || r.tapa, r.jaksot.map((j) => `${fmtPvm(j.a)}–${fmtPvm(j.b)}`).join(", ")]))
        : lista.length ? `${svgAlku}${palkit}${f.merkit}</svg>` : `<p class="small muted">Ei lääkkeitä valitussa ryhmässä tai aikavälillä.</p>`;
      const sl = lista.filter((r) => r.tapa === "SÄÄNNÖLLINEN");
      const yht = `Yhteenveto: ${lista.length} lääkettä valitulla aikavälillä, joista säännöllisiä ${sl.length}${sl.length ? ` (${sl.map((r) => r.aine).join(", ")})` : ""} ja tarvittaessa otettavia ${lista.length - sl.length}.`;
      osat.push(vizKortti("viz-laake", "Lääkitys", "Reseptien uusinnat yhdistetty jaksoiksi", ohj, `<p class="vizsum">${esc(yht)}</p>${sis}`, leg));
    }

    $("#vizgrid").innerHTML = osat.length ? osat.join("") : '<p class="small muted">Tämän roolin käyttötarkoitukseen ei kuulu kaavioina esitettäviä tietoja.</p>';
    $$("[data-kv]", $("#vizgrid")).forEach((s) => s.addEventListener("change", () => { S.kv[s.dataset.kv] = s.value; piirraKaaviot(an); }));
    $$("[data-kvkh]", $("#vizgrid")).forEach((b) => b.addEventListener("click", () => { S.kv.kh = b.dataset.kvkh; piirraKaaviot(an); }));
  }
  const alueDx = A.dxAlue;

  /* ---------- lähteen avaaminen ---------- */
  function sidoLahdelinkit(rootEl, a, an) {
    $$("[data-lahde]", rootEl).forEach((b) => {
      if (b.dataset.sidottu) return;
      b.dataset.sidottu = "1";
      const avaa = () => avaaLahde(an, b.dataset.lahde);
      b.addEventListener("click", avaa);
      if (b.tagName !== "BUTTON") b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); avaa(); } });
    });
  }
  function markdown(t) {
    return String(t || "").split("\n").map((r) => {
      if (/^# /.test(r)) return `<h3>${esc(r.slice(2))}</h3>`;
      if (/^## /.test(r)) return `<h4>${esc(r.slice(3))}</h4>`;
      if (/^- /.test(r)) return `<li>${esc(r.slice(2))}</li>`;
      return r.trim() ? `<p>${esc(r)}</p>` : "";
    }).join("").replace(/(<li>.*?<\/li>)+/g, (m) => `<ul>${m}</ul>`);
  }
  function avaaLahde(an, id) {
    const L = an.lahteet[id];
    if (!L) return;
    const t = L.tieto;
    let runko = "";
    const rivi = (k, v) => (v === null || v === undefined || v === "" ? "" : `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`);
    if (L.tyyppi === "kaynti") runko = `<table class="metrics"><tbody>${rivi("Päivämäärä", fmtPvm(t.pvm))}${rivi("Yhteystapa", A.YHTEYSTAPA[t.tapa] || t.tapa)}${rivi("Kiireellisyys", A.KIIRE[t.kiire] || t.kiire)}${rivi("Kesto", t.kesto + " min")}${an.oikeudet.dx ? rivi("Diagnoosit", t.dx.length ? t.dx.map((d) => `${A.dxTeksti(d.k)}${d.ens ? " (ensisijainen)" : ""}${d.pitka ? ", pitkäaikainen" : ""}`).join("; ") : "–") : rivi("Diagnoosit", "Ei tämän käyttötarkoituksen tieto")}${t.tp.length ? rivi("Toimenpiteet", t.tp.join(", ")) : ""}${rivi("Tunniste", t.id)}</tbody></table>`;
    else if (L.tyyppi === "laake") runko = `<table class="metrics"><tbody>${rivi("Vaikuttava aine", t.aine)}${rivi("ATC", t.atc)}${rivi("Käyttötapa", A.KAYTTOTAPA[t.tapa] || t.tapa)}${rivi("Aloitus", fmtPvm(t.alku))}${rivi("Päättyminen", t.loppu ? fmtPvm(t.loppu) : "toistaiseksi")}${rivi("Reseptilääke", t.resepti ? "kyllä" : "ei")}${rivi("Kirjattu käynnillä", t.kontakti)}${rivi("Tunniste", t.id)}</tbody></table>`;
    else if (L.tyyppi === "lab") runko = `<table class="metrics"><tbody>${rivi("Tutkimus", t.tutkimus)}${rivi("Tulos", `${fmtNum(t.arvo)} ${t.yksikko}`)}${rivi("Näytteenottopäivä", fmtPvm(t.pvm))}${rivi("Käynti", t.kontakti)}</tbody></table><p class="small muted">Aineistossa ei ole viitearvoja.</p>`;
    else if (L.tyyppi === "muistiinpano") runko = `<p class="small muted">${esc(fmtPvm(t.pvm))} · ${esc(t.rooli)} · ${esc(t.tyyppi)} · ${esc(t.kiire)}${t.rajattu ? " · <strong>rajattu: vain toimintakykyosio</strong>" : ""}</p><div class="note">${Object.entries(t.osiot).map(([k, v]) => `<h4>${esc(k)}</h4>${markdown(v)}`).join("")}</div>`;
    else if (L.tyyppi === "sos") runko = `<table class="metrics"><tbody>${rivi("Laji", A.SOS_LAJI[t.laji] || t.laji)}${rivi("Nimi", t.nimi)}${rivi("Palvelutehtävä", t.tehtava)}${rivi("Päivämäärä", fmtPvm(t.pvm))}${rivi("Päättyy", t.loppu ? fmtPvm(t.loppu) : "")}${rivi("Ratkaisu", t.ratkaisu)}${t.keskeytetty !== undefined ? rivi("Keskeytetty", t.keskeytetty ? `kyllä (${t.keskeytys || "syy ei tiedossa"})` : "ei") : ""}${rivi("Tunniste", t.id)}</tbody></table>`;
    else if (L.tyyppi === "kotihoito") runko = `<table class="metrics"><tbody>${rivi("Kuukausi", A.kkNimi(t.kk))}${rivi("Kotikäynnit", t.kotikaynnit)}${rivi("Muut kontaktit", t.muut)}${rivi("Käyttöaika yhteensä", t.min + " min")}</tbody></table><p class="small muted">Tietojen minimointi: yksittäiset käynnit on koostettu kuukausitasolle.</p>`;
    else if (L.tyyppi === "suunniteltu") runko = `<table class="metrics"><tbody>${rivi("Palvelu", t.palvelu)}${rivi("Suunniteltu määrä", `${t.maara} ${t.yksikko}a / ${t.aikayksikko}`)}${rivi("Alkaen", fmtPvm(t.pvm))}</tbody></table>`;
    else if (L.tyyppi === "teksti") runko = `<div class="note">${markdown(t.teksti)}</div>`;
    avaaModal(`${L.otsikko}`, `<p class="src__meta">${esc(L.jarj)} · alkuperäinen lähdetieto (synteettinen)</p>${runko}`);
    lokiin({ asiakas: nimi(an.nakyma.perus), toimenpide: "Lähdetieto avattu", kommentti: L.jarj });
  }

  /* ---------- modaali ---------- */
  let modalPaluu = null;
  const tausta = () => [...root.children].filter((el) => el.id !== "modal");
  function avaaModal(otsikko, html) {
    modalPaluu = document.activeElement;
    $("#modalTitle").textContent = otsikko;
    $("#modalBody").innerHTML = html;
    $("#modal").hidden = false;
    document.body.classList.add("modal-open");
    tausta().forEach((el) => el.setAttribute("inert", ""));
    $("#modalClose").focus();
  }
  function suljeModal() {
    $("#modal").hidden = true;
    document.body.classList.remove("modal-open");
    tausta().forEach((el) => el.removeAttribute("inert"));
    modalPaluu?.focus?.();
  }
  // Tab pysyy avoimen dialogin sisällä (modaali ja avustaja)
  const KOHDISTETTAVAT = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])';
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const d = $("#modal") && !$("#modal").hidden ? $("#modal") : $("#chat") && !$("#chat").hidden && $("#chat").contains(document.activeElement) ? $("#chat") : null;
    if (!d) return;
    const k = [...d.querySelectorAll(KOHDISTETTAVAT)].filter((el) => !el.closest("[hidden]") && el.offsetParent !== null);
    if (!k.length) return;
    const eka = k[0], vika = k[k.length - 1];
    if (e.shiftKey && document.activeElement === eka) { e.preventDefault(); vika.focus(); }
    else if (!e.shiftKey && document.activeElement === vika) { e.preventDefault(); eka.focus(); }
  });

  /* =====================================================================
   * NÄKYMÄ: Säännöt ja laatu
   * ===================================================================== */
  function nakymaSaannot(app) {
    // havainnot kaikissa omissa asiakkaissa (roolin oletustilanteessa) ja ammattilaisten arviot
    const tilastot = {};
    for (const { an } of omatAnalyysit()) for (const s of an.signaalit) {
      const t = (tilastot[s.saanto] ||= { n: 0, oikea: 0, virhe: 0, epavarma: 0 });
      t.n++;
      const k = S.arviot[s.avain];
      if (k) t[k.tulos]++;
    }
    const kaikkiArviot = Object.values(S.arviot);
    app.innerHTML = `
      <section class="chero chero--left">
        <p class="eyebrow">Agentin säännöt · versio ${esc(A.SAANTOVERSIO)}</p>
        <h1>Jokaisella havainnolla on peruste ja lähde</h1>
        <p>Muutosvahti on sääntöpohjainen: se ei käytä koneoppimismallia eikä kielimallia, eikä se opi asiakastiedoista. Säännöt vertaavat lähtötilanteen jälkeen kertynyttä tietoa lähtötilanteeseen. Raja-arvot ovat demon sääntöjä, eivät kliinisiä tai virallisia RAI-rajoja – ne kalibroidaan ammattilaisten kanssa.</p>
      </section>

      <div class="section-title"><h2>Säännöt</h2><span class="muted small">Havainnot omissa asiakkaissa tilanteessa ”${esc(A.TILANTEET[S.tilanne].nimi)}” ja ammattilaisten arviot</span></div>
      <div class="rules">
        ${A.SAANNOT.map((r) => {
          const t = tilastot[r.id] || { n: 0, oikea: 0, virhe: 0, epavarma: 0 };
          const arvioitu = t.oikea + t.virhe + t.epavarma;
          return `<section class="card rulecard">
            <div class="card__head"><h3>${esc(r.nimi)} <span class="muted small">${esc(r.id)}</span></h3><span class="chip">${r.suunta === "myonteinen" ? `<span class="status status--vihrea">${IKONI.vihrea}</span>Myönteinen suunta · ` : ""}${esc(A.ALUE[r.alue].nimi)}</span></div>
            <p class="label">Peruste ja raja-arvot</p><p class="small">${esc(r.peruste)}</p>
            <p class="label">Käytetyt tiedot</p><p class="small">${esc(r.tiedot)}</p>
            <p class="label">Tunnetut rajoitteet ja virhehälytysten lähteet</p><p class="small">${esc(r.rajoitteet)}</p>
            <div class="rulestats"><span><strong>${t.n}</strong> havaintoa</span><span><strong>${arvioitu}</strong> arvioitu</span><span><strong>${t.oikea}</strong> pitää paikkansa</span><span><strong>${t.virhe}</strong> virhehälytystä</span>${arvioitu ? `<span>Virhehälytysaste <strong>${Math.round((t.virhe / arvioitu) * 100)} %</strong></span>` : ""}</div>
          </section>`;
        }).join("")}
      </div>

      <div class="ps">
        <section class="card">
          <h2>Virhehälytysten seuranta</h2>
          <p>Jokaisen havainnon kohdalla ammattilainen arvioi, pitääkö havainto paikkansa. Arviot kootaan sääntökohtaisesti yllä. Sääntöä tarkistetaan, jos virhehälytyksiä on toistuvasti.</p>
          <p class="small muted">Tällä laitteella annettu ${kaikkiArviot.length} arviota: ${kaikkiArviot.filter((x) => x.tulos === "oikea").length} pitää paikkansa, ${kaikkiArviot.filter((x) => x.tulos === "virhe").length} virhehälytystä, ${kaikkiArviot.filter((x) => x.tulos === "epavarma").length} epäselvää.</p>
        </section>
        <section class="card">
          <h2>Vinoumien arviointi</h2>
          <ul class="small">
            <li><strong>Ei profilointia:</strong> ikä, sukupuoli, kieli tai kotikunta eivät ole minkään säännön syötteenä. Säännöt vertaavat asiakasta vain hänen omaan lähtötilanteeseensa.</li>
            <li><strong>Aliedustus:</strong> diagnoosipohjaiset säännöt näkevät vain terveysasemalla käyneiden asiakkaiden muutokset. Harvoin palveluja käyttävä asiakas voi saada vähemmän havaintoja – vihreä ei tarkoita, ettei muutosta olisi.</li>
            <li><strong>Kieli:</strong> vapaan tekstin säännöt tunnistavat suomenkielisiä ilmauksia. Ruotsinkielisten kirjausten tulkinta on testattava erikseen.</li>
            <li><strong>Seurantajakson pituus:</strong> lyhyellä jaksolla yksittäinen tapahtuma painaa paljon; siksi esim. kiireellisiin käynteihin vaaditaan vähintään kaksi käyntiä.</li>
            <li><strong>Rooli rajaa tiedot:</strong> sosiaalihuollon ammattilaisen näkymässä diagnoosipohjaiset säännöt eivät ole käytössä, joten havaintoja on vähemmän. Tämä on käyttötarkoitussidonnaisuuden seuraus, ei virhe.</li>
          </ul>
        </section>
      </div>`;
  }

  /* =====================================================================
   * NÄKYMÄ: Käyttötarkoitus ja tietosuoja
   * ===================================================================== */
  function nakymaTietoa(app) {
    const oik = (o, k) => { const v = o[k]; return v === true || v === "koko" ? "✓" : v === "maarat" ? "määrät" : v === "toimintakyky" ? "toimintakyky" : "–"; };
    const L = D.lahde;
    app.innerHTML = `
      <section class="chero chero--left">
        <p class="eyebrow">Käyttötarkoitus</p>
        <h1>Esitietojen koonti ikääntyneen asiakkaan tilanteen arviointiin</h1>
        <p>RAI Muutosvahti kokoaa sosiaali- ja terveydenhuollon ammattilaiselle rooli- ja tilannekohtaisen esitietokoosteen ikääntyneiden säännöllisten palvelujen asiakkaasta. Kooste perustuu aiempaan lähtötilanteeseen ja sen jälkeen kertyneisiin tietoihin RAI-arvioinnin osa-alueittain. Ratkaisu nostaa tarkistettavaksi mahdollisesti muuttuneet tiedot lähteineen. Ammattilainen arvioi tietojen merkityksen ja päättää jatkotoimista.</p>
      </section>

      <div class="ps">
        <section class="card">
          <h2>Mitä ratkaisu ei tee</h2>
          <ul>
            <li>Ei tee RAI-arviointia eikä muuta RAI-tuloksia.</li>
            <li>Ei tee diagnooseja, hoitopäätöksiä tai palvelupäätöksiä.</li>
            <li>Ei pisteytä asiakkaan riskiä eikä luokittele asiakkaita. Värit kuvaavat vain tarkistamisen tarvetta.</li>
            <li>Ei kokoa asiakkaan yleistä yhteydenotto- ja asiointihistoriaa (haaste 1.2).</li>
            <li>Ei koske vastaanoton aikaista kirjaamista tai sanelua.</li>
          </ul>
        </section>
        <section class="card">
          <h2>Ihmisen valvonta</h2>
          <ul>
            <li>Jokainen havainto näytetään perusteluineen, ajankohtineen ja lähteineen. Alkuperäinen lähdetieto voidaan avata.</li>
            <li>Ammattilainen arvioi jokaisen havainnon (pitää paikkansa / virhehälytys / epäselvä) ja kirjaa jatkotoimet.</li>
            <li>Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) ovat ehdotuksia – ammattilainen päättää käytöstä ja tulkitsee tuloksen.</li>
            <li>Avustaja kertoo olevansa tekoäly (tekoälysäädös, art. 50).</li>
          </ul>
        </section>
      </div>

      <div class="section-title"><h2>Roolit, käyttöoikeudet ja käyttötarkoitus</h2><span class="muted small">Käyttöoikeus perustuu hoito- tai asiakassuhteeseen; rooli ja tilanne rajaavat tiedot</span></div>
      <section class="card table-wrap">
        <table class="dtable">
          <thead><tr><th>Rooli / arviointitilanne</th><th>Käynnit</th><th>Diagnoosit</th><th>Lääkitys</th><th>Laboratorio</th><th>Muistiinpanot</th><th>Sosiaalihuollon asiakkuus</th><th>Päätöstekstit</th><th>Kotihoito</th><th>Lomakkeet</th></tr></thead>
          <tbody>${Object.entries(A.ROOLIT).flatMap(([rid, r]) => r.tilanteet.map((t) => {
            const o = { ...r.oikeudet }; for (const [k, val] of Object.entries(A.TILANTEET[t].rajaus)) if (val === false) o[k] = false;
            return `<tr><th scope="row">${esc(r.nimi)}<span class="small muted"> · ${esc(A.TILANTEET[t].nimi)}</span></th>${["kaynnit", "dx", "laakkeet", "lab", "muistiinpano", "sosTapahtumat", "sosTekstit", "kotihoito", "lomakkeet"].map((k) => `<td>${oik(o, k)}</td>`).join("")}</tr>`;
          })).join("")}</tbody>
        </table>
      </section>

      <div class="ps">
        <section class="card">
          <h2>Luokittelu (alustava arvio)</h2>
          <p><strong>EU:n tekoälysäädös:</strong> järjestelmä käsittelee terveys- ja sosiaalihuollon henkilötietoja ja tukee julkisten palvelujen tarpeen arviointia, joten se käsitellään suuren riskin järjestelmänä (liite III). Velvoitteet: riskienhallinta, datan hallinta, tekninen dokumentaatio, lokit, ihmisen valvonta, tarkkuus, CE-merkintä ja rekisteröinti. Hyvinvointialueen on tehtävä perusoikeusvaikutusten arviointi (FRIA, art. 27).</p>
          <p><strong>MDR:</strong> käyttötarkoitus rajaa pois diagnoosit ja hoitopäätökset, mikä puoltaa sitä, ettei kyse ole lääkinnällisestä laitteesta. Arvio vahvistetaan juristin ja tietosuojavastaavan kanssa ennen tuotantoa.</p>
        </section>
        <section class="card">
          <h2>Tietosuoja</h2>
          <ul class="small">
            <li><strong>Roolit:</strong> hyvinvointialue rekisterinpitäjä, toimittaja käsittelijä (käsittelysopimus).</li>
            <li><strong>Käsittelyperuste:</strong> tietosuoja-asetuksen art. 6(1)(e) ja 9(2)(h), asiakastietolaki ja tietosuojalaki. Oikean aineiston käyttö kehitykseen edellyttää toisiolain mukaista Findatan lupaa.</li>
            <li><strong>Arvioinnit:</strong> vaikutustenarviointi (DPIA) on pakollinen.</li>
            <li><strong>Suojatoimet:</strong> käyttöoikeudet hoitosuhteen perusteella, lokitus ja salaus, käsittely EU:ssa, ei potilastietoa selaimessa.</li>
            <li><strong>Koulutus:</strong> käyttäjät koulutetaan (tekoälylukutaito, art. 4).</li>
          </ul>
        </section>
      </div>

      <div class="ps">
        <section class="card">
          <h2>Aineisto ja tietojen minimointi</h2>
          <p class="small">${esc(L.huomio)}</p>
          <ul class="small">
            <li><strong>Lähde:</strong> ${esc(L.kohortti)}; lomakkeet: ${esc(L.lomakkeet)}. Rakennettu ${fmtPvm(L.rakennettu)} skriptillä <code>tools/rakenna-aineisto.ps1</code>.</li>
            <li><strong>Asiakkaat:</strong> ${D.asiakkaat.length} ikääntyneiden palvelujen asiakasta, joilla myönteinen kotihoito- tai palveluasumispäätös ja sekä sosiaali- että terveystiedot.</li>
            <li><strong>Minimointi:</strong> terveystiedot vain lähtötilannetta edeltävältä vuodelta ja sen jälkeen; kotihoidon käynnit kuukausitasolla; ei henkilötunnuksia, nimiä tai lomakkeiden laatijatietoja.</li>
            <li><strong>Viitepäivä:</strong> ${fmtPvm(D.viitepaiva)}. Myöhemmät tiedot jätetään pois.</li>
          </ul>
        </section>
        <section class="card">
          <h2>Demo ja tuotanto</h2>
          <p class="small"><strong>Demo:</strong> HTML, CSS ja JavaScript ilman kirjastoja tai käännösvaihetta, toimii ilman verkkoyhteyttä. Selaimen paikalliseen muistiin tallennetaan vain tunnukset (suolattuina SHA-256-tiivisteinä), ammattilaisen arviot ja loki.</p>
          <p class="small"><strong>Tuotanto:</strong> kirjautuminen Entra ID:llä tai Suomi.fi-tunnistuksella, taustapalvelu ja salattu tietokanta EU:ssa, FHIR- tai Kanta-integraatio, keskitetty lokitus, tietosuojavastaavan ja juristin hyväksyntä.</p>
        </section>
      </div>`;
  }

  /* =====================================================================
   * NÄKYMÄ: Loki
   * ===================================================================== */
  function nakymaLoki(app) {
    const omat = Istuntovarasto.lue("lokiOmat", false);
    const rivit = S.loki.filter((l) => !omat || l.kuka === S.kayttaja.nimi);
    app.innerHTML = `
      <div class="section-title" style="margin-top:0"><h1 style="margin:0">Käyttöloki</h1><label class="check"><input type="checkbox" id="lokiOmat"${omat ? " checked" : ""}> Vain omat tapahtumat</label></div>
      <p class="muted small">Kirjautumiset, avatut esitietokoosteet ja lähdetiedot, estetyt pääsyt, arviot ja jatkotoimet. Demossa loki on tämän selaimen paikallisessa muistissa; tuotannossa loki on keskitetty ja muuttumaton.</p>
      <section class="card table-wrap">
        ${rivit.length ? `<table class="dtable"><thead><tr><th>Aika</th><th>Käyttäjä</th><th>Rooli</th><th>Tilanne</th><th>Asiakas</th><th>Toimenpide</th><th>Lisätieto</th></tr></thead>
        <tbody>${rivit.map((l) => `<tr><td class="nowrap">${new Date(l.aika).toLocaleString("fi-FI")}</td><td>${esc(l.kuka)}</td><td>${esc(l.rooli)}</td><td>${esc(l.tilanne)}</td><td>${esc(l.asiakas)}</td><td>${esc(l.toimenpide)}</td><td>${esc(l.kommentti || "")}</td></tr>`).join("")}</tbody></table>` : '<p class="empty">Ei lokimerkintöjä.</p>'}
      </section>`;
    $("#lokiOmat").addEventListener("change", (e) => { Istuntovarasto.kirjoita("lokiOmat", e.target.checked); nakymaLoki(app); });
  }

  /* =====================================================================
   * PAIKALLINEN AVUSTAJA (sääntöpohjainen, kertoo olevansa tekoäly)
   * ===================================================================== */
  function avaaChat(auki) {
    const oli = !$("#chat").hidden;
    $("#chat").hidden = !auki;
    $("#fab").setAttribute("aria-expanded", String(auki));
    if (auki) { paivitaChatChipit(); setTimeout(() => $("#chatInput")?.focus(), 30); }
    else if (oli) $("#fab").focus();
  }
  function chatViesti(kuka, html) {
    const el = document.createElement("div");
    el.className = "msg msg--" + kuka;
    el.innerHTML = html;
    $("#chatLog").appendChild(el);
    $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
  }
  function chatAloitus() {
    $("#chatLog").innerHTML = "";
    chatViesti("bot", `<strong>Hei! Olen tekoälyavustaja.</strong> Olen sääntöpohjainen ja toimin paikallisesti – en ole ihminen enkä kielimalli. Vastaan vain sinulle näkyvien tietojen perusteella. En tee diagnooseja, RAI-arviointia enkä päätöksiä; sinä arvioit ja päätät.`);
  }
  function paivitaChatChipit() {
    const el = $("#chatChips");
    if (!el) return;
    const q = S.asiakasId
      ? ["Mikä on muuttunut?", "Mihin havainnot perustuvat?", "Mitä kannattaa tarkistaa?", "Lääkitys", "Kaatumiset", "Miksi en näe kaikkea?"]
      : ["Ketkä tarkistan ensin?", "Montako havaintoa on arvioimatta?", "Miten säännöt toimivat?", "Oletko tekoäly?"];
    el.innerHTML = q.map((x) => `<button type="button" class="chip chip--btn">${esc(x)}</button>`).join("");
    $$("button", el).forEach((b) => b.addEventListener("click", () => kysy(b.textContent)));
  }
  function kysy(q) {
    chatViesti("user", esc(q));
    const vastaus = vastaa(q.toLowerCase());
    setTimeout(() => chatViesti("bot", vastaus + `<span class="msg__foot">Tekoälyavustaja · tarkista tiedot lähteistä</span>`), 180);
    lokiin({ asiakas: S.asiakasId ? nimi(asiakas(S.asiakasId)) : "–", toimenpide: "Avustajaa käytetty" });
  }
  function vastaa(q) {
    const an = S.asiakasId ? analyysi(S.asiakasId) : null;
    const lista = (arr) => `<ul>${arr.map((x) => `<li>${x}</li>`).join("")}</ul>`;
    if (/tekoäly|ihminen|kuka olet|botti|oletko/.test(q)) return "Olen tekoälyavustaja (sääntöpohjainen). En ole ihminen. Vastaukseni muodostetaan näkyvissä olevista tiedoista ennalta määritellyillä säännöillä, eivätkä ne korvaa ammattilaisen arviota.";
    if (/diagnoos|sairast|hoito-ohje|annos|päätä|myönn/.test(q)) return "En tee diagnooseja, hoitopäätöksiä tai palvelupäätöksiä. Voin koota tiedot ja kertoa, mihin havainnot perustuvat – tulkinta ja päätökset kuuluvat ammattilaiselle.";
    if (/sääntö|miten toimi|toimitko|peruste.*sään/.test(q)) return `Vertaan lähtötilanteen (palvelutarpeen arviointi ja palvelupäätös) jälkeen kertynyttä tietoa lähtötilanteeseen ${A.SAANNOT.length} säännöllä. Jokaisella havainnolla on sääntö, lähteet, ajankohta ja varmuus. Säännöt löytyvät sivulta <a href="#/saannot">Säännöt ja laatu</a>.`;
    if (!an) {
      const rivit = omatAnalyysit();
      if (/ensin|kiire|tärke|ketkä|kenet/.test(q)) {
        const pun = rivit.filter((r) => r.an.tila === "punainen");
        return pun.length ? `Merkittävä kielteinen muutos lähtötilanteeseen nähden ${pun.length} asiakkaalla (tilanne: ${esc(A.TILANTEET[S.tilanne].nimi)}):${lista(pun.map(({ a, an: x }) => `<a href="#/asiakas/${esc(a.id)}">${esc(nimi(a))}</a>: ${esc(x.signaalit[0].otsikko)}`))}Järjestys ei ole riskiluokitus.` : "Kenelläkään omista asiakkaistasi ei ole sääntöjen mukaan merkittävää muutosta.";
      }
      if (/arvioimatta|montako|kuinka monta/.test(q)) { const n = avoimetSignaalit().length; return `${n} havaintoa on vielä arvioimatta omissa asiakkaissasi.`; }
      return "Avaa asiakkaan esitietokooste, niin voin kertoa hänen tiedoistaan. Koontinäkymässä voit kysyä esim. ”Ketkä tarkistan ensin?”.";
    }
    const a = asiakas(S.asiakasId);
    const sig = an.signaalit.filter((s) => s.taso !== "tiedoksi");
    const loyda = (re) => an.signaalit.filter((s) => re.test(s.saanto) || re.test(s.otsikko.toLowerCase()));
    const sigTeksti = (s) => `<strong>${esc(s.otsikko)}</strong> (${esc(PITKA[TASO_TILA[s.taso]].toLowerCase())}, varmuus ${esc(s.varmuus)}): ${esc(s.mitaMuuttui)}`;
    if (/muuttu|muutos|tilanne|yhteenveto|kooste/.test(q)) return sig.length ? `${esc(nimi(a))}: ${lista(sig.map(sigTeksti))}` : `${esc(nimi(a))}: sääntöjen mukaan ei tarkistettavia muutoksia lähtötilanteeseen nähden. Tämä ei tarkoita, ettei muutosta olisi – vain, ettei sitä näy käytettävissä olevissa tiedoissa.`;
    if (/perustu|lähte|mistä|miksi/.test(q) && !/en näe|näe kaikk/.test(q)) return sig.length ? lista(sig.map((s) => `<strong>${esc(s.otsikko)}</strong>: ${s.lahteet.map((l) => `${fmtPvm(an.lahteet[l.id].pvm)} ${esc(an.lahteet[l.id].jarj.split(" · ")[1])} – ${esc(l.ote)}`).join("; ")}`)) + "Voit avata jokaisen lähteen havainnon kohdalta." : "Ei havaintoja, joiden lähteitä näyttää.";
    if (/tarkist|valmistau|kysy/.test(q)) return an.tarkistettavat.length ? `Ehdotan tarkistettavaksi:${lista(an.tarkistettavat.map(esc))}` : "Ei erityisiä tarkistettavia asioita.";
    if (/lääk/.test(q)) {
      if (!an.oikeudet.laakkeet) return "Lääkitystiedot eivät kuulu roolisi ja arviointitilanteesi käyttötarkoitukseen, joten en näe niitä.";
      const t = an.alueet.find((x) => x.id === "terveys");
      const f = [...t.lahto, ...t.jalkeen].filter((x) => /lääkitys/i.test(x.teksti)).map((x) => esc(x.teksti));
      const l = loyda(/LAAKITYS/);
      return lista([...f, ...l.map(sigTeksti)]) || "Ei lääkitystietoja.";
    }
    if (/kaatu|vamma|huimau|liikku/.test(q)) {
      const l = loyda(/KAATUMINEN|VAMMA|HUIMAUS/);
      const al = an.alueet.find((x) => x.id === "liikkuminen");
      return l.length ? lista(l.map(sigTeksti)) : `Ei kaatumisiin tai vammoihin liittyviä havaintoja. ${al.lahto.length ? "Lähtötilanteessa: " + al.lahto.map((x) => esc(x.teksti)).join("; ") : ""}`;
    }
    if (/mieli|masenn|ahdist|uni/.test(q)) { const l = loyda(/MIELIALA|UNI/); return l.length ? lista(l.map(sigTeksti)) + (an.oikeudet.lomakkeet ? "Voit täyttää PHQ-9- tai GAD-7-kyselyn asiakkaan kanssa – tulkinta on sinun." : "") : "Ei mielialaan liittyviä havaintoja näkyvissä tiedoissa."; }
    if (/en näe|näe kaikk|rajattu|oikeu|käyttötarkoi/.test(q)) {
      const ei = OIKEUS_NIMI.filter(([k]) => !an.oikeudet[k]).map(([, n]) => n);
      return `Roolisi on ${esc(rooli().nimi)} ja arviointitilanne ${esc(A.TILANTEET[S.tilanne].nimi)}. ${ei.length ? `Näitä tietoja ei näytetä, koska ne eivät kuulu tämän tilanteen käyttötarkoitukseen: ${ei.map(esc).join(", ")}.` : "Näet kaikki tämän tilanteen kannalta sallitut tiedot."} Agentti käsittelee vain sallittuja tietoja.`;
    }
    return "En tunnistanut kysymystä. Kokeile esim. ”Mikä on muuttunut?”, ”Mihin havainnot perustuvat?”, ”Mitä kannattaa tarkistaa?”, ”Lääkitys” tai ”Kaatumiset”.";
  }

  /* ---------- tooltip: hiiri, näppäimistö ja kosketus ---------- */
  const tip = $("#tooltip");
  let tipAjastin = 0;
  const naytaTip = (h, x, y) => {
    tip.textContent = h.dataset.tt; tip.hidden = false;
    if (x === undefined) { const r = h.getBoundingClientRect(); x = r.left + r.width / 2; y = r.bottom; }
    tip.style.left = Math.max(8, Math.min(x + 14, window.innerWidth - tip.offsetWidth - 8)) + "px";
    tip.style.top = Math.min(y + 16, window.innerHeight - tip.offsetHeight - 8) + "px";
  };
  document.addEventListener("pointerover", (e) => { if (e.pointerType === "touch") return; const h = e.target.closest?.("[data-tt]"); if (h) naytaTip(h, e.clientX, e.clientY); });
  document.addEventListener("pointermove", (e) => { if (tip.hidden || e.pointerType === "touch") return; tip.style.left = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8) + "px"; tip.style.top = e.clientY + 16 + "px"; });
  document.addEventListener("pointerout", (e) => { if (e.pointerType !== "touch" && e.target.closest?.("[data-tt]")) tip.hidden = true; });
  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    const h = e.target.closest?.("[data-tt]");
    clearTimeout(tipAjastin);
    if (!h) { tip.hidden = true; return; }
    naytaTip(h, e.clientX, e.clientY);
    tipAjastin = setTimeout(() => (tip.hidden = true), 4000);
  });
  document.addEventListener("focusin", (e) => { const h = e.target.closest?.("[data-tt]"); if (h) naytaTip(h); });
  document.addEventListener("focusout", (e) => { if (e.target.closest?.("[data-tt]")) tip.hidden = true; });

  // Tooltip-tieto myös näppäimistön ja ruudunlukijan käyttäjälle: jokainen [data-tt] saa
  // nimen ja (jos se ei ole valmiiksi kohdistettava) tabindexin. Asiakaskorttien sisällä
  // pisteitä ei tehdä kohdistettaviksi – kortin linkki ja tiivistelmä riittävät.
  function saavutettavat(juuri = document) {
    for (const el of juuri.querySelectorAll("[data-tt]:not([data-a11y])")) {
      el.dataset.a11y = "1";
      if (el.closest(".donut")) continue;
      const teksti = el.textContent.trim();
      if (teksti) el.insertAdjacentHTML("beforeend", `<span class="sr"> – ${esc(el.dataset.tt)}</span>`);
      else if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", el.dataset.tt);
      if (el.closest(".ccard") && !el.classList.contains("ind")) continue;
      if (!el.matches("a, button, input, select, textarea, [tabindex]")) {
        el.setAttribute("tabindex", "0");
        if (el instanceof SVGElement) el.setAttribute("role", "img");
      }
    }
  }
  new MutationObserver(() => saavutettavat()).observe(root, { childList: true, subtree: true });

  /* ---------- käynnistys ---------- */
  (async function () {
    if (!D || !Array.isArray(D.asiakkaat)) { root.innerHTML = '<p style="padding:2rem">Aineisto puuttuu (js/data.js). Aja tools/rakenna-aineisto.ps1.</p>'; return; }
    try { await alustaVarasto(); } catch (e) { root.innerHTML = `<p style="padding:2rem">${esc(e.message)}</p>`; return; }
    // Simuloitu AD-kertakirjautuminen etusivulta (login.html?ad=<tunnus>). Vain demo:
    // tuotannossa tunnistus tehdään Entra ID:llä palvelimella, ei selaimessa.
    const ad = new URLSearchParams(location.search).get("ad");
    if (ad) {
      history.replaceState(null, "", location.pathname + location.hash);
      const au = Varasto.lue("kayttajat", []).find((x) => x.tunnus === ad);
      if (au) {
        Istunto.luo(au.tunnus, false);
        kaynnistaSovellus(au);
        lokiin({ asiakas: "–", toimenpide: "Kirjautuminen (AD, demo)" });
        toast(`Tervetuloa, ${A.ROOLIT[au.rooli].nimi.toLowerCase()}`, `Esitiedot on koottu valmiiksi ${omatAsiakkaat().length} asiakkaalle.`);
        return;
      }
    }
    const i = Istunto.lue();
    const u = i && Varasto.lue("kayttajat", []).find((x) => x.tunnus === i.tunnus);
    if (u) kaynnistaSovellus(u); else nakymaKirjautuminen();
  })();
})();
