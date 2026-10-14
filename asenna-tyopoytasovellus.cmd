@echo off
rem RAI Muutosvahti - asenna tyopoytasovellukseksi (pikakuvake tyopoydalle ja Kaynnista-valikkoon)
rem Poisto: asenna-tyopoytasovellus.cmd -Poista
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\asenna-tyopoytasovellus.ps1" %*
pause
