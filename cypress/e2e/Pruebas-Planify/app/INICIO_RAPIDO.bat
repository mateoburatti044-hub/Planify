@echo off
REM GUÍA RÁPIDA DE INICIO - PLANIFY (Windows)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                   PLANIFY - GUIA RAPIDA                        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🎯 PASO 1: Ir a la carpeta de la app
echo ───────────────────────────────────────
echo cd cypress\e2e\Pruebas-Planify\app
echo.
echo 📦 PASO 2: Instalar dependencias
echo ───────────────────────────────────────
echo npm install
echo.
echo 🚀 PASO 3: Ejecutar la aplicación
echo ───────────────────────────────────────
echo npm run dev
echo Abrira en: http://localhost:5173
echo.
echo 🧪 PASO 4: Ejecutar tests de Cypress
echo ───────────────────────────────────────
echo npx cypress open
echo Selecciona: 'Pruebas Planify.cy.js'
echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo 📁 ARCHIVOS IMPORTANTES:
echo.
echo 1. api.js
echo    └─ Servicio de API Mock (sin backend real)
echo.
echo 2. database.js
echo    └─ Almacenamiento local con IndexedDB
echo.
echo 3. types.js
echo    └─ Constantes de roles y permisos
echo.
echo 4. README_JAVASCRIPT.md
echo    └─ Documentacion completa
echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo CARACTERISTICAS:
echo ───────────────────────────────────────
echo ✅ Sin backend real (usa IndexedDB)
echo ✅ Codigo 100%% JavaScript
echo ✅ Almacenamiento persistente
echo ✅ Tests listos para ejecutar
echo.
echo DATOS EN INDEXEDDB:
echo ───────────────────────────────────────
echo - users:        Informacion de usuarios
echo - projects:     Informacion de proyectos
echo - tasks:        Informacion de tareas
echo - notifications: Notificaciones del sistema
echo.
echo Los datos persisten entre sesiones del navegador
echo.
pause
