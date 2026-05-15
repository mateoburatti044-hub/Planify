# Planify - Sistema de Persistencia y Gestión de Evidencias QA

## ✅ Nuevas Características Implementadas

### 1. Sistema de Persistencia de Datos (Backup Automático)
Planify ahora guarda automáticamente todos los datos cada vez que:
- Creas un nuevo proyecto
- Actualizas un proyecto existente
- Eliminas un proyecto
- Creas una nueva tarea
- Actualizas una tarea
- Eliminas una tarea

**Ventajas:**
- ✓ Los datos nunca se pierden aunque reinicies la aplicación
- ✓ Los cambios de código no afectan tus datos existentes
- ✓ Backup automático en localStorage del navegador

### 2. Gestión de Evidencias de QA (Imágenes y Videos)
Las tareas ahora soportan attachments de evidencia para documentar pruebas:

**Tipos de archivos soportados:**
- **Imágenes:** JPG, JPEG, PNG, GIF, WebP
- **Videos:** MP4, WebM, MOV, AVI, MKV
- **Documentos:** PDF, DOC, DOCX, XLSX, TXT
- **Tamaño máximo:** 50MB por archivo

**Características:**
- ✓ Vista previa de imágenes en popup
- ✓ Reproducción de videos inline
- ✓ Descarga de archivos
- ✓ Información del archivo (tamaño, fecha)
- ✓ Organización por tarea

### 3. Exportación e Importación de Datos
En Settings > Persistencia de Datos:

**Exportar Backup:**
```
Click en "Descargar Backup" → Se descarga archivo JSON con todos los datos
Nombre formato: planify-backup-YYYY-MM-DD.json
```

**Restaurar Backup:**
```
Click en "Restaurar Backup" → Selecciona archivo JSON → Datos se importan automáticamente
```

---

## 📁 Archivos Nuevos Creados

### Servicios
- **`services/persistenceService.ts`**
  - Gestiona guardado/carga de datos en localStorage
  - Exportación/importación de backups
  - Descarga de archivos JSON

- **`services/attachmentService.ts`**
  - Validación de archivos
  - Conversión a base64
  - Gestión de attachments
  - Cálculo de tamaño legible

### Componentes
- **`components/EvidenceManager.tsx`**
  - UI para cargar evidencias
  - Preview de imágenes/videos
  - Lista de attachments
  - Descarga de archivos

### Páginas Actualizadas
- **`pages/TaskForm.tsx`**
  - Integración de EvidenceManager
  - Backup automático al guardar tarea

- **`pages/Settings.tsx`**
  - Sección de Persistencia de Datos
  - Botones para exportar/importar

### Tipos Actualizados
- **`types.ts`**
  - `TaskAttachment` interface
  - Propiedad `attachments` en Task

---

## 🚀 Cómo Usar

### Cargar Evidencias en una Tarea

1. **Crear o editar una tarea**
   ```
   Dashboard > Tasks > New Assignment (o editar existente)
   ```

2. **Llenar datos de la tarea** (título, descripción, etc.)

3. **Bajar hasta la sección "Evidencias de QA"**
   ```
   - Click en "Agregar Evidencia"
   - Selecciona imagen, video o documento
   - Se cargará automáticamente
   ```

4. **Guardar tarea**
   - Click en "Deploy Assignment" o "Authorize Refinement"
   - Los datos y evidencias se guardan automáticamente

### Descargar Backup de Datos

1. **Ir a Settings**
   ```
   Layout > System Configuration (ícono de engranaje)
   ```

2. **Encontrar "Persistencia de Datos & Backup"**

3. **Click en "Descargar Backup"**
   - Se descarga JSON con usuarios, proyectos y tareas

### Restaurar Datos Desde Backup

1. **En Settings > Persistencia de Datos**

2. **Click en "Restaurar Backup"**

3. **Selecciona archivo JSON previamente descargado**

4. **Confirmación de éxito**
   - Toast verde confirmará restauración

---

## 💾 Estructura de Datos del Backup

```json
{
  "users": [...],
  "projects": [...],
  "tasks": [
    {
      "id": "t-1234567890",
      "title": "Mi Tarea",
      "description": "Descripción...",
      "attachments": [
        {
          "id": "att-uuid",
          "fileName": "screenshot.png",
          "fileType": "image",
          "fileSize": 102400,
          "fileData": "data:image/png;base64,...",
          "mimeType": "image/png",
          "uploadedBy": "user-id",
          "uploadedAt": "2026-01-23T10:30:00Z"
        }
      ]
    }
  ],
  "timestamp": "2026-01-23T10:30:00Z",
  "version": "1.0"
}
```

---

## 🔐 Privacidad y Seguridad

- ✓ Los datos se guardan en **localStorage del navegador** (local en tu PC)
- ✓ **No se envían a servidores externos**
- ✓ Los archivos se codifican en **base64** para almacenamiento
- ✓ El backup es un archivo JSON estándar que puedes abrir/editar

---

## ⚠️ Notas Importantes

### Límites
- Máximo 50MB por archivo
- localStorage típicamente soporta 5-10MB
- Para archivos grandes, considera comprimirlos

### Compatibilidad
- Los backups se guardan en **localStorage del navegador actual**
- Si cambias de navegador o borras datos del navegador, se pierden
- **Solución:** Descarga regularmente backups JSON como seguridad extra

### Restauración
- Al restaurar un backup, **reemplaza los datos actuales**
- Los datos no se eliminan, se sobrescriben
- Asegúrate de tener backup antes de importar datos antiguos

---

## 📊 Ejemplos de Flujo QA

### Workflow típico para QA:

```
1. Crear Tarea: "Probar Login en Mobile"
   ├─ Descripción: Pasos de reproducción
   ├─ Asignado a: Tu usuario
   └─ Estado: IN_PROGRESS

2. Cargar Evidencias
   ├─ Screenshot del error
   ├─ Video de comportamiento
   └─ Log/documento con detalles

3. Guardar Tarea
   └─ Backup automático ✓

4. Revisar en Dashboard
   └─ Ver todas las tareas con evidencias

5. Exportar Reporte
   ├─ Settings > Descargar Backup
   └─ Compartir JSON con team
```

---

## 🛠️ Troubleshooting

**P: Cargo una evidencia pero no aparece**
R: Asegúrate de haber guardado la tarea después de agregarla (click en Deploy/Authorize)

**P: El archivo es muy grande**
R: Máximo 50MB. Comprime videos/imágenes o divide en partes

**P: Perdí mis datos**
R: Si tienes backup descargado, puedes restaurar en Settings > Restaurar Backup

**P: No puedo cargar cierto tipo de archivo**
R: Solo se soportan: imágenes (jpg, png, gif), videos (mp4, webm) y documentos (pdf, doc)

---

## 📝 Próximas Mejoras Sugeridas

- [ ] Sincronización con servidor backend
- [ ] Compresión automática de imágenes
- [ ] Galería mejorada de evidencias
- [ ] Búsqueda de tareas con evidencias
- [ ] Reportes automáticos en PDF
- [ ] Integración con Jira/Azure DevOps

---

**Versión:** 1.0  
**Fecha:** Enero 23, 2026  
**Autor:** Sistema de Persistencia Planify
