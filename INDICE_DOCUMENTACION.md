# 📚 ÍNDICE DE DOCUMENTACIÓN - Planify QA v2.0.0

**Bienvenido a Planify QA** - Sistema profesional de gestión de proyectos y tareas con evidencias para QA.

---

## 🚀 Comienza Aquí

### Para Usuarios Nuevos

1. **[SETUP.md](SETUP.md)** ← Comienza aquí
   - Requisitos previos
   - Instalación paso a paso
   - Primeros pasos

2. **[README.md](README.md)** ← Lee esto después
   - Qué es Planify QA
   - Características completas
   - Cómo usar

3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ← Referencia rápida
   - Comandos útiles
   - Atajos
   - Troubleshooting rápido

### Para Desarrolladores

1. **[CONTRIBUTING.md](CONTRIBUTING.md)**
   - Cómo contribuir
   - Pull requests
   - Code style

2. **[CHANGELOG.md](CHANGELOG.md)**
   - Qué cambió en v2.0.0
   - Historia de versiones
   - Roadmap

3. **[RESUMEN_IMPLEMENTACION.md](RESUMEN_IMPLEMENTACION.md)**
   - Arquitectura técnica
   - Servicios implementados
   - Detalles de implementación

---

## 📖 Estructura de Documentación

```
📁 Carpeta Raíz
│
├── 🚀 PARA EMPEZAR RÁPIDO
│   ├── SETUP.md                    ← Instalación
│   ├── QUICK_REFERENCE.md          ← Comandos útiles
│   └── INICIAR_PLANIFY.bat         ← Click para iniciar
│
├── 📚 DOCUMENTACIÓN PRINCIPAL
│   ├── README.md                   ← Descripción completa
│   ├── CHANGELOG.md                ← Qué cambió
│   └── RESUMEN_IMPLEMENTACION.md   ← Detalles técnicos
│
├── 🤝 PARA COLABORADORES
│   ├── CONTRIBUTING.md             ← Guía contribución
│   └── LICENSE                     ← MIT License
│
└── 🔧 CARPETA DE APLICACIÓN
    └── cypress/e2e/Pruebas-Planify/app/
        ├── services/               ← Persistencia, evidencias
        ├── components/             ← EvidenceManager, etc
        ├── pages/                  ← TaskForm, Settings, etc
        ├── README.md               ← Docs adicionales
        └── package.json
```

---

## 🎯 Guías Rápidas por Tarea

### "Quiero empezar a usar Planify QA"
→ Sigue esta ruta:
1. Abre [SETUP.md](SETUP.md)
2. Ejecuta `INICIAR_PLANIFY.bat`
3. Lee las secciones en [README.md](README.md)
4. Prueba creando un proyecto y tarea

