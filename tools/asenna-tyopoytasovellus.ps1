# RAI Muutosvahti – asennus työpöytäsovellukseksi (Edgen sovellustila, ei asennettavia ohjelmia)
# Ajo: kaksoisnapsauta projektin juuressa asenna-tyopoytasovellus.cmd, tai
#   powershell -ExecutionPolicy Bypass -File tools/asenna-tyopoytasovellus.ps1          (asenna)
#   powershell -ExecutionPolicy Bypass -File tools/asenna-tyopoytasovellus.ps1 -Poista  (poista pikakuvakkeet)
# Luo työpöydälle ja Käynnistä-valikkoon pikakuvakkeen "RAI Muutosvahti", joka avaa sovelluksen omaan
# ikkunaansa ilman osoiteriviä (kuten kaynnista-sovellustilassa.cmd). Sovellus toimii ilman verkkoyhteyttä.
# Jos projektikansio siirretään, aja skripti uudelleen.

param([switch]$Poista)

$ErrorActionPreference = "Stop"
$juuri = Split-Path -Parent $PSScriptRoot
$nimi = "RAI Muutosvahti"
$kohteet = @(
  (Join-Path ([Environment]::GetFolderPath("Desktop")) "$nimi.lnk"),
  (Join-Path ([Environment]::GetFolderPath("Programs")) "$nimi.lnk")
)

if ($Poista) {
  foreach ($k in $kohteet) { if (Test-Path $k) { Remove-Item $k; Write-Host "Poistettu: $k" } }
  return
}

# ---------- Edge ----------
$edge = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe" -ErrorAction SilentlyContinue).'(default)'
if (-not $edge -or -not (Test-Path $edge)) {
  $edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
    Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $edge) { throw "Microsoft Edgeä ei löytynyt." }

# ---------- kuvake (sama tunnus kuin sovelluksen välilehtikuvakkeessa) ----------
$ikoni = Join-Path $juuri "rai-muutosvahti.ico"
if (-not (Test-Path $ikoni)) {
  Add-Type -AssemblyName System.Drawing
  $kuvat = foreach ($koko in 256, 48, 32, 16) {
    $bmp = New-Object System.Drawing.Bitmap $koko, $koko
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $s = $koko / 32
    # pyöristetty neliö (rx 8 / 32)
    $r = 16 * $s; $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p.AddArc(0, 0, $r, $r, 180, 90); $p.AddArc($koko - $r - 1, 0, $r, $r, 270, 90)
    $p.AddArc($koko - $r - 1, $koko - $r - 1, $r, $r, 0, 90); $p.AddArc(0, $koko - $r - 1, $r, $r, 90, 90); $p.CloseFigure()
    $g.FillPath((New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#0f5566"))), $p)
    # sykekäyrä: M5 18 h6 l3-8 4 13 3-7 h6
    $kyna = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), ([Math]::Max(1.2, 2.6 * $s))
    $kyna.StartCap = $kyna.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $kyna.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $pisteet = @(@(5, 18), @(11, 18), @(14, 10), @(18, 23), @(21, 16), @(27, 16)) | ForEach-Object { New-Object System.Drawing.PointF ($_[0] * $s), ($_[1] * $s) }
    $g.DrawLines($kyna, [System.Drawing.PointF[]]$pisteet)
    $g.Dispose()
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
    , @($koko, $ms.ToArray())
  }
  # ICO-tiedosto, jossa PNG-kuvat (Windows Vista ja uudemmat)
  $ulos = New-Object System.IO.MemoryStream
  $w = New-Object System.IO.BinaryWriter $ulos
  $w.Write([UInt16]0); $w.Write([UInt16]1); $w.Write([UInt16]$kuvat.Count)
  $siirto = 6 + 16 * $kuvat.Count
  foreach ($k in $kuvat) {
    $w.Write([byte]($k[0] % 256)); $w.Write([byte]($k[0] % 256)); $w.Write([byte]0); $w.Write([byte]0)
    $w.Write([UInt16]1); $w.Write([UInt16]32); $w.Write([UInt32]$k[1].Length); $w.Write([UInt32]$siirto)
    $siirto += $k[1].Length
  }
  foreach ($k in $kuvat) { $w.Write([byte[]]$k[1]) }
  [IO.File]::WriteAllBytes($ikoni, $ulos.ToArray())
  Write-Host "Kuvake luotu: $ikoni"
}

# ---------- pikakuvakkeet ----------
$sivu = ([Uri](Join-Path $juuri "index.html")).AbsoluteUri
$shell = New-Object -ComObject WScript.Shell
foreach ($k in $kohteet) {
  $lnk = $shell.CreateShortcut($k)
  $lnk.TargetPath = $edge
  $lnk.Arguments = "--app=`"$sivu`" --window-size=1400,900"
  $lnk.WorkingDirectory = $juuri
  $lnk.IconLocation = "$ikoni,0"
  $lnk.Description = "RAI Muutosvahti – esitietojen koonti ikääntyneiden palveluihin (synteettinen aineisto)"
  $lnk.Save()
  Write-Host "Luotu: $k"
}
Write-Host "Valmis. Käynnistä sovellus työpöydän tai Käynnistä-valikon kuvakkeesta '$nimi'."
