# RAI Muutosvahti – RAI-007-agentin tietopohja

Tietopohja: 14 asiakasta, 4 roolia (sairaanhoitaja, lääkäri, fysioterapeutti, sosiaalityöntekijä). Viitepäivä ("tänään") 13.10.2026. Aineistoversio 2.0, sääntöversio luvn-2026.10, muodostettu 13.10.2026.

Kaikki tiedot ovat synteettisiä (LUVN / Veil.AI hackathon -aineisto). Henkilöt eivät ole oikeita. Aineistossa ei ole RAI-mittareita: lähtötilanteena on palvelutarpeen arviointi ja palvelupäätös. Tietopohja on RAI-arviointia edeltävä esitietokooste, ei RAI-arviointi, RAI-tulos, diagnoosi, riskiluokitus eikä hoito- tai palvelupäätös. Ammattilainen arvioi tietojen merkityksen ja päättää jatkotoimista.

## Tietopohjan rakenne
1. Yleiset tiedot: roolit ja käyttöoikeudet, tilat, varmuus, RAI-osa-alueet, säännöt ja rakenteiset kyselyt.
2. Asiakasyhteenveto: kaikkien asiakkaiden tila roolettain, tarkistamisjärjestys roolettain ja myöhässä olevat RAI-seuranta-arviot.
3. Asiakkaat: perustiedot, lähtötilanne, RAI-seuranta-arvion ajankohta, hoitosuhteet ja jokaisen roolin RAI-seuranta-arvion näkymä.

## Roolit ja käyttöoikeudet
Jokainen rooli näkee vain käyttötarkoitukseensa kuuluvat tiedot. Roolin näkymä perustuu vain roolin sallimiin tietoihin. Painotetut osa-alueet ovat roolin keskeisiä RAI-osa-alueita; RAI-seuranta-arvio kattaa silti kaikki osa-alueet.

### Rooli: Sairaanhoitaja
- Roolin nimi sovelluksessa: Sairaanhoitaja, kotihoito (Omahoitaja ja RAI-arvioija).
- Arviointitilanteet: RAI-seuranta-arvio, Lääkehoidon arviointi. Tämä tietopohja sisältää roolin RAI-seuranta-arvion näkymän.
- Hoitosuhde: vain säännöllisen kotihoidon asiakkaat. Palveluasumisen asiakkaisiin sairaanhoitajalla ei ole hoitosuhdetta.
- Sairaanhoitaja näkee: Terveydenhuollon käynnit (kaikki tiedot); Diagnoosit; Lääkitys; Laboratoriotulokset; Käyntimuistiinpanot (koko teksti); Sosiaalihuollon asiakkuus; Päätös- ja suunnitelmatekstit; Kotihoidon käynnit ja suunniteltu palvelu; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT).
- Sairaanhoitaja ei näe: –.
- Sairaanhoitajan painotetut RAI-osa-alueet: kaikki osa-alueet (RAI-arvioija).

### Rooli: Lääkäri
- Roolin nimi sovelluksessa: Lääkäri (Kotihoidon ja palveluasumisen lääkäri).
- Arviointitilanteet: Lääkärin vastaanotto, Lääkehoidon arviointi, RAI-seuranta-arvio. Tämä tietopohja sisältää roolin RAI-seuranta-arvion näkymän.
- Hoitosuhde: kaikki 14 asiakasta.
- Lääkäri näkee: Terveydenhuollon käynnit (kaikki tiedot); Diagnoosit; Lääkitys; Laboratoriotulokset; Käyntimuistiinpanot (koko teksti); Sosiaalihuollon asiakkuus; Kotihoidon käynnit ja suunniteltu palvelu; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT).
- Lääkäri ei näe: Päätös- ja suunnitelmatekstit.
- Lääkärin painotetut RAI-osa-alueet: Liikkuminen ja kaatumiset, Kognitio, Mieliala ja uni, Kipu, Terveydentila ja lääkitys, Palvelujen käyttö.

### Rooli: Fysioterapeutti
- Roolin nimi sovelluksessa: Fysioterapeutti (Liikkuminen, arjen toimintakyky, apuvälineet ja harjoittelu).
- Arviointitilanteet: RAI-seuranta-arvio. Tämä tietopohja sisältää roolin RAI-seuranta-arvion näkymän.
- Hoitosuhde: kaikki 14 asiakasta.
- Fysioterapeutti näkee: Terveydenhuollon käynnit (kaikki tiedot); Diagnoosit; Käyntimuistiinpanot (koko teksti); Sosiaalihuollon asiakkuus; Kotihoidon käynnit ja suunniteltu palvelu.
- Fysioterapeutti ei näe: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT).
- Fysioterapeutin painotetut RAI-osa-alueet: Arjessa selviytyminen ja avuntarve, Liikkuminen ja kaatumiset, Kipu.

### Rooli: Sosiaalityöntekijä
- Roolin nimi sovelluksessa: Sosiaalityöntekijä (Arjessa selviytyminen, tukiverkosto ja palvelut).
- Arviointitilanteet: RAI-seuranta-arvio, Palvelutarpeen arviointi. Tämä tietopohja sisältää roolin RAI-seuranta-arvion näkymän.
- Hoitosuhde: kaikki 14 asiakasta.
- Sosiaalityöntekijä näkee: Terveydenhuollon käynnit (vain määrät ja kiireellisyys); Käyntimuistiinpanot (vain toimintakykyosio); Sosiaalihuollon asiakkuus; Päätös- ja suunnitelmatekstit; Kotihoidon käynnit ja suunniteltu palvelu.
- Sosiaalityöntekijä ei näe: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT).
- Sosiaalityöntekijän painotetut RAI-osa-alueet: Arjessa selviytyminen ja avuntarve, Liikkuminen ja kaatumiset, Kognitio, Kommunikointi ja aistit, Sosiaalinen osallistuminen ja elintavat, Palvelujen käyttö.

## Tilat
Tila kuvaa tarkistamisen tarvetta, ei asiakkaan riskiä tai palvelutarvetta.
- ▲ Merkittävä kielteinen muutos
- ◆ Seurattava muutos
- ↑ Merkittävä myönteinen muutos
- = Ei muutoksia lähtötilanteeseen
- ℹ Tiedoksi: esimerkiksi RAI-seuranta-arvion ajankohta.

## Varmuus
- selvä: rakenteinen tieto (diagnoosikoodi, lääketietue, mittaus).
- kohtalainen: tulkinta vaatii tarkistusta.
- epävarma: yksittäinen tai tilapäinen tieto, tai tiedon puuttumiseen perustuva päätelmä.
- ristiriitainen: tiedoissa on myös havaintoa vastaan puhuvaa tietoa (vastanäyttö).

## RAI-arvioinnin osa-alueet
1. Arjessa selviytyminen ja avuntarve
2. Liikkuminen ja kaatumiset
3. Kognitio
4. Kommunikointi ja aistit
5. Mieliala ja uni
6. Sosiaalinen osallistuminen ja elintavat
7. Kipu
8. Ravitsemus
9. Terveydentila ja lääkitys
10. Palvelujen käyttö

## Säännöt
Agentin säännöt vertaavat lähtötilannetta (palvelutarpeen arviointi ja palvelupäätös) sen jälkeen kertyneisiin tietoihin. Raja-arvot ovat demon sääntöjä, eivät kliinisiä tai virallisia RAI-rajoja.

### Sääntö KAATUMINEN: Kaatumistaipumus kirjattu
- Osa-alue: Liikkuminen ja kaatumiset. Suunta: kielteinen tai seurattava.
- Peruste: Kaatumistaipumus (R29.6) kirjattu käynnin diagnoosiksi lähtötilanteen jälkeen. Jos sitä ei ole kirjattu lähtötilannetta edeltäneen 12 kk:n aikana → merkittävä, muuten seurattava.
- Käytetyt tiedot: Terveydenhuollon käynnit ja diagnoosit
- Rajoitteet: Kaatumiset kirjautuvat vain, jos asiakas hakeutuu terveysasemalle. Kotona tapahtuneet kaatumiset ilman käyntiä eivät näy (aliedustus).

### Sääntö VAMMA: Tapaturmat ja vammat
- Osa-alue: Liikkuminen ja kaatumiset. Suunta: kielteinen tai seurattava.
- Peruste: Vammadiagnoosi (S- tai T-koodi) lähtötilanteen jälkeen. Murtuma tai vammoja ≥ 2 eri päivänä → merkittävä, 1 → seurattava.
- Käytetyt tiedot: Terveydenhuollon käynnit ja diagnoosit, käyntimuistiinpanon tulosyy
- Rajoitteet: Vamman syntytapa (esim. kaatuminen) ei selviä diagnoosikoodista. Havainto ei kerro, liittyykö vamma toimintakyvyn muutokseen.

### Sääntö HUIMAUS: Huimaus
- Osa-alue: Liikkuminen ja kaatumiset. Suunta: kielteinen tai seurattava.
- Peruste: Huimaus (R42) kirjattu lähtötilanteen jälkeen tai toimintakykykuvauksessa mainitaan huimaus → seurattava. Jos samalla on aloitettu kaatumisriskiä mahdollisesti lisäävä lääke → merkittävä.
- Käytetyt tiedot: Diagnoosit, käyntimuistiinpanon toimintakykyosio, lääkitys
- Rajoitteet: Huimauksen syy ei selviä aineistosta.

### Sääntö MIELIALA: Mielialaan liittyvät kirjaukset
- Osa-alue: Mieliala ja uni. Suunta: kielteinen tai seurattava.
- Peruste: Masennus- tai ahdistuneisuusdiagnoosi (F32–F41) tai mielialalääkkeen (N06A, N05B, N05C) aloitus lähtötilanteen jälkeen, kun vastaavaa ei ollut lähtötilanteessa. Molemmat → merkittävä, toinen → seurattava. Lähtötilanteessa jo kirjattu → seurattava.
- Käytetyt tiedot: Diagnoosit, lääkitys
- Rajoitteet: Diagnoosikoodi ei kerro oireiden vaikeusastetta. Lääkkeen käyttöaihe ei näy aineistossa.

### Sääntö UNI: Univaikeudet
- Osa-alue: Mieliala ja uni. Suunta: kielteinen tai seurattava.
- Peruste: Unihäiriö (G47) kirjattu lähtötilanteen jälkeen, kun sitä ei ollut lähtötilanteessa, eikä mielialasääntö jo kata sitä → seurattava.
- Käytetyt tiedot: Diagnoosit
- Rajoitteet: Yksittäinen kirjaus voi liittyä tilapäiseen vaivaan.

### Sääntö KIPU: Kipuun liittyvät käynnit
- Osa-alue: Kipu. Suunta: kielteinen tai seurattava.
- Peruste: Kipuun liittyvä diagnoosi (M-, R10-, R51-koodit) ≥ 2 eri päivänä lähtötilanteen jälkeen tai 1 kerta, kun toimintakykykuvauksessa kipu rajoittaa toimintaa → seurattava.
- Käytetyt tiedot: Diagnoosit, käyntimuistiinpanon toimintakykyosio, kipulääkkeet
- Rajoitteet: Kivun voimakkuutta ei ole aineistossa mitattu.

### Sääntö TOIMINTAKYKY: Toimintakyvyn kuvaus käyntimuistiinpanossa
- Osa-alue: Arjessa selviytyminen ja avuntarve. Suunta: kielteinen tai seurattava.
- Peruste: Lähtötilanteen jälkeisen käyntimuistiinpanon toimintakykyosiossa kuvataan toiminnan vaikeutumista, rajoittumista tai pelkoa → seurattava. ”Tilapäisesti” → epävarma.
- Käytetyt tiedot: Käyntimuistiinpanon toimintakykyosio (vapaa teksti)
- Rajoitteet: Perustuu avainsanoihin ja asiakkaan omaan kuvaukseen yhdellä käynnillä. Vapaan tekstin tulkinta voi tuottaa virhehälytyksiä.

### Sääntö KIIREELLISET: Kiireelliset käynnit
- Osa-alue: Palvelujen käyttö. Suunta: kielteinen tai seurattava.
- Peruste: Vähintään 2 kiireellistä käyntiä lähtötilanteen jälkeen, ja vuoteen suhteutettu määrä on suurempi kuin lähtötilannetta edeltäneen 12 kk:n aikana → seurattava. Vähintään kaksinkertainen → merkittävä. Yksittäinen kiireellinen käynti ei nosta havaintoa.
- Käytetyt tiedot: Terveydenhuollon käynnit (kiireellisyys)
- Rajoitteet: Lyhyellä seurantajaksolla yksittäinen käynti painaa paljon, siksi vaaditaan vähintään kaksi. Käyntien syyt eivät näy ilman diagnooseja.

### Sääntö LAAKITYS: Lääkitysmuutokset
- Osa-alue: Terveydentila ja lääkitys. Suunta: kielteinen tai seurattava.
- Peruste: Säännöllisessä lääkityksessä uusi vaikuttava aine tai lopetettu aine lähtötilanteeseen verrattuna → seurattava. Uusi kaatumisriskiä mahdollisesti lisäävä lääke (FRID) mainitaan erikseen. ≥ 3 uutta säännöllistä ainetta → merkittävä.
- Käytetyt tiedot: Lääkitys (vaikuttava aine, ATC, käyttötapa, aloitus- ja lopetuspäivä)
- Rajoitteet: Reseptien uusinnat näkyvät aineistossa uusina riveinä; muutos lasketaan vaikuttavan aineen tasolla. Käyttöaihe ei näy.

### Sääntö LAB: Laboratoriotulosten muutos
- Osa-alue: Terveydentila ja lääkitys. Suunta: kielteinen tai seurattava.
- Peruste: Viimeisin tulos lähtötilanteen jälkeen verrattuna viimeisimpään ennen lähtötilannetta: B-HbA1c nousu ≥ 6 mmol/mol, P-Krea nousu ≥ 25 %, fP-Gluk nousu ≥ 1,5 mmol/l → seurattava.
- Käytetyt tiedot: Laboratoriotulokset
- Rajoitteet: Aineistossa ei ole viitearvoja. Vertailu vaatii tuloksen sekä ennen että jälkeen lähtötilanteen.

### Sääntö KUULO: Kuuloon liittyvä kirjaus
- Osa-alue: Kommunikointi ja aistit. Suunta: kielteinen tai seurattava.
- Peruste: Kuuloon tai korvaan liittyvä diagnoosi (H60–H95) lähtötilanteen jälkeen → tiedoksi.
- Käytetyt tiedot: Diagnoosit
- Rajoitteet: Usein tilapäinen vaiva.

### Sääntö AVUNTARVE: Kotihoidon käyntimäärän muutos
- Osa-alue: Arjessa selviytyminen ja avuntarve. Suunta: kielteinen tai seurattava.
- Peruste: Kotihoidon kotikäynnit tai käyttöaika: kolmen viimeisen täyden kuukauden keskiarvo verrattuna palvelun kolmen ensimmäisen täyden kuukauden keskiarvoon. Muutos ≥ 20 % → seurattava, ≥ 40 % → merkittävä.
- Käytetyt tiedot: Sosiaalihuollon kontaktit (kuukausikooste)
- Rajoitteet: Toteutunut käyntimäärä riippuu myös resursseista ja asiakkaan poissaoloista. Vaatii vähintään 6 täyttä palvelukuukautta.

### Sääntö PALVELUMUUTOS: Palveluprosessin muutos
- Osa-alue: Arjessa selviytyminen ja avuntarve. Suunta: kielteinen tai seurattava.
- Peruste: Lähtötilanteen jälkeen uusi vireilletulo tai päätös → merkittävä. Palvelu päättynyt, palvelussa merkintä keskeytyksestä tai kotihoidon käyntejä ei ole kirjattu kahteen viimeiseen täyteen kuukauteen, vaikka palvelu on voimassa → seurattava.
- Käytetyt tiedot: Sosiaalihuollon vireilletulot, päätökset, palvelut ja kotihoidon käynnit (kuukausikooste)
- Rajoitteet: Keskeytyksen ajankohtaa ja syytä ei ole aineistossa; se päätellään viimeisestä kuukaudesta, jolta käyntejä on kirjattu.

### Sääntö KIIREELLISET_VAH: Kiireelliset käynnit vähentyneet
- Osa-alue: Palvelujen käyttö. Suunta: myönteinen.
- Peruste: Lähtötilannetta edeltäneen 12 kk:n aikana vähintään 2 kiireellistä käyntiä, ja vuoteen suhteutettu määrä lähtötilanteen jälkeen on enintään puolet siitä (seurantaa vähintään 90 vrk) → myönteinen muutos.
- Käytetyt tiedot: Terveydenhuollon käynnit (kiireellisyys)
- Rajoitteet: Käyntien väheneminen voi johtua myös siitä, että asiakas hakeutuu muualle hoitoon.

### Sääntö KAATUMINEN_EI: Ei kaatumis- tai vammakirjauksia
- Osa-alue: Liikkuminen ja kaatumiset. Suunta: myönteinen.
- Peruste: Kaatumistaipumus (R29.6) tai vamma (S/T) kirjattu lähtötilannetta edeltäneen 12 kk:n aikana, mutta ei lähtötilanteen jälkeen (seurantaa vähintään 120 vrk) → myönteinen muutos, varmuus epävarma.
- Käytetyt tiedot: Terveydenhuollon käynnit ja diagnoosit
- Rajoitteet: Kirjauksen puuttuminen ei todista, ettei kaatumisia olisi ollut – kotona tapahtuneet kaatumiset ilman käyntiä eivät näy.

