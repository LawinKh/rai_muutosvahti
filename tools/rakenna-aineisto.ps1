<#
  RAI Muutosvahti – demoaineiston rakentaminen hackathon_data-kansiosta
  ----------------------------------------------------------------------
  Lähde:  hackathon_data/LUVN_synteettinenData_VEIL/2024-2026  (synteettinen, Veil.AI)
          hackathon_data/Esitieto_lomakkeet_hackathon_json      (PHQ-9, GAD-7, AUDIT)
  Tulos:  js/data.js          (window.RAI_DATA, sovellus lukee tämän ilman verkkoa)
          data/aineisto.json  (sama sisältö JSON-muodossa, esim. Copilot Studion tietolähteeksi)

  Tietojen minimointi:
    - mukaan vain ikääntyneiden palvelujen asiakkaat, joilla myönteinen kotihoito- tai
      palveluasumispäätös (= lähtötilanne) ja sekä sosiaali- että terveystiedot
    - terveystiedot vain jaksolta [lähtötilanne - 365 vrk, viitepäivä]
    - kotihoidon käynnit kuukausitasolle koostettuina (ei yksittäisiä käyntejä)
    - ei henkilötunnuksia, ei lomakkeiden laatijoiden tietoja

  Käyttö (PowerShell 5.1, projektin juuresta):
    .\tools\rakenna-aineisto.ps1 -Ehdokkaat          # listaa ehdokasasiakkaat
    .\tools\rakenna-aineisto.ps1                      # rakentaa aineiston valituista asiakkaista
#>
param(
  [switch]$Ehdokkaat,
  [string[]]$Asiakkaat = @(
    'SYN-ASI-1000001694', 'SYN-ASI-1000004995', 'SYN-ASI-1000009422', 'SYN-ASI-1000007109',
    'SYN-ASI-1000004006', 'SYN-ASI-1000006781', 'SYN-ASI-1000010638', 'SYN-ASI-1000013713',
    'SYN-ASI-1000013245', 'SYN-ASI-1000008163', 'SYN-ASI-1000012506', 'SYN-ASI-1000013826',
    'SYN-ASI-1000006531', 'SYN-ASI-1000000831'
  )
)
$ErrorActionPreference = 'Stop'
$VIITE = '2026-10-13'
$ROOT = Split-Path -Parent $PSScriptRoot
$HD = Join-Path $ROOT 'hackathon_data'
$C = Join-Path $HD 'LUVN_synteettinenData_VEIL\2024-2026'

function LueJsonl($p) { [IO.File]::ReadAllLines($p, [Text.Encoding]::UTF8) | Where-Object { $_ } | ForEach-Object { $_ | ConvertFrom-Json } }
function LueCsv($p, $suodatin) { Import-Csv $p -Encoding UTF8 | Where-Object $suodatin }
function Ryhmita($rivit, $avain) {
  $h = @{}
  foreach ($r in $rivit) { $k = $r.$avain; if (-not $h.ContainsKey($k)) { $h[$k] = New-Object Collections.ArrayList }; [void]$h[$k].Add($r) }
  $h
}
function Pv($s) { [datetime]::ParseExact($s.Substring(0, 10), 'yyyy-MM-dd', $null) }
function PvLisaa($s, $n) { (Pv $s).AddDays($n).ToString('yyyy-MM-dd') }
function Nul($s) { if ([string]::IsNullOrEmpty($s)) { $null } else { $s } }
function Kentta($teksti, $nimi) {
  $m = [regex]::Match($teksti, '(?m)^- ' + [regex]::Escape($nimi) + ':\s*(.+)$')
  if ($m.Success) { $m.Groups[1].Value.Trim() } else { $null }
}

