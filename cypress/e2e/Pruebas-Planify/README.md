# 🎯 PLANIFY QA - Sistema de Gestión de Tareas y Evidencias

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

**Planify QA** es un sistema de gestión de proyectos y tareas diseñado especialmente para equipos de QA (Control de Calidad). Permite crear, gestionar y documentar pruebas de software con evidencia visual (imágenes y videos), con persistencia automática de datos.

## 🌟 Características Principales

### ✅ Gestión de Proyectos
- Crear y organizar proyectos por estado (ACTIVE, ON_HOLD, COMPLETED, CANCELLED)
- Asignar responsables y fechas de entrega
- Descripción detallada de objetivos

### ✅ Gestión de Tareas (Tasks)
- Crear tareas con múltiples estados (TODO, IN_PROGRESS, REVIEW, DONE)
- Establecer prioridades (LOW, MEDIUM, HIGH, CRITICAL)
- Categorizar tareas (FEATURE, BUG, IMPROVEMENT, RESEARCH)
- Asignar a miembros del equipo
- Fechas de vencimiento y seguimiento

### ✅ 🎥 Evidencias QA (Nuevo)
- **Carga de Imágenes:** JPG, PNG, GIF, WebP
- **Carga de Videos:** MP4, WebM, MOV, AVI, MKV
- **Documentos:** PDF, DOC, DOCX, XLSX
- Máximo 50MB por archivo
- Almacenamiento en base64
- Vista previa de contenido
- Descarga de archivos

### ✅ 💾 Persistencia Automática de Datos (Nuevo)
- **Backup automático** en cada operación CRUD
- **Restauración automática** al iniciar la aplicación
- **Exportación/Importación** de datos en JSON
- **Almacenamiento local** (localStorage del navegador)
- **Sin pérdida de datos** incluso con cambios de código

### ✅ Gestión de Usuarios
- Roles: SUPER_ADMIN, ADMIN, MANAGER, DEVELOPER, USER
- Permisos granulares
- Control de acceso basado en roles (RBAC)

### ✅ Dashboard
- Estadísticas de proyectos y tareas
- Gráficos de estado de tareas
- Resumen de actividades
- Notificaciones en tiempo real

### ✅ Reportes
- Análisis de tareas por estado
- Estadísticas por prioridad
- Historial de cambios
- Exportación de datos

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Navegador moderno (Chrome, Edge, Firefox, Safari)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/planify-qa.git
cd planify-qa/cypress/e2e/Pruebas-Planify/app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npx vite --host 0.0.0.0 --port 5173
```

### Acceso
- URL: `http://localhost:5173/`
- El navegador abrirá automáticamente la pantalla de login

## 📋 Credenciales de Prueba

```
Email: super@admin.com
Password: (cualquier contraseña)

Email: manager@planify.com
Password: (cualquier contraseña)
```

## 🎮 Uso

### Crear una Nueva Tarea con Evidencias

```
1. Dashboard → Tasks → New Assignment
2. Rellenar datos:
   - Title: "Probar Login en Mobile"
   - Description: Pasos y contexto
   - Project: Seleccionar proyecto
   - Priority: HIGH
   - Assignee: Tu usuario
3. Bajar hasta "Evidencias de QA"
4. Click "Agregar Evidencia"
5. Seleccionar imagen o video
6. Click "Deploy Assignment"
```

### Descargar Backup de Datos

```
1. Settings (⚙️ arriba a la derecha)
2. "Persistencia de Datos & Backup"
3. Click "Descargar Backup"
4. Guardar archivo planify-backup-YYYY-MM-DD.json
```

### Restaurar Datos desde Backup

```
1. Settings → "Persistencia de Datos & Backup"
2. Click "Restaurar Backup"
3. Seleccionar archivo JSON
4. Confirmar en el toast verde
```

## 📁 Estructura del Proyecto

```
planify-qa/
├── cypress/
│   └── e2e/
│       └── Pruebas-Planify/
│           └── app/
│               ├── src/                    # Código fuente
│               ├── components/             # Componentes React
│               │   ├── EvidenceManager.tsx # ✨ Gestor de evidencias
│               │   ├── Layout.tsx
│               │   ├── ErrorBoundary.tsx
│               │   └── ...
│               ├── pages/                  # Páginas
│               │   ├── TaskForm.tsx        # ✨ Integración evidencias
│               │   ├── Settings.tsx        # ✨ Backup/Restauración
│               │   ├── Dashboard.tsx
│               │   └── ...
│               ├── services/               # Servicios
│               │   ├── persistenceService.ts    # ✨ Persistencia
│               │   ├── attachmentService.ts    # ✨ Gestión archivos
│               │   ├── initializationService.ts # ✨ Auto-restauración
│               │   ├── mockApi.ts
│               │   └── ...
│               ├── contexts/               # Contextos React
│               │   └── AuthContext.tsx
│               ├── types.ts                # ✨ TaskAttachment type
│               ├── index.html
│               ├── index.tsx
│               └── vite.config.ts
```

## 🔄 Arquitectura de Persistencia

```
┌─────────────────────────────────────┐
│   Usuario crea/edita/elimina        │
│   proyecto o tarea                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   mockApi realiza operación CRUD    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   autoBackup() se ejecuta           │
│                                     │
│   persistenceService.saveBackup()   │
│   - Usuarios → localStorage         │
│   - Proyectos → localStorage        │
│   - Tareas → localStorage           │
│   - Metadata → localStorage         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   ✅ Datos persisten en navegador   │
│      (no se pierden al cerrar)      │
└─────────────────────────────────────┘
```

