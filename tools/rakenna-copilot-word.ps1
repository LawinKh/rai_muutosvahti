<#
  RAI Muutosvahti – Copilot Studio -tietopohja Word-muodossa
  ----------------------------------------------------------------
  Lähde:  data/copilot-tietopohja.json  (muodostetaan tools/copilot-vienti.html -sivulla)
  Tulos:  data/copilot-tietopohja.docx  (Copilot Studion tietolähteeksi)

  Rakenne on tehty hakua varten: Word-otsikot (Otsikko 1–3) jakavat asiakkaat ja roolit omiksi
  osioikseen, ja jokainen havaintorivi toistaa asiakkaan ja roolin, jotta yksittäinen haettu
  tekstikappale on ymmärrettävä ilman ympäröivää tekstiä.

  Ei vaadi Wordia eikä lisäkirjastoja (Open XML kirjoitetaan suoraan). Käyttö projektin juuresta:
    .\tools\rakenna-copilot-word.ps1
#>
$ErrorActionPreference = 'Stop'
$ROOT = Split-Path -Parent $PSScriptRoot
$lahde = Join-Path $ROOT 'data\copilot-tietopohja.json'
$tulos = Join-Path $ROOT 'data\copilot-tietopohja.docx'
$d = [IO.File]::ReadAllText($lahde, [Text.Encoding]::UTF8) | ConvertFrom-Json

function E($s) { [System.Net.WebUtility]::HtmlEncode([string]$s) }
function Pvm($s) { if (-not $s) { return '–' }; $o = ([string]$s).Substring(0, 10).Split('-'); '{0}.{1}.{2}' -f [int]$o[2], [int]$o[1], $o[0] }
$SYMBOLI = @{ 'Merkittävä kielteinen muutos' = '▲'; 'Seurattava muutos' = '◆'; 'Merkittävä myönteinen muutos' = '↑'; 'Ei muutoksia lähtötilanteeseen' = '='; 'Tiedoksi' = 'ⓘ' }
$ROOLI = [ordered]@{ hoitaja = 'Sairaanhoitajan'; laakari = 'Lääkärin'; ohjaaja = 'Asiakasohjaajan' }
function Maarat($n) {
  $h = @($n.havainnot)
  [pscustomobject]@{
    m = @($h | Where-Object { $_.taso -eq 'Merkittävä kielteinen muutos' }).Count
    s = @($h | Where-Object { $_.taso -eq 'Seurattava muutos' }).Count
    y = @($h | Where-Object { $_.taso -eq 'Merkittävä myönteinen muutos' }).Count
  }
}
function MaaraTeksti($q) { "▲ $($q.m) merkittävää kielteistä · ◆ $($q.s) seurattavaa · ↑ $($q.y) myönteistä" }

$sb = New-Object Text.StringBuilder
function W($s) { [void]$sb.AppendLine($s) }
function Lista($rivit) { if (@($rivit).Count) { W '<ul>'; foreach ($r in $rivit) { W "<li>$(E $r)</li>" }; W '</ul>' } }

W '<!doctype html><html lang="fi"><head><meta charset="utf-8"><title>RAI Muutosvahti – tietopohja</title>'
W '<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt} h1{color:#0f5566} h2{color:#0f5566;border-bottom:1px solid #cfd8d6} h3{color:#1a8197} table{border-collapse:collapse} td,th{border:1px solid #bfc9c6;padding:3pt 5pt;font-size:9.5pt;vertical-align:top} th{background:#e1eff2;text-align:left} .pieni{color:#555;font-size:9.5pt}</style></head><body>'

# --- johdanto
W '<h1>RAI Muutosvahti – tietopohja Copilot Studiolle</h1>'
W "<p>$(E $d.kuvaus)</p>"
W "<p><b>Tietosuoja:</b> $(E $d.tietosuoja)</p>"
W "<p><b>Käyttötarkoitus:</b> $(E $d.kayttotarkoitus)</p>"
W "<p><b>Viitepäivä (tänään):</b> $(Pvm $d.viitepaiva). <b>Aineistoversio:</b> $(E $d.versio.aineisto). <b>Sääntöversio:</b> $(E $d.versio.saannot). <b>Muodostettu:</b> $(Pvm $d.versio.muodostettu).</p>"
W '<h2>Näin tietopohjaa käytetään</h2>'
Lista @(
  'Jokaisesta asiakkaasta on kolme roolikohtaista näkymää: Sairaanhoitajan näkymä (RAI-seuranta-arvio), Lääkärin näkymä (Lääkärin vastaanotto) ja Asiakasohjaajan näkymä (Palvelutarpeen arviointi).',
  'Vastaa käyttäjälle vain hänen roolinsa näkymästä. Asiakasohjaajan näkymässä ei ole diagnooseja, lääkitystä eikä laboratoriotuloksia.',
  'Sairaanhoitajalla on hoitosuhde vain säännöllisen kotihoidon asiakkaisiin. Palveluasumisen asiakkaista sairaanhoitajan näkymää ei ole.',
  'Lähtötilanne tarkoittaa palvelutarpeen arviointia ja palvelupäätöstä. Aineistossa ei ole RAI-mittareita.',
  'Havainnot ovat tarkistettavia asioita, eivät diagnooseja tai päätöksiä. Ammattilainen arvioi ja päättää.'
)

