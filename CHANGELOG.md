# 📝 CHANGELOG - Planify QA

Todos los cambios notables en este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/),
y el versionado sigue [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-01-24

### ✨ Agregado (Added)

#### 1. Sistema de Evidencias QA
- **`EvidenceManager.tsx`** - Componente para cargar, ver y descargar evidencias
  - Soporte para imágenes: JPG, PNG, GIF, WebP
  - Soporte para videos: MP4, WebM, MOV, AVI, MKV
  - Soporte para documentos: PDF, DOC, DOCX, XLSX
  - Validación de archivos (tamaño máx 50MB)
  - Vista previa de contenido
  - Descarga de archivos
  - Metadatos de archivo (tamaño, tipo, fecha)

- **`attachmentService.ts`** - Servicio para procesar archivos
  - `validateFile()` - Valida tipo y tamaño
  - `fileToBase64()` - Convierte archivos a base64
  - `createAttachment()` - Crea objetos TaskAttachment
  - `downloadAttachment()` - Descarga archivos
  - `getPreviewUrl()` - Genera URLs para vista previa
  - `isImage()` / `isVideo()` - Utilidades de tipo
  - `getReadableSize()` - Formatea tamaño legible

#### 2. Sistema de Persistencia Automática
- **`persistenceService.ts`** - Manejo de backup/restauración
  - `saveBackup()` - Guarda datos a localStorage
  - `loadBackup()` - Carga datos de localStorage
  - `exportData()` - Exporta backup como JSON
  - `importData()` - Importa backup desde archivo
  - `hasBackup()` - Verifica existencia de backup
  - `getBackupMetadata()` - Obtiene info del backup
  - `clearBackup()` - Limpia localStorage

- **`initializationService.ts`** - Auto-restauración al iniciar
  - `initializeDatabase()` - Restaura datos en app startup
  - Carga automática de backup si BD está vacía
  - Sincronización silenciosa sin afectar UX

#### 3. Integración en Componentes
- **`TaskForm.tsx`**
  - Integración de `EvidenceManager`
  - Manejo de `tempTaskId` para tareas nuevas
  - Auto-backup al crear/actualizar tareas
  - Sección de evidencias siempre visible

- **`Settings.tsx`**
  - Interfaz de Backup & Restore
  - Metadatos de backup visible
  - Botones para descargar/restaurar
  - Notificaciones de éxito/error

- **`AuthContext.tsx`**
  - Llamada a `initializationService` en startup
  - Patrón async para inicialización
  - Auto-restauración transparente

#### 4. Tipos TypeScript
- **`types.ts`**
  - Nueva interfaz `TaskAttachment`
  - Propiedad `attachments` en Task
  - Tipos para validación de archivos

#### 5. Auto-Backup en CRUD
- **`mockApi.ts`**
  - `autoBackup()` helper function
  - Backup automático después de: createProject, updateProject, deleteProject, createTask, updateTask, deleteTask
  - Transparente para consumidores

### 🔧 Modificado (Changed)

- **Estructura de datos Task**: Agregado campo `attachments?: TaskAttachment[]`
- **Flujo de inicialización**: Ahora restaura datos antes de verificar autenticación
- **Interfaz Settings**: Nuevo panel "Persistencia de Datos & Backup"
- **TaskForm**: Sección de evidencias disponible en creación y edición

### 🐛 Corregido (Fixed)

- Importaciones de UUID (no usar crypto-js)
  - Solucionado con `generateId()` function
- EvidenceManager no aparecía en nuevas tareas
  - Removida lógica condicional, siempre visible
- LocalStorage y persistencia
  - Implementado backup/restore completo

### 📚 Documentación (Docs)

- README.md completo con características e instrucciones
- CONTRIBUTING.md con guía de contribución
- CHANGELOG.md (este archivo)
- Comentarios mejorados en archivos clave
- Guías inline en services y components

### ⚡ Performance

- Compresión de archivos en base64
- Lazy loading de páginas
- LocalStorage optimizado
- Estructura de datos eficiente

---

## [1.0.0] - 2026-01-20

### ✨ Agregado (Added)

#### Gestión de Proyectos
- Crear, editar, eliminar proyectos
- Estados: ACTIVE, ON_HOLD, COMPLETED, CANCELLED
- Asignación de responsables
- Descripciones y fechas

#### Gestión de Tareas
- Crear tareas con título y descripción
- Estados: TODO, IN_PROGRESS, REVIEW, DONE
- Prioridades: LOW, MEDIUM, HIGH, CRITICAL
- Categorías: FEATURE, BUG, IMPROVEMENT, RESEARCH
- Asignación a usuarios
- Fechas de vencimiento

#### Usuarios y Autenticación
- Roles: SUPER_ADMIN, ADMIN, MANAGER, DEVELOPER, USER
- Sistema de autenticación mock
- Control de acceso basado en roles

#### Dashboard
- Estadísticas de proyectos
- Gráficos de estado
- Resumen de tareas
- Notificaciones

#### Reportes
- Análisis por estado
- Estadísticas por prioridad
- Historial de cambios
- Exportación de datos

### 🏗️ Arquitectura

- React 19 + TypeScript
- Vite como build tool
- React Router para navegación
- Tailwind CSS para estilos
- Context API para estado global
- localStorage para datos locales

### 📦 Dependencias Clave

- react@19.2.3
- react-router-dom@7.12.0
- typescript@5.8
- vite@6.2.0
- tailwindcss@3.x
- recharts@3.6.0
- heroicons@2.2.0

---

## Notas sobre Versionado

- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (0.x.0) - Nuevas features (compatible)
- **PATCH** (0.0.x) - Bug fixes

---

## Cómo Usar Este Changelog

- Para usuarios: Ver cambios en tus versiones
- Para desarrolladores: Entender evolución del proyecto
- Para releases: Documentar cambios por versión

### Próximas Features Planeadas (Roadmap)

- [ ] v2.1.0 - Backend API integration (MongoDB)
- [ ] v2.2.0 - Compresión automática de imágenes
- [ ] v2.3.0 - Galería mejorada con previsualizaciones
- [ ] v3.0.0 - Reportes en PDF con evidencias
- [ ] v3.1.0 - Integración Jira/Azure DevOps
- [ ] v3.2.0 - Colaboración en tiempo real (WebSockets)
- [ ] v3.3.0 - Notificaciones por email
- [ ] v4.0.0 - Mobile app (React Native)

---

## Contribuidores

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para cómo contribuir.

Contribuidores principales:
- Mateo - Desarrollador principal

---

**Última actualización:** 24 Enero 2026  
**Versión Actual:** 2.0.0  
**Rama:** main
