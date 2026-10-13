@echo off
rem RAI Muutosvahti - avaa demo Edgen sovellustilassa (ei osoiterivia, toimii ilman verkkoa)
set "SIVU=%~dp0index.html"
start "" msedge --app="file:///%SIVU:\=/%" --window-size=1400,900