# --- yleiset tiedot
W '<h1>Yleiset tiedot</h1>'
W '<h2>Tilat ja värit</h2><ul>'
foreach ($p in $d.tilat.PSObject.Properties) { if ($p.Name -ne 'huom') { W "<li><b>$(E $p.Name)</b> $(E $SYMBOLI[$p.Name]): $(E $p.Value)</li>" } }
W "</ul><p>$(E $d.tilat.huom)</p>"
W '<h2>Varmuus</h2><ul>'
foreach ($p in $d.varmuus.PSObject.Properties) { W "<li><b>$(E $p.Name)</b>: $(E $p.Value)</li>" }
W '</ul>'
W '<h2>Roolit ja käyttöoikeudet</h2>'
foreach ($p in $d.roolit.PSObject.Properties) {
  $r = $p.Value
  W "<h3>$(E $r.nimi)</h3>"
  W "<p>$(E $r.kuvaus). Arviointitilanteet: $(E (@($r.tilanteet) -join ', ')). Hoitosuhde: $(E $r.hoitosuhde).</p>"
  W "<p>Sallitut tiedot: $(E (@($r.sallitutTiedot) -join ', ')).$(if (@($r.eiSallitut).Count) { ' Ei sallittu: ' + (E (@($r.eiSallitut) -join ', ')) + '.' })</p>"
}
W "<h2>RAI-arvioinnin osa-alueet</h2><p>$(E (@($d.raiOsaAlueet) -join ' · '))</p>"
W '<h2>Agentin säännöt</h2>'
foreach ($s in $d.saannot) {
  W "<h3>Sääntö $(E $s.id): $(E $s.nimi)</h3>"
  W "<p><b>Osa-alue:</b> $(E $s.osaAlue). <b>Suunta:</b> $(E $s.suunta).</p>"
  W "<p><b>Peruste:</b> $(E $s.peruste)</p><p><b>Käytetyt tiedot:</b> $(E $s.tiedot)</p><p><b>Rajoitteet:</b> $(E $s.rajoitteet)</p>"
}
W '<h2>Rakenteiset kyselyt</h2>'
foreach ($l in $d.lomakkeet) {
  W "<h3>$(E $l.nimi)</h3><p>Pistemäärä $(E $l.pisteet). $(E $l.ohje) Tulkinta kuuluu ammattilaiselle.</p>"
  W '<ol>'; foreach ($q in $l.kysymykset) { W "<li>$(E ($q -replace '^\d+\s*\.\s*', ''))</li>" }; W '</ol>'
}

