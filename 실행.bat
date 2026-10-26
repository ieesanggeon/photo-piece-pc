@echo off
chcp 65001 > nul
cd /d "%~dp0"

where node > nul 2>&1
if %errorlevel%==0 (
  start "사진조각 서버" /min cmd /c "node server.js"
  timeout /t 2 /nobreak > nul
  start "" "http://localhost:8080"
  exit /b 0
)

python --version > nul 2>&1
if %errorlevel%==0 (
  start "사진조각 서버" /min cmd /c "python -m http.server 8080"
  timeout /t 2 /nobreak > nul
  start "" "http://localhost:8080"
  exit /b 0
)

echo Node.js 또는 Python을 찾지 못했습니다.
echo index.html을 직접 엽니다.
start "" "index.html"