### Sääntö MIELIALA_EI: Ei uusia mielialakirjauksia
- Osa-alue: Mieliala ja uni. Suunta: myönteinen.
- Peruste: Masennus- tai ahdistuneisuusdiagnoosi kirjattu lähtötilannetta edeltäneen 12 kk:n aikana, mutta ei lähtötilanteen jälkeen, eikä uutta mielialalääkettä ole aloitettu (seurantaa vähintään 120 vrk) → myönteinen muutos, varmuus epävarma.
- Käytetyt tiedot: Diagnoosit, lääkitys
- Rajoitteet: Diagnoosin puuttuminen ei kerro oireiden poistumisesta.

### Sääntö LAB_PARANNUS: Laboratoriotulos kohentunut
- Osa-alue: Terveydentila ja lääkitys. Suunta: myönteinen.
- Peruste: Viimeisin tulos lähtötilanteen jälkeen verrattuna viimeisimpään ennen lähtötilannetta: B-HbA1c lasku ≥ 6 mmol/mol, P-Krea lasku ≥ 25 %, fP-Gluk lasku ≥ 1,5 mmol/l → myönteinen muutos.
- Käytetyt tiedot: Laboratoriotulokset
- Rajoitteet: Aineistossa ei ole viitearvoja; lasku ei aina ole myönteinen (lääkärin arvio).

### Sääntö SEURANTA: RAI-seuranta-arvion ajankohta
- Osa-alue: Arjessa selviytyminen ja avuntarve. Suunta: kielteinen tai seurattava.
- Peruste: RAI-seuranta-arvio noin 6 kk välein tai asiakkaan tilanteen olennaisesti muuttuessa. 6 kk lähtötilanteesta täyttynyt tai täyttyy 30 vrk:n sisällä → tiedoksi.
- Käytetyt tiedot: Lähtötilanteen päivämäärä
- Rajoitteet: Aineistossa ei ole tietoa tehdyistä RAI-arvioinneista.

## Rakenteiset kyselyt
Kyselyt täytetään asiakkaan kanssa. Agentti ei tulkitse pistemäärää. Kyselyt kuuluvat vain roolien, joilla on oikeus rakenteisiin kyselyihin, käyttöön (sairaanhoitaja, lääkäri).

### Kysely PHQ-9: Masennuskysely (PHQ-9)
- Pistealue 0–27. Tällä Patient Health Questionnaire -masennuskyselyllä voit arvioida mahdollisia masennusoireitasi. PHQ-9 (Patient Health Questionnaire - 9) -kysely.
- Ohje: Kuinka usein seuraavat ongelmat ovat vaivanneet teitä viimeisten 2 viikon aikana?
- Kysymykset: (1) 1. Asioiden tekeminen kiinnostaa hyvin vähän tai ei juuri tuota mielihyvää (2) 2. Alakuloisuus, masentuneisuus tai toivottomuus (3) 3. Nukahtamis- tai nukkumisvaikeudet tai liiallinen nukkuminen (4) 4 .Väsymys tai energian puute (5) 5. Huono ruokahalu tai ylensyöminen (6) 6. Tyytymättömyys omaan itseen – tai tunne, että olen epäonnistunut tai laiminlyönyt itseäni tai perhettäni (7) 7. Vaikeus keskittyä asioihin, kuten lehden lukemiseen tai television katseluun (8) 8. Liikutko tai puhutko niin hitaasti, että muut ihmiset ovat saattaneet huomata? Tai päinvastoin – oletko ollut niin hermostunut tai levoton, että olet liikkunut paljon tavallista enemmän? (9) 9. Ajatukset, että voisi olla yhtä hyvin kuollut tai, että voisi vahingoittaa itseään jollakin tavalla (10) Jos sinulla on ollut jokin ongelma, niin kuinka vaikeaa sinun on ollut huolehtia työstäsi, kotiasioista tai tulla toimeen muiden ihmisten kanssa näiden ongelmien vuoksi?

### Kysely GAD-7: Ahdistuneisuuskysely (GAD-7)
- Pistealue 0–21. Tällä kyselyllä voit arvioida ahdistuneisuusoireitasi. Kysely perustuu DSM-5 järjestelmän yleistyneen ahdistuneisuushäiriön diagnostisiin kriteereihin. Kyselyn voit täyttää riippumatta siitä, onko sinulla ahdistuneisuushäiriön diagnoosia.
- Ohje: Arvioi jokaisen väittämän kohdalla, kuinka usein seuraavat ongelmat ovat vaivanneet sinua kyselyn täyttöä edeltäneen kahden viikon aikana.
- Kysymykset: (1) 1. Hermostuneisuuden, ahdistuneisuuden tai kireyden tunne (2) 2. En ole voinut lopettaa tai hallita huolestumistani (3) 3. Liiallinen huolestuneisuus erilaisista asioista (4) 4. Vaikeus rentoutua (5) 5. Niin levoton olo, että on vaikea pysyä aloillaan (6) 6. Taipumus harmistua tai ärsyyntyä helposti (7) 7. Pelko siitä, että jotakin kauheaa saattaisi tapahtua

### Kysely AUDIT: Alkoholin käytön riskit - kysely (AUDIT)
- Pistealue 0–40. Tällä AUDIT-lomakkeella voidaan kartoittaa alkoholin käyttöäsi ja siihen liittyviä tottumuksia. (AUDIT=Alcohol Use Disorders Identification Test)
- Ohje: Vastaa kysymyksiin alkoholinkäytöstäsi kuluneen vuoden aikana.
- Kysymykset: (1) 1. Kuinka usein juot olutta, viiniä tai muita alkoholijuomia? Ota mukaan myös ne kerrat, jolloin juot vain pieniä määriä, esimerkiksi pullon keskiolutta tai tilkan viiniä. (2) 2. Kuinka monta alkoholiannosta tavallisesti otat niinä päivinä, jolloin juot alkoholia? (1 annos = 12 cl mietoa viiniä, 8 cl väkevää viiniä, 4 cl viinaa tai muuta väkevää juomaa. 1.25 annos = pullo A-olutta, pullo Alkon siideriä tai pullo long drinkkiä.) (3) 3. Kuinka usein juot yhdellä juomakerralla kuusi tai useampia alkoholiannoksia? (4) 4. Kuinka usein viimeksi kuluneen vuoden aikana sinulle on käynyt niin, että et ole pystynyt lopettamaan alkoholin juomista, kun kerran olit sen aloittanut? (5) 5. Kuinka usein viimeksi kuluneen vuoden aikana sinulta on juomisesi vuoksi jäänyt hoitamatta jokin asia, joka sinun tavallisesti olisi kuulunut hoitaa? (6) 6. Kuinka usein viimeksi kuluneen vuoden aikana olet tarvinnut runsaan juomisen jälkeisenä aamuna annoksen alkoholia saadaksesi itsesi liikkeelle? (7) 7. Kuinka usein viimeisen vuoden aikana olet tuntenut syyllisyyttä tai katumusta juomisen jälkeen? (8) 8. Kuinka usein viimeksi kuluneen vuoden aikana sinulle on käynyt niin, että et ole seuraavana päivänä pystynyt muistamaan edellisen illan tapahtumia, koska olit juonut alkoholia? (9) 9. Oletko itse tai onko joku muu vahingoittunut alkoholinkäyttösi vuoksi? (10) 10. Onko joku läheisesi tai ystäväsi, lääkäri tai joku muu terveydenhuollon työntekijä ollut huolissaan alkoholinkäytöstäsi tai ehdottanut, että vähentäisit juomista?

# Asiakasyhteenveto

| Asiakas | Ikä, sukupuoli, palvelu, kunta | Lähtötilanne | RAI-seuranta-arvio | Sairaanhoitaja | Lääkäri | Fysioterapeutti | Sosiaalityöntekijä |
|---|---|---|---|---|---|---|---|
| Asiakas 0831 | 70 v, mies, Säännöllinen kotihoito, Raseborg | 4.2.2026 | myöhässä 70 vrk (määräpäivä 4.8.2026) | ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä) | ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä) | ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä) | = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä) |
| Asiakas 3245 | 80 v, nainen, Säännöllinen kotihoito, Lohja | 6.2.2026 | myöhässä 68 vrk (määräpäivä 6.8.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 1 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 1 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) |
| Asiakas 6531 | 77 v, mies, Säännöllinen kotihoito, Espoo | 19.10.2025 | myöhässä 177 vrk (määräpäivä 19.4.2026) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) |
| Asiakas 4006 | 84 v, nainen, Ympärivuorokautinen palveluasuminen, Espoo | 4.12.2025 | myöhässä 131 vrk (määräpäivä 4.6.2026) | Ei hoitosuhdetta | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä) |
| Asiakas 3713 | 79 v, nainen, Säännöllinen kotihoito, Espoo | 13.1.2026 | myöhässä 92 vrk (määräpäivä 13.7.2026) | ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä) |
| Asiakas 1694 | 76 v, mies, Säännöllinen kotihoito, Espoo | 6.12.2025 | myöhässä 129 vrk (määräpäivä 6.6.2026) | ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä) |
| Asiakas 2506 | 78 v, mies, Säännöllinen kotihoito, Espoo | 27.1.2026 | myöhässä 78 vrk (määräpäivä 27.7.2026) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä) |
| Asiakas 0638 | 81 v, mies, Säännöllinen kotihoito, Kirkkonummi | 9.10.2025 | myöhässä 187 vrk (määräpäivä 9.4.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) | = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä) |
| Asiakas 9422 | 72 v, mies, Säännöllinen kotihoito, Espoo | 22.3.2026 | myöhässä 21 vrk (määräpäivä 22.9.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä) |
| Asiakas 8163 | 70 v, nainen, Säännöllinen kotihoito, Raseborg | 13.2.2026 | myöhässä 61 vrk (määräpäivä 13.8.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) |
| Asiakas 3826 | 81 v, nainen, Ympärivuorokautinen palveluasuminen, Espoo | 30.3.2026 | myöhässä 13 vrk (määräpäivä 30.9.2026) | Ei hoitosuhdetta | ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä) |
| Asiakas 7109 | 78 v, mies, Säännöllinen kotihoito, Espoo | 22.12.2025 | myöhässä 113 vrk (määräpäivä 22.6.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) |
| Asiakas 4995 | 71 v, nainen, Säännöllinen kotihoito, Kirkkonummi | 16.5.2026 | 34 vrk jäljellä (määräpäivä 16.11.2026) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä) | = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä) |
| Asiakas 6781 | 73 v, mies, Ympärivuorokautinen palveluasuminen, Kirkkonummi | 17.10.2025 | myöhässä 179 vrk (määräpäivä 17.4.2026) | Ei hoitosuhdetta | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä) | ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä) | ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä) |

## Tarkistamisjärjestys roolettain
Järjestys: eniten merkittäviä kielteisiä muutoksia ensin, sitten seurattavia, sitten myönteisiä. Järjestys ei ole riskiluokitus.

### Sairaanhoitajan tarkistamisjärjestys (RAI-seuranta-arvio)
1. Asiakas 1694: ▲ Merkittävä kielteinen muutos – 2 merkittävää, 2 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
2. Asiakas 7109: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 3 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
3. Asiakas 3245: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 1 myönteistä. Ensimmäisenä: Mielialaan liittyvä uusi kirjaus
4. Asiakas 9422: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
5. Asiakas 8163: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
6. Asiakas 0638: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 0 myönteistä. Ensimmäisenä: Mielialaan liittyvä uusi kirjaus
7. Asiakas 4995: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 0 seurattavaa, 0 myönteistä. Ensimmäisenä: Murtuma lähtötilanteen jälkeen
8. Asiakas 3713: ◆ Seurattava muutos – 0 merkittävää, 3 seurattavaa, 0 myönteistä
9. Asiakas 2506: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
10. Asiakas 6531: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
11. Asiakas 0831: ↑ Merkittävä myönteinen muutos – 0 merkittävää, 0 seurattavaa, 1 myönteistä

### Lääkärin tarkistamisjärjestys (RAI-seuranta-arvio)
1. Asiakas 1694: ▲ Merkittävä kielteinen muutos – 2 merkittävää, 2 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
2. Asiakas 3826: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 3 seurattavaa, 0 myönteistä. Ensimmäisenä: Mielialaan liittyvä uusi kirjaus
3. Asiakas 7109: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 3 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
4. Asiakas 3245: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 1 myönteistä. Ensimmäisenä: Mielialaan liittyvä uusi kirjaus
5. Asiakas 9422: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
6. Asiakas 8163: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
7. Asiakas 0638: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 0 myönteistä. Ensimmäisenä: Mielialaan liittyvä uusi kirjaus
8. Asiakas 6781: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
9. Asiakas 4995: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 0 seurattavaa, 0 myönteistä. Ensimmäisenä: Murtuma lähtötilanteen jälkeen
10. Asiakas 3713: ◆ Seurattava muutos – 0 merkittävää, 3 seurattavaa, 0 myönteistä
11. Asiakas 2506: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
12. Asiakas 4006: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
13. Asiakas 6531: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
14. Asiakas 0831: ↑ Merkittävä myönteinen muutos – 0 merkittävää, 0 seurattavaa, 1 myönteistä

### Fysioterapeutin tarkistamisjärjestys (RAI-seuranta-arvio)
1. Asiakas 1694: ▲ Merkittävä kielteinen muutos – 2 merkittävää, 2 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
2. Asiakas 7109: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
3. Asiakas 9422: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
4. Asiakas 8163: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 1 myönteistä. Ensimmäisenä: Toistuvia vammoja lähtötilanteen jälkeen
5. Asiakas 6781: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 1 seurattavaa, 0 myönteistä. Ensimmäisenä: Kaatumistaipumus kirjattu lähtötilanteen jälkeen
6. Asiakas 4995: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 0 seurattavaa, 0 myönteistä. Ensimmäisenä: Murtuma lähtötilanteen jälkeen
7. Asiakas 3713: ◆ Seurattava muutos – 0 merkittävää, 3 seurattavaa, 0 myönteistä
8. Asiakas 3826: ◆ Seurattava muutos – 0 merkittävää, 3 seurattavaa, 0 myönteistä
9. Asiakas 3245: ◆ Seurattava muutos – 0 merkittävää, 2 seurattavaa, 1 myönteistä
10. Asiakas 0638: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
11. Asiakas 2506: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
12. Asiakas 4006: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
13. Asiakas 6531: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
14. Asiakas 0831: ↑ Merkittävä myönteinen muutos – 0 merkittävää, 0 seurattavaa, 1 myönteistä

### Sosiaalityöntekijän tarkistamisjärjestys (RAI-seuranta-arvio)
1. Asiakas 1694: ▲ Merkittävä kielteinen muutos – 1 merkittävää, 2 seurattavaa, 0 myönteistä. Ensimmäisenä: Kiireelliset käynnit lisääntyneet
2. Asiakas 3713: ◆ Seurattava muutos – 0 merkittävää, 2 seurattavaa, 0 myönteistä
3. Asiakas 3826: ◆ Seurattava muutos – 0 merkittävää, 2 seurattavaa, 0 myönteistä
4. Asiakas 9422: ◆ Seurattava muutos – 0 merkittävää, 2 seurattavaa, 0 myönteistä
5. Asiakas 3245: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
6. Asiakas 6531: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
7. Asiakas 6781: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
8. Asiakas 7109: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
9. Asiakas 8163: ◆ Seurattava muutos – 0 merkittävää, 1 seurattavaa, 0 myönteistä
10. Asiakas 0638: = Ei muutoksia lähtötilanteeseen – 0 merkittävää, 0 seurattavaa, 0 myönteistä
11. Asiakas 0831: = Ei muutoksia lähtötilanteeseen – 0 merkittävää, 0 seurattavaa, 0 myönteistä
12. Asiakas 2506: = Ei muutoksia lähtötilanteeseen – 0 merkittävää, 0 seurattavaa, 0 myönteistä
13. Asiakas 4006: = Ei muutoksia lähtötilanteeseen – 0 merkittävää, 0 seurattavaa, 0 myönteistä
14. Asiakas 4995: = Ei muutoksia lähtötilanteeseen – 0 merkittävää, 0 seurattavaa, 0 myönteistä

## RAI-seuranta-arviot myöhässä
- Asiakas 0638: RAI-seuranta-arvio myöhässä 187 vrk (määräpäivä 9.4.2026, lähtötilanne 9.10.2025).
- Asiakas 6781: RAI-seuranta-arvio myöhässä 179 vrk (määräpäivä 17.4.2026, lähtötilanne 17.10.2025).
- Asiakas 6531: RAI-seuranta-arvio myöhässä 177 vrk (määräpäivä 19.4.2026, lähtötilanne 19.10.2025).
- Asiakas 4006: RAI-seuranta-arvio myöhässä 131 vrk (määräpäivä 4.6.2026, lähtötilanne 4.12.2025).
- Asiakas 1694: RAI-seuranta-arvio myöhässä 129 vrk (määräpäivä 6.6.2026, lähtötilanne 6.12.2025).
- Asiakas 7109: RAI-seuranta-arvio myöhässä 113 vrk (määräpäivä 22.6.2026, lähtötilanne 22.12.2025).
- Asiakas 3713: RAI-seuranta-arvio myöhässä 92 vrk (määräpäivä 13.7.2026, lähtötilanne 13.1.2026).
- Asiakas 2506: RAI-seuranta-arvio myöhässä 78 vrk (määräpäivä 27.7.2026, lähtötilanne 27.1.2026).
- Asiakas 0831: RAI-seuranta-arvio myöhässä 70 vrk (määräpäivä 4.8.2026, lähtötilanne 4.2.2026).
- Asiakas 3245: RAI-seuranta-arvio myöhässä 68 vrk (määräpäivä 6.8.2026, lähtötilanne 6.2.2026).
- Asiakas 8163: RAI-seuranta-arvio myöhässä 61 vrk (määräpäivä 13.8.2026, lähtötilanne 13.2.2026).
- Asiakas 9422: RAI-seuranta-arvio myöhässä 21 vrk (määräpäivä 22.9.2026, lähtötilanne 22.3.2026).
- Asiakas 3826: RAI-seuranta-arvio myöhässä 13 vrk (määräpäivä 30.9.2026, lähtötilanne 30.3.2026).

