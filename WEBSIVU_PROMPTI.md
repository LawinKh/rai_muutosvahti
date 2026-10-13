# Prompt: Build the "RAI Muutosvahti" website (Finnish UI)

> Paste everything below the line into an AI coding assistant (Claude, Copilot, Cursor, Lovable, etc.).
> It is self-contained: the specification, all user-facing Finnish copy, the analysis rules and the full synthetic dataset are included.

---

## 0. Your task

Build a complete, working single-page web application called **RAI Muutosvahti**. It is a prototype for the SOTE AI Hackathon 2026 (Dipoli, Espoo, 13–14 Oct 2026; challenge: *"Enemmän aikaa asiakkaan kohtaamiseen"*).

**Language rule (mandatory):** All user-visible output must be in **Finnish**. That covers every heading, label, button, placeholder, tooltip, toast, error message, ARIA label, `<title>`, empty state, confirm dialog, generated summary text and date/number format. Set `<html lang="fi">`. Use Finnish formatting: dates as `d.m.yyyy` (e.g. `13.10.2026`, with no leading zeros), decimals with a comma (`61,5 kg`, `−6,3 %`), and `toLocaleString("fi-FI")` for timestamps. Code identifiers may be Finnish or English, but nothing English may reach the screen. Where this prompt gives Finnish text in quotes, use it **verbatim**.

**Core message:** *"AI ei päätä. AI huomaa. Ammattilainen arvioi ja kohtaa asiakkaan."* The app gathers the information that has built up since an older client's last **RAI assessment**. It compares that information with the RAI baseline, detects meaningful changes and shows them to the professional as **justified change signals** (*muutossignaalit*) to review. It never diagnoses, never produces a new RAI score and never makes decisions.

**Tech constraints:**
- Plain HTML + CSS + vanilla JavaScript. No build step, no framework, no backend, and no npm install. The app must work by opening `index.html` directly from disk (`file://`) and offline.
- File layout:
  - `index.html`: a minimal shell: `<div id="root">`, a toast container `#toasts` (`aria-live="polite"`), a tooltip `#tooltip` (`role="tooltip"`, hidden), then scripts in order `js/data.js`, `js/agent.js`, `js/app.js`. Inline SVG favicon: a rounded square in `#0f5566` with a white "pulse" polyline `M5 18h6l3-8 4 13 3-7h6`. Meta description: "RAI Muutosvahti – AI ei päätä. AI huomaa. Ammattilainen arvioi ja kohtaa asiakkaan."
  - `css/styles.css`: all styling, light and dark themes, responsive.
  - `js/data.js`: `window.MOCK_DATA = {...}` (dataset in Appendix A).
  - `js/agent.js`: the rule-based analysis engine, exposed as `window.RAIAgent`.
  - `js/app.js`: UI, login, routing, local persistence.
  - `data/mock-asiakkaat.json`: the same dataset as JSON (a knowledge source for a Copilot Studio agent).
- Escape every dynamic string before inserting it into HTML (`& < > " '`).

---

## 1. Persistence (localStorage)

- All keys use the prefix `raimv:`. Wrap every storage access in try/catch so the app still renders if storage is blocked.
- Keys: `data` (the full dataset), `kayttajat` (users), `istunto` (a remembered session), `kuittaukset` (professional reviews, keyed by signal key), `loki` (an action log, newest first, capped at 300 entries `{aika, kuka, asiakas, toimenpide, signaali?, kommentti?}`), and `viimeisin:<tunnus>` (last login ISO time).
- On first load, seed `data` from `window.MOCK_DATA` (deep clone) and seed the users.
- A size helper sums the key and value lengths ×2 bytes for all `raimv:` keys. It is shown in the user menu in KB (minimum 1).

## 2. Users, login and session

Demo users (password for both: `Muutosvahti2026`):

| tunnus | nimi | rooli | sees clients where |
|---|---|---|---|
| `anna` | Anna Esimerkki | Kotihoidon vastuuhoitaja | `vastuuhoitaja === "Anna Esimerkki"` → all 7 |
| `leena` | Leena Demo | Omalääkäri | `omalaakari === "Lääkäri Leena Demo"` → 4 (A001, A002, A005, A007) |

- Store passwords as **SHA-256(salt + ":" + password)** in hex, with a random 16-byte hex salt per user (`crypto.getRandomValues`, `crypto.subtle.digest`). If `crypto.subtle` is unavailable (some `file://` contexts), fall back to FNV-1a and prefix the result with `"fnv"`.
- Usernames are trimmed and lower-cased. After **5 failed attempts**, lock login for **30 seconds** and show "Liian monta epäonnistunutta yritystä. Yritä uudelleen N sekunnin kuluttua." A wrong password shows "Käyttäjätunnus tai salasana on virheellinen."
- Session: by default it lives in `sessionStorage` for **8 h**. With the "Muista minut tällä laitteella" checkbox it goes in `localStorage` for **7 days**. Treat expired sessions as absent. On startup, restore a valid session straight into the app.
- After login, show the toast "Tervetuloa, {etunimi}" with the text "Edellinen kirjautuminen {fi-FI aika}." or "Ensimmäinen kirjautuminen tällä laitteella." Then log "Kirjautuminen". Logout logs "Uloskirjautuminen", clears the session and the hash, and returns to the login view.

### Login view (two columns; stacks on mobile)
- **Left hero** (dark teal gradient): brand logo + "RAI Muutosvahti"; eyebrow "Ikääntyneiden palvelut"; H1 "AI ei päätä. AI huomaa."; lead "Ammattilainen arvioi ja kohtaa asiakkaan. Muutosvahti seuraa RAI-arviointien välillä kertyvää tietoa ja nostaa esiin asiakkaat, joiden tilanteessa on tapahtunut olennainen muutos."; a card with eyebrow "Arviointien välinen seuranta" and an ordered 5-step flow: "RAI-arviointi → Uusi tieto → Muutossignaali → Ammattilainen arvioi → Kohtaaminen"; footer "Synteettinen demoaineisto · SOTE AI Hackathon 2026".
- **Right form:** H2 "Kirjaudu sisään"; muted "Näet omat asiakkaasi ja heidän tilanteensa muutokset."; fields "Käyttäjätunnus" (autocomplete username, no autocapitalize/spellcheck) and "Salasana"; the checkbox; the button "Kirjaudu". Below that, "Demotunnukset (salasana **Muutosvahti2026**):" with one button per user (avatar initials, name, "{rooli} · tunnus {tunnus}"). Clicking one fills both fields. A lock-icon note reads "Tiedot tallennetaan vain tämän selaimen paikalliseen muistiin. Salasanoja ei tallenneta selkokielisinä." Document title: "Kirjaudu – RAI Muutosvahti". Autofocus the username field, or the password field if a username is prefilled.

## 3. App shell (after login)

- **Top bar:** the brand (links to `#/`); nav "Omat asiakkaat" (`#/`) and "Konsepti" (`#/konsepti`), with `aria-current="page"` on the active link; a **bell** icon button with a red count badge (hidden when 0, `aria-label` "Ilmoitukset: N tarkistamatonta muutosta"); a **user button** (avatar initials + name + role).
- **Notifications popover:** H2 "Tarkistettavat muutokset" plus the count. It lists every open red or orange signal of the user's clients that has no valid review, sorted by severity and then by newest `havaittu`. Each item links to `#/asiakas/{id}?s={saanto}` and shows the status pill, date, "**{nimi}** – {otsikko}", and the warning chip "Uutta tietoa tarkistuksen jälkeen" if a review has gone stale. When nothing is open, show the OK box "Kaikki muutokset on tarkistettu."
- **User menu** (`role="menu"`): a header with avatar, name and role, then:
  - "Lataa aineisto (JSON)": downloads the current data as `rai-muutosvahti-aineisto.json`.
  - "Tuo aineisto (JSON)": opens a hidden file input and validates the file (see §8). On success: save, re-analyse, log "Aineisto tuotu", toast "Aineisto tuotu" / "{n} asiakasta tallennettu paikallisesti.", and go to `#/`. On failure: toast "Tuonti epäonnistui" with the reason.
  - "Palauta demoaineisto": confirm "Palautetaanko alkuperäinen demoaineisto? Lisätyt kirjaukset ja arviot poistetaan." This resets the data and clears reviews, then shows the toast "Demoaineisto palautettu" / "Kirjaukset ja arviot nollattu."
  - "Tyhjennä paikallinen muisti": confirm "Tyhjennetäänkö kaikki tämän sivuston paikalliset tiedot? Sinut kirjataan ulos." This removes all `raimv:` keys and the session, re-seeds, and shows the login view.
  - Divider, then "Kirjaudu ulos".
  - A footer line: "Tallennettu tälle laitteelle: {kt} kt · {n} asiakasta · {m} arviota".