Write-Host 'Luetaan tekstit...'
$sosTekstit = LueJsonl "$C\social\text\social-notes.jsonl"
$klinTekstit = @{}
$dxNimet = @{}
foreach ($n in (LueJsonl "$C\clinical\text\clinical-notes.jsonl")) {
  $klinTekstit[$n.subject_id] = $n
  # ICD-10-koodien nimet poimitaan käyntimuistiinpanoista (ei ulkoista koodistoa)
  foreach ($m in [regex]::Matches($n.note_text, '\b([A-Z]\d{2}(?:\.\d)?)\s+([A-ZÄÖÅ][^\n.]*?)\s*(?:\(ensisijainen[^)]*\))?\s*(?:\.|\n|$)')) {
    $k = $m.Groups[1].Value; $v = $m.Groups[2].Value.Trim()
    if (-not $dxNimet.ContainsKey($k)) { $dxNimet[$k] = @{} }
    $dxNimet[$k][$v] = 1 + [int]$dxNimet[$k][$v]
  }
}

$valitut = $sosTekstit | Where-Object {
  $_.service_task -eq 'Iäkkäiden palvelut' -and $_.decision_outcome -eq 'Myönteinen' -and
  $_.decision_date -ge '2025-09-01' -and $_.decision_date -le '2026-07-15'
}
if (-not $Ehdokkaat) { $valitut = $valitut | Where-Object { $Asiakkaat -contains $_.subject_id } }
$ids = @{}; foreach ($e in $valitut) { $ids[$e.subject_id] = $e }
Write-Host "Asiakkaita: $($ids.Count)"

Write-Host 'Luetaan terveydenhuollon taulut...'
$kont = LueCsv "$C\clinical\tables\kontakti.csv" { $ids.ContainsKey($_.asiakas_id) }
$kontId = @{}; foreach ($k in $kont) { $kontId[$k.kontakti_id] = $k }
$kontG = Ryhmita $kont 'asiakas_id'
$dxG = Ryhmita (LueCsv "$C\clinical\tables\diagnoosi.csv" { $ids.ContainsKey($_.asiakas_id) }) 'kontakti_id'
$tpG = Ryhmita (LueCsv "$C\clinical\tables\toimenpide.csv" { $kontId.ContainsKey($_.kontakti_id) }) 'kontakti_id'
$laake = LueCsv "$C\clinical\tables\laakitys.csv" { $ids.ContainsKey($_.asiakas_id) }
$laakeAvaimet = @{}; foreach ($l in $laake) { $laakeAvaimet[$l.laakitys_avain] = 1 }
$laakeKont = @{}; foreach ($r in (LueCsv "$C\clinical\tables\laakitys_kontakti.csv" { $laakeAvaimet.ContainsKey($_.laakitys_avain) })) { $laakeKont[$r.laakitys_avain] = $r.kontakti_id }
$laakeG = Ryhmita $laake 'asiakas_id'
$lab = LueCsv "$C\clinical\tables\vastausarkistohistoria_view.csv" { $ids.ContainsKey($_.asiakas_id) }
$labAvaimet = @{}; foreach ($l in $lab) { $labAvaimet[$l.Avain] = 1 }
$labKont = @{}; foreach ($r in (LueCsv "$C\clinical\tables\laboratorio_kontakti.csv" { $labAvaimet.ContainsKey($_.Avain) })) { $labKont[$r.Avain] = $r.kontakti_id }
$labG = Ryhmita $lab 'asiakas_id'

