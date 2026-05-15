# 🚀 INSTALACIÓN Y SETUP - Planify QA

Guía rápida para instalar y ejecutar Planify QA en tu máquina local.

## 📋 Requisitos Previos

### Hardware Mínimo
- Procesador: 2GHz (cualquiera)
- RAM: 4GB mínimo (8GB recomendado)
- Espacio disco: 500MB libres
- Conexión internet: Requerida (solo para npm install)

### Software Requerido

| Software | Versión | Descarga |
|----------|---------|----------|
| **Node.js** | 18+ | https://nodejs.org/ |
| **npm** | 9+ | Incluido con Node.js |
| **Git** | (opcional) | https://git-scm.com |
| **Navegador** | Moderno | Chrome, Firefox, Edge, Safari |

## 🔍 Verificar Instalación

```powershell
# Verificar Node.js
node --version
# Debe mostrar v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar 9.x.x o superior
```

## 📥 Opción 1: Clonar desde GitHub (Recomendado)

```powershell
# 1. Abrir PowerShell en una carpeta de tu elección
cd $env:USERPROFILE\Desktop

# 2. Clonar repositorio
git clone https://github.com/tu-usuario/planify-qa.git
cd planify-qa

# 3. Ir a la carpeta de la aplicación
cd cypress/e2e/Pruebas-Planify/app

# 4. Instalar dependencias
npm install

# 5. Iniciar servidor
npx vite --host 0.0.0.0 --port 5173
```

## 📂 Opción 2: Usando Archivo ZIP

```powershell
# 1. Descargar ZIP de GitHub
# Botón "Code" → "Download ZIP"
# Guardar en: C:\Users\TuUsuario\Desktop

# 2. Extraer archivo
# Click derecho → "Extract All"

# 3. Abrir PowerShell en la carpeta extraída
cd planify-qa-main

# 4. Navegar a app
cd cypress/e2e/Pruebas-Planify/app

# 5. Instalar y ejecutar
npm install
npx vite --host 0.0.0.0 --port 5173
```

## 🚀 Iniciar la Aplicación

### Método 1: Desde PowerShell (Windows)

```powershell
# Navegar a carpeta correcta
cd C:\Users\TuUsuario\Desktop\planify-qa\cypress\e2e\Pruebas-Planify\app

# Ver si node_modules existe
dir | findstr node_modules

# Si NO existe:
npm install

# Iniciar Vite
npx vite --host 0.0.0.0 --port 5173
```

### Método 2: Crear Archivo .bat (Más fácil)

Crear archivo `INICIAR_PLANIFY.bat` en carpeta app:

```batch
@echo off
echo Iniciando Planify QA...
cls
echo.
echo ========================================
echo        PLANIFY QA - INICIANDO
echo ========================================
echo.
echo Instalando dependencias (si es necesario)...
npm install

echo.
echo Iniciando servidor en http://localhost:5173
echo.
npx vite --host 0.0.0.0 --port 5173
```

Luego: Click derecho → "Run as administrator"

### Método 3: Usando npm scripts

```powershell
# Si tienes scripts en package.json
npm run dev
# o
npm start
```

## 🌐 Acceder a la Aplicación

Una vez que Vite muestre:

```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

**Abrir navegador:**
```
http://localhost:5173/
```

O haz click en el enlace que muestra Vite en la consola.

## 🔐 Credenciales de Prueba

### Usuario Admin
```
Email: super@admin.com
Password: (cualquiera)
```

### Usuario Manager
```
Email: manager@planify.com
Password: (cualquiera)
```

### Usuario Developer
```
Email: dev@planify.com
Password: (cualquiera)
```

**Nota:** El sistema mock acepta cualquier contraseña.

## 📁 Estructura de Carpetas

```
planify-qa/                          (carpeta raíz)
├── README.md                        ← Lee esto primero
├── CHANGELOG.md                     ← Cambios por versión
├── CONTRIBUTING.md                  ← Cómo contribuir
├── LICENSE                          ← Licencia MIT
│
└── cypress/
    └── e2e/
        └── Pruebas-Planify/
            └── app/                 ← LA APLICACIÓN ESTÁ AQUÍ
                ├── src/             ← Código React
                ├── components/      ← Componentes
                ├── pages/           ← Páginas
                ├── services/        ← Servicios (persistencia, etc)
                ├── contexts/        ← Context API
                │
                ├── package.json     ← Dependencias
                ├── tsconfig.json    ← TypeScript config
                ├── vite.config.ts   ← Vite config
                ├── index.html       ← HTML principal
                ├── index.tsx        ← React entry point
                └── index.css        ← Estilos globales
