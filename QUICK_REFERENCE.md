# ⚡ QUICK REFERENCE - Comandos y Atajos

Referencia rápida de comandos más usados en Planify QA v2.0.0

## 🚀 Iniciar la Aplicación

### PowerShell - Windows
```powershell
# Navegar a carpeta app
cd C:\Users\Mateo\OneDrive\Desktop\Cypress\cypress\e2e\Pruebas-Planify\app

# Instalar dependencias (primera vez)
npm install

# Iniciar servidor
npx vite --host 0.0.0.0 --port 5173

# Esperar mensaje:
# ➜  Local:   http://localhost:5173/
```

### Con archivo .bat (Más fácil)
```batch
REM Crear INICIAR.bat en carpeta app
@echo off
cd /d C:\Users\Mateo\OneDrive\Desktop\Cypress\cypress\e2e\Pruebas-Planify\app
npm install
npx vite --host 0.0.0.0 --port 5173

REM Luego: Click derecho → Run as administrator
```

## 🌐 Acceder a la App

| URL | Página |
|-----|--------|
| `http://localhost:5173/` | Dashboard |
| `http://localhost:5173/#/login` | Login |
| `http://localhost:5173/#/settings` | Settings |
| `http://localhost:5173/#/new-task` | Nueva Tarea |

## 👤 Credenciales de Prueba

```
Email: super@admin.com
Password: (cualquiera)

Email: manager@planify.com
Password: (cualquiera)

Email: dev@planify.com
Password: (cualquiera)
```

## 💾 Persistencia de Datos

### Guardar Backup Manualmente
```
Settings (⚙️) → Persistencia & Backup → Descargar Backup
```

### Restaurar Backup
```
Settings → Persistencia & Backup → Restaurar Backup → Seleccionar JSON
```

### Ubicación Datos en Navegador
```
F12 → Application → Local Storage → localhost:5173
Key: "planify_backup"
```

## 🎥 Agregar Evidencias a Tarea

```
1. New Assignment → Completar formulario
2. Scroll → "Evidencias de QA"
3. "Agregar Evidencia"
4. Seleccionar imagen/video/documento
5. Deploy Assignment
6. ✅ Guardado automáticamente
```

## npm - Comandos Útiles

```powershell
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
# o
npx vite --host 0.0.0.0 --port 5173

# Build producción
npm run build

# Preview build
npm run preview

# Ver versiones instaladas
npm list react
npm list vite
npm list typescript

# Actualizar dependencias
npm update

# Limpiar caché
npm cache clean --force
```

## 🔧 Troubleshooting Rápido

### Puerto ocupado
```powershell
# Ver proceso en puerto 5173
netstat -ano | findstr :5173

# Matar proceso
taskkill /PID <PID_NUMBER> /F

# O usar puerto diferente
npx vite --host 0.0.0.0 --port 5174
```

### Módulos no encontrados
```powershell
# Limpiar e reinstalar
rm -r node_modules
npm install
```

### Vite no compila
```powershell
# Limpiar caché Vite
rm -r .vite
rm -r dist

# Reiniciar Vite
npx vite --host 0.0.0.0 --port 5173
```

### Pantalla en blanco
```
1. F12 → Console → Ver errores
2. Ctrl+F5 (hard refresh)
3. Limpiar localStorage: F12 → Application → Clear
4. Reiniciar Vite
```

## 📁 Estructura Carpetas

```
cypress/
└── e2e/
    └── Pruebas-Planify/
        ├── Pruebas Planify.cy.js    ← Tests Cypress
        └── app/                      ← APLICACIÓN
            ├── components/           ← Componentes React
            ├── pages/               ← Páginas
            ├── services/            ← Servicios (persistencia, etc)
            ├── contexts/            ← Context API
            ├── index.html
            ├── index.tsx
            ├── package.json
            ├── vite.config.ts
            └── tsconfig.json
```

## 📝 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `services/persistenceService.ts` | Backup/restauración |
| `services/attachmentService.ts` | Gestión de archivos |
| `services/initializationService.ts` | Auto-restauración |
| `components/EvidenceManager.tsx` | Upload de evidencias |
| `pages/TaskForm.tsx` | Formulario tareas |
| `pages/Settings.tsx` | Panel backup |
| `types.ts` | Interfaces TypeScript |
| `contexts/AuthContext.tsx` | Autenticación |