# Asiakkaat

## Asiakas 0831

**Asiakas 0831 – perustiedot:** 70-vuotias mies, Raseborg, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000000831 (synteettinen).

**Asiakas 0831 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 4.2.2026. Vireille 10.1.2026. Arviointijakso 21.1.2026–4.2.2026. Päätös voimassa 9.2.2026 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki. Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki.

**Asiakas 0831 – RAI-seuranta-arvio:** myöhässä 70 vrk, määräpäivä 4.8.2026 (6 kk lähtötilanteesta).

**Asiakas 0831 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 0831 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 0831, sairaanhoitajan näkymä – tila:** ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä).

**Asiakas 0831, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 4.2.2026 (251 vrk sitten). Sen jälkeen 1 terveysaseman käynti. Tiedoissa ei tunnistettu kielteisiä muutoksia. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Ammattilainen arvioi, vastaako havainto asiakkaan omaa kokemusta.

#### Asiakas 0831, sairaanhoitajan näkymä – havainnot

- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 0831, sairaanhoitajan näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila; F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 13.2.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila; 13.5.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0831, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.8.2026.
  - Miksi tarkistaa: Lähtötilanne 4.2.2026.
  - Lähteet: 4.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.2.2026

#### Asiakas 0831, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 4.2.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 40 min / vrk; Toimintakyky (lääkäri, 25.9.2025): Potilaan mukaan yläraajan käyttö hartiatason yläpuolella on vaikeutunut. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 44 kotikäyntiä, 1435 min.
- Liikkuminen ja kaatumiset (Asiakas 0831, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kognitio (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (13.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (13.5.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kipu (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M25.5 Nivelkipu – 1 käynti (25.9.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 0831, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (2.10.2026); Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 0831, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 1 käynti terveysasemalla (kiireellisiä 0) 251 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 0831, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta.

### Asiakas 0831 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 0831, lääkärin näkymä – tila:** ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä).

**Asiakas 0831, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 4.2.2026 (251 vrk sitten). Sen jälkeen 1 terveysaseman käynti. Tiedoissa ei tunnistettu kielteisiä muutoksia. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Ammattilainen arvioi, vastaako havainto asiakkaan omaa kokemusta.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0831, lääkärin näkymä – havainnot

- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 0831, lääkärin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila; F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 13.2.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila; 13.5.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0831, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.8.2026.
  - Miksi tarkistaa: Lähtötilanne 4.2.2026.
  - Lähteet: 4.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.2.2026

#### Asiakas 0831, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 0831, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kognitio (Asiakas 0831, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 0831, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (13.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (13.5.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kipu (Asiakas 0831, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M25.5 Nivelkipu – 1 käynti (25.9.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Terveydentila ja lääkitys (Asiakas 0831, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (2.10.2026); Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 0831, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 1 käynti terveysasemalla (kiireellisiä 0) 251 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 0831, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 4.2.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 40 min / vrk; Toimintakyky (lääkäri, 25.9.2025): Potilaan mukaan yläraajan käyttö hartiatason yläpuolella on vaikeutunut. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 44 kotikäyntiä, 1435 min.
- Kommunikointi ja aistit (Asiakas 0831, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0831, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 0831, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 0831, lääkärin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta.

### Asiakas 0831 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 0831, fysioterapeutin näkymä – tila:** ↑ Merkittävä myönteinen muutos (0 merkittävää, 0 seurattavaa, 1 myönteistä).

**Asiakas 0831, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 4.2.2026 (251 vrk sitten). Sen jälkeen 1 terveysaseman käynti. Tiedoissa ei tunnistettu kielteisiä muutoksia. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Ammattilainen arvioi, vastaako havainto asiakkaan omaa kokemusta.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0831, fysioterapeutin näkymä – havainnot

- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 0831, fysioterapeutin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila; F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 13.2.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila; 13.5.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0831, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.8.2026.
  - Miksi tarkistaa: Lähtötilanne 4.2.2026.
  - Lähteet: 4.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.2.2026

#### Asiakas 0831, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0831, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 4.2.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 40 min / vrk; Toimintakyky (lääkäri, 25.9.2025): Potilaan mukaan yläraajan käyttö hartiatason yläpuolella on vaikeutunut. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 44 kotikäyntiä, 1435 min.
- Liikkuminen ja kaatumiset (Asiakas 0831, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 0831, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M25.5 Nivelkipu – 1 käynti (25.9.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kognitio (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (13.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (13.5.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 0831, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (2.10.2026).
- Palvelujen käyttö (Asiakas 0831, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 1 käynti terveysasemalla (kiireellisiä 0) 251 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 0831, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta.

### Asiakas 0831 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 0831, sosiaalityöntekijän näkymä – tila:** = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 0831, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 4.2.2026 (251 vrk sitten). Sen jälkeen 1 terveysaseman käynti (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0831, sosiaalityöntekijän näkymä – havainnot

- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0831, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.8.2026.
  - Miksi tarkistaa: Lähtötilanne 4.2.2026.
  - Lähteet: 4.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.2.2026

#### Asiakas 0831, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0831, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 4.2.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 40 min / vrk; Toimintakyky (lääkäri, 25.9.2025): Potilaan mukaan yläraajan käyttö hartiatason yläpuolella on vaikeutunut. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 44 kotikäyntiä, 1435 min.
- Liikkuminen ja kaatumiset (Asiakas 0831, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 0831, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 0831, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0831, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 0831, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 1 käynti terveysasemalla (kiireellisiä 0) 251 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 0831, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 0831, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 0831, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 0831, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

## Asiakas 3245

**Asiakas 3245 – perustiedot:** 80-vuotias nainen, Lohja, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000013245 (synteettinen).

**Asiakas 3245 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 6.2.2026. Vireille 30.12.2025. Arviointijakso 11.1.2026–6.2.2026. Päätös voimassa 8.2.2026 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki. Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki.

**Asiakas 3245 – RAI-seuranta-arvio:** myöhässä 68 vrk, määräpäivä 6.8.2026 (6 kk lähtötilanteesta).

**Asiakas 3245 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 3245 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 3245, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 3245, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.2.2026 (249 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: mielialaan liittyvä uusi kirjaus. Seurattavia muutoksia: kotihoidon käynnit keskeytyneet; säännöllinen lääkitys muuttunut. Myönteiseen suuntaan: ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 3245, sairaanhoitajan näkymä – havainnot

- **▲ Mielialaan liittyvä uusi kirjaus** (Asiakas 3245, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 9.7.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (9.7.2026). Aloitettu essitalopraami 9.7.2026.
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 9.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö; 9.7.2026, Terveydenhuolto · lääkitys: Aloitettu 9.7.2026: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9; Rakenteinen kysely GAD-7
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3245, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 8.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 3245, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 9.7.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 1, nyt 2. Jakson aikana aloitettu: essitalopraami (9.7.2026). Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: essitalopraami.
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 9.7.2026, Terveydenhuolto · lääkitys: Aloitettu 9.7.2026: essitalopraami (N06AB10), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia? Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **↑ Ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen** (Asiakas 3245, sairaanhoitajan näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö KAATUMINEN_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu R29.6 Kaatumistaipumus, muualle luokittamaton (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen 249 vrk:n aikana ei vastaavia kirjauksia.
  - Miksi tarkistaa: Kaatumisiin liittyvien käyntien puuttuminen voi kertoa tilanteen vakiintumisesta, mutta varmista asiakkaalta.
  - Lähteet: 27.4.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 11.5.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3245, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.8.2026.
  - Miksi tarkistaa: Lähtötilanne 6.2.2026.
  - Lähteet: 6.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.2.2026

#### Asiakas 3245, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.2.2026 (8.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 65 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 49 kotikäyntiä, 1551 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 10.3.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (9.7.2026); Mielialalääke käytössä: essitalopraami.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Kipu (Asiakas 3245, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Ravitsemus (Asiakas 3245, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (1): metformiini. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (10.3.2026, 5.6.2026); Säännöllinen lääkitys nyt (2): essitalopraami, metformiini; B-HbA1c 46,1 mmol/mol (5.6.2026); P-Krea 79,0 µmol/l (5.6.2026); fP-Gluk 6,1 mmol/l (5.6.2026).
- Palvelujen käyttö (Asiakas 3245, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 2) 249 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 3245, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
- Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?

### Asiakas 3245 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 3245, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 3245, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.2.2026 (249 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: mielialaan liittyvä uusi kirjaus. Seurattavia muutoksia: kotihoidon käynnit keskeytyneet; säännöllinen lääkitys muuttunut. Myönteiseen suuntaan: ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3245, lääkärin näkymä – havainnot

- **▲ Mielialaan liittyvä uusi kirjaus** (Asiakas 3245, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 9.7.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (9.7.2026). Aloitettu essitalopraami 9.7.2026.
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 9.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö; 9.7.2026, Terveydenhuolto · lääkitys: Aloitettu 9.7.2026: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9; Rakenteinen kysely GAD-7
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3245, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 8.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 3245, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 9.7.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 1, nyt 2. Jakson aikana aloitettu: essitalopraami (9.7.2026). Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: essitalopraami.
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 9.7.2026, Terveydenhuolto · lääkitys: Aloitettu 9.7.2026: essitalopraami (N06AB10), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia? Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **↑ Ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen** (Asiakas 3245, lääkärin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö KAATUMINEN_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu R29.6 Kaatumistaipumus, muualle luokittamaton (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen 249 vrk:n aikana ei vastaavia kirjauksia.
  - Miksi tarkistaa: Kaatumisiin liittyvien käyntien puuttuminen voi kertoa tilanteen vakiintumisesta, mutta varmista asiakkaalta.
  - Lähteet: 27.4.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 11.5.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3245, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.8.2026.
  - Miksi tarkistaa: Lähtötilanne 6.2.2026.
  - Lähteet: 6.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.2.2026

#### Asiakas 3245, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 3245, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 3245, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3245, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (9.7.2026); Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 3245, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 3245, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (1): metformiini. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (10.3.2026, 5.6.2026); Säännöllinen lääkitys nyt (2): essitalopraami, metformiini; B-HbA1c 46,1 mmol/mol (5.6.2026); P-Krea 79,0 µmol/l (5.6.2026); fP-Gluk 6,1 mmol/l (5.6.2026).
- Palvelujen käyttö (Asiakas 3245, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 2) 249 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 3245, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.2.2026 (8.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 65 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 49 kotikäyntiä, 1551 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 10.3.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Kommunikointi ja aistit (Asiakas 3245, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3245, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 3245, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 3245, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
- Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?

### Asiakas 3245 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 3245, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 3245, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.2.2026 (249 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Seurattavia muutoksia: kotihoidon käynnit keskeytyneet; mielialaan liittyvä uusi kirjaus. Myönteiseen suuntaan: ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3245, fysioterapeutin näkymä – havainnot

- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3245, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 8.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 3245, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 9.7.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (9.7.2026).
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 9.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- **↑ Ei kaatumis- tai vammakirjauksia lähtötilanteen jälkeen** (Asiakas 3245, fysioterapeutin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö KAATUMINEN_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu R29.6 Kaatumistaipumus, muualle luokittamaton (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen 249 vrk:n aikana ei vastaavia kirjauksia.
  - Miksi tarkistaa: Kaatumisiin liittyvien käyntien puuttuminen voi kertoa tilanteen vakiintumisesta, mutta varmista asiakkaalta.
  - Lähteet: 27.4.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 11.5.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3245, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.8.2026.
  - Miksi tarkistaa: Lähtötilanne 6.2.2026.
  - Lähteet: 6.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.2.2026

#### Asiakas 3245, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3245, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.2.2026 (8.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 65 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 49 kotikäyntiä, 1551 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 10.3.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 3245, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (27.4.2025, 11.5.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kipu (Asiakas 3245, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (9.7.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 3245, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (10.3.2026, 5.6.2026).
- Palvelujen käyttö (Asiakas 3245, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 2) 249 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 3245, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko asiakas kaatunut kotona ilman terveysaseman käyntiä?

### Asiakas 3245 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 3245, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 3245, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.2.2026 (249 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: kotihoidon käynnit keskeytyneet. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3245, sosiaalityöntekijän näkymä – havainnot

- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3245, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 8.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3245, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.8.2026.
  - Miksi tarkistaa: Lähtötilanne 6.2.2026.
  - Lähteet: 6.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.2.2026

#### Asiakas 3245, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3245, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.2.2026 (8.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Alzheimerin tautiin liittyvä tuki; Suunniteltu kotihoito 65 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 49 kotikäyntiä, 1551 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 10.3.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 3245, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 3245, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 3245, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3245, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 3245, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 2) 249 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 3245, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 3245, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 3245, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 3245, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 3245, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?

## Asiakas 6531

**Asiakas 6531 – perustiedot:** 77-vuotias mies, Espoo, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000006531 (synteettinen).

**Asiakas 6531 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 19.10.2025. Vireille 2.10.2025. Arviointijakso 12.10.2025–19.10.2025. Päätös voimassa 5.11.2025–10.1.2026. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 6531 – RAI-seuranta-arvio:** myöhässä 177 vrk, määräpäivä 19.4.2026 (6 kk lähtötilanteesta).

**Asiakas 6531 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 6531 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 6531, sairaanhoitajan näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6531, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 19.10.2025 (359 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 6531, sairaanhoitajan näkymä – havainnot

- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 6531, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 10.1.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 10.1.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 5.11.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 10.1.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6531, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 19.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 19.4.2026.
  - Miksi tarkistaa: Lähtötilanne 19.10.2025.
  - Lähteet: 19.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 19.10.2025

#### Asiakas 6531, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 19.10.2025 (5.11.2025–10.1.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 37 min / vrk. Lähtötilanteen jälkeen: Kotihoito tammikuu 2026: 12 kotikäyntiä, 331 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 26.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: amlodipiini.
- Kognitio (Asiakas 6531, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 6531, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Tupakoi noin 5 savuketta vuorokaudessa.
- Kipu (Asiakas 6531, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Ravitsemus (Asiakas 6531, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (12.12.2024, 10.1.2025); Säännöllinen lääkitys (1): amlodipiini; P-Krea 75,4 µmol/l (10.1.2025). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 4 käyntiä (26.10.2025, 16.1.2026, 8.4.2026, 17.7.2026); Säännöllinen lääkitys nyt (1): amlodipiini; P-Krea 75,5 µmol/l (17.7.2026).
- Palvelujen käyttö (Asiakas 6531, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 359 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 6531, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 6531 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 6531, lääkärin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6531, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 19.10.2025 (359 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6531, lääkärin näkymä – havainnot

- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 6531, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 10.1.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 10.1.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 5.11.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 10.1.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6531, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 19.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 19.4.2026.
  - Miksi tarkistaa: Lähtötilanne 19.10.2025.
  - Lähteet: 19.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 19.10.2025

#### Asiakas 6531, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 6531, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: amlodipiini.
- Kognitio (Asiakas 6531, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 6531, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kipu (Asiakas 6531, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 6531, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (12.12.2024, 10.1.2025); Säännöllinen lääkitys (1): amlodipiini; P-Krea 75,4 µmol/l (10.1.2025). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 4 käyntiä (26.10.2025, 16.1.2026, 8.4.2026, 17.7.2026); Säännöllinen lääkitys nyt (1): amlodipiini; P-Krea 75,5 µmol/l (17.7.2026).
- Palvelujen käyttö (Asiakas 6531, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 359 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 6531, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 19.10.2025 (5.11.2025–10.1.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 37 min / vrk. Lähtötilanteen jälkeen: Kotihoito tammikuu 2026: 12 kotikäyntiä, 331 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 26.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Kommunikointi ja aistit (Asiakas 6531, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6531, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Tupakoi noin 5 savuketta vuorokaudessa.
- Ravitsemus (Asiakas 6531, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 6531, lääkärin näkymä – valmistaudu kohtaamiseen

- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 6531 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 6531, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6531, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 19.10.2025 (359 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6531, fysioterapeutin näkymä – havainnot

- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 6531, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 10.1.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 10.1.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 5.11.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 10.1.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6531, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 19.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 19.4.2026.
  - Miksi tarkistaa: Lähtötilanne 19.10.2025.
  - Lähteet: 19.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 19.10.2025

#### Asiakas 6531, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 6531, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 19.10.2025 (5.11.2025–10.1.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 37 min / vrk. Lähtötilanteen jälkeen: Kotihoito tammikuu 2026: 12 kotikäyntiä, 331 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 26.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 6531, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 6531, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 6531, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 6531, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 6531, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6531, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Tupakoi noin 5 savuketta vuorokaudessa.
- Ravitsemus (Asiakas 6531, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 6531, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (12.12.2024, 10.1.2025). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 4 käyntiä (26.10.2025, 16.1.2026, 8.4.2026, 17.7.2026).
- Palvelujen käyttö (Asiakas 6531, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 359 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 6531, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 6531 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 6531, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6531, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 19.10.2025 (359 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6531, sosiaalityöntekijän näkymä – havainnot

- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 6531, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 10.1.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 10.1.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 5.11.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 10.1.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6531, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 19.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 19.4.2026.
  - Miksi tarkistaa: Lähtötilanne 19.10.2025.
  - Lähteet: 19.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 19.10.2025

#### Asiakas 6531, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 6531, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 19.10.2025 (5.11.2025–10.1.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 37 min / vrk. Lähtötilanteen jälkeen: Kotihoito tammikuu 2026: 12 kotikäyntiä, 331 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 26.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 6531, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 6531, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 6531, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6531, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 6531, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 359 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 6531, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 6531, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 6531, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 6531, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 6531, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

## Asiakas 4006

**Asiakas 4006 – perustiedot:** 84-vuotias nainen, Espoo, asiointikieli suomi. Palvelu: Ympärivuorokautinen palveluasuminen. Tunniste SYN-ASI-1000004006 (synteettinen).

**Asiakas 4006 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 4.12.2025. Päätös voimassa 19.12.2025 alkaen toistaiseksi. Tuen tarve: Ympärivuorokautisen tuen tarve; Alzheimerin tautiin liittyvä tuki. Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki.

**Asiakas 4006 – RAI-seuranta-arvio:** myöhässä 131 vrk, määräpäivä 4.6.2026 (6 kk lähtötilanteesta).

**Asiakas 4006 – hoitosuhteet:** sairaanhoitaja ei (palveluasumisen asiakas), lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 4006 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

Asiakas 4006: sairaanhoitajalla ei ole hoitosuhdetta tähän asiakkaaseen (palveluasumisen asiakas), joten sairaanhoitajan näkymää ei ole.

### Asiakas 4006 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 4006, lääkärin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 4006, lääkärin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (313 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: kaatumistaipumus kirjattu edelleen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 4006, lääkärin näkymä – havainnot

- **◆ Kaatumistaipumus kirjattu edelleen** (Asiakas 4006, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 4.9.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 2 käynnillä (4.9.2026, 18.9.2026). Lähtötilannetta edeltäneen vuoden aikana: 2 kirjausta.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 4.9.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 18.9.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 4006, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.6.2026.
  - Miksi tarkistaa: Lähtötilanne 4.12.2025.
  - Lähteet: 4.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.12.2025

#### Asiakas 4006, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 4006, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (16.2.2025, 2.3.2025). Lähtötilanteen jälkeen: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (4.9.2026, 18.9.2026); Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: amlodipiini.
- Kognitio (Asiakas 4006, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 4006, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kipu (Asiakas 4006, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 4006, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (23.8.2025, 13.11.2025); Säännöllinen lääkitys (1): amlodipiini; P-Krea 70,7 µmol/l (13.11.2025). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (1.1.2026, 13.6.2026); Säännöllinen lääkitys nyt (1): amlodipiini; P-Krea 70,6 µmol/l (13.6.2026).
- Palvelujen käyttö (Asiakas 4006, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 1, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 313 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 4006, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (19.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Alzheimerin tautiin liittyvä tuki; Toimintakyky (lääkäri, 13.11.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 79 min.
- Kommunikointi ja aistit (Asiakas 4006, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4006, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan eläkkeellä. Ulkoilee kävellen useana päivänä viikossa. Ei tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 4006, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 4006, lääkärin näkymä – valmistaudu kohtaamiseen

- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.

### Asiakas 4006 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 4006, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 4006, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (313 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: kaatumistaipumus kirjattu edelleen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 4006, fysioterapeutin näkymä – havainnot

- **◆ Kaatumistaipumus kirjattu edelleen** (Asiakas 4006, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 4.9.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 2 käynnillä (4.9.2026, 18.9.2026). Lähtötilannetta edeltäneen vuoden aikana: 2 kirjausta.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 4.9.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 18.9.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 4006, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.6.2026.
  - Miksi tarkistaa: Lähtötilanne 4.12.2025.
  - Lähteet: 4.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.12.2025

#### Asiakas 4006, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 4006, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (19.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Alzheimerin tautiin liittyvä tuki; Toimintakyky (lääkäri, 13.11.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 79 min.
- Liikkuminen ja kaatumiset (Asiakas 4006, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (16.2.2025, 2.3.2025). Lähtötilanteen jälkeen: R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (4.9.2026, 18.9.2026).
- Kipu (Asiakas 4006, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 4006, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 4006, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 4006, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4006, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan eläkkeellä. Ulkoilee kävellen useana päivänä viikossa. Ei tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 4006, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 4006, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (23.8.2025, 13.11.2025). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 2 käyntiä (1.1.2026, 13.6.2026).
- Palvelujen käyttö (Asiakas 4006, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 1, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 313 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 4006, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.

### Asiakas 4006 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 4006, sosiaalityöntekijän näkymä – tila:** = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 4006, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (313 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 4006, sosiaalityöntekijän näkymä – havainnot

- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 4006, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 4.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 4.6.2026.
  - Miksi tarkistaa: Lähtötilanne 4.12.2025.
  - Lähteet: 4.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 4.12.2025

#### Asiakas 4006, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 4006, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 4.12.2025 (19.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Alzheimerin tautiin liittyvä tuki; Toimintakyky (lääkäri, 13.11.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 79 min.
- Liikkuminen ja kaatumiset (Asiakas 4006, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 4006, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: Alzheimerin tautiin liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 4006, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4006, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 4006, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 1, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 313 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 4006, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 4006, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 4006, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 4006, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

## Asiakas 3713

**Asiakas 3713 – perustiedot:** 79-vuotias nainen, Espoo, asiointikieli ruotsi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000013713 (synteettinen).

**Asiakas 3713 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 13.1.2026. Vireille 19.12.2025. Arviointijakso 28.12.2025–13.1.2026. Päätös voimassa 22.1.2026 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 3713 – RAI-seuranta-arvio:** myöhässä 92 vrk, määräpäivä 13.7.2026 (6 kk lähtötilanteesta).

**Asiakas 3713 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 3713 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 3713, sairaanhoitajan näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 3713, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.1.2026 (273 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyviä kirjauksia; toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; kotihoidon käynnit keskeytyneet. Osa havainnoista on epävarmoja tai ristiriitaisia (mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 3713, sairaanhoitajan näkymä – havainnot

- **◆ Mielialaan liittyviä kirjauksia** (Asiakas 3713, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 27.1.2026. Varmuus: ristiriitainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (27.1.2026).
  - Miksi tarkistaa: Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion.
  - Lähteet: 27.1.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Vastanäyttö: 5.2.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F32.9 Määrittämätön masennustila (5.2.2025); 29.7.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F41.9 Määrittämätön ahdistuneisuushäiriö (29.7.2025)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9
- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3713, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.1.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 27.1.2026: ”Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 27.1.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3713, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 22.1.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3713, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.7.2026.
  - Miksi tarkistaa: Lähtötilanne 13.1.2026.
  - Lähteet: 13.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.1.2026

#### Asiakas 3713, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.1.2026 (22.1.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 48 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 2 kotikäyntiä, 38 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 27.1.2026): Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
- Liikkuminen ja kaatumiset (Asiakas 3713, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kognitio (Asiakas 3713, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: ruotsi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (5.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (29.7.2025). Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (27.1.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Kipu (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.2 Niskakipu – 1 käynti (15.9.2025). Lähtötilanteen jälkeen: M54.2 Niskakipu – 1 käynti (1.10.2026).
- Ravitsemus (Asiakas 3713, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 3713, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) 273 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 3713, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?

### Asiakas 3713 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 3713, lääkärin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 3713, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.1.2026 (273 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyviä kirjauksia; toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; kotihoidon käynnit keskeytyneet. Osa havainnoista on epävarmoja tai ristiriitaisia (mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3713, lääkärin näkymä – havainnot

- **◆ Mielialaan liittyviä kirjauksia** (Asiakas 3713, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 27.1.2026. Varmuus: ristiriitainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (27.1.2026).
  - Miksi tarkistaa: Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion.
  - Lähteet: 27.1.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Vastanäyttö: 5.2.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F32.9 Määrittämätön masennustila (5.2.2025); 29.7.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F41.9 Määrittämätön ahdistuneisuushäiriö (29.7.2025)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9
- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3713, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.1.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 27.1.2026: ”Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 27.1.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3713, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 22.1.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3713, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.7.2026.
  - Miksi tarkistaa: Lähtötilanne 13.1.2026.
  - Lähteet: 13.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.1.2026

#### Asiakas 3713, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 3713, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kognitio (Asiakas 3713, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 3713, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (5.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (29.7.2025). Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (27.1.2026).
- Kipu (Asiakas 3713, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.2 Niskakipu – 1 käynti (15.9.2025). Lähtötilanteen jälkeen: M54.2 Niskakipu – 1 käynti (1.10.2026).
- Terveydentila ja lääkitys (Asiakas 3713, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 3713, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) 273 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 3713, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.1.2026 (22.1.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 48 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 2 kotikäyntiä, 38 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 27.1.2026): Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
- Kommunikointi ja aistit (Asiakas 3713, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: ruotsi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3713, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 3713, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 3713, lääkärin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?

### Asiakas 3713 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 3713, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 3713, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.1.2026 (273 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyviä kirjauksia; toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; kotihoidon käynnit keskeytyneet. Osa havainnoista on epävarmoja tai ristiriitaisia (mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3713, fysioterapeutin näkymä – havainnot

- **◆ Mielialaan liittyviä kirjauksia** (Asiakas 3713, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 27.1.2026. Varmuus: ristiriitainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (27.1.2026).
  - Miksi tarkistaa: Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion.
  - Lähteet: 27.1.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Vastanäyttö: 5.2.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F32.9 Määrittämätön masennustila (5.2.2025); 29.7.2025, Terveydenhuolto · avohoitokäynti: Jo ennen lähtötilannetta: F41.9 Määrittämätön ahdistuneisuushäiriö (29.7.2025)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3713, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.1.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 27.1.2026: ”Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 27.1.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3713, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 22.1.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3713, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.7.2026.
  - Miksi tarkistaa: Lähtötilanne 13.1.2026.
  - Lähteet: 13.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.1.2026

#### Asiakas 3713, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3713, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.1.2026 (22.1.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 48 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 2 kotikäyntiä, 38 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 27.1.2026): Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
- Liikkuminen ja kaatumiset (Asiakas 3713, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 3713, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.2 Niskakipu – 1 käynti (15.9.2025). Lähtötilanteen jälkeen: M54.2 Niskakipu – 1 käynti (1.10.2026).
- Kognitio (Asiakas 3713, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 3713, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: ruotsi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3713, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (5.2.2025); F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (29.7.2025). Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (27.1.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3713, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 3713, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 3713, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Palvelujen käyttö (Asiakas 3713, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) 273 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 3713, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?

### Asiakas 3713 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 3713, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 3713, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.1.2026 (273 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; kotihoidon käynnit keskeytyneet. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3713, sosiaalityöntekijän näkymä – havainnot

- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3713, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.1.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 27.1.2026: ”Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 27.1.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Kotihoidon käynnit keskeytyneet** (Asiakas 3713, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 1.3.2026. Varmuus: kohtalainen. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito: merkintä tilapäisestä keskeytyksestä (ajankohta ei tiedossa). Kotihoidon käyntejä ei ole kirjattu helmikuu 2026 jälkeen, vaikka palvelu on voimassa.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 22.1.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – keskeytetty (Tilapäinen keskeytys); 1.2.2026, Sosiaalihuolto · kotihoidon käynnit (kuukausikooste): Viimeisin kuukausi, jolta kotihoidon käyntejä on kirjattu: helmikuu 2026
  - Tarkista: Mistä keskeytys johtui ja onko palvelu jatkunut? Onko asiakkaan tilanne muuttunut keskeytyksen aikana?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3713, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.7.2026.
  - Miksi tarkistaa: Lähtötilanne 13.1.2026.
  - Lähteet: 13.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.1.2026

#### Asiakas 3713, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3713, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.1.2026 (22.1.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 48 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 2 kotikäyntiä, 38 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (lääkäri, 27.1.2026): Potilaan mukaan arjen tehtävien aloittaminen on vaikeutunut ja tehtävät vievät tavallista enemmän aikaa.
- Liikkuminen ja kaatumiset (Asiakas 3713, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 3713, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 3713, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: ruotsi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3713, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 3713, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) 273 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 3713, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 3713, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 3713, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 3713, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 3713, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Mistä keskeytys johtui ja onko palvelu jatkunut?
- Onko asiakkaan tilanne muuttunut keskeytyksen aikana?

## Asiakas 1694

**Asiakas 1694 – perustiedot:** 76-vuotias mies, Espoo, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000001694 (synteettinen).

**Asiakas 1694 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 6.12.2025. Vireille 7.11.2025. Arviointijakso 17.11.2025–6.12.2025. Päätös voimassa 17.12.2025–28.2.2026. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 1694 – RAI-seuranta-arvio:** myöhässä 129 vrk, määräpäivä 6.6.2026 (6 kk lähtötilanteesta).

**Asiakas 1694 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 1694 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 1694, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 1694, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.12.2025 (311 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen; kiireelliset käynnit lisääntyneet. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: kipu; säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 1694, sairaanhoitajan näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 4 käyntiä vamman vuoksi: S61.9 Ranteen ja käden määrittämätön avohaava; S93.4 Nilkan nyrjähdys tai venähdys.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 5.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys (kiireellinen käynti); 12.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Tulosyy: Potilaan kertoman mukaan käden haava syntyi tänään tapaturmassa. Verenvuoto on rauhoittunut painamalla.
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **▲ Kiireelliset käynnit lisääntyneet** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Palvelujen käyttö. Havaittu 28.2.2026. Varmuus: selvä. Sääntö KIIREELLISET.
  - Mitä on mahdollisesti muuttunut: 3 kiireellistä käyntiä 311 vrk:n aikana (noin 3,5 / vuosi). Lähtötilannetta edeltäneen vuoden aikana 0.
  - Miksi tarkistaa: Laskettu käyntien kiireellisyysluokasta. Käyntien sisältöä ei tulkita.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava; 5.4.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava
  - Tarkista: Mikä on johtanut kiireellisiin käynteihin? Vastaako nykyinen palvelu asiakkaan tarvetta?
- **◆ Toimintakyvyn vaikeutumista kuvattu: kipu** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Kipu. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.2.2026: ”Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 28.2.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 28.2.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 17.12.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 28.2.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 20.1.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 1694, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.6.2026.
  - Miksi tarkistaa: Lähtötilanne 6.12.2025.
  - Lähteet: 6.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.12.2025

#### Asiakas 1694, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.12.2025 (17.12.2025–28.2.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 45 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 32 kotikäyntiä, 1037 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S61.9 Ranteen ja käden määrittämätön avohaava – 2 käyntiä (28.2.2026, 13.10.2026); S93.4 Nilkan nyrjähdys tai venähdys – 2 käyntiä (5.4.2026, 12.4.2026); Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 1694, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (20.1.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: Mielialalääke käytössä: essitalopraami.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan kertoman mukaan on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Kipu (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.2.2026): Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut; parasetamoli tarvittaessa (28.2.2026).
- Ravitsemus (Asiakas 1694, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (1): essitalopraami. Lähtötilanteen jälkeen: Säännöllinen lääkitys nyt (1): essitalopraami.
- Palvelujen käyttö (Asiakas 1694, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 3) 311 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 1694, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Mikä on johtanut kiireellisiin käynteihin?
- Vastaako nykyinen palvelu asiakkaan tarvetta?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?

### Asiakas 1694 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 1694, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 1694, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.12.2025 (311 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen; kiireelliset käynnit lisääntyneet. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: kipu; säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 1694, lääkärin näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 1694, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 4 käyntiä vamman vuoksi: S61.9 Ranteen ja käden määrittämätön avohaava; S93.4 Nilkan nyrjähdys tai venähdys.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 5.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys (kiireellinen käynti); 12.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Tulosyy: Potilaan kertoman mukaan käden haava syntyi tänään tapaturmassa. Verenvuoto on rauhoittunut painamalla.
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **▲ Kiireelliset käynnit lisääntyneet** (Asiakas 1694, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Palvelujen käyttö. Havaittu 28.2.2026. Varmuus: selvä. Sääntö KIIREELLISET.
  - Mitä on mahdollisesti muuttunut: 3 kiireellistä käyntiä 311 vrk:n aikana (noin 3,5 / vuosi). Lähtötilannetta edeltäneen vuoden aikana 0.
  - Miksi tarkistaa: Laskettu käyntien kiireellisyysluokasta. Käyntien sisältöä ei tulkita.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava; 5.4.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava
  - Tarkista: Mikä on johtanut kiireellisiin käynteihin? Vastaako nykyinen palvelu asiakkaan tarvetta?
- **◆ Toimintakyvyn vaikeutumista kuvattu: kipu** (Asiakas 1694, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Kipu. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.2.2026: ”Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 1694, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 28.2.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 28.2.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 17.12.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 28.2.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 1694, lääkärin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 20.1.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 1694, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.6.2026.
  - Miksi tarkistaa: Lähtötilanne 6.12.2025.
  - Lähteet: 6.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.12.2025

#### Asiakas 1694, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 1694, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S61.9 Ranteen ja käden määrittämätön avohaava – 2 käyntiä (28.2.2026, 13.10.2026); S93.4 Nilkan nyrjähdys tai venähdys – 2 käyntiä (5.4.2026, 12.4.2026); Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 1694, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 1694, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (20.1.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 1694, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.2.2026): Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut; parasetamoli tarvittaessa (28.2.2026).
- Terveydentila ja lääkitys (Asiakas 1694, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (1): essitalopraami. Lähtötilanteen jälkeen: Säännöllinen lääkitys nyt (1): essitalopraami.
- Palvelujen käyttö (Asiakas 1694, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 3) 311 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 1694, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.12.2025 (17.12.2025–28.2.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 45 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 32 kotikäyntiä, 1037 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Kommunikointi ja aistit (Asiakas 1694, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 1694, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan kertoman mukaan on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 1694, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 1694, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Mikä on johtanut kiireellisiin käynteihin?
- Vastaako nykyinen palvelu asiakkaan tarvetta?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?

### Asiakas 1694 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 1694, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (2 merkittävää, 2 seurattavaa, 1 myönteistä).

**Asiakas 1694, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.12.2025 (311 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen; kiireelliset käynnit lisääntyneet. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: kipu; säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 1694, fysioterapeutin näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 1694, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 4 käyntiä vamman vuoksi: S61.9 Ranteen ja käden määrittämätön avohaava; S93.4 Nilkan nyrjähdys tai venähdys.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 5.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys (kiireellinen käynti); 12.4.2026, Terveydenhuolto · avohoitokäynti: S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: S61.9 Ranteen ja käden määrittämätön avohaava (kiireellinen käynti); 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Tulosyy: Potilaan kertoman mukaan käden haava syntyi tänään tapaturmassa. Verenvuoto on rauhoittunut painamalla.
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **▲ Kiireelliset käynnit lisääntyneet** (Asiakas 1694, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Palvelujen käyttö. Havaittu 28.2.2026. Varmuus: selvä. Sääntö KIIREELLISET.
  - Mitä on mahdollisesti muuttunut: 3 kiireellistä käyntiä 311 vrk:n aikana (noin 3,5 / vuosi). Lähtötilannetta edeltäneen vuoden aikana 0.
  - Miksi tarkistaa: Laskettu käyntien kiireellisyysluokasta. Käyntien sisältöä ei tulkita.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava; 5.4.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S93.4 Nilkan nyrjähdys tai venähdys; 13.10.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto · S61.9 Ranteen ja käden määrittämätön avohaava
  - Tarkista: Mikä on johtanut kiireellisiin käynteihin? Vastaako nykyinen palvelu asiakkaan tarvetta?
- **◆ Toimintakyvyn vaikeutumista kuvattu: kipu** (Asiakas 1694, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Kipu. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.2.2026: ”Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 1694, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 28.2.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 28.2.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 17.12.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 28.2.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 1694, fysioterapeutin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F32.9 Määrittämätön masennustila. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 20.1.2025, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 1694, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.6.2026.
  - Miksi tarkistaa: Lähtötilanne 6.12.2025.
  - Lähteet: 6.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.12.2025

#### Asiakas 1694, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 1694, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.12.2025 (17.12.2025–28.2.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 45 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 32 kotikäyntiä, 1037 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 1694, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S61.9 Ranteen ja käden määrittämätön avohaava – 2 käyntiä (28.2.2026, 13.10.2026); S93.4 Nilkan nyrjähdys tai venähdys – 2 käyntiä (5.4.2026, 12.4.2026).
- Kipu (Asiakas 1694, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.2.2026): Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
- Kognitio (Asiakas 1694, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 1694, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 1694, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: F32.9 Määrittämätön masennustila – 1 käynti (20.1.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 1694, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan kertoman mukaan on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 1694, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 1694, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Palvelujen käyttö (Asiakas 1694, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 3) 311 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 1694, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Mikä on johtanut kiireellisiin käynteihin?
- Vastaako nykyinen palvelu asiakkaan tarvetta?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?

### Asiakas 1694 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 1694, sosiaalityöntekijän näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 1694, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 6.12.2025 (311 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Merkittäviä muutoksia tarkistettavaksi: kiireelliset käynnit lisääntyneet. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: kipu; säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 1694, sosiaalityöntekijän näkymä – havainnot

- **▲ Kiireelliset käynnit lisääntyneet** (Asiakas 1694, sosiaalityöntekijän näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Palvelujen käyttö. Havaittu 28.2.2026. Varmuus: selvä. Sääntö KIIREELLISET.
  - Mitä on mahdollisesti muuttunut: 3 kiireellistä käyntiä 311 vrk:n aikana (noin 3,5 / vuosi). Lähtötilannetta edeltäneen vuoden aikana 0.
  - Miksi tarkistaa: Laskettu käyntien kiireellisyysluokasta. Käyntien sisältöä ei tulkita.
  - Lähteet: 28.2.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto; 5.4.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto; 13.10.2026, Terveydenhuolto · avohoitokäynti: Vastaanottokäynti, akuutti- tai kiirevastaanotto
  - Tarkista: Mikä on johtanut kiireellisiin käynteihin? Vastaako nykyinen palvelu asiakkaan tarvetta?
- **◆ Toimintakyvyn vaikeutumista kuvattu: kipu** (Asiakas 1694, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Kipu. Havaittu 28.2.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.2.2026: ”Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.2.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 1694, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 28.2.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 28.2.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 17.12.2025, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 28.2.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 1694, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 6.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 6.6.2026.
  - Miksi tarkistaa: Lähtötilanne 6.12.2025.
  - Lähteet: 6.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 6.12.2025

#### Asiakas 1694, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 1694, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 6.12.2025 (17.12.2025–28.2.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 45 min / vrk. Lähtötilanteen jälkeen: Kotihoito helmikuu 2026: 32 kotikäyntiä, 1037 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 1694, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 1694, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 1694, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 1694, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 1694, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 3) 311 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 1694, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 1694, sosiaalityöntekijä, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.2.2026): Potilaan kertoman mukaan käden käyttö on kivun vuoksi rajoittunut.
- Ravitsemus (Asiakas 1694, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 1694, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 1694, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Mikä on johtanut kiireellisiin käynteihin?
- Vastaako nykyinen palvelu asiakkaan tarvetta?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

## Asiakas 2506

**Asiakas 2506 – perustiedot:** 78-vuotias mies, Espoo, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000012506 (synteettinen).

**Asiakas 2506 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 27.1.2026. Vireille 2.1.2026. Arviointijakso 13.1.2026–27.1.2026. Päätös voimassa 9.2.2026 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 2506 – RAI-seuranta-arvio:** myöhässä 78 vrk, määräpäivä 27.7.2026 (6 kk lähtötilanteesta).

**Asiakas 2506 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 2506 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 2506, sairaanhoitajan näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 2506, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 27.1.2026 (259 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyvä uusi kirjaus. Osa havainnoista on epävarmoja tai ristiriitaisia (mielialaan liittyvä uusi kirjaus). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 2506, sairaanhoitajan näkymä – havainnot

- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 2506, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 17.7.2026. Varmuus: ristiriitainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (17.7.2026).
  - Miksi tarkistaa: Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion.
  - Lähteet: 17.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Vastanäyttö: 16.11.2025, Terveydenhuolto · lääkitys: Lähtötilanteessa käytössä: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely GAD-7
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 2506, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 27.7.2026.
  - Miksi tarkistaa: Lähtötilanne 27.1.2026.
  - Lähteet: 27.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 27.1.2026

#### Asiakas 2506, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 27.1.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 69 min / vrk; Toimintakyky (lääkäri, 16.11.2025): Potilaan mukaan tavallinen toiminta on tilapäisesti vähentynyt flunssaoireiden vuoksi. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1177 min.
- Liikkuminen ja kaatumiset (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 2506, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (10.6.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (17.7.2026); Mielialalääke käytössä: essitalopraami.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kipu (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: M54.5 Alaselkäkipu – 1 käynti (8.4.2026); parasetamoli tarvittaessa (6.3.2026).
- Ravitsemus (Asiakas 2506, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J30.4 Määrittämätön allerginen nuha – 1 käynti (28.2.2025); E03.9 Määrittämätön kilpirauhasen vajaatoiminta – 1 käynti (6.7.2025); J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (16.11.2025); Säännöllinen lääkitys (3): essitalopraami, levotyroksiininatrium, metformiini. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (6.3.2026); Säännöllinen lääkitys nyt (3): essitalopraami, levotyroksiininatrium, metformiini.
- Palvelujen käyttö (Asiakas 2506, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0) 259 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 2506, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?

### Asiakas 2506 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 2506, lääkärin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 2506, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 27.1.2026 (259 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyvä uusi kirjaus. Osa havainnoista on epävarmoja tai ristiriitaisia (mielialaan liittyvä uusi kirjaus). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 2506, lääkärin näkymä – havainnot

- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 2506, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 17.7.2026. Varmuus: ristiriitainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (17.7.2026).
  - Miksi tarkistaa: Vastaavia kirjauksia tai lääkitystä oli jo lähtötilanteessa – muutoksen suunta vaatii ammattilaisen arvion.
  - Lähteet: 17.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Vastanäyttö: 16.11.2025, Terveydenhuolto · lääkitys: Lähtötilanteessa käytössä: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely GAD-7
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 2506, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 27.7.2026.
  - Miksi tarkistaa: Lähtötilanne 27.1.2026.
  - Lähteet: 27.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 27.1.2026

#### Asiakas 2506, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 2506, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 2506, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 2506, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (10.6.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (17.7.2026); Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 2506, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: M54.5 Alaselkäkipu – 1 käynti (8.4.2026); parasetamoli tarvittaessa (6.3.2026).
- Terveydentila ja lääkitys (Asiakas 2506, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J30.4 Määrittämätön allerginen nuha – 1 käynti (28.2.2025); E03.9 Määrittämätön kilpirauhasen vajaatoiminta – 1 käynti (6.7.2025); J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (16.11.2025); Säännöllinen lääkitys (3): essitalopraami, levotyroksiininatrium, metformiini. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (6.3.2026); Säännöllinen lääkitys nyt (3): essitalopraami, levotyroksiininatrium, metformiini.
- Palvelujen käyttö (Asiakas 2506, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0) 259 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 2506, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 27.1.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 69 min / vrk; Toimintakyky (lääkäri, 16.11.2025): Potilaan mukaan tavallinen toiminta on tilapäisesti vähentynyt flunssaoireiden vuoksi. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1177 min.
- Kommunikointi ja aistit (Asiakas 2506, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 2506, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 2506, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 2506, lääkärin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?

### Asiakas 2506 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 2506, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 2506, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 27.1.2026 (259 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyvä uusi kirjaus. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 2506, fysioterapeutin näkymä – havainnot

- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 2506, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 17.7.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (17.7.2026).
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 17.7.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 2506, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 27.7.2026.
  - Miksi tarkistaa: Lähtötilanne 27.1.2026.
  - Lähteet: 27.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 27.1.2026

#### Asiakas 2506, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 2506, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 27.1.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 69 min / vrk; Toimintakyky (lääkäri, 16.11.2025): Potilaan mukaan tavallinen toiminta on tilapäisesti vähentynyt flunssaoireiden vuoksi. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1177 min.
- Liikkuminen ja kaatumiset (Asiakas 2506, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 2506, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: M54.5 Alaselkäkipu – 1 käynti (8.4.2026).
- Kognitio (Asiakas 2506, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 2506, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 2506, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (10.6.2025). Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (17.7.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 2506, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan mukaan hän on eläkkeellä, ulkoilee kävellen useana päivänä viikossa eikä tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 2506, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 2506, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: J30.4 Määrittämätön allerginen nuha – 1 käynti (28.2.2025); E03.9 Määrittämätön kilpirauhasen vajaatoiminta – 1 käynti (6.7.2025); J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (16.11.2025). Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (6.3.2026).
- Palvelujen käyttö (Asiakas 2506, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0) 259 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 2506, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?

### Asiakas 2506 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 2506, sosiaalityöntekijän näkymä – tila:** = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 2506, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 27.1.2026 (259 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 2506, sosiaalityöntekijän näkymä – havainnot

- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 2506, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 27.7.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 27.7.2026.
  - Miksi tarkistaa: Lähtötilanne 27.1.2026.
  - Lähteet: 27.1.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 27.1.2026

#### Asiakas 2506, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 2506, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 27.1.2026 (9.2.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 69 min / vrk; Toimintakyky (lääkäri, 16.11.2025): Potilaan mukaan tavallinen toiminta on tilapäisesti vähentynyt flunssaoireiden vuoksi. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1177 min.
- Liikkuminen ja kaatumiset (Asiakas 2506, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 2506, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 2506, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 2506, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 2506, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 4 käyntiä terveysasemalla (kiireellisiä 0, etäasiointeja 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 0) 259 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 2506, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 2506, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 2506, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 2506, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

## Asiakas 0638

**Asiakas 0638 – perustiedot:** 81-vuotias mies, Kirkkonummi, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000010638 (synteettinen).

**Asiakas 0638 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 9.10.2025. Vireille 29.9.2025. Arviointijakso 1.10.2025–9.10.2025. Päätös voimassa 26.10.2025 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 0638 – RAI-seuranta-arvio:** myöhässä 187 vrk, määräpäivä 9.4.2026 (6 kk lähtötilanteesta).

**Asiakas 0638 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 0638 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 0638, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 0638, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 9.10.2025 (369 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: mielialaan liittyvä uusi kirjaus. Seurattavia muutoksia: säännöllinen lääkitys muuttunut. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 0638, sairaanhoitajan näkymä – havainnot

- **▲ Mielialaan liittyvä uusi kirjaus** (Asiakas 0638, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 6.5.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (6.5.2026). Aloitettu essitalopraami 6.5.2026.
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 6.5.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila; 6.5.2026, Terveydenhuolto · lääkitys: Aloitettu 6.5.2026: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 0638, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 6.5.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 1, nyt 2. Jakson aikana aloitettu: essitalopraami (6.5.2026–23.9.2026). Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: essitalopraami.
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 6.5.2026, Terveydenhuolto · lääkitys: Aloitettu 6.5.2026: essitalopraami (N06AB10), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia? Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0638, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 9.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 9.4.2026.
  - Miksi tarkistaa: Lähtötilanne 9.10.2025.
  - Lähteet: 9.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 9.10.2025

#### Asiakas 0638, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 9.10.2025 (26.10.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 74 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1178 min; Toimintakyky (sairaanhoitaja, 23.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami, amlodipiini.
- Kognitio (Asiakas 0638, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (6.5.2026); Mielialalääke käytössä: essitalopraami.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Ulkoilee kävellen useana päivänä viikossa. Ei tupakoi nykyisin.
- Kipu (Asiakas 0638, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Ravitsemus (Asiakas 0638, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 1 käynti (29.10.2024); Säännöllinen lääkitys (1): amlodipiini; P-Krea 79,7 µmol/l (29.10.2024). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 3 käyntiä (23.10.2025, 21.2.2026, 24.9.2026); Säännöllinen lääkitys nyt (2): essitalopraami, amlodipiini; P-Krea 78,6 µmol/l (24.9.2026).
- Palvelujen käyttö (Asiakas 0638, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 369 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 0638, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.

### Asiakas 0638 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 0638, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 0638, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 9.10.2025 (369 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: mielialaan liittyvä uusi kirjaus. Seurattavia muutoksia: säännöllinen lääkitys muuttunut. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0638, lääkärin näkymä – havainnot

- **▲ Mielialaan liittyvä uusi kirjaus** (Asiakas 0638, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 6.5.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (6.5.2026). Aloitettu essitalopraami 6.5.2026.
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 6.5.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila; 6.5.2026, Terveydenhuolto · lääkitys: Aloitettu 6.5.2026: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 0638, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 6.5.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 1, nyt 2. Jakson aikana aloitettu: essitalopraami (6.5.2026–23.9.2026). Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: essitalopraami.
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 6.5.2026, Terveydenhuolto · lääkitys: Aloitettu 6.5.2026: essitalopraami (N06AB10), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia? Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0638, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 9.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 9.4.2026.
  - Miksi tarkistaa: Lähtötilanne 9.10.2025.
  - Lähteet: 9.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 9.10.2025

#### Asiakas 0638, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 0638, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami, amlodipiini.
- Kognitio (Asiakas 0638, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 0638, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (6.5.2026); Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 0638, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 0638, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 1 käynti (29.10.2024); Säännöllinen lääkitys (1): amlodipiini; P-Krea 79,7 µmol/l (29.10.2024). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 3 käyntiä (23.10.2025, 21.2.2026, 24.9.2026); Säännöllinen lääkitys nyt (2): essitalopraami, amlodipiini; P-Krea 78,6 µmol/l (24.9.2026).
- Palvelujen käyttö (Asiakas 0638, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 369 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 0638, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 9.10.2025 (26.10.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 74 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1178 min; Toimintakyky (sairaanhoitaja, 23.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Kommunikointi ja aistit (Asiakas 0638, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0638, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Ulkoilee kävellen useana päivänä viikossa. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 0638, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 0638, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.

### Asiakas 0638 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 0638, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 0638, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 9.10.2025 (369 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyvä uusi kirjaus. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0638, fysioterapeutin näkymä – havainnot

- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 0638, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 6.5.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F32.9 Määrittämätön masennustila (6.5.2026).
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 6.5.2026, Terveydenhuolto · avohoitokäynti: F32.9 Määrittämätön masennustila
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0638, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 9.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 9.4.2026.
  - Miksi tarkistaa: Lähtötilanne 9.10.2025.
  - Lähteet: 9.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 9.10.2025

#### Asiakas 0638, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0638, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 9.10.2025 (26.10.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 74 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1178 min; Toimintakyky (sairaanhoitaja, 23.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 0638, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 0638, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 0638, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 0638, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 0638, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F32.9 Määrittämätön masennustila – 1 käynti (6.5.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0638, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Ulkoilee kävellen useana päivänä viikossa. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 0638, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 0638, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: I10 Essentiaalinen (primaarinen) verenpainetauti – 1 käynti (29.10.2024). Lähtötilanteen jälkeen: I10 Essentiaalinen (primaarinen) verenpainetauti – 3 käyntiä (23.10.2025, 21.2.2026, 24.9.2026).
- Palvelujen käyttö (Asiakas 0638, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 369 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 0638, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?

### Asiakas 0638 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 0638, sosiaalityöntekijän näkymä – tila:** = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 0638, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 9.10.2025 (369 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 0638, sosiaalityöntekijän näkymä – havainnot

- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 0638, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 9.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 9.4.2026.
  - Miksi tarkistaa: Lähtötilanne 9.10.2025.
  - Lähteet: 9.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 9.10.2025

#### Asiakas 0638, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 0638, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 9.10.2025 (26.10.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 74 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 36 kotikäyntiä, 1178 min; Toimintakyky (sairaanhoitaja, 23.10.2025): Potilaan mukaan tavanomaiset arjen toimet onnistuvat omatoimisesti.
- Liikkuminen ja kaatumiset (Asiakas 0638, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 0638, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 0638, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 0638, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 0638, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 0) 369 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 0638, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 0638, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 0638, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 0638, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

## Asiakas 9422

**Asiakas 9422 – perustiedot:** 72-vuotias mies, Espoo, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000009422 (synteettinen).

**Asiakas 9422 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 22.3.2026. Vireille 22.2.2026. Arviointijakso 4.3.2026–22.3.2026. Päätös voimassa 2.4.2026–31.5.2026. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 9422 – RAI-seuranta-arvio:** myöhässä 21 vrk, määräpäivä 22.9.2026 (6 kk lähtötilanteesta).

**Asiakas 9422 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 9422 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 9422, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 9422, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.3.2026 (205 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset; säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 9422, sairaanhoitajan näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 9422, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 2 käynnillä (26.3.2026, 9.4.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 26.3.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 9.4.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 9422, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 26.3.2026: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 26.3.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 9422, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 31.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 31.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 2.4.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 31.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 9422, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.9.2026.
  - Miksi tarkistaa: Lähtötilanne 22.3.2026.
  - Lähteet: 22.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.3.2026

#### Asiakas 9422, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.3.2026 (2.4.2026–31.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 49 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 31 kotikäyntiä, 881 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 26.3.2026): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista; R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (26.3.2026, 9.4.2026).
- Kognitio (Asiakas 9422, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 9422, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilas kertoo olevansa eläkkeellä, ulkoilevansa kävellen useana päivänä viikossa eikä tupakoivansa nykyisin.
- Kipu (Asiakas 9422, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Ravitsemus (Asiakas 9422, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: L08.9 Ihon ja ihonalaiskudoksen määrittämätön paikallinen infektio – 1 käynti (13.5.2025); L30.9 Määrittämätön ihottuma – 1 käynti (23.7.2025); K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (17.12.2025); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 9422, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 205 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 9422, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 9422 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 9422, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 9422, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.3.2026 (205 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset; säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 9422, lääkärin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 9422, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 2 käynnillä (26.3.2026, 9.4.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 26.3.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 9.4.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 9422, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 26.3.2026: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 26.3.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 9422, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 31.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 31.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 2.4.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 31.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 9422, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.9.2026.
  - Miksi tarkistaa: Lähtötilanne 22.3.2026.
  - Lähteet: 22.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.3.2026

#### Asiakas 9422, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 9422, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 26.3.2026): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista; R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (26.3.2026, 9.4.2026).
- Kognitio (Asiakas 9422, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 9422, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kipu (Asiakas 9422, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 9422, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: L08.9 Ihon ja ihonalaiskudoksen määrittämätön paikallinen infektio – 1 käynti (13.5.2025); L30.9 Määrittämätön ihottuma – 1 käynti (23.7.2025); K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (17.12.2025); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 9422, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 205 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 9422, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.3.2026 (2.4.2026–31.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 49 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 31 kotikäyntiä, 881 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Kommunikointi ja aistit (Asiakas 9422, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 9422, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilas kertoo olevansa eläkkeellä, ulkoilevansa kävellen useana päivänä viikossa eikä tupakoivansa nykyisin.
- Ravitsemus (Asiakas 9422, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 9422, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 9422 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 9422, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 9422, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.3.2026 (205 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset; säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 9422, fysioterapeutin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 9422, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 2 käynnillä (26.3.2026, 9.4.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 26.3.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti); 9.4.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 9422, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 26.3.2026: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 26.3.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 9422, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 31.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 31.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 2.4.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 31.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 9422, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.9.2026.
  - Miksi tarkistaa: Lähtötilanne 22.3.2026.
  - Lähteet: 22.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.3.2026

#### Asiakas 9422, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 9422, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.3.2026 (2.4.2026–31.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 49 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 31 kotikäyntiä, 881 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 9422, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 26.3.2026): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista; R29.6 Kaatumistaipumus, muualle luokittamaton – 2 käyntiä (26.3.2026, 9.4.2026).
- Kipu (Asiakas 9422, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 9422, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 9422, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 9422, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 9422, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilas kertoo olevansa eläkkeellä, ulkoilevansa kävellen useana päivänä viikossa eikä tupakoivansa nykyisin.
- Ravitsemus (Asiakas 9422, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 9422, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: L08.9 Ihon ja ihonalaiskudoksen määrittämätön paikallinen infektio – 1 käynti (13.5.2025); L30.9 Määrittämätön ihottuma – 1 käynti (23.7.2025); K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (17.12.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Palvelujen käyttö (Asiakas 9422, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 205 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 9422, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 9422 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 9422, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 9422, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.3.2026 (205 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset; säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 9422, sosiaalityöntekijän näkymä – havainnot

- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 9422, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 26.3.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 26.3.2026: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 26.3.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 9422, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 31.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 31.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 2.4.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 31.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 9422, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.9.2026.
  - Miksi tarkistaa: Lähtötilanne 22.3.2026.
  - Lähteet: 22.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.3.2026

#### Asiakas 9422, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 9422, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.3.2026 (2.4.2026–31.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 49 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 31 kotikäyntiä, 881 min (viimeisin kuukausi, jolta käyntejä on kirjattu).
- Liikkuminen ja kaatumiset (Asiakas 9422, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 26.3.2026): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
- Kognitio (Asiakas 9422, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 9422, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 9422, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 9422, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 205 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 9422, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 9422, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 9422, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 9422, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 9422, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

## Asiakas 8163

**Asiakas 8163 – perustiedot:** 70-vuotias nainen, Raseborg, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000008163 (synteettinen).

**Asiakas 8163 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 13.2.2026. Vireille 23.1.2026. Arviointijakso 28.1.2026–13.2.2026. Päätös voimassa 24.2.2026–8.5.2026. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 8163 – RAI-seuranta-arvio:** myöhässä 61 vrk, määräpäivä 13.8.2026 (6 kk lähtötilanteesta).

**Asiakas 8163 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 8163 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 8163, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä).

**Asiakas 8163, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.2.2026 (242 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 8163, sairaanhoitajan näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 8163, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 4.4.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 4.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 11.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 8163, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 8.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 8.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 24.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 8.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 8163, sairaanhoitajan näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 16.8.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 8163, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.8.2026.
  - Miksi tarkistaa: Lähtötilanne 13.2.2026.
  - Lähteet: 13.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.2.2026

#### Asiakas 8163, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.2.2026 (24.2.2026–8.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 19 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 11 kotikäyntiä, 324 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 27.2.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 2 käyntiä (4.4.2026, 11.4.2026); Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 8163, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (16.8.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: Mielialalääke käytössä: essitalopraami.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Kipu (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: parasetamoli tarvittaessa (4.4.2026).
- Ravitsemus (Asiakas 8163, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (2): essitalopraami, metformiini. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (27.2.2026, 27.9.2026); Säännöllinen lääkitys nyt (2): essitalopraami, metformiini; B-HbA1c 47,1 mmol/mol (27.9.2026); P-Krea 80,6 µmol/l (27.9.2026); fP-Gluk 6,3 mmol/l (27.9.2026).
- Palvelujen käyttö (Asiakas 8163, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 242 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 8163, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?
- Asiakkaan oma kokemus mielialasta.

### Asiakas 8163 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 8163, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä).

**Asiakas 8163, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.2.2026 (242 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 8163, lääkärin näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 8163, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 4.4.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 4.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 11.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 8163, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 8.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 8.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 24.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 8.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 8163, lääkärin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 16.8.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 8163, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.8.2026.
  - Miksi tarkistaa: Lähtötilanne 13.2.2026.
  - Lähteet: 13.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.2.2026

#### Asiakas 8163, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 8163, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 2 käyntiä (4.4.2026, 11.4.2026); Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 8163, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 8163, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (16.8.2025); Mielialalääke käytössä: essitalopraami. Lähtötilanteen jälkeen: Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 8163, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: parasetamoli tarvittaessa (4.4.2026).
- Terveydentila ja lääkitys (Asiakas 8163, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen lääkitys (2): essitalopraami, metformiini. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (27.2.2026, 27.9.2026); Säännöllinen lääkitys nyt (2): essitalopraami, metformiini; B-HbA1c 47,1 mmol/mol (27.9.2026); P-Krea 80,6 µmol/l (27.9.2026); fP-Gluk 6,3 mmol/l (27.9.2026).
- Palvelujen käyttö (Asiakas 8163, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 242 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 8163, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.2.2026 (24.2.2026–8.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 19 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 11 kotikäyntiä, 324 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 27.2.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Kommunikointi ja aistit (Asiakas 8163, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 8163, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 8163, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 8163, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?
- Asiakkaan oma kokemus mielialasta.

### Asiakas 8163 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 8163, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 1 myönteistä).

**Asiakas 8163, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.2.2026 (242 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: toistuvia vammoja lähtötilanteen jälkeen. Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Myönteiseen suuntaan: ei uusia mielialaan liittyviä kirjauksia. Osa havainnoista on epävarmoja tai ristiriitaisia (ei uusia mielialaan liittyviä kirjauksia). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 8163, fysioterapeutin näkymä – havainnot

- **▲ Toistuvia vammoja lähtötilanteen jälkeen** (Asiakas 8163, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 4.4.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 4.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 11.4.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 8163, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 8.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 8.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 24.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 8.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **↑ Ei uusia mielialaan liittyviä kirjauksia** (Asiakas 8163, fysioterapeutin näkymä). Taso: Merkittävä myönteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 13.10.2026. Varmuus: epävarma. Sääntö MIELIALA_EI.
  - Mitä on mahdollisesti muuttunut: Ennen lähtötilannetta kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö. Lähtötilanteen jälkeen ei vastaavia kirjauksia eikä uutta mielialalääkettä.
  - Miksi tarkistaa: Voi kertoa voinnin vakiintumisesta – asiakkaan oma kokemus ratkaisee.
  - Lähteet: 16.8.2025, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta.
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 8163, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.8.2026.
  - Miksi tarkistaa: Lähtötilanne 13.2.2026.
  - Lähteet: 13.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.2.2026

#### Asiakas 8163, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 8163, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.2.2026 (24.2.2026–8.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 19 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 11 kotikäyntiä, 324 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 27.2.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 8163, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 2 käyntiä (4.4.2026, 11.4.2026).
- Kipu (Asiakas 8163, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 8163, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 8163, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 8163, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (16.8.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 8163, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin.
- Ravitsemus (Asiakas 8163, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 8163, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (27.2.2026, 27.9.2026).
- Palvelujen käyttö (Asiakas 8163, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 242 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 8163, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?
- Asiakkaan oma kokemus mielialasta.

### Asiakas 8163 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 8163, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 8163, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 13.2.2026 (242 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: säännöllinen kotihoito päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 8163, sosiaalityöntekijän näkymä – havainnot

- **◆ Säännöllinen kotihoito päättynyt** (Asiakas 8163, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 8.5.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Säännöllinen kotihoito päättyi 8.5.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 24.2.2026, Sosiaalihuolto · asiakkuus: Palvelu: Säännöllinen kotihoito – päättynyt 8.5.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 8163, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 13.8.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 13.8.2026.
  - Miksi tarkistaa: Lähtötilanne 13.2.2026.
  - Lähteet: 13.2.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 13.2.2026

#### Asiakas 8163, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 8163, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 13.2.2026 (24.2.2026–8.5.2026); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 19 min / vrk. Lähtötilanteen jälkeen: Kotihoito toukokuu 2026: 11 kotikäyntiä, 324 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 27.2.2026): Potilaan mukaan päivittäinen asiointi ja itsestä huolehtiminen onnistuvat itsenäisesti.
- Liikkuminen ja kaatumiset (Asiakas 8163, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 8163, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 8163, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 8163, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 8163, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 1 käynti terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 242 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 8163, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 8163, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 8163, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 8163, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 8163, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

## Asiakas 3826

**Asiakas 3826 – perustiedot:** 81-vuotias nainen, Espoo, asiointikieli suomi. Palvelu: Ympärivuorokautinen palveluasuminen. Tunniste SYN-ASI-1000013826 (synteettinen).

**Asiakas 3826 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 30.3.2026. Päätös voimassa 4.4.2026–29.6.2026. Tuen tarve: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki.

**Asiakas 3826 – RAI-seuranta-arvio:** myöhässä 13 vrk, määräpäivä 30.9.2026 (6 kk lähtötilanteesta).

**Asiakas 3826 – hoitosuhteet:** sairaanhoitaja ei (palveluasumisen asiakas), lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 3826 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

Asiakas 3826: sairaanhoitajalla ei ole hoitosuhdetta tähän asiakkaaseen (palveluasumisen asiakas), joten sairaanhoitajan näkymää ei ole.

### Asiakas 3826 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 3826, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 3826, lääkärin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (197 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: mielialaan liittyvä uusi kirjaus. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; säännöllinen lääkitys muuttunut; ympärivuorokautinen palveluasuminen päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3826, lääkärin näkymä – havainnot

- **▲ Mielialaan liittyvä uusi kirjaus** (Asiakas 3826, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Mieliala ja uni. Havaittu 17.4.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (17.4.2026). Aloitettu essitalopraami 17.4.2026.
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 17.4.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö; 17.4.2026, Terveydenhuolto · lääkitys: Aloitettu 17.4.2026: essitalopraami (N06AB10)
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Rakenteinen kysely PHQ-9; Rakenteinen kysely GAD-7
- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3826, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 17.4.2026: ”Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 17.4.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 3826, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 17.4.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 1, nyt 2. Jakson aikana aloitettu: essitalopraami (17.4.2026–17.7.2026). Kaatumisriskiä mahdollisesti lisäävä lääkeryhmä: essitalopraami.
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 17.4.2026, Terveydenhuolto · lääkitys: Aloitettu 17.4.2026: essitalopraami (N06AB10), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia? Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **◆ Ympärivuorokautinen palveluasuminen päättynyt** (Asiakas 3826, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 29.6.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Ympärivuorokautinen palveluasuminen päättyi 29.6.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 4.4.2026, Sosiaalihuolto · asiakkuus: Asumisjakso: Ympärivuorokautinen palveluasuminen – päättynyt 29.6.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3826, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 30.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 30.9.2026.
  - Miksi tarkistaa: Lähtötilanne 30.3.2026.
  - Lähteet: 30.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 30.3.2026

#### Asiakas 3826, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 3826, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Käytössä kaatumisriskiä mahdollisesti lisäävä lääke: essitalopraami.
- Kognitio (Asiakas 3826, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Mieliala ja uni (Asiakas 3826, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (17.4.2026); Mielialalääke käytössä: essitalopraami.
- Kipu (Asiakas 3826, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 3826, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (12.6.2025, 21.8.2025); Säännöllinen lääkitys (1): metformiini; B-HbA1c 55,1 mmol/mol (21.8.2025); P-Krea 93,0 µmol/l (21.8.2025); fP-Gluk 7,3 mmol/l (21.8.2025). Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 1 käynti (18.7.2026); Säännöllinen lääkitys nyt (2): essitalopraami, metformiini; B-HbA1c 54,7 mmol/mol (18.7.2026); P-Krea 92,4 µmol/l (18.7.2026); fP-Gluk 7,3 mmol/l (18.7.2026).
- Palvelujen käyttö (Asiakas 3826, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0) 197 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 3826, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (4.4.2026–29.6.2026); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito kesäkuu 2026: 0 kotikäyntiä, 43 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Kommunikointi ja aistit (Asiakas 3826, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3826, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilas kertoo olevansa eläkkeellä, tekevänsä kotona kevyitä liikkuvuusharjoitteita eikä tupakoivansa nykyisin.
- Ravitsemus (Asiakas 3826, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 3826, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Huimaus, väsymys tai kaatumiset uuden lääkkeen aloituksen jälkeen.
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?

### Asiakas 3826 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 3826, fysioterapeutin näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 3826, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (197 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Seurattavia muutoksia: mielialaan liittyvä uusi kirjaus; toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; ympärivuorokautinen palveluasuminen päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3826, fysioterapeutin näkymä – havainnot

- **◆ Mielialaan liittyvä uusi kirjaus** (Asiakas 3826, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 17.4.2026. Varmuus: kohtalainen. Sääntö MIELIALA.
  - Mitä on mahdollisesti muuttunut: Kirjattu F41.9 Määrittämätön ahdistuneisuushäiriö (17.4.2026).
  - Miksi tarkistaa: Lähtötilanteessa ei ollut vastaavia kirjauksia.
  - Lähteet: 17.4.2026, Terveydenhuolto · avohoitokäynti: F41.9 Määrittämätön ahdistuneisuushäiriö
  - Tarkista: Asiakkaan oma kokemus mielialasta ja jaksamisesta. Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3826, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 17.4.2026: ”Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 17.4.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Ympärivuorokautinen palveluasuminen päättynyt** (Asiakas 3826, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 29.6.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Ympärivuorokautinen palveluasuminen päättyi 29.6.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 4.4.2026, Sosiaalihuolto · asiakkuus: Asumisjakso: Ympärivuorokautinen palveluasuminen – päättynyt 29.6.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3826, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 30.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 30.9.2026.
  - Miksi tarkistaa: Lähtötilanne 30.3.2026.
  - Lähteet: 30.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 30.3.2026

#### Asiakas 3826, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3826, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (4.4.2026–29.6.2026); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito kesäkuu 2026: 0 kotikäyntiä, 43 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Liikkuminen ja kaatumiset (Asiakas 3826, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kipu (Asiakas 3826, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Kommunikointi ja aistit (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: F41.9 Määrittämätön ahdistuneisuushäiriö – 1 käynti (17.4.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilas kertoo olevansa eläkkeellä, tekevänsä kotona kevyitä liikkuvuusharjoitteita eikä tupakoivansa nykyisin.
- Ravitsemus (Asiakas 3826, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 2 käyntiä (12.6.2025, 21.8.2025). Lähtötilanteen jälkeen: E11.9 Aikuistyypin diabetes ilman komplikaatioita – 1 käynti (18.7.2026).
- Palvelujen käyttö (Asiakas 3826, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0) 197 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 3826, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Asiakkaan oma kokemus mielialasta ja jaksamisesta.
- Vaikuttaako mieliala arjen toimiin ja osallistumiseen?
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

### Asiakas 3826 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 3826, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 3826, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (197 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve; ympärivuorokautinen palveluasuminen päättynyt. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 3826, sosiaalityöntekijän näkymä – havainnot

- **◆ Toimintakyvyn vaikeutumista kuvattu: arjessa selviytyminen ja avuntarve** (Asiakas 3826, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 17.4.2026: ”Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 17.4.2026, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **◆ Ympärivuorokautinen palveluasuminen päättynyt** (Asiakas 3826, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 29.6.2026. Varmuus: selvä. Sääntö PALVELUMUUTOS.
  - Mitä on mahdollisesti muuttunut: Ympärivuorokautinen palveluasuminen päättyi 29.6.2026 lähtötilanteen jälkeen.
  - Miksi tarkistaa: Palveluprosessin muutos voi kertoa palvelutarpeen tai asiakkaan tilanteen muuttumisesta (esim. sairaalahoito).
  - Lähteet: 4.4.2026, Sosiaalihuolto · asiakkuus: Asumisjakso: Ympärivuorokautinen palveluasuminen – päättynyt 29.6.2026
  - Tarkista: Miksi palvelu päättyi ja miten asiakas pärjää nyt? Onko asiakkaalla muuta tukea?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Palvelutarpeen arvioinnin päivittäminen
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 3826, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 30.9.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 30.9.2026.
  - Miksi tarkistaa: Lähtötilanne 30.3.2026.
  - Lähteet: 30.3.2026, Sosiaalihuolto · asiakkuus: Palvelupäätös 30.3.2026

#### Asiakas 3826, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 3826, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 30.3.2026 (4.4.2026–29.6.2026); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito kesäkuu 2026: 0 kotikäyntiä, 43 min (viimeisin kuukausi, jolta käyntejä on kirjattu); Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Liikkuminen ja kaatumiset (Asiakas 3826, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 3826, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Toimintakyky (sairaanhoitaja, 17.4.2026): Potilaan mukaan keskittyminen ja arjen asiointi ovat vaikeutuneet.
- Kommunikointi ja aistit (Asiakas 3826, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 3826, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 3826, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 2 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 0) 197 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 3826, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 3826, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 3826, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 3826, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 3826, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
- Miksi palvelu päättyi ja miten asiakas pärjää nyt?
- Onko asiakkaalla muuta tukea?

## Asiakas 7109

**Asiakas 7109 – perustiedot:** 78-vuotias mies, Espoo, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000007109 (synteettinen).

**Asiakas 7109 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 22.12.2025. Vireille 25.11.2025. Arviointijakso 30.11.2025–22.12.2025. Päätös voimassa 29.12.2025 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 7109 – RAI-seuranta-arvio:** myöhässä 113 vrk, määräpäivä 22.6.2026 (6 kk lähtötilanteesta).

**Asiakas 7109 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 7109 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 7109, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 7109, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.12.2025 (295 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: huimausta lähtötilanteen jälkeen; säännöllinen lääkitys muuttunut; univaikeuksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (univaikeuksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 7109, sairaanhoitajan näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 7109, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 11.2.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 1 käynnillä (11.2.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 11.2.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti)
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Huimausta lähtötilanteen jälkeen** (Asiakas 7109, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 27.12.2025. Varmuus: selvä. Sääntö HUIMAUS.
  - Mitä on mahdollisesti muuttunut: Huimaus kirjattu 27.12.2025. Asiakkaan oman kuvauksen mukaan huimaus vaikuttaa liikkumiseen.
  - Miksi tarkistaa: Huimaus voi lisätä kaatumisriskiä ja vaikuttaa liikkumiseen.
  - Lähteet: 27.12.2025, Terveydenhuolto · avohoitokäynti: R42 Huimaus ja pyörrytys; 27.12.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi.
  - Tarkista: Milloin huimaus ilmenee ja rajoittaako se liikkumista? Onko lääkitystä muutettu?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 7109, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 4.6.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 0, nyt 0. Jakson aikana aloitettu: pantopratsoli (4.6.2026–17.6.2026).
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 4.6.2026, Terveydenhuolto · lääkitys: Aloitettu 4.6.2026: pantopratsoli (A02BC02), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **◆ Univaikeuksia lähtötilanteen jälkeen** (Asiakas 7109, sairaanhoitajan näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 5.10.2026. Varmuus: epävarma. Sääntö UNI.
  - Mitä on mahdollisesti muuttunut: Kirjattu G47.0 Nukahtamis- ja unessapysymishäiriöt (5.10.2026).
  - Miksi tarkistaa: Univaikeudet voivat vaikuttaa jaksamiseen, mielialaan ja kaatumisriskiin.
  - Lähteet: 5.10.2026, Terveydenhuolto · avohoitokäynti: G47.0 Nukahtamis- ja unessapysymishäiriöt
  - Tarkista: Onko univaikeus jatkuvaa vai tilapäistä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 7109, sairaanhoitajan näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.6.2026.
  - Miksi tarkistaa: Lähtötilanne 22.12.2025.
  - Lähteet: 22.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.12.2025

#### Asiakas 7109, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.12.2025 (29.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 52 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 34 kotikäyntiä, 1028 min.
- Liikkuminen ja kaatumiset (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: S61.9 Ranteen ja käden määrittämätön avohaava – 1 käynti (28.4.2025). Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 27.12.2025): Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi; R42 Huimaus ja pyörrytys – 1 käynti (27.12.2025); R29.6 Kaatumistaipumus, muualle luokittamaton – 1 käynti (11.2.2026).
- Kognitio (Asiakas 7109, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (5.10.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Kipu (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (12.1.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 7109, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (5.7.2025); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (4.6.2026); Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 7109, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 295 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 7109, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Milloin huimaus ilmenee ja rajoittaako se liikkumista?
- Onko lääkitystä muutettu?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Onko univaikeus jatkuvaa vai tilapäistä?

### Asiakas 7109 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 7109, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 3 seurattavaa, 0 myönteistä).

**Asiakas 7109, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.12.2025 (295 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: huimausta lähtötilanteen jälkeen; säännöllinen lääkitys muuttunut; univaikeuksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (univaikeuksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 7109, lääkärin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 7109, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 11.2.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 1 käynnillä (11.2.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 11.2.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti)
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Huimausta lähtötilanteen jälkeen** (Asiakas 7109, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 27.12.2025. Varmuus: selvä. Sääntö HUIMAUS.
  - Mitä on mahdollisesti muuttunut: Huimaus kirjattu 27.12.2025. Asiakkaan oman kuvauksen mukaan huimaus vaikuttaa liikkumiseen.
  - Miksi tarkistaa: Huimaus voi lisätä kaatumisriskiä ja vaikuttaa liikkumiseen.
  - Lähteet: 27.12.2025, Terveydenhuolto · avohoitokäynti: R42 Huimaus ja pyörrytys; 27.12.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi.
  - Tarkista: Milloin huimaus ilmenee ja rajoittaako se liikkumista? Onko lääkitystä muutettu?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Säännöllinen lääkitys muuttunut** (Asiakas 7109, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Terveydentila ja lääkitys. Havaittu 4.6.2026. Varmuus: selvä. Sääntö LAAKITYS.
  - Mitä on mahdollisesti muuttunut: Säännöllisiä lääkeaineita lähtötilanteessa 0, nyt 0. Jakson aikana aloitettu: pantopratsoli (4.6.2026–17.6.2026).
  - Miksi tarkistaa: Lääkitysmuutokset voivat vaikuttaa toimintakykyyn, eikä lähtötilanne sisällä niitä.
  - Lähteet: 4.6.2026, Terveydenhuolto · lääkitys: Aloitettu 4.6.2026: pantopratsoli (A02BC02), säännöllinen
  - Tarkista: Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Lääkehoidon arviointi
- **◆ Univaikeuksia lähtötilanteen jälkeen** (Asiakas 7109, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 5.10.2026. Varmuus: epävarma. Sääntö UNI.
  - Mitä on mahdollisesti muuttunut: Kirjattu G47.0 Nukahtamis- ja unessapysymishäiriöt (5.10.2026).
  - Miksi tarkistaa: Univaikeudet voivat vaikuttaa jaksamiseen, mielialaan ja kaatumisriskiin.
  - Lähteet: 5.10.2026, Terveydenhuolto · avohoitokäynti: G47.0 Nukahtamis- ja unessapysymishäiriöt
  - Tarkista: Onko univaikeus jatkuvaa vai tilapäistä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 7109, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.6.2026.
  - Miksi tarkistaa: Lähtötilanne 22.12.2025.
  - Lähteet: 22.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.12.2025

#### Asiakas 7109, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 7109, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: S61.9 Ranteen ja käden määrittämätön avohaava – 1 käynti (28.4.2025). Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 27.12.2025): Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi; R42 Huimaus ja pyörrytys – 1 käynti (27.12.2025); R29.6 Kaatumistaipumus, muualle luokittamaton – 1 käynti (11.2.2026).
- Kognitio (Asiakas 7109, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 7109, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (5.10.2026).
- Kipu (Asiakas 7109, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (12.1.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Terveydentila ja lääkitys (Asiakas 7109, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (5.7.2025); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (4.6.2026); Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 7109, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 295 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 7109, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.12.2025 (29.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 52 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 34 kotikäyntiä, 1028 min.
- Kommunikointi ja aistit (Asiakas 7109, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 7109, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 7109, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 7109, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Milloin huimaus ilmenee ja rajoittaako se liikkumista?
- Onko lääkitystä muutettu?
- Onko muutoksen jälkeen ilmennyt uusia oireita tai toimintakyvyn muutoksia?
- Onko univaikeus jatkuvaa vai tilapäistä?

### Asiakas 7109 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 7109, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 2 seurattavaa, 0 myönteistä).

**Asiakas 7109, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.12.2025 (295 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: huimausta lähtötilanteen jälkeen; univaikeuksia lähtötilanteen jälkeen. Osa havainnoista on epävarmoja tai ristiriitaisia (univaikeuksia lähtötilanteen jälkeen). Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 7109, fysioterapeutin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 7109, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 11.2.2026. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 1 käynnillä (11.2.2026). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 11.2.2026, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti)
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Huimausta lähtötilanteen jälkeen** (Asiakas 7109, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 27.12.2025. Varmuus: selvä. Sääntö HUIMAUS.
  - Mitä on mahdollisesti muuttunut: Huimaus kirjattu 27.12.2025. Asiakkaan oman kuvauksen mukaan huimaus vaikuttaa liikkumiseen.
  - Miksi tarkistaa: Huimaus voi lisätä kaatumisriskiä ja vaikuttaa liikkumiseen.
  - Lähteet: 27.12.2025, Terveydenhuolto · avohoitokäynti: R42 Huimaus ja pyörrytys; 27.12.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi.
  - Tarkista: Milloin huimaus ilmenee ja rajoittaako se liikkumista? Onko lääkitystä muutettu?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **◆ Univaikeuksia lähtötilanteen jälkeen** (Asiakas 7109, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Mieliala ja uni. Havaittu 5.10.2026. Varmuus: epävarma. Sääntö UNI.
  - Mitä on mahdollisesti muuttunut: Kirjattu G47.0 Nukahtamis- ja unessapysymishäiriöt (5.10.2026).
  - Miksi tarkistaa: Univaikeudet voivat vaikuttaa jaksamiseen, mielialaan ja kaatumisriskiin.
  - Lähteet: 5.10.2026, Terveydenhuolto · avohoitokäynti: G47.0 Nukahtamis- ja unessapysymishäiriöt
  - Tarkista: Onko univaikeus jatkuvaa vai tilapäistä?
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 7109, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.6.2026.
  - Miksi tarkistaa: Lähtötilanne 22.12.2025.
  - Lähteet: 22.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.12.2025

#### Asiakas 7109, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 7109, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.12.2025 (29.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 52 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 34 kotikäyntiä, 1028 min.
- Liikkuminen ja kaatumiset (Asiakas 7109, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: S61.9 Ranteen ja käden määrittämätön avohaava – 1 käynti (28.4.2025). Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 27.12.2025): Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi; R42 Huimaus ja pyörrytys – 1 käynti (27.12.2025); R29.6 Kaatumistaipumus, muualle luokittamaton – 1 käynti (11.2.2026).
- Kipu (Asiakas 7109, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (12.1.2025). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kognitio (Asiakas 7109, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 7109, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 7109, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: G47.0 Nukahtamis- ja unessapysymishäiriöt – 1 käynti (5.10.2026).
- Sosiaalinen osallistuminen ja elintavat (Asiakas 7109, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan hän on eläkkeellä, tekee kotona kevyitä liikkuvuusharjoitteita eikä tupakoi nykyisin.
- Ravitsemus (Asiakas 7109, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 7109, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (5.7.2025). Lähtötilanteen jälkeen: K21.9 Ruokatorven refluksisairaus ilman ruokatorvitulehdusta – 1 käynti (4.6.2026).
- Palvelujen käyttö (Asiakas 7109, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 295 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 7109, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Milloin huimaus ilmenee ja rajoittaako se liikkumista?
- Onko lääkitystä muutettu?
- Onko univaikeus jatkuvaa vai tilapäistä?

### Asiakas 7109 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 7109, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 7109, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 22.12.2025 (295 vrk sitten). Sen jälkeen 4 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: huimausta lähtötilanteen jälkeen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 7109, sosiaalityöntekijän näkymä – havainnot

- **◆ Huimausta lähtötilanteen jälkeen** (Asiakas 7109, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 27.12.2025. Varmuus: kohtalainen. Sääntö HUIMAUS.
  - Mitä on mahdollisesti muuttunut: Huimaus kirjattu 27.12.2025. Asiakkaan oman kuvauksen mukaan huimaus vaikuttaa liikkumiseen.
  - Miksi tarkistaa: Huimaus voi lisätä kaatumisriskiä ja vaikuttaa liikkumiseen.
  - Lähteet: 27.12.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi.
  - Tarkista: Milloin huimaus ilmenee ja rajoittaako se liikkumista? Onko lääkitystä muutettu?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 7109, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 22.6.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 22.6.2026.
  - Miksi tarkistaa: Lähtötilanne 22.12.2025.
  - Lähteet: 22.12.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 22.12.2025

#### Asiakas 7109, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 7109, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 22.12.2025 (29.12.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 52 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 34 kotikäyntiä, 1028 min.
- Liikkuminen ja kaatumiset (Asiakas 7109, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 27.12.2025): Potilas kertoo välttävänsä äkillisiä asennonmuutoksia huimauksen vuoksi.
- Kognitio (Asiakas 7109, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 7109, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 7109, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 7109, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 3 käyntiä terveysasemalla (kiireellisiä 1) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 4 käyntiä terveysasemalla (kiireellisiä 1) 295 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 7109, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 7109, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 7109, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 7109, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 7109, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Milloin huimaus ilmenee ja rajoittaako se liikkumista?
- Onko lääkitystä muutettu?

## Asiakas 4995

**Asiakas 4995 – perustiedot:** 71-vuotias nainen, Kirkkonummi, asiointikieli suomi. Palvelu: Säännöllinen kotihoito. Tunniste SYN-ASI-1000004995 (synteettinen).

**Asiakas 4995 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 16.5.2026. Vireille 20.4.2026. Arviointijakso 27.4.2026–16.5.2026. Päätös voimassa 23.5.2026 alkaen toistaiseksi. Tuen tarve: Kotona selviytymisen tuki.

**Asiakas 4995 – RAI-seuranta-arvio:** 34 vrk jäljellä, määräpäivä 16.11.2026 (6 kk lähtötilanteesta).

**Asiakas 4995 – hoitosuhteet:** sairaanhoitaja kyllä, lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 4995 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

**Asiakas 4995, sairaanhoitajan näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 4995, sairaanhoitajan näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 16.5.2026 (150 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: murtuma lähtötilanteen jälkeen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

#### Asiakas 4995, sairaanhoitajan näkymä – havainnot

- **▲ Murtuma lähtötilanteen jälkeen** (Asiakas 4995, sairaanhoitajan näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 12.9.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma; S52.5 Värttinäluun alaosan murtuma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 12.9.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 19.9.2026, Terveydenhuolto · avohoitokäynti: S52.5 Värttinäluun alaosan murtuma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Uuden RAI-arvioinnin tarpeen arviointi

#### Asiakas 4995, sairaanhoitajan näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 16.5.2026 (23.5.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 66 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 37 kotikäyntiä, 1066 min.
- Liikkuminen ja kaatumiset (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R42 Huimaus ja pyörrytys – 1 käynti (14.6.2025). Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 1 käynti (12.9.2026); S52.5 Värttinäluun alaosan murtuma – 1 käynti (19.9.2026).
- Kognitio (Asiakas 4995, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Kommunikointi ja aistit (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Toimintakyky (sairaanhoitaja, 23.3.2026): Potilaan kertoman mukaan kuuleminen on heikentynyt tilapäisesti; Asiointikieli: suomi; H61.2 Korvavahatulppa – 2 käyntiä (26.12.2025, 23.3.2026). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 4995, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Potilaan kertoman mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kipu (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (19.7.2025). Lähtötilanteen jälkeen: M25.5 Nivelkipu – 1 käynti (4.6.2026); parasetamoli tarvittaessa (4.6.2026); parasetamoli tarvittaessa (12.9.2026); parasetamoli tarvittaessa (19.9.2026).
- Ravitsemus (Asiakas 4995, sairaanhoitaja, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sairaanhoitajan näkymässä.
- Terveydentila ja lääkitys (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (12.1.2026); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 4995, sairaanhoitaja, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 5 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 1) 150 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 4995, sairaanhoitajan näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?

### Asiakas 4995 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 4995, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 4995, lääkärin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 16.5.2026 (150 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: murtuma lähtötilanteen jälkeen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 4995, lääkärin näkymä – havainnot

- **▲ Murtuma lähtötilanteen jälkeen** (Asiakas 4995, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 12.9.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma; S52.5 Värttinäluun alaosan murtuma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 12.9.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 19.9.2026, Terveydenhuolto · avohoitokäynti: S52.5 Värttinäluun alaosan murtuma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Uuden RAI-arvioinnin tarpeen arviointi

#### Asiakas 4995, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 4995, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R42 Huimaus ja pyörrytys – 1 käynti (14.6.2025). Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 1 käynti (12.9.2026); S52.5 Värttinäluun alaosan murtuma – 1 käynti (19.9.2026).
- Kognitio (Asiakas 4995, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Mieliala ja uni (Asiakas 4995, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kipu (Asiakas 4995, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (19.7.2025). Lähtötilanteen jälkeen: M25.5 Nivelkipu – 1 käynti (4.6.2026); parasetamoli tarvittaessa (4.6.2026); parasetamoli tarvittaessa (12.9.2026); parasetamoli tarvittaessa (19.9.2026).
- Terveydentila ja lääkitys (Asiakas 4995, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (12.1.2026); Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 4995, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 5 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 1) 150 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 4995, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 16.5.2026 (23.5.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 66 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 37 kotikäyntiä, 1066 min.
- Kommunikointi ja aistit (Asiakas 4995, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Toimintakyky (sairaanhoitaja, 23.3.2026): Potilaan kertoman mukaan kuuleminen on heikentynyt tilapäisesti; Asiointikieli: suomi; H61.2 Korvavahatulppa – 2 käyntiä (26.12.2025, 23.3.2026). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4995, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan kertoman mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 4995, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 4995, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?

### Asiakas 4995 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 4995, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 4995, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 16.5.2026 (150 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: murtuma lähtötilanteen jälkeen. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 4995, fysioterapeutin näkymä – havainnot

- **▲ Murtuma lähtötilanteen jälkeen** (Asiakas 4995, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 12.9.2026. Varmuus: kohtalainen. Sääntö VAMMA.
  - Mitä on mahdollisesti muuttunut: 2 käyntiä vamman vuoksi: S69.9 Ranteen ja käden määrittämätön vamma; S52.5 Värttinäluun alaosan murtuma.
  - Miksi tarkistaa: Vamman syntytapa ei selviä koodista. Tarkista, liittyykö vamma kaatumiseen.
  - Lähteet: 12.9.2026, Terveydenhuolto · avohoitokäynti: S69.9 Ranteen ja käden määrittämätön vamma (kiireellinen käynti); 19.9.2026, Terveydenhuolto · avohoitokäynti: S52.5 Värttinäluun alaosan murtuma
  - Tarkista: Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen? Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Uuden RAI-arvioinnin tarpeen arviointi

#### Asiakas 4995, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 4995, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 16.5.2026 (23.5.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 66 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 37 kotikäyntiä, 1066 min.
- Liikkuminen ja kaatumiset (Asiakas 4995, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: R42 Huimaus ja pyörrytys – 1 käynti (14.6.2025). Lähtötilanteen jälkeen: S69.9 Ranteen ja käden määrittämätön vamma – 1 käynti (12.9.2026); S52.5 Värttinäluun alaosan murtuma – 1 käynti (19.9.2026).
- Kipu (Asiakas 4995, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: M54.5 Alaselkäkipu – 1 käynti (19.7.2025). Lähtötilanteen jälkeen: M25.5 Nivelkipu – 1 käynti (4.6.2026).
- Kognitio (Asiakas 4995, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kommunikointi ja aistit (Asiakas 4995, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Toimintakyky (sairaanhoitaja, 23.3.2026): Potilaan kertoman mukaan kuuleminen on heikentynyt tilapäisesti; Asiointikieli: suomi; H61.2 Korvavahatulppa – 2 käyntiä (26.12.2025, 23.3.2026). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 4995, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4995, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Potilaan kertoman mukaan eläkkeellä. Tekee kotona kevyitä liikkuvuusharjoitteita. Ei tupakoi nykyisin. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Ravitsemus (Asiakas 4995, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 4995, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (12.1.2026). Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Palvelujen käyttö (Asiakas 4995, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 5 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 1) 150 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 4995, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Miten vamma syntyi – liittyykö se kaatumiseen tai liikkumisen vaikeutumiseen?
- Onko vamma vaikuttanut päivittäisistä toimista selviytymiseen?

### Asiakas 4995 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 4995, sosiaalityöntekijän näkymä – tila:** = Ei muutoksia lähtötilanteeseen (0 merkittävää, 0 seurattavaa, 0 myönteistä).

**Asiakas 4995, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: säännöllinen kotihoito myönnetty 16.5.2026 (150 vrk sitten). Sen jälkeen 3 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Käytettävissä olevissa tiedoissa ei tunnistettu lähtötilanteeseen nähden muutoksia: tilanne vastaa lähtötilannetta. Ammattilainen arvioi tilanteen normaalin seurannan yhteydessä.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

Asiakas 4995, sosiaalityöntekijän näkymä: ei sääntöjen mukaisia havaintoja.

#### Asiakas 4995, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 4995, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Säännöllinen kotihoito myönnetty 16.5.2026 (23.5.2026 alkaen toistaiseksi); Tuen tarpeen luokitus: Kotona selviytymisen tuki; Suunniteltu kotihoito 66 min / vrk. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 37 kotikäyntiä, 1066 min.
- Liikkuminen ja kaatumiset (Asiakas 4995, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kognitio (Asiakas 4995, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kommunikointi ja aistit (Asiakas 4995, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Toimintakyky (sairaanhoitaja, 23.3.2026): Potilaan kertoman mukaan kuuleminen on heikentynyt tilapäisesti; Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 4995, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 4995, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 5 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 3 käyntiä terveysasemalla (kiireellisiä 1) 150 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 4995, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 4995, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 4995, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 4995, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

## Asiakas 6781

**Asiakas 6781 – perustiedot:** 73-vuotias mies, Kirkkonummi, asiointikieli suomi. Palvelu: Ympärivuorokautinen palveluasuminen. Tunniste SYN-ASI-1000006781 (synteettinen).

**Asiakas 6781 – lähtötilanne:** palvelutarpeen arviointi ja palvelupäätös 17.10.2025. Päätös voimassa 2.11.2025 alkaen toistaiseksi. Tuen tarve: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki.

**Asiakas 6781 – RAI-seuranta-arvio:** myöhässä 179 vrk, määräpäivä 17.4.2026 (6 kk lähtötilanteesta).

**Asiakas 6781 – hoitosuhteet:** sairaanhoitaja ei (palveluasumisen asiakas), lääkäri kyllä, fysioterapeutti kyllä, sosiaalityöntekijä kyllä.

### Asiakas 6781 – sairaanhoitajan näkymä (RAI-seuranta-arvio)

Asiakas 6781: sairaanhoitajalla ei ole hoitosuhdetta tähän asiakkaaseen (palveluasumisen asiakas), joten sairaanhoitajan näkymää ei ole.

### Asiakas 6781 – lääkärin näkymä (RAI-seuranta-arvio)

**Asiakas 6781, lääkärin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6781, lääkärin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (361 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Lääkärin näkymässä ei ole: Päätös- ja suunnitelmatekstit (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6781, lääkärin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 6781, lääkärin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.10.2025. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 1 käynnillä (28.10.2025). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 28.10.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti)
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 6781, lääkärin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.10.2025. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.10.2025: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.10.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6781, lääkärin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 17.4.2026.
  - Miksi tarkistaa: Lähtötilanne 17.10.2025.
  - Lähteet: 17.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 17.10.2025

#### Asiakas 6781, lääkärin näkymä – RAI-osa-alueet

- Liikkuminen ja kaatumiset (Asiakas 6781, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.10.2025): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista; R29.6 Kaatumistaipumus, muualle luokittamaton – 1 käynti (28.10.2025).
- Kognitio (Asiakas 6781, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 6781, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Kipu (Asiakas 6781, lääkäri, painotettu): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.
- Terveydentila ja lääkitys (Asiakas 6781, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ei säännöllistä lääkitystä. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (28.8.2026); Ei voimassa olevaa säännöllistä lääkitystä.
- Palvelujen käyttö (Asiakas 6781, lääkäri, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 0 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 361 vrk:n aikana lähtötilanteen jälkeen.
- Arjessa selviytyminen ja avuntarve (Asiakas 6781, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (2.11.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 91 min.
- Kommunikointi ja aistit (Asiakas 6781, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6781, lääkäri, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan ulkoilee kävellen useana päivänä viikossa, ei tupakoi nykyisin ja on eläkkeellä.
- Ravitsemus (Asiakas 6781, lääkäri, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa lääkärin näkymässä.

#### Asiakas 6781, lääkärin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?

### Asiakas 6781 – fysioterapeutin näkymä (RAI-seuranta-arvio)

**Asiakas 6781, fysioterapeutin näkymä – tila:** ▲ Merkittävä kielteinen muutos (1 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6781, fysioterapeutin näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (361 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä. Merkittäviä muutoksia tarkistettavaksi: kaatumistaipumus kirjattu lähtötilanteen jälkeen. Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Fysioterapeutin näkymässä ei ole: Lääkitys; Laboratoriotulokset; Päätös- ja suunnitelmatekstit; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6781, fysioterapeutin näkymä – havainnot

- **▲ Kaatumistaipumus kirjattu lähtötilanteen jälkeen** (Asiakas 6781, fysioterapeutin näkymä). Taso: Merkittävä kielteinen muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.10.2025. Varmuus: selvä. Sääntö KAATUMINEN.
  - Mitä on mahdollisesti muuttunut: Kaatumistaipumus kirjattu 1 käynnillä (28.10.2025). Lähtötilannetta edeltäneen vuoden aikana: ei kirjauksia.
  - Miksi tarkistaa: Diagnoosikoodi on kirjattu terveysaseman käynnillä.
  - Lähteet: 28.10.2025, Terveydenhuolto · avohoitokäynti: R29.6 Kaatumistaipumus, muualle luokittamaton (kiireellinen käynti)
  - Tarkista: Kaatumisten olosuhteet ja asiakkaan oma kuvaus. Kotiympäristön turvallisuus ja apuvälineet. Lääkitys, joka voi lisätä kaatumisriskiä.
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Kaatumisriskin arviointi; Hoito- ja palvelusuunnitelman tarkistus
- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 6781, fysioterapeutin näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.10.2025. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.10.2025: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.10.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6781, fysioterapeutin näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 17.4.2026.
  - Miksi tarkistaa: Lähtötilanne 17.10.2025.
  - Lähteet: 17.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 17.10.2025

#### Asiakas 6781, fysioterapeutin näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 6781, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (2.11.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 91 min.
- Liikkuminen ja kaatumiset (Asiakas 6781, fysioterapeutti, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.10.2025): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista; R29.6 Kaatumistaipumus, muualle luokittamaton – 1 käynti (28.10.2025).
- Kipu (Asiakas 6781, fysioterapeutti, painotettu): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Kognitio (Asiakas 6781, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 6781, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Mieliala ja uni (Asiakas 6781, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6781, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Potilaan mukaan ulkoilee kävellen useana päivänä viikossa, ei tupakoi nykyisin ja on eläkkeellä.
- Ravitsemus (Asiakas 6781, fysioterapeutti, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa fysioterapeutin näkymässä.
- Terveydentila ja lääkitys (Asiakas 6781, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: J06.9 Määrittämätön akuutti ylähengitystieinfektio – 1 käynti (28.8.2026).
- Palvelujen käyttö (Asiakas 6781, fysioterapeutti, muu osa-alue). Lähtötilanne ja sitä edeltävä vuosi: 0 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 361 vrk:n aikana lähtötilanteen jälkeen.

#### Asiakas 6781, fysioterapeutin näkymä – valmistaudu kohtaamiseen

- Arvioi, edellyttääkö tilanne hoito- ja palvelusuunnitelman tarkistamista tai uuden RAI-arvioinnin käynnistämistä.
- Kaatumisten olosuhteet ja asiakkaan oma kuvaus.
- Kotiympäristön turvallisuus ja apuvälineet.
- Lääkitys, joka voi lisätä kaatumisriskiä.
- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?

### Asiakas 6781 – sosiaalityöntekijän näkymä (RAI-seuranta-arvio)

**Asiakas 6781, sosiaalityöntekijän näkymä – tila:** ◆ Seurattava muutos (0 merkittävää, 1 seurattavaa, 0 myönteistä).

**Asiakas 6781, sosiaalityöntekijän näkymä – tilannekuva:** Lähtötilanne: ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (361 vrk sitten). Sen jälkeen 2 terveysaseman käyntiä (diagnoosit eivät ole tämän käyttötarkoituksen tietoja). Seurattavia muutoksia: toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset. Kyse on tarkistettavista havainnoista, ei diagnooseista tai RAI-tuloksista. Ammattilainen arvioi merkityksen ja päättää jatkotoimista.

*Sosiaalityöntekijän näkymässä ei ole: Diagnoosit; Lääkitys; Laboratoriotulokset; Rakenteiset kyselyt (PHQ-9, GAD-7, AUDIT) (käyttötarkoitussidonnaisuus). Puuttuva tieto ei tarkoita, ettei asiaa olisi kirjattu.*

#### Asiakas 6781, sosiaalityöntekijän näkymä – havainnot

- **◆ Toimintakyvyn vaikeutumista kuvattu: liikkuminen ja kaatumiset** (Asiakas 6781, sosiaalityöntekijän näkymä). Taso: Seurattava muutos. Osa-alue: Liikkuminen ja kaatumiset. Havaittu 28.10.2025. Varmuus: kohtalainen. Sääntö TOIMINTAKYKY.
  - Mitä on mahdollisesti muuttunut: Käynnillä 28.10.2025: ”Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.”
  - Miksi tarkistaa: Asiakkaan oma kuvaus käynnillä. Lähtötilanteen toimintakyvyn arviota ei ole tallennettu.
  - Lähteet: 28.10.2025, Terveydenhuolto · käyntimuistiinpano: Toimintakyky: Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
  - Tarkista: Onko muutos pysyvä vai tilapäinen? Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?
  - Ehdotetut jatkoaskeleet (ammattilainen päättää): Hoito- ja palvelusuunnitelman tarkistus
- **ℹ RAI-seuranta-arvio ajankohtainen** (Asiakas 6781, sosiaalityöntekijän näkymä). Taso: Tiedoksi. Osa-alue: Arjessa selviytyminen ja avuntarve. Havaittu 17.4.2026. Varmuus: selvä. Sääntö SEURANTA.
  - Mitä on mahdollisesti muuttunut: 6 kk lähtötilanteesta täyttyi 17.4.2026.
  - Miksi tarkistaa: Lähtötilanne 17.10.2025.
  - Lähteet: 17.10.2025, Sosiaalihuolto · asiakkuus: Palvelupäätös 17.10.2025

#### Asiakas 6781, sosiaalityöntekijän näkymä – RAI-osa-alueet

- Arjessa selviytyminen ja avuntarve (Asiakas 6781, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Ympärivuorokautinen palveluasuminen myönnetty 17.10.2025 (2.11.2025 alkaen toistaiseksi); Tuen tarpeen luokitus: Ympärivuorokautisen tuen tarve; Muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: Kotihoito syyskuu 2026: 0 kotikäyntiä, 91 min.
- Liikkuminen ja kaatumiset (Asiakas 6781, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: ei kirjauksia. Lähtötilanteen jälkeen: Toimintakyky (lääkäri, 28.10.2025): Potilaan mukaan kaatumisen pelko rajoittaa liikkumista.
- Kognitio (Asiakas 6781, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Muistiin liittyvä tuen tarve: muuhun dementiaan liittyvä tuki. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Kommunikointi ja aistit (Asiakas 6781, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: Asiointikieli: suomi. Lähtötilanteen jälkeen: ei uusia kirjauksia.
- Sosiaalinen osallistuminen ja elintavat (Asiakas 6781, sosiaalityöntekijä, painotettu): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Palvelujen käyttö (Asiakas 6781, sosiaalityöntekijä, painotettu). Lähtötilanne ja sitä edeltävä vuosi: 0 käyntiä terveysasemalla (kiireellisiä 0) lähtötilannetta edeltäneen 12 kk:n aikana. Lähtötilanteen jälkeen: 2 käyntiä terveysasemalla (kiireellisiä 1) 361 vrk:n aikana lähtötilanteen jälkeen.
- Mieliala ja uni (Asiakas 6781, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Kipu (Asiakas 6781, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Ravitsemus (Asiakas 6781, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.
- Terveydentila ja lääkitys (Asiakas 6781, sosiaalityöntekijä, muu osa-alue): ei tätä osa-aluetta kuvaavaa tietoa sosiaalityöntekijän näkymässä.

#### Asiakas 6781, sosiaalityöntekijän näkymä – valmistaudu kohtaamiseen

- Onko muutos pysyvä vai tilapäinen?
- Vastaako palvelu- ja hoitosuunnitelma nykyistä toimintakykyä?