### "Quiero agregar una imagen/video a una tarea"
→ Mira:
1. [README.md - Evidencias QA](README.md#-evidencias-qa-nuevo)
2. O mira [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### "¿Cómo se guardan mis datos?"
→ Lee:
1. [README.md - Persistencia Automática](README.md#-persistencia-automática-de-datos-nuevo)
2. [RESUMEN_IMPLEMENTACION.md - Flujo de Persistencia](RESUMEN_IMPLEMENTACION.md#flujo-de-persistencia)

### "Quiero contribuir con código"
→ Sigue:
1. [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork el repositorio
3. Sigue el proceso en CONTRIBUTING.md

### "¿Qué cambió en la versión 2.0.0?"
→ Revisa:
1. [CHANGELOG.md](CHANGELOG.md)
2. [RESUMEN_IMPLEMENTACION.md](RESUMEN_IMPLEMENTACION.md)

### "Tengo un error, ¿qué hago?"
→ Consulta:
1. [SETUP.md - Troubleshooting](SETUP.md#-troubleshooting)
2. [QUICK_REFERENCE.md - Troubleshooting Rápido](QUICK_REFERENCE.md#-troubleshooting-rápido)

---

## 📋 Resumen de Cada Documento

### SETUP.md
**Para quién:** Usuarios nuevos  
**Propósito:** Guía de instalación completa  
**Contiene:**
- Requisitos previos
- Instrucciones instalación Windows/Mac/Linux
- Verificación de instalación
- Primeros pasos
- Troubleshooting

**Tiempo lectura:** 10-15 minutos  
**Resultado:** App corriendo en http://localhost:5173/

---

### README.md
**Para quién:** Todos  
**Propósito:** Descripción completa del proyecto  
**Contiene:**
- Qué es Planify QA
- 10+ características principales
- Cómo usar cada feature
- Architecture overview
- Stack técnico
- Roadmap futuro

**Tiempo lectura:** 20-30 minutos  
**Resultado:** Entender completamente qué es y qué hace Planify QA

---

### QUICK_REFERENCE.md
**Para quién:** Usuarios recurrentes  
**Propósito:** Referencia rápida de comandos  
**Contiene:**
- URLs rápidas
- Credenciales de prueba
- Comandos npm más usados
- Atajos de teclado
- Troubleshooting rápido
- Tips pro

**Tiempo lectura:** 5 minutos  
**Resultado:** Referencia de bolsillo para comandos más usados

---

### CHANGELOG.md
**Para quién:** Desarrolladores  
**Propósito:** Historial de cambios  
**Contiene:**
- v2.0.0: Evidencias + Persistencia
- v1.0.0: Características iniciales
- Roadmap futuro
- Historial de versiones

**Tiempo lectura:** 10 minutos  
**Resultado:** Entender evolución del proyecto

---

### CONTRIBUTING.md
**Para quién:** Contribuidores  
**Propósito:** Guía para contribuir  
**Contiene:**
- Código de conducta
- Cómo reportar bugs
- Cómo sugerir features
- Proceso de pull requests
- Code style guide
- Development setup

**Tiempo lectura:** 20 minutos  
**Resultado:** Saber cómo contribuir correctamente

---

### RESUMEN_IMPLEMENTACION.md
**Para quién:** Desarrolladores técnicos  
**Propósito:** Detalles técnicos de implementación  
**Contiene:**
- Arquitectura de persistencia
- Servicios implementados
- Flujos de datos
- Componentes actualizados
- Estructura de datos guardada
- Testing checklist

**Tiempo lectura:** 30 minutos  
**Resultado:** Entender completamente cómo funciona internamente

---

## 🔗 Links Útiles

### Instalación
- [SETUP.md - Instalación](SETUP.md#-instalación)
- [SETUP.md - Opción 1: Git](SETUP.md#-opción-1-clonar-desde-github-recomendado)
- [SETUP.md - Opción 2: ZIP](SETUP.md#-opción-2-usando-archivo-zip)

### Usando la App
- [README.md - Cómo Usar](README.md#-uso)
- [QUICK_REFERENCE.md - Flujo Típico](QUICK_REFERENCE.md#-flujo-de-trabajo-típico)

### Características
- [README.md - Evidencias QA](README.md#-evidencias-qa-nuevo)
- [README.md - Persistencia](README.md#-persistencia-automática-de-datos-nuevo)
- [README.md - Gestión de Tareas](README.md#-gestión-de-tareas-tasks)

### Desarrollo
- [CONTRIBUTING.md - Pull Requests](CONTRIBUTING.md#-pull-requests)
- [RESUMEN_IMPLEMENTACION.md - Servicios](RESUMEN_IMPLEMENTACION.md#-servicios-implementados)
- [README.md - Stack Técnico](README.md#-stack-técnico)

---

## 🎓 Rutas de Aprendizaje Recomendadas

### Para Principiantes (Primer uso)
```
1. SETUP.md (10 min)
   ↓
2. INICIAR_PLANIFY.bat
   ↓
3. README.md - Características (15 min)
   ↓
4. Experimentar con la app (20 min)
   ↓
5. QUICK_REFERENCE.md (5 min)
```
**Tiempo total:** ~1 hora

---

### Para Desarrolladores (Contribuir)
```
1. SETUP.md (10 min)
   ↓
2. README.md (20 min)
   ↓
3. RESUMEN_IMPLEMENTACION.md (30 min)
   ↓
4. CONTRIBUTING.md (20 min)
   ↓
5. Clonar, crear rama, hacer cambios
```
**Tiempo total:** ~2 horas

---

### Para Entender Persistencia (Deep Dive)
```
1. README.md - Persistencia (10 min)
   ↓
2. RESUMEN_IMPLEMENTACION.md - Flujos (30 min)
   ↓
3. Ir a app/services/persistenceService.ts (código)
   ↓
4. Revisar app/services/initializationService.ts
   ↓
5. Ver TaskForm.tsx integración
```
**Tiempo total:** ~1.5 horas

---

## 📱 URLs Directas

| Página | URL |
|--------|-----|
| Dashboard | http://localhost:5173/ |
| Login | http://localhost:5173/#/login |
| Settings | http://localhost:5173/#/settings |
| Nueva Tarea | http://localhost:5173/#/new-task |

---

## 💾 Comandos Esenciales

```powershell
# Instalar y ejecutar
cd cypress\e2e\Pruebas-Planify\app
npm install
npx vite --host 0.0.0.0 --port 5173

# O simplemente ejecutar
.\INICIAR_PLANIFY.bat

# Ver cambios en código (hot reload)
# Edita cualquier archivo .tsx y la app se actualiza automáticamente
```

---

## 🎯 Checklist de Bienvenida

- [ ] Leí [SETUP.md](SETUP.md)
- [ ] Instalé las dependencias
- [ ] Ejecuté `npm install` o `INICIAR_PLANIFY.bat`
- [ ] La app está corriendo en http://localhost:5173/
- [ ] Hice login con super@admin.com
- [ ] Creé un proyecto de prueba
- [ ] Creé una tarea
- [ ] Agregué una evidencia (imagen/video)
- [ ] Vi que los datos se guardaron en Settings → Backup
- [ ] Leí [README.md](README.md) para entender qué es Planify

---

## 📞 Obtener Ayuda

### Problemas de Instalación
→ Mira [SETUP.md - Troubleshooting](SETUP.md#-troubleshooting)

### Preguntas sobre Uso
→ Revisa [README.md](README.md) y [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### Problemas Técnicos
→ Abre issue en GitHub con:
- Sistema operativo
- Versión Node.js
- Mensaje de error exacto
- Pasos para reproducir

### Quiero Contribuir
→ Lee [CONTRIBUTING.md](CONTRIBUTING.md) completo

---

## 🌟 Qué Aprender en Cada Documento

| Documento | Aprendes |
|-----------|----------|
| SETUP.md | Cómo instalar y ejecutar |
| README.md | Qué es y cómo usar |
| QUICK_REFERENCE.md | Comandos y atajos |
| CONTRIBUTING.md | Cómo contribuir |
| CHANGELOG.md | Historial de cambios |
| RESUMEN_IMPLEMENTACION.md | Cómo funciona internamente |

---

## 📊 Estadísticas

| Métrica | Cantidad |
|---------|----------|
| Documentos | 7 |
| Líneas de documentación | 3000+ |
| Ejemplos de código | 50+ |
| Screenshots/diagrama descripción | 20+ |
| URLs útiles | 30+ |

---

## ✅ Validación

Cuando termines de leer:

1. ✅ Entiendes qué es Planify QA
2. ✅ Sabes cómo instalarlo
3. ✅ Sabes cómo ejecutarlo
4. ✅ Sabes cómo crear tareas con evidencias
5. ✅ Sabes cómo se guardan los datos
6. ✅ Sabes cómo obtener ayuda

---

## 🚀 Próximo Paso

**Ejecuta esto en PowerShell:**

```powershell
cd $env:USERPROFILE\Desktop\Cypress
.\INICIAR_PLANIFY.bat
```

O abre [SETUP.md](SETUP.md) para instrucciones detalladas.

---

**Versión:** 2.0.0  
**Última actualización:** 24 Enero 2026  
**Status:** ✅ Documentación Completa
