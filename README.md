# RAI Muutosvahti

**AI ei päätä. AI huomaa. Ammattilainen arvioi ja kohtaa asiakkaan.**

SOTE AI Hackathon 2026 (Dipoli, 13.–14.10.2026) · Haaste 1.1: *Esitietojen koonti – oikeat tiedot oikealle ammattilaiselle*

## Versio 2.0 (13.10.2026): hackathon_data-aineistolla

Sovellus käyttää nyt **vain** `hackathon_data`-kansion aineistoa:

- `LUVN_synteettinenData_VEIL/2024-2026`: 14 ikääntyneiden palvelujen asiakasta, joilla on myönteinen kotihoito- tai palveluasumispäätös sekä sosiaali- että terveystiedot (käynnit, diagnoosit, lääkitys, laboratorio, käyntimuistiinpano, vireilletulot, päätökset, palvelut, kotihoidon käynnit ja suunnitelma).
- `Esitieto_lomakkeet_hackathon_json`: PHQ-9, GAD-7 ja AUDIT täytettävinä lomakkeina (kysymykset ja pisteet aineistosta).

Aineistossa ei ole RAI-mittareita. **Lähtötilanteena** käytetään palvelutarpeen arviointia ja palvelupäätöstä, ja sen jälkeen kertyneet tiedot jäsennetään RAI-arvioinnin osa-alueisiin. Viitepäivä on 13.10.2026; myöhemmät tiedot jätetään pois.

**Aineiston rakentaminen** (PowerShell 5.1, ei asennuksia): `.\tools\rakenna-aineisto.ps1` → `js/data.js` ja `data/aineisto.json`. `-Ehdokkaat` listaa valittavissa olevat asiakkaat. Minimointi: terveystiedot vain lähtötilannetta edeltävältä vuodelta ja sen jälkeen, kotihoidon käynnit kuukausitasolla, ei henkilötunnuksia tai lomakkeiden laatijatietoja.

**Käynnistys:** avaa `index.html` (etusivu) tai suoraan `login.html` (kirjautuminen ja sovellus), tai `kaynnista-sovellustilassa.cmd` (Edgen sovellustila). Toimii ilman verkkoyhteyttä.

| Tunnus | Rooli | Arviointitilanteet | Hoitosuhde |
|---|---|---|---|
| `sanna` | Sairaanhoitaja, kotihoito | RAI-seuranta-arvio, Lääkehoidon arviointi | 11 kotihoidon asiakasta |
| `lauri` | Lääkäri | Lääkärin vastaanotto, Lääkehoidon arviointi, RAI-seuranta-arvio | kaikki 14 |
| `fiia` | Fysioterapeutti | RAI-seuranta-arvio (painotus: arki, liikkuminen, kipu) | kaikki 14 (ei lääkitystä, laboratoriota tai päätöstekstejä) |
| `sofia` | Sosiaalityöntekijä | RAI-seuranta-arvio, Palvelutarpeen arviointi | kaikki 14 (ei diagnooseja, lääkitystä tai laboratoriota) |

RAI-seuranta-arviossa roolin painotus (`raiPainotus`, `js/agent.js`) määrää keskeiset osa-alueet; muut RAI-osa-alueet näytetään erikseen avattavina. Painotus perustuu tiedostoihin `new_data/roolit/roles/*.txt` eikä laajenna käyttöoikeuksia.

Salasana kaikille: `Muutosvahti2026` (tallennetaan suolattuna SHA-256-tiivisteenä).

