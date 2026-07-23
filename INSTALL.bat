@echo off
echo ============================================
echo BudgetCart Installation Script
echo ============================================
echo.

echo Step 1: Checking Node and NPM versions...
node --version
npm --version
echo.

echo Step 2: Installing dependencies...
echo This may take 5-10 minutes depending on your internet speed
echo Please wait...
echo.

npm install --loglevel=verbose

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Installation failed! Trying alternative method...
    echo.
    npm install --legacy-peer-deps
)

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
