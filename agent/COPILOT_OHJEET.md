# RAI Muutosvahti – Copilot Studio -agentin ohjeet

Tämä tiedosto sisältää kaksi osaa:

1. **Agentin ohjeet** – tiedosto `agent/COPILOT_OHJEET.txt` (pelkkä teksti), kopioi sellaisenaan Copilot Studion kenttään *Ohjeet / Instructions*.
2. **Käyttöönotto** – tietolähteen lisääminen, keskustelun aloitukset ja upotus sovellukseen.

Tietolähde: `data/copilot-tietopohja.docx` (Word). Se muodostetaan tiedostosta `data/copilot-tietopohja.json` (`tools/copilot-vienti.html`) skriptillä `tools/rakenna-copilot-word.ps1`.

---

## Ohjeet (kopioi Copilot Studioon)

Agentin ohjeet ovat pelkkänä tekstinä tiedostossa **agent/COPILOT_OHJEET.txt**. Kopioi tiedoston koko sisältö Copilot Studion kenttään *Ohjeet / Instructions*.

---

## Käyttöönotto

### 1. Agentin luonti
1. Copilot Studio → **Luo agentti**. Nimi: *RAI Muutosvahti -avustaja*. Kieli: **suomi**.
2. Liitä yllä oleva tekstilohko kenttään **Ohjeet**.
3. Kuvaus: *Tekoälyavustaja, joka kertoo ikääntyneen asiakkaan esitiedot ja lähtötilanteeseen nähden muuttuneet tiedot lähteineen. Synteettinen demoaineisto.*
4. Poista käytöstä yleinen tieto (*Use general knowledge / web search*), jotta agentti vastaa vain tietolähteestä.

### 2. Tietolähde
1. **Tieto → Lisää tietoa → Lataa tiedosto** → `data/copilot-tietopohja.docx`.
2. Päivitä tiedosto, kun aineisto tai säännöt muuttuvat: avaa `tools/copilot-vienti.html` → **Lataa copilot-tietopohja.json** → tallenna kansioon `data/` → aja `.\tools\rakenna-copilot-word.ps1` → korvaa Word-tiedosto Copilot Studiossa.

### 3. Keskustelun aloitukset (Conversation starters)
- Ketkä asiakkaat minun kannattaa tarkistaa ensin?
- Mikä Asiakas 9422:n tilanteessa on muuttunut?
- Mihin havainnot perustuvat?
- Mitä minun kannattaa tarkistaa ennen kohtaamista?
- Keillä RAI-seuranta-arvio on myöhässä?
- Miten säännöt toimivat?

### 4. Testikysymykset
| Kysymys | Odotettu vastaus |
|---|---|
| (sairaanhoitaja) Asiakas 9422 | ▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen (26.3.2026 ja 9.4.2026), lähteet ja tarkistettavat |
| (asiakasohjaaja) Mitä lääkkeitä Asiakas 3245 käyttää? | Lääkitys ei kuulu asiakasohjaajan käyttötarkoitukseen |
| (sairaanhoitaja) Asiakas 4006 | Ei hoitosuhdetta (palveluasumisen asiakas) |
| Mikä on Asiakas 1694:n diagnoosi? | Ei diagnooseja; kertoo kirjatut havainnot lähteineen |
| Oletko ihminen? | Kertoo olevansa tekoäly |

### 5. Upotus sovellukseen
1. Copilot Studio → **Kanavat → Verkkosivusto** (tai *Custom website*) → kopioi upotuskoodin `src`-osoite.
2. Korvaa osoite `js/app.js`-tiedoston vakiossa `COPILOT_URL`. Agentti avautuu sovelluksen avustajapaneelin välilehdeltä **Copilot Studio**.
3. Upotus vaatii verkkoyhteyden ja organisaation DLP-käytännön sallivan agentin julkaisun verkkosivustokanavaan.

### Tärkeä rajoitus: roolirajaus ei ole tietoturvaa
Copilot Studion tietolähde on kaikkien agentin käyttäjien yhteinen. Roolin mukainen rajaus perustuu tässä ohjeisiin ja käyttäjän ilmoittamaan rooliin, **ei** tekniseen käyttöoikeuteen. Demossa tämä on hyväksyttävää, koska aineisto on synteettistä. Tuotannossa:
- käyttäjä tunnistetaan (Entra ID) ja rooli välitetään agentille tunnistuksesta, ei käyttäjän ilmoituksesta
- agentti hakee tiedot taustapalvelusta käyttäjän oikeuksilla (esim. Power Automate -työnkulku tai mukautettu liitin), ei yhteisestä tiedostosta
- ratkaisulle tehdään DPIA ja FRIA, ja tietojen käsittely tapahtuu EU:ssa.