| Tiedosto | Sisältö |
|---|---|
| `js/agent.js` | Sääntöpohjainen agentti: rooli- ja tilannekohtainen tietojen rajaus, lähtötilanne vs. jälkeen RAI-osa-alueittain, 14 sääntöä (peruste, lähteet, vastanäyttö, varmuus) |
| `js/app.js` | Käyttöliittymä: kirjautuminen, koontinäkymä, esitietokooste, lähteiden avaus, ammattilaisen arvio ja jatkotoimet, lomakkeet, säännöt ja virhehälytysten seuranta, käyttötarkoitus ja RBAC-matriisi, käyttöloki, paikallinen tekoälyavustaja (+ valinnainen Copilot Studio) |
| `tools/rakenna-aineisto.ps1` | Aineiston poiminta hackathon_data-kansiosta |

**Demon kulku (3–5 min):** kirjaudu `sanna` → koontinäkymä (7/11 merkittävä muutos, värit = tarkistamisen tarve) → *Asiakas 9422*: kaatumistaipumus kirjattu lähtötilanteen jälkeen, kaatumisen pelko rajoittaa liikkumista, kotihoito päättynyt 31.5.2026 → avaa lähde (käyntimuistiinpano) → arvioi havainto ja kirjaa jatkotoimet → kirjaudu `lauri` → *Asiakas 3245*: uusi ahdistuneisuuskirjaus + essitalopraami → täytä GAD-7 → kirjaudu `outi` samaan asiakkaaseen: diagnoosit ja lääkitys rajattu pois, näkyy palveluprosessi ja toimintakyky → *Säännöt ja laatu* ja *Loki*.

*Alla olevat osiot kuvaavat edellistä, mock-aineistoon perustunutta versiota ja säilytetään viitteenä.*

---

RAI Muutosvahti kokoaa ikääntyneen asiakkaan RAI-arvioinnin jälkeen kertyneen asiakas- ja potilastiedon,
tunnistaa olennaiset muutokset ja nostaa ammattilaiselle perustellut muutossignaalit tarkistettavaksi.

> Kaikki aineisto on synteettistä. Signaalit ja raja-arvot ovat demon sääntöjä, eivät virallisia RAI-hälytysrajoja.

## Käynnistys

Ei asennuksia eikä build-vaihetta. Avaa `index.html` selaimessa (Edge, Chrome, Firefox). Sivu toimii ilman verkkoyhteyttä.

**Demotunnukset** (salasana `Muutosvahti2026`):

| Tunnus | Rooli | Näkee |
|---|---|---|
| `anna` | Kotihoidon vastuuhoitaja | Kaikki 7 asiakasta, joiden vastuuhoitaja hän on |
| `leena` | Omalääkäri | 4 asiakasta, joiden omalääkäri hän on (omalääkärimalli) |

## Kirjautuminen ja paikallinen tallennus

- Ensimmäisellä avauskerralla demoaineisto ja käyttäjät tallennetaan selaimen paikalliseen muistiin (`localStorage`, avaimet `raimv:*`).
- Salasanat tallennetaan SHA-256-tiivisteinä satunnaisella suolalla, eivät selkokielisinä. Viiden virheellisen yrityksen jälkeen kirjautuminen lukittuu 30 sekunniksi.
- Istunto kestää 8 h (välilehden ajan). *Muista minut* -valinnalla istunto kestää 7 vrk.
- Lisätyt kirjaukset, ammattilaisen arviot ja toimintaloki tallentuvat paikallisesti ja säilyvät sivun uudelleenlatauksen yli.
- Käyttäjävalikko: *Lataa aineisto (JSON)*, *Tuo aineisto (JSON)*, *Palauta demoaineisto*, *Tyhjennä paikallinen muisti*, *Kirjaudu ulos*.

**Huom:** kirjautuminen on selainpohjainen demo, ei oikea palvelinpuolen tunnistus. Kuka tahansa laitteen käyttäjä voi lukea
selaimen paikallisen muistin. Tuotannossa tunnistus (esim. hyvinvointialueen Entra ID / Suomi.fi) ja tiedot kuuluvat
palvelimelle, ja potilastietoa ei tallenneta selaimeen.

## Rakenne