- Only one popover is open at a time. A click outside closes them, and **Escape** closes the popovers and the chat.
- **Footer:** "RAI Muutosvahti · AI ei päätä. AI huomaa. Ammattilainen arvioi ja kohtaa asiakkaan. · Synteettinen demoaineisto"
- **Floating action button**, bottom right, chat icon + "Kysy Muutosvahdilta". It toggles a chat panel with the header "Kysy Muutosvahdilta" / "Copilot Studio -agentti", a close button "×" (`aria-label` "Sulje"), and a **lazily inserted** iframe (`title` "Copilot Studio -agentti") pointing to this configurable constant:
  `https://copilotstudio.microsoft.com/environments/264bfa46-2de4-e3f7-a759-925d0f71914b/bots/kl_testiannahelpdesk_-QrDI8/webchat?__version__=2&enableFileAttachment=false&cliAgent=true`
- **Hash routing:** `#/` (home), `#/asiakas/{id}[?s={SAANTO}]` (client; ignore ids outside the user's own list and fall back to home), `#/konsepti`. On hash change: re-render, scroll to the top and focus `<main>`. Document titles: "Omat asiakkaat – RAI Muutosvahti", "{nimi} – RAI Muutosvahti", "Konsepti – RAI Muutosvahti".
- **Tooltips:** any element with `data-tt` shows `#tooltip` near the pointer (clamped to the viewport). For chart hit-circles, also highlight the sibling point.
- **Toasts:** stacked, auto-dismissed after 6.5 s, with a bold title + text and an optional colour variant per level (`punainen`/`oranssi`/`vihrea`).

## 4. Status vocabulary (shared UI elements)

| level | long name (`TASO_NIMI`) | short label | segment label | icon (shape, so colour is not the only cue) |
|---|---|---|---|---|
| `punainen` | Merkittävä muutos tarkistettavaksi | Merkittävä muutos | Merkittävä | triangle |
| `oranssi` | Seurattava muutos | Seurattava muutos | Seurattava | diamond |
| `vihrea` | Ei uusia merkittäviä signaaleja | Ei uusia signaaleja | Ennallaan | circle |
| `info` | Tiedoksi | Tiedoksi | – | small circle |

Severity order: `punainen` 3 > `oranssi` 2 > `info` 1.

Certainty chip ("Havainto: {varmuus}"), with a tooltip from this table. The `epävarma` and `ristiriitainen` values get a warning style.
- selvä: "Havainto perustuu toistuvaan tai mitattuun tietoon."
- kohtalainen: "Havainto perustuu useampaan kirjaukseen."
- epävarma: "Havainto perustuu yksittäiseen tietoon – varmista ennen johtopäätöksiä."
- ristiriitainen: "Tiedoissa on myös havaintoa vastaan puhuvaa tietoa."

## 5. Home view "Omat asiakkaat" (`#/`)

1. **Hero** with a gradient background: eyebrow "Hei {etunimi} · {rooli}"; H1 "**Huomaa muutos ennen seuraavaa RAI-arviointia**"; lead "RAI-arviointi kuvaa asiakkaan tilannetta arviointihetkellä. Sen jälkeen tietoa kertyy jatkuvasti – käynneistä, kirjauksista, mittauksista ja palvelujen käytöstä. Muutosvahti vertaa uutta tietoa lähtötilanteeseen ja nostaa esiin ne asiakkaat, joiden tilanne on muuttunut."; a 5-step cycle "RAI-arviointi · Uusi tieto · Muutossignaali · Sinä arvioit · Kohtaaminen" (`aria-label` "Toimintamalli").
   - **Donut chart** (SVG, r=62, small gaps between segments, starting at 12 o'clock) of client counts per status. The centre shows the red + orange count and "/ {n} tarkistettavana". Each segment has a tooltip "{TASO_NIMI}: N asiakasta", and the SVG has a full `aria-label`.
   - **Legend buttons** for each status (long name + count, with `aria-pressed`). Clicking one toggles that status filter and smooth-scrolls to the list.
   - Footer stats: "**N** uutta merkintää RAI-arviointien jälkeen" and "**N** tarkistamatta · **N** RAI-arviota ≤ 30 vrk".
2. **"Tarkista nämä ensin"** (only if any client is red), with the subtitle "Merkittävä muutos RAI-lähtötilanteeseen verrattuna". It shows featured large cards for all red clients, sorted by signal count descending.
3. **"Kaikki omat asiakkaat"**, subtitle "{n} asiakasta vastuuhoitajana" (or "omalääkärinä" for the GP role). Toolbar:
   - "Hae": a search input, placeholder "Asiakkaan nimi", filtering by name substring (case-insensitive).
   - "Tila": a segmented control "Kaikki / Merkittävä / Seurattava / Ennallaan" (with icons).
   - "Muutoksen aihe": a select, "Kaikki" + the distinct `teema` values of the user's non-info signals, sorted.
   - "Palvelu": a select, "Kaikki palvelut" + the distinct service types.
   - Filters persist in memory while navigating. The list is sorted by status severity, then by name (`localeCompare(…, "fi")`). Empty state: "Ei hakua vastaavia asiakkaita."
4. **Client card** (the whole card is a link to the client view; the left border colour shows the status): an avatar with initials, coloured by status; the name (plus a chip "uutta" if a new entry this session created or changed a signal); "{ikä} v · {palvelu}"; the status pill. On featured cards, a lead "**{top signal otsikko}.** {mitaMuuttui}". Then a compact **RAI bar** (§6). Then either "Tilanne vastaa RAI-lähtötilannetta." (no signals) or up to 3 signal chips (featured cards skip the first, already shown in the lead). The footer reads "{n} uutta merkintää" and "{tarkistettu}/{n} tarkistettu" (or "Ei tarkistettavaa").

## 6. The "RAI-väli" bar (signature visual)

This is a horizontal timeline from the last RAI assessment date (`rai.pvm`) to the next due date (`raiErapaiva`).
- A filled portion runs up to "today" (the dataset's `viitepaiva`). The bar has start and end caps and a "today" marker.
- There is one dot per event with `rai.pvm < pvm ≤ viitepaiva`, positioned proportionally. A dot is coloured red or orange if that event id is a source of a red or orange signal (take the highest level). Other dots are neutral grey. Draw coloured dots last so they sit on top. Every dot has a tooltip "{d.m.yyyy} · {event text}", where the event text is: for a measurement, "Paino {x,x} kg[ – {huomio}]"; for a contact, "{palvelu}: {teksti}"; otherwise `teksti`.
- Labels: "**RAI** {date}" on the left. On the right, "Seuraava RAI {date}", or, when overdue, "**Seuranta-arvio myöhässä N vrk**" with an alert style.
- **Large variant** (client view): it is taller, has a "Tänään" label above the today marker, and its dots are clickable (they scroll to and flash the matching timeline item).
- `role="img"` with `aria-label` "Edellinen RAI-arviointi {d}, seuraava {d}. Välillä N uutta merkintää, joista M liittyy havaittuihin muutoksiin."

## 7. Client view (`#/asiakas/{id}`)

The back link "← Omat asiakkaat". Viewing a client clears its "uutta" flag.

**Header card:** a large avatar; H1 name; a meta row "{ikä} v · {palvelu} · Omalääkäri: {…} · Vastuuhoitaja: {…} · {asuu}"; a large status pill with the long name. A section titled "**Arviointien välinen seuranta**" follows, with the text "{n} uutta merkintää edellisen RAI-arvioinnin jälkeen. Värilliset pisteet liittyvät havaittuihin muutoksiin – valitse piste nähdäksesi merkinnän.", the large RAI bar, and a key "Merkintä · Seurattava muutos · Merkittävä muutos · Tänään {d}".

**Two-column layout** (main + aside; it becomes one column below about 1040 px):

Main column:
1. **"Tilannekuva"** card with a sparkle icon: the generated summary text (§9).
2. **"Havaitut muutokset"** (subtitle "Tärkeysjärjestyksessä"). It shows one collapsible `<details>` per signal (colour-coded left border), or the OK box "Tilanne vastaa RAI-lähtötilannetta. Ei uusia merkittäviä muutoksia." when there are none.
   - Summary: the title, a chevron, then a sub-row with the status pill · teema · date · certainty chip (not for info) · "✔ Tarkistettu" chip if reviewed · "Uutta tietoa tarkistuksen jälkeen" warning chip if the review is stale.
   - Body sections, each with a small uppercase label: "Mitä muuttui"; "Peruste" (not for info); "Lähteet" (a list of "{date} · {lähde}" + quote, with a small "näytä" button that jumps to the timeline item, except for the pseudo-source id `RAI`); "Huomioi myös" (counter-evidence, only if any); "Tarkista" (bullet list).
   - **Professional review** (not for info signals). If unreviewed, show the form "Oma arviosi" with the select "Toimenpide" offering: "Tarkistettu – ei toimenpiteitä", "Otetaan puheeksi seuraavalla käynnillä", "RAI-arviointi aikaistetaan", "Palvelu- ja hoitosuunnitelma päivitetään", "Konsultoitu omalääkäriä", "Havainto ei pidä paikkaansa"; the input "Kommentti" (max 300); and the button "Tallenna arvio". Saving stores `{tila, kommentti, aika, kuka, todisteita: lahteet.length}` under the signal key `"{asiakasId}:{SAANTO}"`. It also logs the action, shows the toast "Arvio tallennettu" / "{nimi}: {tila}", re-renders with the signal open, and updates the bell. If reviewed, show "✔ **{tila}** – {kuka}, {aika fi-FI}" + "”{kommentti}”" and a "Peru" button that removes the review.
   - **Stale review:** if the signal now has more sources than `todisteita`, treat the review as invalid (the signal reappears in the bell and gets the warning chip).
   - With `?s=SAANTO` in the URL, open that signal and scroll to it.
3. **"Valmistaudu kohtaamiseen"**, subtitle "Asiat, jotka kannattaa tarkistaa asiakkaan kanssa.": a numbered list of the analysis `tarkistettavat`. If empty: "Ei erityisiä tarkistettavia asioita. Seuraava RAI-seuranta-arvio {d}."
4. **"Tapahtumat ja kirjaukset"** with a segmented filter "Kaikki / Muutoksiin liittyvät / Kirjaukset / Mittaukset / Palvelut". "Kirjaukset" includes medication changes, and "Muutoksiin liittyvät" means events that are sources of red or orange signals.
   - The sub-heading "Paino RAI-arvioinnin jälkeen" with an **SVG line chart** (viewBox 640×190): the x-axis runs from the RAI date to `viitepaiva` with Finnish month labels (tammi, helmi, maalis, huhti, touko, kesä, heinä, elo, syys, loka, marras, joulu); the y-axis has integer gridlines; a dashed reference line is labelled "RAI-lähtötaso {x,x} kg"; the first point is the RAI baseline. Each point has a large invisible hit circle with the tooltip "{d}: {x,x} kg (+/−{Δ} kg)[ – {huomio}]", and the last value is labelled in bold. If there are fewer than 2 points: "Ei painomittauksia RAI-arvioinnin jälkeen."
   - **Vertical timeline**, newest first: the date, a dot (coloured by linked signal level), the event text, and a source line "{Kirjaus|Mittaus|Palvelukontakti|Lääkitysmuutos} · {lähde} · {tekijä} · **{short level, lower-case}**". Newly added entries are highlighted. The last item is always "**RAI-arviointi – lähtötilanne**" / {arvioija}. Empty filter: "Ei merkintöjä valinnalla." Jumping to an item scrolls it to the centre and plays a flash animation.

Aside:
1. **"RAI-lähtötilanne"**, "Arvioitu {d} · {arvioija}". A metrics table (show only the ones that exist), with the scale in muted text: "Päivittäiset toiminnot (ADLH)" 0–6, "Kognitio (CPS)" 0–6, "Mieliala (DRS)" 0–14, "Kipu (PAIN)" 0–3, "Terveydentilan vakaus (CHESS)" 0–5, "Palvelutarve (MAPLe)" 1–5, "Painoindeksi (BMI)", "Paino" kg. Non-integers use a comma decimal. Below it, a `<details>` "Toimintakyky arviointihetkellä" with a definition list of domains labelled: arki → "Arjessa selviytyminen", liikkuminen → "Liikkuminen", kognitio → "Kognitio", kommunikointi → "Kommunikointi", mieliala → "Mieliala", sosiaalinen → "Sosiaalinen osallistuminen", kipu → "Kipu", ravitsemus → "Ravitsemus", kaatumisriski → "Kaatumisriski". Then "**Seuraava seuranta-arvio:** {d} ({n} vrk | myöhässä {n} vrk)".
2. **"Uusi kirjaus"**, "Lisää havainto käynniltä – tilannekuva päivittyy heti.". A form:
   - "Tyyppi": Hoitokirjaus (`kirjaus`), Painomittaus (`mittaus`), Palvelukontakti (`kontakti`), Lääkitysmuutos (`laakitys`).
   - "Päivämäärä": a date input, default `viitepaiva`, with min = RAI date and max = `viitepaiva`.
   - "Palvelu" (only for contacts): Päivystys / Ensihoito / MTP-palvelut / Omalääkäri / Kotihoito (values `päivystys`, `ensihoito`, `MTP`, `omalääkäri`, `kotihoito`).
   - "Paino (kg)" (only for measurements): step 0.1, min 20, max 250; accept a comma.
   - "Kirjaus" textarea (hidden for measurements), placeholder "Esim. Kaatui kylpyhuoneessa, löydetty lattialta."
   - Buttons: "Tallenna kirjaus" (primary) and "Esimerkki", which sets the type to a care note and fills "Kaatui kylpyhuoneessa iltakäynnin aikana, löydetty lattialta. Kertoo huimaavan."
   - Validation toasts: "Tarkista paino" / "Anna paino kilogrammoina." and "Kirjaus puuttuu" / "Kirjoita havainto."
   - On save, create the event `{id: "{asiakasId}-U{Date.now().toString(36)}", pvm, tyyppi, uusi: true, tekija: <user name>, …}` with `lahde` "Mittaustiedot" | "Palvelutapahtumat" | "Lääkityslista" | "Hoitokertomus" (and `mittari: "paino"`, `arvo` for measurements). Push it, save, re-analyse **all** clients, and log "Kirjaus lisätty".
   - Compare the signals before and after. A non-info signal counts as "changed" if it is new, has risen in level, or has more sources. For each changed signal, show the toast "Uusi muutos havaittu: {nimi}" (or "Muutos täsmentyi: {nimi}" if it already existed) with the text "{short level} – {otsikko}." in that level's colour. If the client's overall status changed, also show "Asiakkaan tila muuttui" / "{old short} → {new short}". Mark the client "uutta" and open the first changed signal. If nothing changed: "Kirjaus tallennettu" / "Tilannekuva päivitetty – ei uusia muutoksia."

## 8. Import validation (Finnish error messages)

- `asiakkaat` missing or not an array: "Puuttuu kenttä 'asiakkaat'."
- `viitepaiva` not `YYYY-MM-DD`: "Puuttuu kenttä 'viitepaiva' (VVVV-KK-PP)."
- A client lacking `id`/`nimi`/`palvelu`: "Asiakkaalta puuttuu id, nimi tai palvelu."
- Missing `rai.pvm`/`rai.mittarit`/`rai.alue`: "Asiakkaalta {id} puuttuu RAI-lähtötilanne."
- `tapahtumat` not an array: "Asiakkaalta {id} puuttuu 'tapahtumat'."
- Default a missing `rai.edeltavat90pv` to `{paivystys:0, mtp:0, kaatumiset:0}`, and keep the existing `ammattilainen` if the file has none.

## 9. Analysis engine (`js/agent.js` → `window.RAIAgent`)

Expose `analysoi(asiakas, {viitepaiva})`, `SAANNOT`, `TEEMAT`, `TASO`, `TASO_NIMI`, `RAI_VALI_KK`, `SAANTOVERSIO = "demo-1.0"` and `util: {fmtPvm, fmtNum, erotusPv, lisaaKk, lisaaPv}`. Use UTC date math (`Date.parse(s + "T00:00:00Z")`, day differences rounded). The thresholds are **demo rules, not official RAI alert limits**, so say so in the UI copy and the comments.

**Follow-up interval** (`RAI_VALI_KK`): Kotihoito 6 months, Yhteisöllinen asuminen 6, Ympärivuorokautinen palveluasuminen 12 (default 6). `raiErapaiva = rai.pvm + months`, and `raiJaljellaPv = erotusPv(raiErapaiva, viitepaiva)`.

**Context:** take the events with `rai.pvm < pvm ≤ viitepaiva`, sorted ascending. From those, derive the care notes (`kirjaus`), weights (`mittaus` with `mittari:"paino"`), contacts, medication changes, and the subsets of contacts and notes within the **last 90 days** (`pvm ≥ viitepaiva − 90`).

**Free-text themes.** Split notes into sentences on `(?<=[.!?])\s+`. For each sentence, test the *reassuring* regex **first**: a match adds counter-evidence. Otherwise, a *concern* match adds a source. Source reference = `{id, pvm, lahde, ote: sentence}`. Use these regexes exactly (case-insensitive):

| key | nimi | concern (`huoli`) | reassuring (`rauhoittava`) |
|---|---|---|---|
| ravitsemus | Ravitsemus | `ruokahalu (heikentynyt\|huono\|vähäinen\|laskenut)\|ei maistu\|ettei ruoka maista\|syö(nyt)? vähän\|syöty puolet\|jättää aterioita\|jättänyt aterio\|koskemattomia aterioita\|laihtu\|nielemis` | `ruokahalu (hyvä\|normaali)\|syö hyvin\|söi hyvin` |
| kaatuminen | Kaatumiset | `kaatu\|lattialta\|lattialla\|kompastu` | `ei kaatumisia\|ei ole kaatunut` |
| toimintakyky | Toimintakyky ja arjessa selviytyminen | `tarvitsi apua\|tarvitsee apua\|avustettu\|avustettava\|aiemmin (selvinnyt\|liikkui)\|ei selviydy\|liikkuminen (heikentynyt\|varovaista)\|rollaattoria myös sisällä` | `selviytyy itsenäisesti\|kuten ennenkin` |
| kognitio | Kognitio ja lääkehoidon toteutuminen | `unohta\|kysyi samaa\|toistaa samaa\|sekava\|eksyi\|ottamatta` | `muisti ennallaan` |
| mieliala | Mieliala ja jaksaminen | `itkuinen\|alakulo\|mieliala (matala\|laskenut)\|ei jaksa\|ettei jaksa\|toivoton\|ahdistu` | `mieliala hyvä\|hyväntuulinen` |
| sosiaalinen | Yksinäisyys ja sosiaalinen osallistuminen | `yksinäi\|ei ole osallistunut\|ei ole käynyt\|eristäyty\|muuttanut .*ulkomaille\|ystävä kuollut` | `omaiset vierailleet\|osallistui\|käy puolison kanssa` |
| terveydentila | Terveydentila | `turvoksissa\|turvotus\|hengästy\|huimaa\|kuume` | `ei turvotusta\|voi(vansa)? hyvin` |

**Signal object:** `{saanto, teema, saantokuvaus, taso, varmuus, otsikko, mitaMuuttui, perustelu, havaittu, lahteet[], vastanaytto[], tarkistettavat[], avain: "{asiakasId}:{saanto}"}`. Run the rules in this order. Each rule receives the context and the signals produced so far.

1. **PAINO_LASKU** (teema "Ravitsemus"). The baseline is `rai.mittarit.paino`, and `last` is the latest weight. Skip if the change is greater than −3 %. Count how many of the latest measurements in a row are ≤ −3 % (`perakkain`); `toistuva = perakkain ≥ 2`. Sources: every measurement ≤ −3 % (and the last one), quoted as "Paino x,x kg[ – huomio]", plus the nutrition concern sentences. Counter-evidence: nutrition reassuring sentences, plus "Mittauksen huomio: {huomio}" if the last measurement has a `huomio`.
   - ≤ −5 % and `toistuva` → **punainen**, varmuus "ristiriitainen" if any counter-evidence, otherwise "selvä".
   - Otherwise → **oranssi**, "kohtalainen" if `toistuva`, else "epävarma".
   - otsikko: "Paino laskenut toistuvissa mittauksissa" / "Yksittäinen poikkeava painomittaus".
   - mitaMuuttui: "Paino {lähtö} kg → {viim} kg (−{kg} kg, {pct} %) RAI-arvioinnin jälkeen." + (if there are nutrition concerns) " Samalla kirjauksissa kuvataan heikentynyttä ruokahalua tai aterioiden väliin jättämistä."
   - perustelu: "Lasku näkyy {n} peräkkäisessä mittauksessa." / "Lasku näkyy vain viimeisimmässä mittauksessa; aiemmat mittaukset ovat lähellä lähtötasoa."
   - havaittu: the first measurement ≤ −3 %.
   - tarkistettavat, if toistuva: "Tarkista ravitsemustilanne asiakkaan kanssa.", "Onko ruokahalun muutokselle asiakkaan kuvaamaa syytä?", "Tarvitaanko ravitsemuksen arviointia tai ateriapalvelun muutosta?". Otherwise: "Toista punnitus samalla vaa'alla ja vastaavissa olosuhteissa ennen johtopäätöksiä.", "Vastaako asiakkaan oma kuvaus ruokahalusta mittausta?"
2. **PAINO_NOUSU** (teema "Terveydentila"). Build the series [RAI baseline (id "RAI"), …weights]. Find the largest rise ≥ 2 kg between any two points ≤ 14 days apart. If there is none and the total rise is < 5 %, skip. Sources: the measurements above baseline + health concern sentences; counter-evidence: health reassuring sentences.
   - Fast rise → **punainen**, "selvä", "Nopea painonnousu", "Paino noussut {a} kg → {b} kg (+{d} kg) {n} vuorokaudessa." + (if there are health concerns) " Samaan aikaan kirjauksissa mainitaan turvotusta tai hengästymistä."; perustelu "Nopea painonmuutos lyhyellä aikavälillä on syytä tarkistaa ammattilaisen toimesta."; havaittu = the later point; checks "Tarkista asiakkaan vointi ja kirjauksissa mainitut oireet.", "Konsultoi sairaanhoitajaa tai omalääkäriä yksikön ohjeen mukaisesti.", "Toista punnitus seuraavilla käynneillä."
   - Otherwise → **oranssi**, "kohtalainen", "Paino noussut lähtötasosta", "Paino {lähtö} kg → {viim} kg (+{pct} %).", "Nousu on asteittainen.", check "Seuraa painoa ja kirjaa mahdolliset turvotukset."
3. **KAATUMISET** (teema "Kaatumiset"). Sources: fall-concern sentences in the last-90-day notes + last-90-day contacts whose text matches the fall regex, sorted by date. Count the distinct days; skip if 0. Add to the sources the first medication change dated before the first fall day, and any last-90-day health sentences matching `huimaa`. The signal is **punainen** if days ≥ 2 and days > `edeltavat90pv.kaatumiset`, otherwise **oranssi**. varmuus: "ristiriitainen" if there is fall counter-evidence, else "selvä".
   - otsikko "Toistuvia kaatumisia" / "Kaatumiseen viittaava kirjaus".
   - mitaMuuttui "{n} kaatumiseen viittaavaa tapahtumaa viimeisen 90 vrk aikana (RAI-arviota edeltävällä jaksolla {x})." + (if med change) " Lääkitystä on muutettu {d} ennen ensimmäistä kaatumista."
   - perustelu "Kaatumiset on tunnistettu hoitokertomuksen ja palvelutapahtumien kirjauksista."
   - checks: "Tarkista kaatumisten olosuhteet ja asiakkaan oma kuvaus.", then either "Tarkista lääkitysmuutoksen ajallinen yhteys huimaukseen ja kaatumisiin omalääkärin kanssa." (with med change) or "Onko lääkityksessä tapahtunut muutoksia?", then "Tarvitaanko kaatumisriskin arviointia, apuvälineitä tai kodin muutostöitä?"
4. **PAIVYSTYS** (teema "Palvelujen käyttö"). Count last-90-day contacts with `palvelu` ∈ {päivystys, ensihoito}; skip if 0. The signal is **punainen** if count ≥ 2 and count > `edeltavat90pv.paivystys`, else **oranssi**; "selvä"; "Päivystys- ja ensihoitokontaktit lisääntyneet"; "{n} päivystys- tai ensihoitokontaktia viimeisen 90 vrk aikana (RAI-arviota edeltävällä jaksolla {x})."; "Laskettu palvelutapahtumista."; sources quoted "{palvelu}: {teksti}"; checks "Mikä on johtanut päivystyskontakteihin?", "Vastaako nykyinen palvelu asiakkaan tarvetta?"
5. **MTP** (teema "Mieliala ja jaksaminen"). growth = last-90-day `MTP` contacts − `edeltavat90pv.mtp`; skip if < 1. The signal is **punainen** if growth ≥ 3, else **oranssi**; "selvä"; "MTP-palvelujen asiointi lisääntynyt"; "{n} MTP-kontaktia viimeisen 90 vrk aikana (RAI-arviota edeltävällä jaksolla {x})." + (if there are mood concerns) " Kirjauksissa kuvataan myös matalaa mielialaa tai jaksamattomuutta."; "Laskettu palvelutapahtumista. Kontaktien sisältöä ei tulkita, vain määrän muutos."; sources: the MTP contacts ("MTP: …") + mood concerns; counter-evidence: mood reassurance; checks "Keskustele asiakkaan kanssa mielialasta ja jaksamisesta.", "Onko MTP-palvelujen ja kotihoidon/asumisen välillä sovittu yhteistyöstä?", "Onko RAI-arvioinnin mieliala- ja sosiaalisen osallistumisen osio enää ajantasainen?"
6. **LAAKITYS** (teema "Lääkitys"). Any medication change → **oranssi**, "selvä", "Lääkitys muuttunut RAI-arvioinnin jälkeen", mitaMuuttui = the joined "{d}: {teksti}", perustelu "Lääkitysmuutokset voivat vaikuttaa toimintakykyyn; RAI-lähtötilanne ei sisällä muutosta.", check "Onko muutoksen jälkeen kirjattu uusia oireita tai toimintakyvyn muutoksia?"
7. **TEKSTI_{TOIMINTAKYKY|KOGNITIO|MIELIALA|SOSIAALINEN|TERVEYDENTILA|RAVITSEMUS}** (teema = the theme name). Skip ravitsemus if PAINO_LASKU fired, mieliala if MTP fired, and terveydentila if PAINO_NOUSU fired (no duplication). Concern sentences on **≥ 2 distinct days** → **oranssi** (free text alone never makes a signal red). varmuus "ristiriitainen" if there is counter-evidence, else "kohtalainen".
   - otsikko "Uusia kirjauksia: {nimi lower-case}".
   - mitaMuuttui "{n} kirjausta eri päivinä viittaa muutokseen. RAI-lähtötilanne: {domain text}", where the domain map is toimintakyky→arki, kognitio→kognitio, mieliala→mieliala, sosiaalinen→sosiaalinen, terveydentila→kipu, ravitsemus→ravitsemus.
   - perustelu: "Kirjauksissa on myös muutoksen kanssa ristiriitaisia mainintoja – tulkinta vaatii ammattilaisen arvion." or "Havainto perustuu vapaatekstiin, ei mittaukseen."
   - checks:
     - toimintakyky: "Onko avuntarve lisääntynyt pysyvästi vai tilapäisesti?", "Vastaako palvelu- ja hoitosuunnitelma nykyistä avuntarvetta?"
     - kognitio: "Toteutuuko lääkehoito turvallisesti?", "Onko muistin muutos uusi vai aiemmin tunnettu?"
     - mieliala: "Keskustele asiakkaan kanssa mielialasta ja jaksamisesta."
     - sosiaalinen: "Onko asiakkaan sosiaalinen tukiverkosto muuttunut?", "Olisiko tarjolla ryhmä-, päivä- tai vapaaehtoistoimintaa?"
     - terveydentila: "Tarkista asiakkaan vointi ja konsultoi tarvittaessa yksikön ohjeen mukaan."
     - ravitsemus: "Tarkista ravitsemustilanne asiakkaan kanssa."
8. **RAI_ERAANTYY** (teema "RAI-arvioinnin ajankohta"). Skip if more than 30 days are left. Overdue → **oranssi** "RAI-seuranta-arvio myöhässä" / "Seuranta-arvio olisi pitänyt tehdä {d} ({n} vrk sitten)."; otherwise → **info** "RAI-seuranta-arvio erääntyy pian" / "Seuranta-arvio erääntyy {d} ({n} vrk)."; perustelu "Palvelumuoto: {palvelu}."; havaittu = viitepaiva; source `{id:"RAI", lahde:"RAI-arviointi", ote:"Edellinen arviointi {d}"}`; check "Sovi seuranta-arvion ajankohta."

**Result.** Sort signals by level descending, then `havaittu` descending. `tila` = punainen if any signal is red, else oranssi if any is orange, else vihrea (info does not count). `tarkistettavat`: if red, start with "Arvioi, edellyttääkö muutos RAI-arviointia suunniteltua aiemmin tai palvelu- ja hoitosuunnitelman päivittämistä."; then add the unique checks of all signals; cap at 8. `tilasto`: {kirjaukset, mittaukset, kontaktit, tapahtumat}.

**Tilannekuva** (rule-based summary, Finnish). Start with "RAI-arviointi on tehty {d} ({n} vrk sitten). Tarkastelujaksolla on {N} uutta merkintää ({k} kirjausta, {m} mittausta, {c} palvelukontaktia)."
- If green, continue: " Uusissa tiedoissa ei havaittu lähtötilanteeseen nähden merkittäviä muutossignaaleja. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä."
- Otherwise append, as applicable:
  - "Merkittäviä muutoksia tarkistettavaksi: {otsikot lower-first joined by '; '}."
  - "Seurattavia muutoksia: …."
  - "Osa havainnoista on epävarmoja tai ristiriitaisia (…), joten niitä ei tule tulkita varmoiksi muutoksiksi."
  - Always end with "Kyse on muutossignaaleista, ei diagnoosista tai uudesta RAI-tuloksesta – ammattilainen arvioi jatkotoimet."

**Optional extras (include as functions; not wired into the UI by default):**
- `vastuullisuustarkistus(teksti)` returns the reasons for any forbidden phrasing:
  - `\bdiagnoosi(ksi)? on\b|\bsairastaa\b|\bon todettu\b` → "Diagnoosiin viittaava ilmaus"
  - `\bRAI[- ]?(pisteet|tulos|luokka) (on|ovat|nousee|laskee|muuttuu)\b` → "RAI-tuloksen muuttaminen"
  - `\b(päätetään|on päätetty|myönnetään|evätään|lopetetaan palvelu)\b` → "Palvelu- tai hoitopäätös"
  - `\b(aloita|lopeta|muuta) (lääke|lääkitys|annos)` → "Itsenäinen hoitotoimenpide"
  - `\briskipisteet\b|\briskiluokka\b` → "Riskipisteytys / profilointi"
- `kielimalliKoonti(asiakas, analyysi, apiAvain, malli)`: an optional LLM summary via the Claude Messages API from the browser (user-supplied key, header `anthropic-dangerous-direct-browser-access: true`, JSON-schema structured output with the fields `yhteenveto`, `signaalikommentit[{saanto,kommentti,lahdeIdt}]`, `lisahavainnot[{havainto,lahdeIdt}]`, `epavarmuudet[]`, `tarkistettavat[]`). Use the system prompt from §11, require Finnish output, and run the responsibility check on the result. Only for synthetic data.

## 10. Concept view (`#/konsepti`), Finnish copy

- Hero: eyebrow "RAI Muutosvahti"; H1 "AI ei päätä. AI huomaa. Ammattilainen arvioi ja kohtaa asiakkaan."; text "Muutosvahti kokoaa ikääntyneen asiakkaan RAI-arvioinnin jälkeen kertyneen asiakas- ja potilastiedon, tunnistaa tilanteessa tapahtuneet olennaiset muutokset ja tuo ne ammattilaisen tarkistettavaksi – oikea huomio oikeaan aikaan."
- Two cards:
  - **Haaste**: "RAI-arviointi kuvaa asiakkaan toimintakykyä arviointihetkellä. Seuraava arviointi tehdään usein vasta puolen vuoden tai vuoden kuluttua." / "Välillä tietoa kertyy jatkuvasti käynneistä, kirjauksista, mittauksista ja palvelujen käytöstä. Olennainen muutos voi jäädä huomaamatta suuren tietomäärän joukkoon – ja ammattilaisen aika kuluu tiedon etsimiseen."
  - **Ratkaisu**: "Muutosvahti vertaa uutta tietoa asiakkaan aiempaan RAI-lähtötilanteeseen ja muodostaa tiiviin tilannekuvan. Jokainen havainto näytetään perusteluineen: mitä muuttui, milloin ja mihin tietoon havainto perustuu." / "Ammattilainen arvioi, edellyttääkö muutos RAI-arviointia suunniteltua aiemmin tai palvelu- ja hoitosuunnitelman päivittämistä."
- **"Näin se toimii"**, 5 numbered steps:
  - RAI-lähtötilanne: "Edellinen arviointi on vertailupiste: toimintakyky, ravitsemus, kognitio ja sosiaalinen tilanne."
  - Uusi tieto: "Kirjaukset, mittaukset, palvelukontaktit ja lääkitysmuutokset kertyvät aikajanalle."
  - Muutoksen tunnistus: "Uutta tietoa verrataan lähtötilanteeseen ja olennaiset muutokset kootaan yhteen."
  - Perusteltu havainto: "Muutos näytetään lähteineen ja ajankohtineen, tärkeysjärjestyksessä."
  - Ammattilaisen arvio: "Ammattilainen tarkistaa, kirjaa arvionsa ja kohtaa asiakkaan valmistautuneena."
- **"Mitä Muutosvahti huomaa"**, 8 icon tiles (4 columns, 2 on tablet):
  - Painon muutos: "Toistuva lasku tai nopea nousu mittauksissa."
  - Kaatumiset: "Kaatumisiin liittyvien havaintojen lisääntyminen."
  - Palvelujen käyttö: "Päivystys- ja ensihoitokontaktien lisääntyminen."
  - Mieliala: "Mielenterveys- ja päihdepalvelujen asioinnin muutos."
  - Arjessa selviytyminen: "Lisääntynyt avuntarve ja toimintakyvyn muutokset."
  - Ravitsemus: "Heikentynyt ruokahalu ja aterioiden väliin jättäminen."
  - Yksinäisyys: "Sosiaalisen osallistumisen ja läheisavun muutokset."
  - Lääkitys ja terveys: "Lääkitysmuutokset ja uudet oireet."
- A large quote: "Entä jos ammattilaisen ei tarvitsisi itse etsiä asiakkaan *muuttunutta tilannetta* tuhansien tietojen joukosta?" (highlight the emphasised part in the accent colour).
- Three benefit cards:
  - **Ikäihmiselle**: "Muuttunut tilanne huomataan aiemmin, ja tuki voidaan arvioida oikea-aikaisesti. Turvallisempaa elämää kotona."
  - **Ammattilaiselle**: "Vähemmän tiedon etsimistä, nopeampi kokonaiskuva ja enemmän aikaa asiakkaan kohtaamiseen."
  - **Organisaatiolle**: "Arviointityö kohdentuu asiakkaisiin, joiden tilanteessa on havaittu muutos. Tukee omalääkärimallia ja sujuvia asiakaspolkuja."
- Two cards:
  - **Omalääkärimalli**: "Jokainen ammattilainen näkee koosteen omista asiakkaistaan työjonona: keiden tilanteessa on havaittu tarkistamista vaativia muutoksia. Vastuuhoitaja ja omalääkäri näkevät saman asiakkaan omasta roolistaan käsin."
  - **Monistettavuus**: "RAI on ensimmäinen käyttötapaus. Sama malli soveltuu muihin toimintakyvyn arviointeihin, mielenterveys- ja päihdepalvelujen seurantaan, kuntoutuksen etenemiseen, pitkäaikaissairauksien seurantaan ja sosiaalityön asiakassuunnitelmiin." Add a chip flow "Lähtötilanne → Uusi tieto → Analyysi → Havainto → Ammattilaisen arvio".

## 11. Agent boundaries (must be reflected everywhere)

| Agentti tekee | Agentti ei tee |
|---|---|
| Kokoaa ja vertailee tietoa | Ei tee RAI-arviointia asiakkaan puolesta |
| Tunnistaa ja perustelee muutoksia | Ei muuta RAI-pisteitä tai virallisia mittareita |
| Näyttää lähteen ja ajankohdan | Ei tee diagnoosia |
| Ehdottaa asian tarkistamista | Ei tee hoito-, palvelu- tai etuuspäätöstä |
| Tukee ammattilaisen valmistautumista | Ei käynnistä toimenpiteitä ilman ammattilaista |

Use the phrasing "kirjauksissa kuvataan", "mittausten mukaan", "kannattaa tarkistaa". Never use "diagnoosi", "sairastaa" or "riskipisteet" in generated text. Core instruction (system prompt for the optional LLM / Copilot Studio agent):

> Olet ikääntyneiden palvelujen ammattilaista tukeva AI-agentti. Analysoi asiakkaan RAI-arvioinnin jälkeen kertynyttä asiakas- ja potilastietoa ja tunnista asiakkaan aikaisempaan tilanteeseen nähden olennaisia muutoksia. Kokoa muutoksista tiivis tilannekuva ja muodosta ammattilaiselle tarkistettavia muutossignaaleja. Kerro jokaisesta signaalista: mitä muuttui, mihin havainto perustuu, milloin muutos havaittiin ja miksi asia kannattaa tarkistaa. Älä tee diagnooseja, RAI-arviointia, palvelupäätöksiä tai itsenäisiä hoitopäätöksiä. Älä esitä epävarmaa havaintoa faktana. Ammattilainen vastaa aina tiedon tulkinnasta ja jatkotoimenpiteistä.

## 12. Visual design

- Calm, professional healthcare look, teal accent, rounded cards (radius 14px), soft shadows. Font stack: "Segoe UI Variable Text", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif.
- Define colours as CSS custom properties on `:root`:
  - Light: bg `#f2f4f3`, surface `#ffffff`, surface-2 `#eef2f1`, border `#dbe1df`, ink `#16201d`, ink-2 `#44514c`, muted `#6a7672`, accent `#0f5566`, accent-2 `#1a8197`, accent-soft `#e1eff2`, focus `#0b7a99`, hero gradient `#0d4654 → #17798d`.
  - Status: red `#d03b3b`, orange `#ec835a`, green `#0ca30c`, info `#6b7f8c`, plus soft background tints for each.
  - Dark: bg `#111413`, surface `#1a1d1c`, border `#333a37`, ink `#eef1ef`, muted `#97a19d`, accent `#5fb4cc`, hero `#0b2e37 → #12505e`.
  - Apply dark mode via `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`, and also via `:root[data-theme="dark"]`.
- Responsive breakpoints around 1040 / 860 / 640 px. On mobile the layout is a single column, the nav and user text are compacted, the FAB label may hide, and there is no horizontal scroll.
- Accessibility: visible focus rings; `aria-pressed` on toggle buttons; `aria-expanded` on the bell, user button and FAB; `role="img"` + descriptive `aria-label` on charts; status conveyed by shape + text, not colour alone; `prefers-reduced-motion` disables animations.
- Print stylesheet: hide the top bar, FAB, chat and forms.

## 13. Acceptance tests (with the Appendix A data, `viitepaiva` 2026-10-13)

| Asiakas | Expected |
|---|---|
| Toivo Nieminen (A004) | **Vihreä** – no signals |
| Lyyli Salo (A007) | **Vihreä** + info "RAI-seuranta-arvio erääntyy pian" (7 vrk, due 20.10.2026) |
| Aino Virtanen (A001) | **Punainen** – "Paino laskenut toistuvissa mittauksissa" 61,5 → 57,6 kg (−3,9 kg, −6,3 %), 3 consecutive, varmuus selvä; nutrition sentences from A001-K2, K3, K5, K6 as sources; plus info "RAI-seuranta-arvio erääntyy pian" (30 vrk). No loneliness signal: both sentences are on the same day. |
| Eino Mäkinen (A002) | **Punainen** – "Toistuvia kaatumisia" (3 days: 9.8., 8.9., 21.9.; medication change 28.7.2026 noted before the first fall, dizziness note as a source); red "Päivystys- ja ensihoitokontaktit lisääntyneet" (2 vs 0); orange "Lääkitys muuttunut RAI-arvioinnin jälkeen" |
| Helmi Korhonen (A003) | **Punainen** – "MTP-palvelujen asiointi lisääntynyt" (4 contacts within 90 vrk vs 0; the 14.7. contact falls just outside the window) incl. the mood sentence mention; orange "Uusia kirjauksia: yksinäisyys ja sosiaalinen osallistuminen" (2 days); info RAI due in 9 vrk |
| Väinö Heikkinen (A006) | **Punainen** – "Nopea painonnousu" 82,6 → 85,3 kg (+2,7 kg) in 14 vrk, swelling/breathlessness mentioned; orange "Uusia kirjauksia: toimintakyky ja arjessa selviytyminen" (28.9. and 6.10.) |
| Kerttu Laine (A005) | **Oranssi** – "Yksittäinen poikkeava painomittaus" (−4,7 %, epävarma) with "Huomioi myös": "Syö hyvin, ruokahalu hyvä." and "Mittauksen huomio: Punnittu sijaisen tuomalla vaa'alla…"; orange "Uusia kirjauksia: kognitio ja lääkehoidon toteutuminen" (3 days) |

- Anna sees 7 clients: red Eino, Helmi, Aino, Väinö; orange Kerttu; green Toivo, Lyyli. Leena sees 4: Aino, Eino, Kerttu, Lyyli.
- Live demo: open Toivo → "Uusi kirjaus" → "Esimerkki" → "Tallenna kirjaus". A new orange fall signal appears immediately, along with toasts, the bell count increment and the "uutta" chip.
- Save a review "RAI-arviointi aikaistetaan" on Aino's weight signal. It disappears from the bell and the card shows "1/n tarkistettu". The review survives a reload.
- No English text anywhere in the UI.

## 14. Deliverables

All files from §0, plus a Finnish `README.md` covering: purpose, how to run (open `index.html`, no installation), demo credentials, local storage notes (browser-only demo authentication; production would use e.g. Entra ID / Suomi.fi and server-side data), views, a 3–5 minute demo script, the test scenarios table, the JSON import format (a minimal example with the four event types `mittaus`, `kirjaus`, `kontakti`, `laakitys`), and the data-usage terms (synthetic Veil.AI data may only be used during the event and must be deleted afterwards; clear local storage). Also write a Finnish `agent/AGENTIN_OHJEET.md` with the Copilot Studio instructions, the rule table, the output JSON format and these test questions: "Näytä omat asiakkaani tärkeysjärjestyksessä.", "Mitä Aino Virtaselle on tapahtunut RAI-arvioinnin jälkeen?", "Onko Kerttu Laineen paino laskenut?", "Mikä on Eino Mäkisen diagnoosi?" (must refuse to diagnose), "Päivitä Toivon RAI-pisteet." (must refuse).

---

## Appendix A: synthetic dataset (`window.MOCK_DATA`, all fictional)

Use it exactly. `lahde` abbreviations: **MK** = "Mittaustiedot (kotihoito)", **KH** = "Kotihoidon hoitokertomus", **PT** = "Palvelutapahtumat", **LL** = "Lääkityslista". Expand them in the real file.

```json
{
  "versio": "1.0",
  "kuvaus": "RAI Muutosvahti – synteettinen demoaineisto (SOTE AI Hackathon 2026)",
  "viitepaiva": "2026-10-13",
  "ammattilainen": { "nimi": "Anna Esimerkki", "rooli": "Kotihoidon vastuuhoitaja, RAI-arvioija", "tiimi": "Kotihoito, Lohja-Vihti (demo)" },
  "asiakkaat": [
    {
      "id": "A001", "nimi": "Aino Virtanen", "ika": 84, "sukupuoli": "nainen", "palvelu": "Kotihoito",
      "omalaakari": "Lääkäri Leena Demo", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Yksin kerrostalossa, tytär asuu 40 km päässä",
      "rai": { "pvm": "2026-05-12", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 1, "CPS": 1, "DRS": 1, "PAIN": 1, "CHESS": 1, "MAPLe": 3, "BMI": 23.4, "paino": 61.5 },
        "alue": { "arki": "Selviytyy päivittäisistä toimista pääosin itsenäisesti, tarvitsee apua kaupassa käynnissä ja siivouksessa.", "liikkuminen": "Liikkuu sisällä itsenäisesti, ulkona kepin kanssa.", "kognitio": "Lievää muistin heikkenemistä, selviytyy arjen päätöksistä.", "kommunikointi": "Ymmärtää ja tulee ymmärretyksi.", "mieliala": "Mieliala tasainen.", "sosiaalinen": "Ystävän kanssa viikoittaisia tapaamisia, tytär käy kahdesti kuussa.", "kipu": "Ajoittaista polvikipua rasituksessa.", "ravitsemus": "Ruokahalu hyvä, ateriapalvelu arkipäivisin.", "kaatumisriski": "Ei kaatumisia edeltävän 90 vrk aikana." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A001-M1", "pvm": "2026-06-15", "tyyppi": "mittaus", "mittari": "paino", "arvo": 61.2, "lahde": "MK" },
        { "id": "A001-M2", "pvm": "2026-07-20", "tyyppi": "mittaus", "mittari": "paino", "arvo": 60.4, "lahde": "MK" },
        { "id": "A001-K1", "pvm": "2026-07-21", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Aamukäynti. Asiakas hyväntuulinen, lääkkeet otettu. Kävi kepin kanssa postilaatikolla." },
        { "id": "A001-K2", "pvm": "2026-08-12", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Asiakas kertoo, ettei ruoka maista. Ateriapalvelun lounaasta syöty puolet." },
        { "id": "A001-M3", "pvm": "2026-08-18", "tyyppi": "mittaus", "mittari": "paino", "arvo": 59.1, "lahde": "MK" },
        { "id": "A001-K3", "pvm": "2026-08-29", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Ruokahalu heikentynyt. Jääkaapissa koskemattomia aterioita kolmelta päivältä." },
        { "id": "A001-K4", "pvm": "2026-09-05", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Kertoo olevansa yksinäinen, ystävä kuollut kesällä. Ei ole käynyt viikkotapaamisissa." },
        { "id": "A001-M4", "pvm": "2026-09-14", "tyyppi": "mittaus", "mittari": "paino", "arvo": 58.0, "lahde": "MK" },
        { "id": "A001-K5", "pvm": "2026-09-14", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Painoa 58,0 kg. Asiakas väsynyt ja syö vähän. Ohjattu juomaan ravintolisä päivittäin." },
        { "id": "A001-C1", "pvm": "2026-09-16", "tyyppi": "kontakti", "palvelu": "omalääkäri", "lahde": "PT", "teksti": "Omalääkärin puhelinkontakti, laboratoriokokeet tilattu." },
        { "id": "A001-K6", "pvm": "2026-09-30", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Tytär soittanut: huolissaan äidin laihtumisesta ja siitä, että äiti jättää aterioita väliin." },
        { "id": "A001-M5", "pvm": "2026-10-06", "tyyppi": "mittaus", "mittari": "paino", "arvo": 57.6, "lahde": "MK" }
      ]
    },
    {
      "id": "A002", "nimi": "Eino Mäkinen", "ika": 88, "sukupuoli": "mies", "palvelu": "Kotihoito",
      "omalaakari": "Lääkäri Leena Demo", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Puolison kanssa omakotitalossa",
      "rai": { "pvm": "2026-06-03", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 2, "CPS": 2, "DRS": 0, "PAIN": 1, "CHESS": 1, "MAPLe": 3, "BMI": 25.1, "paino": 78.0 },
        "alue": { "arki": "Tarvitsee apua peseytymisessä, muut toimet puolison tuella.", "liikkuminen": "Liikkuu sisällä ilman apuvälinettä, ulkona rollaattorilla.", "kognitio": "Lievä kognitiivinen heikentyminen.", "kommunikointi": "Kuulo heikentynyt, käyttää kuulolaitetta.", "mieliala": "Mieliala hyvä.", "sosiaalinen": "Puoliso ja naapurit tukena.", "kipu": "Selkäkipua ajoittain.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Ei kaatumisia edeltävän 90 vrk aikana." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A002-M1", "pvm": "2026-07-01", "tyyppi": "mittaus", "mittari": "paino", "arvo": 77.8, "lahde": "MK" },
        { "id": "A002-L1", "pvm": "2026-07-28", "tyyppi": "laakitys", "lahde": "LL", "teksti": "Verenpainelääkitystä lisätty omalääkärin vastaanotolla (uusi lääke aamuisin)." },
        { "id": "A002-K1", "pvm": "2026-08-09", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Asiakas löydetty lattialta aamukäynnillä, kertoo kaatuneen yöllä wc-matkalla. Ei näkyviä vammoja." },
        { "id": "A002-K2", "pvm": "2026-08-30", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Kertoo huimaavan aamuisin sängystä noustessa." },
        { "id": "A002-M2", "pvm": "2026-09-02", "tyyppi": "mittaus", "mittari": "paino", "arvo": 77.6, "lahde": "MK" },
        { "id": "A002-K3", "pvm": "2026-09-08", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Kaatui keittiössä, mustelma lonkassa. Puoliso soitti ensihoidon." },
        { "id": "A002-C1", "pvm": "2026-09-08", "tyyppi": "kontakti", "palvelu": "ensihoito", "lahde": "PT", "teksti": "Ensihoidon kotikäynti kaatumisen vuoksi, ei kuljetusta." },
        { "id": "A002-C2", "pvm": "2026-09-21", "tyyppi": "kontakti", "palvelu": "päivystys", "lahde": "PT", "teksti": "Päivystyskäynti: kaatui eteisessä, kuvattu, ei murtumia." },
        { "id": "A002-K4", "pvm": "2026-10-03", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Fysioterapeutti", "teksti": "Liikkuminen varovaista, käyttää nyt rollaattoria myös sisällä. Aiemmin liikkui sisällä ilman apuvälinettä." },
        { "id": "A002-M3", "pvm": "2026-10-05", "tyyppi": "mittaus", "mittari": "paino", "arvo": 77.9, "lahde": "MK" }
      ]
    },
    {
      "id": "A003", "nimi": "Helmi Korhonen", "ika": 79, "sukupuoli": "nainen", "palvelu": "Yhteisöllinen asuminen",
      "omalaakari": "Lääkäri Ville Testi", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Yhteisöllisen asumisen yksiö",
      "rai": { "pvm": "2026-04-22", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 0, "CPS": 0, "DRS": 2, "PAIN": 0, "CHESS": 0, "MAPLe": 2, "BMI": 26.0, "paino": 70.5 },
        "alue": { "arki": "Selviytyy itsenäisesti, tarvitsee tukea asioinnissa.", "liikkuminen": "Liikkuu itsenäisesti.", "kognitio": "Ei kognitiivisia vaikeuksia.", "kommunikointi": "Ei vaikeuksia.", "mieliala": "Ajoittaista alakuloisuutta, ei hoitokontakteja.", "sosiaalinen": "Osallistuu yhteisön ryhmätoimintaan viikoittain, poika käy usein.", "kipu": "Ei kipua.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Ei kaatumisia." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A003-M1", "pvm": "2026-06-10", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.2, "lahde": "Mittaustiedot (asumisyksikkö)" },
        { "id": "A003-K1", "pvm": "2026-06-30", "tyyppi": "kirjaus", "lahde": "Asumispalvelun päivittäiskirjaus", "tekija": "Lähihoitaja", "teksti": "Poika muuttanut työn perässä ulkomaille. Asiakas kertoo olevansa yksinäinen." },
        { "id": "A003-C1", "pvm": "2026-07-14", "tyyppi": "kontakti", "palvelu": "MTP", "lahde": "PT", "teksti": "Mielenterveyspalvelujen sairaanhoitajan puhelu, asiakkaan oma yhteydenotto." },
        { "id": "A003-K2", "pvm": "2026-07-29", "tyyppi": "kirjaus", "lahde": "Asumispalvelun päivittäiskirjaus", "tekija": "Lähihoitaja", "teksti": "Itkuinen iltapäivällä. Ei ole osallistunut ryhmätoimintaan kolmeen viikkoon." },
        { "id": "A003-C2", "pvm": "2026-08-05", "tyyppi": "kontakti", "palvelu": "MTP", "lahde": "PT", "teksti": "MTP-sairaanhoitajan vastaanotto." },
        { "id": "A003-M2", "pvm": "2026-08-12", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.0, "lahde": "Mittaustiedot (asumisyksikkö)" },
        { "id": "A003-C3", "pvm": "2026-08-26", "tyyppi": "kontakti", "palvelu": "MTP", "lahde": "PT", "teksti": "MTP-sairaanhoitajan vastaanotto." },
        { "id": "A003-K3", "pvm": "2026-09-09", "tyyppi": "kirjaus", "lahde": "Asumispalvelun päivittäiskirjaus", "tekija": "Sairaanhoitaja", "teksti": "Kertoo, ettei jaksa lähteä huoneesta. Mieliala matala." },
        { "id": "A003-C4", "pvm": "2026-09-16", "tyyppi": "kontakti", "palvelu": "MTP", "lahde": "PT", "teksti": "MTP-sairaanhoitajan vastaanotto, sovittu tiivistetty seuranta." },
        { "id": "A003-C5", "pvm": "2026-10-01", "tyyppi": "kontakti", "palvelu": "MTP", "lahde": "PT", "teksti": "MTP-sairaanhoitajan puhelu." },
        { "id": "A003-M3", "pvm": "2026-10-02", "tyyppi": "mittaus", "mittari": "paino", "arvo": 69.8, "lahde": "Mittaustiedot (asumisyksikkö)" }
      ]
    },
    {
      "id": "A004", "nimi": "Toivo Nieminen", "ika": 91, "sukupuoli": "mies", "palvelu": "Ympärivuorokautinen palveluasuminen",
      "omalaakari": "Lääkäri Ville Testi", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Palvelukoti Esimerkkilä",
      "rai": { "pvm": "2026-03-10", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 3, "CPS": 3, "DRS": 1, "PAIN": 1, "CHESS": 1, "MAPLe": 4, "BMI": 22.0, "paino": 70.2 },
        "alue": { "arki": "Tarvitsee apua peseytymisessä ja pukeutumisessa.", "liikkuminen": "Liikkuu rollaattorilla valvotusti.", "kognitio": "Keskivaikea kognitiivinen heikentyminen.", "kommunikointi": "Ymmärtää lyhyet ohjeet.", "mieliala": "Mieliala pääosin hyvä.", "sosiaalinen": "Osallistuu yhteisiin hetkiin, omaiset vierailevat.", "kipu": "Lievää nivelkipua.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Kohonnut liikkumisen vuoksi, ei kaatumisia edeltävän 90 vrk aikana." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A004-M1", "pvm": "2026-05-04", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.0, "lahde": "Mittaustiedot (palvelukoti)" },
        { "id": "A004-K1", "pvm": "2026-06-11", "tyyppi": "kirjaus", "lahde": "Palveluasumisen hoitokertomus", "tekija": "Lähihoitaja", "teksti": "Ruokahalu hyvä. Osallistui laulutuokioon ja lauloi mukana." },
        { "id": "A004-M2", "pvm": "2026-07-06", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.4, "lahde": "Mittaustiedot (palvelukoti)" },
        { "id": "A004-K2", "pvm": "2026-08-20", "tyyppi": "kirjaus", "lahde": "Palveluasumisen hoitokertomus", "tekija": "Sairaanhoitaja", "teksti": "Ei kaatumisia. Liikkuu rollaattorilla kuten ennenkin." },
        { "id": "A004-M3", "pvm": "2026-09-07", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.1, "lahde": "Mittaustiedot (palvelukoti)" },
        { "id": "A004-K3", "pvm": "2026-09-27", "tyyppi": "kirjaus", "lahde": "Palveluasumisen hoitokertomus", "tekija": "Lähihoitaja", "teksti": "Mieliala hyvä, omaiset vierailleet viikonloppuna. Söi hyvin." },
        { "id": "A004-M4", "pvm": "2026-10-05", "tyyppi": "mittaus", "mittari": "paino", "arvo": 70.3, "lahde": "Mittaustiedot (palvelukoti)" }
      ]
    },
    {
      "id": "A005", "nimi": "Kerttu Laine", "ika": 82, "sukupuoli": "nainen", "palvelu": "Kotihoito",
      "omalaakari": "Lääkäri Leena Demo", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Yksin rivitalossa",
      "rai": { "pvm": "2026-07-01", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 1, "CPS": 1, "DRS": 1, "PAIN": 1, "CHESS": 0, "MAPLe": 2, "BMI": 24.8, "paino": 66.0 },
        "alue": { "arki": "Selviytyy itsenäisesti, kotihoito lääkehoidossa.", "liikkuminen": "Liikkuu itsenäisesti.", "kognitio": "Lievää muistin heikkenemistä, dosetti käytössä.", "kommunikointi": "Ei vaikeuksia.", "mieliala": "Mieliala tasainen.", "sosiaalinen": "Käy seurakunnan kerhossa.", "kipu": "Lievää selkäkipua.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Ei kaatumisia." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A005-M1", "pvm": "2026-08-05", "tyyppi": "mittaus", "mittari": "paino", "arvo": 65.8, "lahde": "MK" },
        { "id": "A005-K1", "pvm": "2026-08-20", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Lääkedosetti tarkistettu: illan lääkkeet ottamatta edelliseltä päivältä." },
        { "id": "A005-M2", "pvm": "2026-09-02", "tyyppi": "mittaus", "mittari": "paino", "arvo": 65.9, "lahde": "MK" },
        { "id": "A005-K2", "pvm": "2026-09-17", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Unohtanut ottaa aamulääkkeet, dosetti täynnä. Muistutettu." },
        { "id": "A005-M3", "pvm": "2026-09-30", "tyyppi": "mittaus", "mittari": "paino", "arvo": 62.9, "lahde": "MK", "huomio": "Punnittu sijaisen tuomalla vaa'alla, asiakkaalla päällysvaatteet." },
        { "id": "A005-K3", "pvm": "2026-10-02", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Syö hyvin, ruokahalu hyvä. Asiakas kertoo voivansa hyvin." },
        { "id": "A005-K4", "pvm": "2026-10-05", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Asiakas kysyi samaa asiaa useaan kertaan käynnin aikana." }
      ]
    },
    {
      "id": "A006", "nimi": "Väinö Heikkinen", "ika": 86, "sukupuoli": "mies", "palvelu": "Kotihoito",
      "omalaakari": "Lääkäri Ville Testi", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Yksin kerrostalossa, hissi",
      "rai": { "pvm": "2026-08-10", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 1, "CPS": 0, "DRS": 0, "PAIN": 0, "CHESS": 1, "MAPLe": 2, "BMI": 27.4, "paino": 82.0 },
        "alue": { "arki": "Selviytyy peseytymisestä ja pukeutumisesta itsenäisesti, kotihoito lääkehoidossa ja kauppa-asioinnissa.", "liikkuminen": "Liikkuu itsenäisesti, portaat onnistuvat.", "kognitio": "Ei kognitiivisia vaikeuksia.", "kommunikointi": "Ei vaikeuksia.", "mieliala": "Mieliala hyvä.", "sosiaalinen": "Käy päivätoiminnassa kerran viikossa.", "kipu": "Ei kipua.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Ei kaatumisia." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A006-M1", "pvm": "2026-09-07", "tyyppi": "mittaus", "mittari": "paino", "arvo": 82.4, "lahde": "MK" },
        { "id": "A006-M2", "pvm": "2026-09-24", "tyyppi": "mittaus", "mittari": "paino", "arvo": 82.6, "lahde": "MK" },
        { "id": "A006-K1", "pvm": "2026-09-28", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Tarvitsi apua suihkussa, aiemmin selvinnyt itsenäisesti." },
        { "id": "A006-M3", "pvm": "2026-10-01", "tyyppi": "mittaus", "mittari": "paino", "arvo": 84.1, "lahde": "MK" },
        { "id": "A006-K2", "pvm": "2026-10-01", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Nilkat turvoksissa iltakäynnillä." },
        { "id": "A006-K3", "pvm": "2026-10-06", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Pukeutumisessa avustettu, asiakas väsynyt." },
        { "id": "A006-M4", "pvm": "2026-10-08", "tyyppi": "mittaus", "mittari": "paino", "arvo": 85.3, "lahde": "MK" },
        { "id": "A006-K4", "pvm": "2026-10-08", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Hengästyy portaissa enemmän kuin ennen. Nilkat edelleen turvoksissa." }
      ]
    },
    {
      "id": "A007", "nimi": "Lyyli Salo", "ika": 77, "sukupuoli": "nainen", "palvelu": "Kotihoito",
      "omalaakari": "Lääkäri Leena Demo", "vastuuhoitaja": "Anna Esimerkki", "asuu": "Puolison kanssa kerrostalossa",
      "rai": { "pvm": "2026-04-20", "arvioija": "Anna Esimerkki",
        "mittarit": { "ADLH": 0, "CPS": 1, "DRS": 0, "PAIN": 1, "CHESS": 0, "MAPLe": 2, "BMI": 24.0, "paino": 64.0 },
        "alue": { "arki": "Selviytyy itsenäisesti, kotihoito haavanhoidossa.", "liikkuminen": "Liikkuu itsenäisesti.", "kognitio": "Lievää muistin heikkenemistä.", "kommunikointi": "Ei vaikeuksia.", "mieliala": "Mieliala hyvä.", "sosiaalinen": "Puoliso ja lapsenlapset tukena.", "kipu": "Lievää säärihaavan kipua.", "ravitsemus": "Ruokahalu hyvä.", "kaatumisriski": "Ei kaatumisia." },
        "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
      "tapahtumat": [
        { "id": "A007-M1", "pvm": "2026-06-02", "tyyppi": "mittaus", "mittari": "paino", "arvo": 64.2, "lahde": "MK" },
        { "id": "A007-K1", "pvm": "2026-07-15", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Sairaanhoitaja", "teksti": "Säärihaava paranee hyvin. Mieliala hyvä." },
        { "id": "A007-M2", "pvm": "2026-08-11", "tyyppi": "mittaus", "mittari": "paino", "arvo": 63.8, "lahde": "MK" },
        { "id": "A007-K2", "pvm": "2026-09-08", "tyyppi": "kirjaus", "lahde": "KH", "tekija": "Lähihoitaja", "teksti": "Haava parantunut. Syö hyvin, käy puolison kanssa kävelyllä." },
        { "id": "A007-M3", "pvm": "2026-10-01", "tyyppi": "mittaus", "mittari": "paino", "arvo": 64.1, "lahde": "MK" }
      ]
    }
  ]
}
```

Before finishing, verify the outcome of every row in §13 by running the analysis mentally or in a quick script, and fix any rule that disagrees.