# --- asiakasyhteenveto ja tarkistamisjärjestys
W '<h1>Asiakasyhteenveto</h1>'
W '<table><tr><th>Asiakas</th><th>Ikä, palvelu, kunta</th><th>Lähtötilanne</th><th>RAI-seuranta-arvio</th><th>Sairaanhoitajan näkymä</th><th>Lääkärin näkymä</th><th>Asiakasohjaajan näkymä</th></tr>'
foreach ($a in $d.asiakkaat) {
  $solu = { param($k) if ($k -eq 'hoitaja' -and -not $a.hoitosuhde.sairaanhoitaja) { 'Ei hoitosuhdetta' } else { $n = $a.nakymat.$k; $q = Maarat $n; "$($n.tila) ($(MaaraTeksti $q))" } }
  W "<tr><td><b>$(E $a.asiakas)</b></td><td>$($a.ika) v, $(E $a.sukupuoli), $(E $a.palvelu), $(E $a.kotikunta)</td><td>$(Pvm $a.lahtotilanne.pvm)</td><td>$(E $a.raiSeuranta.tila) (määräpäivä $(Pvm $a.raiSeuranta.erapaiva))</td><td>$(E (& $solu 'hoitaja'))</td><td>$(E (& $solu 'laakari'))</td><td>$(E (& $solu 'ohjaaja'))</td></tr>"
}
W '</table>'
W '<h2>Tarkistamisjärjestys roolettain</h2><p>Järjestys: eniten merkittäviä kielteisiä muutoksia ensin, sitten seurattavia, sitten myönteisiä. Järjestys ei ole riskiluokitus.</p>'
foreach ($k in $ROOLI.Keys) {
  $rivit = $d.asiakkaat | Where-Object { $k -ne 'hoitaja' -or $_.hoitosuhde.sairaanhoitaja } | ForEach-Object { [pscustomobject]@{ a = $_; q = (Maarat $_.nakymat.$k) } } |
    Sort-Object @{ Expression = { $_.q.m }; Descending = $true }, @{ Expression = { $_.q.s }; Descending = $true }, @{ Expression = { $_.q.y }; Descending = $true }, @{ Expression = { $_.a.asiakas } }
  W "<h3>$($ROOLI[$k]) tarkistamisjärjestys</h3><ol>"
  foreach ($r in $rivit) { W "<li>$(E $r.a.asiakas): $(E $r.a.nakymat.$k.tila) – $(E (MaaraTeksti $r.q))</li>" }
  W '</ol>'
}
W '<h2>RAI-seuranta-arviot myöhässä</h2><ul>'
foreach ($a in ($d.asiakkaat | Where-Object { $_.raiSeuranta.jaljellaVrk -lt 0 } | Sort-Object { $_.raiSeuranta.jaljellaVrk })) { W "<li>$(E $a.asiakas): RAI-seuranta-arvio $(E $a.raiSeuranta.tila) (määräpäivä $(Pvm $a.raiSeuranta.erapaiva), lähtötilanne $(Pvm $a.lahtotilanne.pvm))</li>" }
W '</ul>'