Write-Host 'Luetaan sosiaalihuollon taulut...'
$sAsiakas = @{}; $hetu = @{}
foreach ($a in (LueCsv "$C\social\tables\asiakas.csv" { $ids.ContainsKey($_.asiakas_id) })) { $sAsiakas[$a.asiakas_id] = $a; $hetu[$a.henkilotunnus] = $a.asiakas_id }
$virG = Ryhmita (LueCsv "$C\social\tables\vireilletulo.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$selG = Ryhmita (LueCsv "$C\social\tables\selvitys.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$paaG = Ryhmita (LueCsv "$C\social\tables\paatos.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$palG = Ryhmita (LueCsv "$C\social\tables\palvelu.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$asuG = Ryhmita (LueCsv "$C\social\tables\asumisjakso.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$skG = Ryhmita (LueCsv "$C\social\tables\kontakti.csv" { $ids.ContainsKey($_.asiakas_id) }) 'asiakas_id'
$suunG = @{}
foreach ($r in (LueCsv "$C\social\tables\kotihoito_suunniteltu_palvelu.csv" { $hetu.ContainsKey($_.henkilotunnus) })) {
  $aid = $hetu[$r.henkilotunnus]; if (-not $suunG.ContainsKey($aid)) { $suunG[$aid] = New-Object Collections.ArrayList }; [void]$suunG[$aid].Add($r)
}

$tulos = New-Object Collections.ArrayList
foreach ($e in $valitut) {
  $id = $e.subject_id
  $lahtoPvm = $e.decision_date
  $alku = PvLisaa $lahtoPvm -365
  $sa = $sAsiakas[$id]

  # --- terveydenhuollon käynnit diagnooseineen ja toimenpiteineen
  $kaynnit = @(@($kontG[$id]) | Where-Object { $_ -and $_.tapahtuma_pvm -ge $alku -and $_.tapahtuma_pvm -le $VIITE } | Sort-Object tapahtuma_aikaleima | ForEach-Object {
      $k = $_
      [ordered]@{
        id    = $k.kontakti_id
        pvm   = $k.tapahtuma_pvm
        kesto = [int]$k.kesto_minuutit_kpl
        tapa  = $k.yhteystapa_koodi_hilmo
        kiire = $k.hoidon_kiireellisyys_koodi_hilmo
        dx    = @(@($dxG[$k.kontakti_id]) | Where-Object { $_ } | Sort-Object diagnoosi_ensisijaisuus | ForEach-Object { [ordered]@{ k = $_.icd10_id; ens = ($_.diagnoosi_ensisijaisuus -eq 'P'); pitka = ($_.onko_pitkaaikaisdiagnoosi -eq 'true') } })
        tp    = @(@($tpG[$k.kontakti_id]) | Where-Object { $_ } | ForEach-Object { $_.toimenpidekoodi_selite_kansallinen })
      }
    })

  $laakkeet = @(@($laakeG[$id]) | Where-Object { $_ -and $_.laakitys_aloituspvm -le $VIITE -and ([string]::IsNullOrEmpty($_.laakitys_paattymispvm) -or $_.laakitys_paattymispvm -ge $alku) } | Sort-Object laakitys_aloituspvm | ForEach-Object {
      [ordered]@{
        id = $_.laakitys_avain; aine = $_.vaikuttava_aine; atc = $_.atc_koodi
        alku = $_.laakitys_aloituspvm; loppu = (Nul $_.laakitys_paattymispvm)
        tapa = $_.laakkeen_kayttotapa; resepti = ($_.on_resepti -eq 'true'); kontakti = $laakeKont[$_.laakitys_avain]
      }
    })

  $labrat = @(@($labG[$id]) | Where-Object { $_ } | ForEach-Object {
      $kid = $labKont[$_.Avain]; $kk = $kontId[$kid]
      if ($kk -and $kk.tapahtuma_pvm -ge $alku -and $kk.tapahtuma_pvm -le $VIITE) {
        [ordered]@{
          id = 'LAB-' + $_.Avain; pvm = $kk.tapahtuma_pvm; tutkimus = $_.PaatutkimuksenLyhenne
          arvo = [math]::Round([double]::Parse($_.NumeerinenTutkimustulos, [Globalization.CultureInfo]::InvariantCulture), 1)
          yksikko = ($_.TulokseenLiittyvaInfokentta -replace '^.*unit=', ''); kontakti = $kid
        }
      }
    } | Sort-Object { $_.pvm })

  $muistiinpano = $null
  $n = $klinTekstit[$id]
  if ($n -and $n.visit_date -le $VIITE) {
    $muistiinpano = [ordered]@{ id = 'NOTE-' + $n.visit_id; kontakti = $n.visit_id; pvm = $n.visit_date; rooli = $n.clinician_role; vaihe = $n.phase; tyyppi = $n.contact_type; kiire = $n.urgency; teksti = $n.note_text }
  }

  # --- sosiaalihuollon prosessi
  $sosTap = New-Object Collections.ArrayList
  foreach ($v in @($virG[$id])) { if ($v -and $v.vireilletulo_pvm -le $VIITE) { [void]$sosTap.Add([ordered]@{ id = $v.vireilletulo_id; pvm = $v.vireilletulo_pvm; laji = 'vireilletulo'; nimi = ($v.vireilletulo_nimi -replace '^SIM-', ''); tehtava = $v.palvelutehtava_nimi; kiireellinen = ($v.onko_kiireellinen -eq 'true') }) } }
  foreach ($s in @($selG[$id])) { if ($s -and $s.selvitys_alku_pvm -le $VIITE) { [void]$sosTap.Add([ordered]@{ id = $s.selvitys_id; pvm = $s.selvitys_alku_pvm; loppu = (Nul $s.selvitys_loppu_pvm); laji = 'selvitys'; nimi = $s.selvitys_nimi; tehtava = $s.palvelutehtava_nimi }) } }
  foreach ($p in @($paaG[$id])) { if ($p -and $p.paatos_pvm -le $VIITE) { [void]$sosTap.Add([ordered]@{ id = $p.paatos_id; pvm = $p.paatos_pvm; laji = 'paatos'; nimi = $p.palveluluokitus_nimi; tehtava = $p.palvelutehtava_nimi; ratkaisu = $p.ratkaisu_laji; alku = (Nul $p.paatos_alku_pvm); loppu = (Nul $p.paatos_loppu_pvm) }) } }
  foreach ($p in @($palG[$id])) { if ($p -and $p.alku_pvm -and $p.alku_pvm -le $VIITE) { [void]$sosTap.Add([ordered]@{ id = $p.palvelu_id; pvm = $p.alku_pvm; loppu = (Nul $p.loppu_pvm); laji = 'palvelu'; nimi = $p.palveluluokitus_nimi; tehtava = $p.palvelutehtava_nimi; keskeytetty = ($p.onko_keskeytetty -eq 'true'); keskeytys = (Nul ($p.keskeytyksen_syy -replace '^SIM-', '')) }) } }
  foreach ($p in @($asuG[$id])) { if ($p -and $p.alkaen_pvm -le $VIITE) { [void]$sosTap.Add([ordered]@{ id = $p.asumisjakso_id; pvm = $p.alkaen_pvm; loppu = (Nul $p.saakka_pvm); laji = 'asumisjakso'; nimi = $p.palveluluokitus_nimi }) } }

  # kotihoidon / iäkkäiden palvelujen käynnit kuukausittain (minimointi: ei yksittäisiä käyntejä)
  $kk = @{}
  foreach ($s in @($skG[$id])) {
    if (-not $s) { continue }
    $p = $s.tapahtuma_alku_aikaleima.Substring(0, 10)
    if ($s.palvelutehtava_nimi -ne 'Iäkkäiden palvelut' -or $p -lt (PvLisaa $lahtoPvm -120) -or $p -gt $VIITE) { continue }
    $m = $p.Substring(0, 7); $tapa = $s.yhteystapa_id
    if (-not $kk.ContainsKey($m)) { $kk[$m] = [ordered]@{ kk = $m; kotikaynnit = 0; muut = 0; min = 0 } }
    if ($tapa -eq 'R20') { $kk[$m].kotikaynnit++ } else { $kk[$m].muut++ }
    $kk[$m].min += [int]$s.kesto_minuutit_kpl
  }
  $kaynnitKk = @($kk.Keys | Sort-Object | ForEach-Object { $kk[$_] })

  $suun = @(@($suunG[$id]) | Where-Object { $_ -and $_.suunniteltu_palvelu_pvm -le $VIITE } | Sort-Object suunniteltu_palvelu_pvm | ForEach-Object {
      [ordered]@{ id = $_.kotihoito_suunniteltu_palvelu_avain; pvm = $_.suunniteltu_palvelu_pvm; maara = [int]$_.suunniteltu_maara; yksikko = $_.palvelun_yksikko; aikayksikko = $_.suunnitelman_aikayksikko; palvelu = $_.kotihoito_palvelu_nimi }
    })

  $paatosTeksti = $e.decision_text
  $suunnitelmaTeksti = if ($e.plan_text -and $e.plan_date -le $VIITE) { $e.plan_text } else { $null }
  $tuenTarve = Kentta $paatosTeksti 'Tuen tarpeen luokitus'
  $muisti = Kentta $paatosTeksti 'Muistiin liittyvä tuen konteksti'
  $syntymapaiva = Pv $sa.syntymapaiva
  $ika = (Pv $VIITE).Year - $syntymapaiva.Year; if ((Pv $VIITE).DayOfYear -lt $syntymapaiva.DayOfYear) { $ika-- }

  [void]$tulos.Add([ordered]@{
      id = $id
      syntymavuosi = [int]$sa.syntymavuosi; ika = $ika; sukupuoli = $sa.sukupuoli; kotikunta = $sa.kotikunta; kieli = $sa.kieli
      lahto = [ordered]@{
        pvm = $lahtoPvm; paatos = $e.decision_id; palvelu = $e.service; tehtava = $e.service_task
        vireilletulo = (Kentta $suunnitelmaTeksti 'Vireilletulopäivä'); arviointijakso = (Kentta $suunnitelmaTeksti 'Palvelutarpeen arvioinnin ajanjakso')
        voimassa = (Kentta $paatosTeksti 'Voimassaolo')
        tuenTarve = @(if ($tuenTarve) { $tuenTarve -split ';\s*' })
        muisti = $muisti
      }
      sos = [ordered]@{
        tapahtumat = @($sosTap | Sort-Object { $_.pvm })
        kaynnitKk = $kaynnitKk
        suunniteltu = $suun
        paatosteksti = [ordered]@{ id = $e.decision_id; pvm = $e.decision_date; teksti = $paatosTeksti }
        suunnitelma = $(if ($suunnitelmaTeksti) { [ordered]@{ id = 'PLAN-' + $e.decision_id; pvm = $e.plan_date; teksti = $suunnitelmaTeksti } } else { $null })
      }
      terv = [ordered]@{ kaynnit = $kaynnit; laakkeet = $laakkeet; lab = $labrat; muistiinpano = $muistiinpano }
    })
}

if ($Ehdokkaat) {
  $tulos | ForEach-Object {
    $l = $_.lahto.pvm
    $j = @($_.terv.kaynnit | Where-Object { $_.pvm -gt $l })
    $kiire = @($j | Where-Object { $_.kiire -ne 'E' }).Count
    $dx = ($j | ForEach-Object { $_.dx | ForEach-Object { $_.k } }) -join ' '
    $uudetL = @($_.terv.laakkeet | Where-Object { $_.alku -gt $l }).Count
    $kkk = $_.sos.kaynnitKk; $kaynnitTxt = ($kkk | ForEach-Object { "$($_.kk.Substring(2)):$($_.kotikaynnit)" }) -join ' '
    $sosJ = ($_.sos.tapahtumat | Where-Object { $_.pvm -gt $l } | ForEach-Object { "$($_.laji):$($_.nimi)" }) -join '; '
    $tk = if ($_.terv.muistiinpano) { ([regex]::Match($_.terv.muistiinpano.teksti, '## TOIMINTAKYKY\s*\n([^#]*)')).Groups[1].Value.Trim() } else { '' }
    "{0} | {1} | lähtö {2} | ikä {3} | muisti: {4}`n   käynnit jälkeen {5} (kiire {6}) dx: {7} | uusia lääkkeitä {8} | lab {9}`n   kotihoito/kk: {10}`n   sos jälkeen: {11}`n   muistiinpano: {12} | {13}" -f $_.id, $_.lahto.palvelu, $l, $_.ika, $_.lahto.muisti, $j.Count, $kiire, $dx, $uudetL, $_.terv.lab.Count, $kaynnitTxt, $sosJ, $(if ($_.terv.muistiinpano) { $_.terv.muistiinpano.pvm } else { '-' }), $tk
  }
  return
}

# --- käytetyt diagnoosikoodit nimineen
$kaytetyt = @{}
foreach ($a in $tulos) { foreach ($k in $a.terv.kaynnit) { foreach ($d in $k.dx) { $kaytetyt[$d.k] = 1 } } }
$dxOut = [ordered]@{}
foreach ($k in ($kaytetyt.Keys | Sort-Object)) {
  if ($dxNimet.ContainsKey($k)) { $dxOut[$k] = ($dxNimet[$k].GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1).Key } else { $dxOut[$k] = $null }
}

# --- rakenteiset lomakkeet (vain kysymykset, vastausvaihtoehdot ja pisteet)
function Lomake($tiedosto, $tunnus) {
  $polku = '\\?\' + (Join-Path $HD "Esitieto_lomakkeet_hackathon_json\$tiedosto")
  $j = [IO.File]::ReadAllText($polku, [Text.Encoding]::UTF8) | ConvertFrom-Json
  $kys = @($j.questions | Where-Object { $_.type -eq 'select' } | ForEach-Object {
      $q = $_; $pisteet = @{}; foreach ($s in $q.scores) { $pisteet[$s.answerId] = $s.points }
      [ordered]@{
        teksti = $q.questionText.fi.Trim(); pisteytetty = [bool]$q.scoringEnabled
        vaihtoehdot = @($q.answers | ForEach-Object { [ordered]@{ teksti = $_.answerText.fi.Trim(); pisteet = $(if ($pisteet.ContainsKey($_.answerId)) { [int]$pisteet[$_.answerId] } else { $null }) } })
      }
    })
  [ordered]@{
    id = $tunnus; nimi = $j.name.fi; kuvaus = $j.description.fi; ohje = (@($j.questions | Where-Object { $_.type -eq 'heading' } | Select-Object -Last 1)[0].questionText.fi)
    min = @($j.scoreCalculations)[0].min; max = @($j.scoreCalculations)[0].max; lahde = $tiedosto; kysymykset = $kys
  }
}
$lomakeHakemisto = Join-Path $HD 'Esitieto_lomakkeet_hackathon_json'
$nimi = { param($alku) ([IO.Directory]::GetFiles('\\?\' + $lomakeHakemisto) | ForEach-Object { [IO.Path]::GetFileName($_) } | Where-Object { $_ -like "$alku*" } | Select-Object -First 1) }
$lomakkeet = @(
  (Lomake (& $nimi 'masennuskysely-phq-9') 'PHQ-9'),
  (Lomake (& $nimi 'ahdistuneisuuskysely-gad-7') 'GAD-7'),
  (Lomake (& $nimi 'alkoholin-kayton-riskit-kysely-audit') 'AUDIT')
)

$data = [ordered]@{
  versio = '2.0'
  kuvaus = 'RAI Muutosvahti – demoaineisto, poimittu LUVN:n synteettisestä hackathon-aineistosta (Veil.AI)'
  viitepaiva = $VIITE
  lahde = [ordered]@{
    kohortti = 'LUVN_synteettinenData_VEIL/2024-2026 (sosiaali- ja terveystiedot samoilla henkilöillä)'
    lomakkeet = 'Esitieto_lomakkeet_hackathon_json'
    rakennettu = (Get-Date).ToString('yyyy-MM-dd')
    huomio = 'Kaikki tiedot ovat synteettisiä. Aineistossa ei ole RAI-mittareita: lähtötilanteena käytetään palvelutarpeen arvioinnin ja palvelupäätöksen ajankohtaa.'
  }
  dxNimet = $dxOut
  lomakkeet = $lomakkeet
  asiakkaat = @($tulos)
}
$json = $data | ConvertTo-Json -Depth 14 -Compress
$utf8 = New-Object Text.UTF8Encoding $false
[IO.File]::WriteAllText((Join-Path $ROOT 'data\aineisto.json'), $json, $utf8)
$js = "/* Generoitu: tools/rakenna-aineisto.ps1 – älä muokkaa käsin. Synteettinen aineisto (LUVN / Veil.AI). */`nwindow.RAI_DATA = $json;`n"
[IO.File]::WriteAllText((Join-Path $ROOT 'js\data.js'), $js, $utf8)
Write-Host ("Valmis: {0} asiakasta, {1} kt" -f $tulos.Count, [math]::Round($js.Length / 1024))
