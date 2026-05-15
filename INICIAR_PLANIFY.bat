@echo off
REM =====================================================
REM   PLANIFY QA - INICIAR APLICACION
REM   Versión 2.0.0 - 24 Enero 2026
REM =====================================================

cls
title PLANIFY QA - Starting...

echo.
echo ======================================================
echo            PLANIFY QA v2.0.0 - INICIANDO
echo ======================================================
echo.

REM Cambiar a directorio correcto
cd /d "%~dp0cypress\e2e\Pruebas-Planify\app"

echo.
echo Directorio: %cd%
echo.

REM Verificar que Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js no está instalado o no está en PATH
    echo Descarga Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detectado
node --version

echo.
echo ======================================================
echo Instalando dependencias (si es necesario)...
echo ======================================================
echo.

REM Instalar si no existen node_modules
if not exist "node_modules" (
    echo Ejecutando: npm install
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Fallo en npm install
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ======================================================
echo Iniciando servidor Vite...
echo ======================================================
echo.

echo.
echo     PLANIFY QA está iniciando...
echo.
echo     URL: http://localhost:5173/
echo.
echo     Una vez que veas el mensaje:
echo     "➜  Local:   http://localhost:5173/"
echo.
echo     Abre tu navegador en esa URL
echo.
echo ======================================================
echo.

REM Iniciar Vite
call npx vite --host 0.0.0.0 --port 5173

REM Si llega aquí, fue cancelado
echo.
echo Planify QA fue detenido.
echo.
pause