# --- asiakkaat
W '<h1>Asiakkaat</h1>'
foreach ($a in $d.asiakkaat) {
  $nm = $a.asiakas
  W "<h2>$(E $nm)</h2>"
  W "<p><b>$(E $nm)</b>: $($a.ika)-vuotias $(E $a.sukupuoli), $(E $a.kotikunta), asiointikieli $(E $a.asiointikieli). Palvelu: $(E $a.palvelu). Tunniste $(E $a.tunniste) (synteettinen).</p>"
  W "<p><b>$(E $nm) – lähtötilanne:</b> $(E $a.lahtotilanne.kuvaus) $(Pvm $a.lahtotilanne.pvm). Tuen tarve: $(E (@($a.lahtotilanne.tuenTarve) -join '; ')).$(if ($a.lahtotilanne.muisti) { ' Muistiin liittyvä tuen tarve: ' + (E $a.lahtotilanne.muisti) + '.' })</p>"
  W "<p><b>$(E $nm) – RAI-seuranta-arvio:</b> $(E $a.raiSeuranta.tila), määräpäivä $(Pvm $a.raiSeuranta.erapaiva).</p>"
  W "<p><b>$(E $nm) – hoitosuhde:</b> sairaanhoitaja $(if ($a.hoitosuhde.sairaanhoitaja) { 'kyllä' } else { 'ei (palveluasumisen asiakas)' }), lääkäri kyllä, asiakasohjaaja kyllä.</p>"
  foreach ($k in $ROOLI.Keys) {
    $n = $a.nakymat.$k
    $otsikko = "$nm – $($ROOLI[$k]) näkymä ($($n.arviointitilanne))"
    W "<h3>$(E $otsikko)</h3>"
    if ($k -eq 'hoitaja' -and -not $a.hoitosuhde.sairaanhoitaja) { W "<p>$(E $nm): sairaanhoitajalla ei ole hoitosuhdetta tähän asiakkaaseen, joten sairaanhoitajan näkymää ei ole.</p>"; continue }
    $q = Maarat $n
    W "<p><b>$(E $nm), $($ROOLI[$k].ToLower()) näkymä – tila:</b> $(E $SYMBOLI[$n.tila]) $(E $n.tila) ($(E (MaaraTeksti $q))).</p>"
    W "<p><b>Tilannekuva:</b> $(E $n.tilannekuva)</p>"
    if ($k -eq 'ohjaaja') { W "<p class=`"pieni`">Asiakasohjaajan näkymässä ei ole diagnooseja, lääkitystä eikä laboratoriotuloksia (käyttötarkoitussidonnaisuus).</p>" }
    if (@($n.havainnot).Count) {
      W "<p><b>Havainnot ($(E $nm), $($ROOLI[$k].ToLower()) näkymä):</b></p>"
      foreach ($h in $n.havainnot) {
        W "<p><b>$(E $SYMBOLI[$h.taso]) $(E $h.otsikko)</b> – $(E $nm), $($ROOLI[$k].ToLower()) näkymä. Taso: $(E $h.taso). Osa-alue: $(E $h.osaAlue). Havaittu $(Pvm $h.havaittu). Varmuus: $(E $h.varmuus). Sääntö $(E $h.saanto).</p>"
        W '<ul>'
        W "<li><b>Mitä on mahdollisesti muuttunut:</b> $(E $h.mitaMuuttui)</li>"
        W "<li><b>Miksi tarkistaa:</b> $(E $h.perustelu)</li>"
        W "<li><b>Lähteet:</b> $(E ((@($h.lahteet) | ForEach-Object { "$(Pvm $_.pvm) $($_.jarjestelma): $($_.ote)" }) -join ' | '))</li>"
        if (@($h.vastanaytto).Count) { W "<li><b>Vastanäyttö:</b> $(E ((@($h.vastanaytto) | ForEach-Object { "$(Pvm $_.pvm) $($_.jarjestelma): $($_.ote)" }) -join ' | '))</li>" }
        if (@($h.tarkistettavat).Count) { W "<li><b>Tarkista:</b> $(E (@($h.tarkistettavat) -join ' '))</li>" }
        if (@($h.ehdotukset).Count) { W "<li><b>Ehdotetut jatkoaskeleet:</b> $(E (@($h.ehdotukset) -join '; '))</li>" }
        W '</ul>'
      }
    } else { W "<p>$(E $nm): ei havaintoja tässä näkymässä.</p>" }
    W "<p><b>RAI-osa-alueet ($(E $nm), $($ROOLI[$k].ToLower()) näkymä):</b></p><ul>"
    foreach ($o in $n.osaAlueet) {
      $lt = if (@($o.lahtotilanne).Count) { @($o.lahtotilanne) -join ' ' } else { 'Ei kirjauksia.' }
      $jl = if (@($o.lahtotilanteenJalkeen).Count) { @($o.lahtotilanteenJalkeen) -join ' ' } else { 'Ei uusia kirjauksia.' }
      W "<li><b>$(E $o.nimi):</b> Lähtötilanne: $(E $lt) Lähtötilanteen jälkeen: $(E $jl)</li>"
    }
    W '</ul>'
    if (@($n.valmistauduKohtaamiseen).Count) { W "<p><b>Valmistaudu kohtaamiseen ($(E $nm), $($ROOLI[$k].ToLower()) näkymä):</b></p>"; Lista $n.valmistauduKohtaamiseen }
  }
}
W '<p class="pieni">Ammattilainen arvioi tietojen merkityksen ja päättää jatkotoimista. Kaikki tiedot ovat synteettisiä.</p>'
W '</body></html>'

# --- HTML-välimuoto → WordprocessingML (.docx) ilman Wordia tai lisäkirjastoja
function X($s) { [Security.SecurityElement]::Escape([string]$s) }
function Ajot($sisalto) {
  # sisältö voi sisältää <b>...</b>; muut tagit poistetaan, entiteetit puretaan
  $out = New-Object Text.StringBuilder
  foreach ($osa in [regex]::Split($sisalto, '(<b>.*?</b>)')) {
    if (-not $osa) { continue }
    $lihava = $osa -match '^<b>'
    $teksti = [System.Net.WebUtility]::HtmlDecode(($osa -replace '<[^>]+>', ''))
    if (-not $teksti) { continue }
    [void]$out.Append("<w:r>$(if ($lihava) { '<w:rPr><w:b/></w:rPr>' })<w:t xml:space=`"preserve`">$(X $teksti)</w:t></w:r>")
  }
  $out.ToString()
}
$TYYLI = @{ h1 = 'Heading1'; h2 = 'Heading2'; h3 = 'Heading3' }
$body = New-Object Text.StringBuilder
$lista = $null; $numerointi = New-Object Collections.ArrayList; $taulu = $null
$runko = [regex]::Match($sb.ToString(), '(?s)<body>(.*)</body>').Groups[1].Value
foreach ($m in [regex]::Matches($runko, '(?s)<(h[1-3]|p|li|tr)([^>]*)>(.*?)</\1>|<(/?)(ul|ol|table)>')) {
  if ($m.Groups[5].Success) {
    $tag = $m.Groups[5].Value; $loppu = $m.Groups[4].Value -eq '/'
    if ($tag -eq 'table') {
      if (-not $loppu) { $taulu = New-Object Collections.ArrayList }
      else {
        $sarakkeet = ($taulu | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
        $lev = [int](9638 / $sarakkeet)
        $grid = '<w:gridCol w:w="{0}"/>' -f $lev
        $grid = $grid * $sarakkeet
        [void]$body.Append(("<w:tbl><w:tblPr><w:tblStyle w:val=""TableGrid""/><w:tblW w:w=""{0}"" w:type=""dxa""/><w:tblLayout w:type=""fixed""/></w:tblPr><w:tblGrid>{1}</w:tblGrid>" -f ($lev * $sarakkeet), $grid))
        $eka = $true
        foreach ($rivi in $taulu) {
          [void]$body.Append('<w:tr>' + $(if ($eka) { '<w:trPr><w:tblHeader/></w:trPr>' }))
          foreach ($c in $rivi) { [void]$body.Append("<w:tc><w:tcPr><w:tcW w:w=`"$lev`" w:type=`"dxa`"/>$(if ($eka) { '<w:shd w:val="clear" w:color="auto" w:fill="E1EFF2"/>' })</w:tcPr><w:p><w:pPr><w:spacing w:after=`"0`"/><w:rPr><w:sz w:val=`"18`"/></w:rPr></w:pPr>$((Ajot $c) -replace '<w:r>', '<w:r><w:rPr><w:sz w:val="18"/></w:rPr>' -replace '<w:rPr><w:sz w:val="18"/></w:rPr><w:rPr><w:b/></w:rPr>', '<w:rPr><w:b/><w:sz w:val="18"/></w:rPr>')</w:p></w:tc>") }
          [void]$body.Append('</w:tr>'); $eka = $false
        }
        [void]$body.Append('</w:tbl><w:p/>'); $taulu = $null
      }
    } elseif ($loppu) { $lista = $null }
    elseif ($tag -eq 'ul') { $lista = 1 }
    else { [void]$numerointi.Add($numerointi.Count + 3); $lista = $numerointi.Count + 2 }
    continue
  }
  $tag = $m.Groups[1].Value; $attr = $m.Groups[2].Value; $sis = $m.Groups[3].Value
  switch -regex ($tag) {
    '^h[1-3]$' { [void]$body.Append("<w:p><w:pPr><w:pStyle w:val=`"$($TYYLI[$tag])`"/></w:pPr>$(Ajot $sis)</w:p>") }
    '^p$' { [void]$body.Append("<w:p>$(if ($attr -match 'pieni') { '<w:pPr><w:rPr><w:color w:val="555555"/><w:sz w:val="19"/></w:rPr></w:pPr>' })$(Ajot $sis)</w:p>") }
    '^li$' { [void]$body.Append("<w:p><w:pPr><w:pStyle w:val=`"ListParagraph`"/><w:numPr><w:ilvl w:val=`"0`"/><w:numId w:val=`"$lista`"/></w:numPr></w:pPr>$(Ajot $sis)</w:p>") }
    '^tr$' { [void]$taulu.Add(@([regex]::Matches($sis, '(?s)<t[hd]>(.*?)</t[hd]>') | ForEach-Object { $_.Groups[1].Value })) }
  }
}

$W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
$document = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><w:document $W><w:body>$($body.ToString())<w:sectPr><w:pgSz w:w=`"11906`" w:h=`"16838`"/><w:pgMar w:top=`"1134`" w:right=`"1134`" w:bottom=`"1134`" w:left=`"1134`" w:header=`"709`" w:footer=`"709`" w:gutter=`"0`"/></w:sectPr></w:body></w:document>"
$otsikko = { param($id, $nimi, $koko, $taso, $vari) "<w:style w:type=`"paragraph`" w:styleId=`"$id`"><w:name w:val=`"$nimi`"/><w:basedOn w:val=`"Normal`"/><w:next w:val=`"Normal`"/><w:uiPriority w:val=`"9`"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before=`"$(360 - 80 * $taso)`" w:after=`"120`"/><w:outlineLvl w:val=`"$taso`"/></w:pPr><w:rPr><w:rFonts w:ascii=`"Calibri`" w:hAnsi=`"Calibri`"/><w:b/><w:color w:val=`"$vari`"/><w:sz w:val=`"$koko`"/></w:rPr></w:style>" }
$styles = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><w:styles $W><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii=`"Calibri`" w:hAnsi=`"Calibri`" w:eastAsia=`"Calibri`" w:cs=`"Calibri`"/><w:sz w:val=`"22`"/><w:lang w:val=`"fi-FI`"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after=`"120`" w:line=`"264`" w:lineRule=`"auto`"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type=`"paragraph`" w:default=`"1`" w:styleId=`"Normal`"><w:name w:val=`"Normal`"/><w:qFormat/></w:style>$(& $otsikko 'Heading1' 'heading 1' 34 0 '0F5566')$(& $otsikko 'Heading2' 'heading 2' 28 1 '0F5566')$(& $otsikko 'Heading3' 'heading 3' 24 2 '1A8197')<w:style w:type=`"paragraph`" w:styleId=`"ListParagraph`"><w:name w:val=`"List Paragraph`"/><w:basedOn w:val=`"Normal`"/><w:pPr><w:spacing w:after=`"60`"/><w:ind w:left=`"720`"/></w:pPr></w:style><w:style w:type=`"table`" w:styleId=`"TableGrid`"><w:name w:val=`"Table Grid`"/><w:tblPr><w:tblBorders><w:top w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/><w:left w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/><w:bottom w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/><w:right w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/><w:insideH w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/><w:insideV w:val=`"single`" w:sz=`"4`" w:color=`"BFC9C6`"/></w:tblBorders><w:tblCellMar><w:left w:w=`"80`" w:type=`"dxa`"/><w:right w:w=`"80`" w:type=`"dxa`"/></w:tblCellMar></w:tblPr></w:style></w:styles>"
$abstrakti = { param($id, $muoto, $teksti) "<w:abstractNum w:abstractNumId=`"$id`"><w:multiLevelType w:val=`"singleLevel`"/><w:lvl w:ilvl=`"0`"><w:start w:val=`"1`"/><w:numFmt w:val=`"$muoto`"/><w:lvlText w:val=`"$teksti`"/><w:lvlJc w:val=`"left`"/><w:pPr><w:ind w:left=`"720`" w:hanging=`"360`"/></w:pPr>$(if ($muoto -eq 'bullet') { '<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr>' })</w:lvl></w:abstractNum>" }
$numItems = '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>' + (($numerointi | ForEach-Object { "<w:num w:numId=`"$_`"><w:abstractNumId w:val=`"1`"/><w:lvlOverride w:ilvl=`"0`"><w:startOverride w:val=`"1`"/></w:lvlOverride></w:num>" }) -join '')
$numbering = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><w:numbering $W>$(& $abstrakti 0 'bullet' ([string][char]0xF0B7))$(& $abstrakti 1 'decimal' '%1.')$numItems</w:numbering>"
$contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'
$rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'
$docRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>'
$core = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><cp:coreProperties xmlns:cp=`"http://schemas.openxmlformats.org/package/2006/metadata/core-properties`" xmlns:dc=`"http://purl.org/dc/elements/1.1/`" xmlns:dcterms=`"http://purl.org/dc/terms/`" xmlns:xsi=`"http://www.w3.org/2001/XMLSchema-instance`"><dc:title>RAI Muutosvahti – tietopohja Copilot Studiolle</dc:title><dc:language>fi-FI</dc:language><dc:description>Synteettinen aineisto (LUVN / Veil.AI). Muodostettu tiedostosta data/copilot-tietopohja.json.</dc:description><dcterms:created xsi:type=`"dcterms:W3CDTF`">$((Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))</dcterms:created></cp:coreProperties>"

Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
if (Test-Path $tulos) { Remove-Item $tulos }
$zip = [IO.Compression.ZipFile]::Open($tulos, 'Create')
try {
  $utf8 = New-Object Text.UTF8Encoding $false
  foreach ($osa in @(@('[Content_Types].xml', $contentTypes), @('_rels/.rels', $rels), @('word/document.xml', $document), @('word/styles.xml', $styles), @('word/numbering.xml', $numbering), @('word/_rels/document.xml.rels', $docRels), @('docProps/core.xml', $core))) {
    $e = $zip.CreateEntry($osa[0], 'Optimal')
    $w = New-Object IO.StreamWriter($e.Open(), $utf8); $w.Write($osa[1]); $w.Close()
  }
} finally { $zip.Dispose() }
Write-Host ("Valmis: {0} ({1} kt)" -f $tulos, [math]::Round((Get-Item $tulos).Length / 1024))