| Tiedosto | Sisältö |
|---|---|
| `index.html` | Verkkosivu (suomeksi) |
| `css/styles.css` | Ulkoasu, vaalea ja tumma teema, mobiili |
| `js/data.js` | Synteettinen mock-aineisto: 7 asiakasta, RAI-lähtötilanne ja 60 tapahtumaa |
| `js/agent.js` | Agentti: muutosanalyysi ja tilannekuva |
| `js/app.js` | Käyttöliittymä, kirjautuminen ja paikallinen tallennus |
| `data/mock-asiakkaat.json` | Sama aineisto JSON-muodossa (Copilot Studion tietolähde) |
| `agent/AGENTIN_OHJEET.md` | Agentin ohjeet ja tulosformaatti Copilot Studioon |
| `copilot-agentti.html` | Tiimin alkuperäinen Copilot Studio -webchat-upotus |

## Näkymät

**Kirjautuminen**: konseptin ydinviesti ja toimintamalli (RAI-arviointi → uusi tieto → muutossignaali → ammattilainen arvioi → kohtaaminen).

**Omat asiakkaat**
- Ydinidea keskiössä: "Huomaa muutos ennen seuraavaa RAI-arviointia" ja kooste omista asiakkaista (merkittävä / seurattava / ennallaan).
- *Tarkista nämä ensin*: asiakkaat, joilla on merkittävä muutos, tärkein muutos auki kirjoitettuna.
- Jokaisella asiakaskortilla on **RAI-väli**: aikajana edellisestä RAI-arvioinnista seuraavaan, jossa näkyvät arvioinnin jälkeen kertyneet merkinnät ja niistä havaitut muutokset.
- Haku ja suodatus tilan, muutoksen aiheen ja palvelun mukaan. Ilmoituskellossa näkyvät tarkistamattomat muutokset.

**Asiakas**
- Arviointien välinen seuranta: iso RAI-väli. Pistettä napsauttamalla pääsee merkintään.
- Tilannekuva, havaitut muutokset tärkeysjärjestyksessä (mitä muuttui, peruste, lähteet, huomioitavaa) ja ammattilaisen oma arvio.
- *Valmistaudu kohtaamiseen*: tarkistettavat asiat.
- Tapahtumat, kirjaukset ja painokäyrä RAI-lähtötasoon verrattuna. RAI-lähtötilanne mittareineen.
- *Uusi kirjaus*: tilannekuva päivittyy heti, ja uusi muutos nostaa ilmoituksen.

**Konsepti**: haaste, ratkaisu, toimintamalli, mitä Muutosvahti huomaa, hyödyt, omalääkärimalli ja monistettavuus.

**Kysy Muutosvahdilta**: kelluva painike avaa tiimin Copilot Studio -agentin.

## Demon käsikirjoitus (3–5 min)

1. **Avaus (20 s):** Kirjautumissivu: "Entä jos ammattilaisen ei tarvitsisi itse etsiä asiakkaan muuttunutta tilannetta tuhansien tietojen joukosta?"
2. **Kirjaudu Annana (40 s):** Ydinidea ja kooste: 5/7 asiakkaalla tarkistettavaa. Asiakaskorttien RAI-väli näyttää, missä kohtaa arviointiväliä muutokset syntyivät.
3. **Aino (60 s):** Paino laskenut toistuvissa mittauksissa ja ruokahalu heikentynyt. Näytä lähteet, painokäyrä ja kohtaan valmistautuminen.
4. **Kerttu (30 s):** Yksittäistä poikkeavaa punnitusta ei esitetä faktana. *Huomioi myös* -kohdassa näkyy, että punnitus tehtiin eri vaa'alla ja että asiakas syö hyvin.
5. **Live (40 s):** Toivo (vihreä) → *Uusi kirjaus* → *Esimerkki* → *Tallenna*. Uusi muutos ja ilmoitus syntyvät heti.
6. **Ammattilainen päättää (20 s):** Tallenna Ainon kohdalle arvio "RAI-arviointi aikaistetaan".
7. **Omalääkärimalli (20 s):** Kirjaudu ulos ja sisään Leenana: omalääkäri näkee omat asiakkaansa.

