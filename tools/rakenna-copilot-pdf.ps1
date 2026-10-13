# RAI Muutosvahti – Copilot Studio -tietopohja PDF-muodossa
# Ajo projektin juuresta (aja ensin tools/rakenna-copilot-md.js ja tools/rakenna-copilot-word-md.js):
#   powershell -ExecutionPolicy Bypass -File tools/rakenna-copilot-pdf.ps1
# Muuntaa Wordilla jokaisen data/copilot-tietopohja*.docx- ja data/copilot-asiakkaat/*.docx-tiedoston
# samannimiseksi PDF-tiedostoksi samaan kansioon. Vaatii Microsoft Wordin.
# Otsikot viedään PDF:n kirjanmerkeiksi ja rakennetunnisteiksi, jotta teksti ja rakenne säilyvät haussa.

$ErrorActionPreference = "Stop"
$juuri = Split-Path -Parent $PSScriptRoot
$tiedostot = @(Get-ChildItem (Join-Path $juuri "data") -Filter "copilot-tietopohja*.docx") +
             @(Get-ChildItem (Join-Path $juuri "data\copilot-asiakkaat") -Filter "*.docx")

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  Write-Output "Kirjoitettu:"
  foreach ($f in $tiedostot) {
    $pdf = [IO.Path]::ChangeExtension($f.FullName, ".pdf")
    $doc = $word.Documents.Open($f.FullName, $false, $true)
    try {
      # 17 = wdExportFormatPDF, 0 = tulostuslaatu, 0 = koko asiakirja, 0 = vain sisältö,
      # 1 = kirjanmerkit otsikoista; rakennetunnisteet päälle (DocStructureTags)
      $doc.ExportAsFixedFormat($pdf, 17, $false, 0, 0, 1, 1, 0, $true, $true, 1, $true, $true, $false)
    } finally { $doc.Close($false) }
    $kt = [math]::Round((Get-Item $pdf).Length / 1KB)
    Write-Output "  $($pdf.Substring($juuri.Length + 1).Replace('\', '/')) ($kt kt)"
  }
} finally {
  $word.Quit()
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word)
}
