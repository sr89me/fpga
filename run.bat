@echo off
title FPGA Tang Nano 9K - App Server Launcher
echo ========================================================
echo   CHAY UNG DUNG THUC HANH LAP TRINH FPGA TANG NANO 9K
echo ========================================================
echo.
start index.html
python -m http.server 5000
pause