Ennen demoa: käyttäjävalikko → *Palauta demoaineisto*.

## Testiskenaariot

| Asiakas | Skenaario | Tulos |
|---|---|---|
| Toivo Nieminen | Normaali tapaus | Vihreä |
| Lyyli Salo | Normaali, RAI-arvio erääntyy 7 vrk:n päästä | Vihreä + tiedoksi |
| Aino Virtanen | Painon lasku 6,3 % + heikentynyt ruokahalu | Punainen |
| Eino Mäkinen | 3 kaatumista, 2 päivystys- tai ensihoitokontaktia, lääkemuutos | Punainen |
| Helmi Korhonen | MTP-kontaktit 0 → 4, matala mieliala, yksinäisyys | Punainen |
| Väinö Heikkinen | Paino +2,7 kg 14 vrk:ssa, turvotus, avuntarve lisääntynyt | Punainen |
| Kerttu Laine | Yksittäinen poikkeava punnitus + "syö hyvin" + muistihuomiot | Oranssi, epävarma |

## Veil.AI-aineiston käyttö hackathonissa

Aineisto julkaistaan 13.10. aamulla. Muunna valitut profiilit `data/mock-asiakkaat.json` -rakenteeseen ja tuo tiedosto
käyttäjävalikon *Tuo aineisto (JSON)* -toiminnolla. Asiakkaan `vastuuhoitaja`- ja `omalaakari`-kenttä määräävät, kenelle asiakas näkyy.

```json
{
  "viitepaiva": "2026-10-13",
  "asiakkaat": [{
    "id": "...", "nimi": "...", "ika": 84, "sukupuoli": "...", "palvelu": "Kotihoito",
    "omalaakari": "Lääkäri Leena Demo", "vastuuhoitaja": "Anna Esimerkki",
    "rai": { "pvm": "2026-05-12", "arvioija": "...", "mittarit": { "paino": 61.5, "ADLH": 1 },
             "alue": { "ravitsemus": "..." }, "edeltavat90pv": { "paivystys": 0, "mtp": 0, "kaatumiset": 0 } },
    "tapahtumat": [
      { "id": "x1", "pvm": "2026-06-15", "tyyppi": "mittaus", "mittari": "paino", "arvo": 61.2, "lahde": "..." },
      { "id": "x2", "pvm": "2026-08-12", "tyyppi": "kirjaus", "teksti": "...", "lahde": "..." },
      { "id": "x3", "pvm": "2026-09-21", "tyyppi": "kontakti", "palvelu": "päivystys", "teksti": "...", "lahde": "..." },
      { "id": "x4", "pvm": "2026-07-28", "tyyppi": "laakitys", "teksti": "...", "lahde": "..." }
    ]
  }]
}
```

Datan käyttöehdot: käyttö vain tapahtuman aikana, ei jakoa kolmansille, ja aineisto poistetaan tapahtuman jälkeen.
Tyhjennä siksi tapahtuman jälkeen paikallinen muisti (käyttäjävalikko → *Tyhjennä paikallinen muisti*).

## Palautuksessa ilmoitettava: valmiina tuotu vs. paikan päällä rakennettu

Tuomaristo arvioi tapahtuman aikana syntyneen tuotoksen. Kirjaa siksi palautukseen erikseen, että tämä prototyyppi
(mock-data, analyysi, käyttöliittymä) on tehty ennen tapahtumaa. Paikan päällä tehtävää on esimerkiksi Veil.AI-datan
muuntaminen, muutosten tunnistuksen kalibrointi mentorien (sairaanhoitajat, RAI-osaajat) kanssa, Copilot Studio -agentin
viimeistely ja pitch.