```

## ✅ Verificar que Está Funcionando

1. **Abre la aplicación en navegador**
   ```
   http://localhost:5173/
   ```

2. **Deberías ver:**
   - ✅ Pantalla de login
   - ✅ Logo de Planify
   - ✅ Campos: Email y Password

3. **Prueba login:**
   - Email: super@admin.com
   - Password: (cualquiera)
   - Click "Iniciar Sesión"

4. **Si ves Dashboard:**
   - ✅ Conexión exitosa
   - ✅ React está funcionando
   - ✅ Vite está sirviendo la app

## 🐛 Troubleshooting

### Error: "Port 5173 already in use"

```powershell
# Opción 1: Usar puerto diferente
npx vite --host 0.0.0.0 --port 5174

# Opción 2: Matar proceso en puerto 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Error: "Cannot find module 'react'"

```powershell
# Reinstalar dependencias
rm -r node_modules
npm install
```

### Error: "localhost refused to connect"

1. Verifica que Vite esté corriendo
2. Comprueba que terminal no muestre errores
3. Intenta: http://127.0.0.1:5173 en lugar de localhost

### Pantalla en blanco

```powershell
# Limpia caché
rm -r dist
rm -r .vite

# Reinicia Vite
npx vite --host 0.0.0.0 --port 5173
```

### Node modules muy pesados

```powershell
# Esto es normal, ocupan ~500MB
# Para reducir tamaño:
npm ci --only=production  # Instalación de producción
```

## 🔄 Actualizar Dependencias

```powershell
# Ver qué puede actualizarse
npm outdated

# Actualizar todo
npm update

# Actualizar paquete específico
npm install react@latest
```

## 📊 Verificar Versiones Instaladas

```powershell
npm list react
npm list vite
npm list typescript
npm list react-router-dom
```

## 🧪 Ejecutar Tests (Opcional)

Si hay tests configurados:

```powershell
npm test
npm run test:watch
```

## 🔨 Build para Producción

```powershell
# Compilar para producción
npm run build

# Resultado en carpeta: dist/
# Puedes servir con cualquier servidor HTTP

# Para probar build local:
npm run preview
```

## 📚 Próximos Pasos

1. ✅ Aplicación corriendo
2. 👤 Login con super@admin.com
3. 📊 Explorar Dashboard
4. 📁 Crear proyecto de prueba
5. ✍️ Crear tarea
6. 🎥 Agregar evidencia (imagen/video)
7. 💾 Verificar que los datos se guardan (Settings → Backup)

## 💡 Tips Útiles

### Atajo rápido a Settings
```
URL: http://localhost:5173/#/settings
```

### Ver Console de Navegador
- Presiona: F12
- Abre pestaña: "Console"
- Aquí ves logs y errores

### Developers Tools
- Presiona: F12
- Pestaña: Elements → Inspect código HTML
- Pestaña: Network → Ver requests

## 🆘 Obtener Ayuda

Si tienes problemas:

1. Verifica Node.js y npm están instalados
   ```powershell
   node --version
   npm --version
   ```

2. Borra node_modules y reinstala
   ```powershell
   rm -r node_modules
   npm install
   ```

3. Asegúrate de estar en carpeta correcta
   ```powershell
   cd cypress/e2e/Pruebas-Planify/app
   ```

4. Abre issue en GitHub con:
   - Sistema operativo
   - Versión Node.js
   - Mensaje de error exacto

## 📝 Notas Importantes

- **No necesitas backend real** - Usa mock API
- **Datos se guardan localmente** - En localStorage
- **Es una SPA** - Single Page Application
- **Está en desarrollo** - Algunas features pueden cambiar

## 🎉 ¡Listo!

Ahora puedes:
- ✅ Crear proyectos y tareas
- ✅ Agregar evidencias (imágenes/videos)
- ✅ Descargar y restaurar backups
- ✅ Usar Planify QA completamente

---

**Última actualización:** 24 Enero 2026  
**Versión:** 2.0.0  
**Soporte:** Abre issue en GitHub