### Auto-Restauración al Iniciar

```
┌─────────────────────────────────────┐
│   Usuario abre la aplicación        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   AuthProvider se monta             │
│   initApp() ejecuta                 │
│   initializationService.initialize()│
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   ¿Base de datos vacía?             │
│   - SI → Cargar backup              │
│   - NO → Usar datos existentes      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Aplicación lista con datos        │
│   (de backup o locales)             │
└─────────────────────────────────────┘
```

## 💾 Tipos de Datos

### TaskAttachment
```typescript
interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileType: 'image' | 'video' | 'document';
  fileSize: number;
  fileData: string; // base64 encoded
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}
```

### Task (Actualizado)
```typescript
interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  category: TaskCategory;
  assigneeId: string;
  reporterId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  comments?: TaskComment[];
  activity?: TaskActivity[];
  attachments?: TaskAttachment[]; // ✨ Nuevo
}
```

### Backup Data
```typescript
interface BackupData {
  users: User[];
  projects: Project[];
  tasks: Task[];
  timestamp: string;
  version: string;
}
```

## 🔒 Seguridad y Privacidad

| Aspecto | Implementación |
|---------|-----------------|
| **Almacenamiento** | localStorage local (no servidor) |
| **Transmisión** | No se transmite (completamente local) |
| **Archivos** | Base64 encoding |
| **Privacidad** | Datos del usuario, control total |
| **Respaldo** | JSON descargable |
| **Encriptación** | N/A (local browser) |

## 🧪 Testing

### Verificar Persistencia
1. Crear proyecto
2. Crear tarea
3. Agregar evidencia (imagen/video)
4. Cerrar navegador completamente
5. Abrir de nuevo
6. ✅ Todos los datos deberían estar

### Verificar Backup
1. Settings → Descargar Backup
2. Ver archivo planify-backup-YYYY-MM-DD.json
3. Restaurar en otra sesión
4. ✅ Todos los datos deberían restaurarse

## 📊 Stack Técnico

- **Frontend:** React 19.2.3
- **Lenguaje:** TypeScript 5.8
- **Build Tool:** Vite 6.2.0
- **Routing:** React Router DOM 7.12.0
- **Styles:** Tailwind CSS
- **Icons:** Heroicons
- **Charts:** Recharts 3.6.0
- **Storage:** localStorage API
- **Database:** Mock (in-memory)

## 📝 Cambios Recientes (v2.0.0)

### ✨ Nuevo - Evidencias QA
- Componente `EvidenceManager` para cargar imágenes/videos
- Servicio `attachmentService` para procesar archivos
- Soporte para JPG, PNG, GIF, WebP, MP4, WebM, MOV, etc.
- Vista previa de archivos
- Descarga de evidencias

### ✨ Nuevo - Persistencia Automática
- Servicio `persistenceService` para backup/restauración
- Servicio `initializationService` para auto-restauración
- Almacenamiento en localStorage
- Exportación/importación JSON
- Backup metadata visible

### 🔧 Mejoras
- Auto-backup en cada operación CRUD
- Sincronización automática con localStorage
- Interface mejorada en Settings
- Documentación completa

### 🐛 Fixes
- Corrección de imports (uuid)
- Mejora en manejo de errores
- Auto-restauración de datos al iniciar

## 📚 Documentación

Para documentación más detallada, ver:
- `GUIA_PERSISTENCIA_EVIDENCIAS.md` - Guía completa
- `QUICK_START_PERSISTENCIA.txt` - Referencia rápida
- `CAMBIOS_TECNICO_DETALLE.md` - Detalles técnicos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios significativos:

1. Fork el repositorio
2. Crear rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👤 Autor

**Mateo** - Desarrollador QA Automation

- GitHub: [@usuario](https://github.com/usuario)
- Email: mateo@ejemplo.com

## 🙏 Agradecimientos

- React Community
- Vite Team
- Tailwind CSS
- Heroicons

## 📞 Soporte

Para reportar bugs o solicitar features:
- Abrir un [Issue](https://github.com/usuario/planify-qa/issues)
- Enviar email: soporte@planify.local

## 🗺️ Roadmap

- [ ] Integración con servidor backend (MongoDB)
- [ ] Autenticación OAuth
- [ ] Compresión automática de imágenes
- [ ] Galería mejorada
- [ ] Reportes en PDF
- [ ] Integración Jira/Azure DevOps
- [ ] Colaboración en tiempo real
- [ ] Notificaciones por email
- [ ] Mobile app (React Native)
- [ ] Dark/Light mode

## 📈 Estadísticas

| Métrica | Valor |
|---------|-------|
| Versión | 2.0.0 |
| Tamaño | ~2.5MB (sin node_modules) |
| Archivos TypeScript | 30+ |
| Componentes React | 15+ |
| Servicios | 6 |
| Funciones | 150+ |
| Líneas de Código | 3,500+ |

## 🎓 Aprendizajes

Este proyecto demuestra:
- ✅ Arquitectura React escalable
- ✅ TypeScript en aplicaciones reales
- ✅ Manejo de localStorage
- ✅ Persistencia de datos
- ✅ File handling en JavaScript
- ✅ Base64 encoding
- ✅ Gestión de estado global
- ✅ Componentes reutilizables

---

**Última actualización:** Enero 24, 2026  
**Versión:** 2.0.0  
**Status:** ✅ Activo y mantenido