## 🔍 Debugging

### Ver Console Navegador
```
F12 → Console

Ejemplo logs:
- "Initializing database..."
- "Loading backup..."
- "File uploaded: screenshot.png"
```

### Ver LocalStorage
```
F12 → Application → Local Storage → localhost:5173
```

### Ver Network
```
F12 → Network

(Nota: No hay requests, todo es local)
```

## 🎮 Atajos Útiles

| Tecla | Acción |
|-------|--------|
| `F12` | Abre developer tools |
| `Ctrl+F5` | Hard refresh (limpiar caché) |
| `Ctrl+Shift+C` | Inspect element |
| `Ctrl+J` | Abre console |
| `Ctrl+Shift+Delete` | Limpiar datos navegador |

## 📊 Ver Información App

### Stack Técnico Usado
```
React 19.2.3
TypeScript 5.8
Vite 6.2.0
React Router 7.12.0
Tailwind CSS
Heroicons
Recharts
```

### Versión Node.js Requerida
```powershell
node --version    # Debe ser 18+
npm --version     # Debe ser 9+
```

## 🚀 Para Publicar en GitHub

```powershell
# 1. Inicializar git (primera vez)
git init
git add .
git commit -m "Initial commit v2.0.0"

# 2. Crear repo en GitHub
# (https://github.com/new)

# 3. Conectar repo local con remoto
git remote add origin https://github.com/usuario/planify-qa.git
git branch -M main
git push -u origin main

# 4. Cambios futuros
git add .
git commit -m "Feature: descripción del cambio"
git push origin main
```

## 📚 Archivos Documentación

```
README.md              ← Lee primero
SETUP.md              ← Instrucciones instalación
CONTRIBUTING.md       ← Cómo contribuir
CHANGELOG.md          ← Cambios por versión
LICENSE               ← MIT License
RESUMEN_IMPLEMENTACION.md ← Este documento técnico
QUICK_REFERENCE.md    ← Esta guía rápida
```

## 🎯 Flujo de Trabajo Típico

```
1. npm install
2. npx vite --host 0.0.0.0 --port 5173
3. Abrir http://localhost:5173/
4. Login con super@admin.com
5. Crear proyecto
6. Crear tarea
7. Agregar evidencia
8. Guardar
9. Settings → Descargar Backup
10. Cerrar navegador
11. Reabrir → Datos persisten ✅
```

## 🧪 Verificar Todo Funciona

```powershell
# ✅ Node.js instalado
node --version

# ✅ npm instalado
npm --version

# ✅ Dependencias instaladas
cd cypress/e2e/Pruebas-Planify/app
dir | findstr node_modules

# ✅ Vite funciona
npx vite --host 0.0.0.0 --port 5173

# ✅ App carga
# Abrir http://localhost:5173/
```

## 💡 Tips Pro

### Recordar contraseñas
```
Como es mock API, cualquier contraseña funciona
Use emails que tenga sentido:
- super@admin.com (admin)
- manager@planify.com (manager)
- dev@planify.com (developer)
```

### Crear múltiples proyectos
```
Dashboard → Projects → New Project
Crear varios para probar
```

### Hacer pruebas de persistencia
```
1. Crear proyecto
2. Crear tarea
3. Agregar evidencia (imagen)
4. F12 → Application → LocalStorage → Ver backup
5. Ctrl+F5 (refresh)
6. Verificar datos aún existen
```

### Exportar datos
```
Settings → Descargar Backup
Obtiene archivo: planify-backup-YYYY-MM-DD.json
```

## 🆘 Si Nada Funciona

```powershell
# Nuclear option (reinicio total)
cd C:\Users\Mateo\OneDrive\Desktop\Cypress\cypress\e2e\Pruebas-Planify\app

# Limpiar todo
rm -r node_modules
rm -r .vite
rm -r dist
rm package-lock.json

# Reinstalar
npm install

# Iniciar
npx vite --host 0.0.0.0 --port 5173
```

## 📞 Soporte

- Abre issue en GitHub
- Incluye: OS, Node version, mensaje de error
- Describe qué intentaste hacer

---

**Última actualización:** 24 Enero 2026  
**Versión:** 2.0.0  
**Tiempo promedio setup:** 5-10 minutos
