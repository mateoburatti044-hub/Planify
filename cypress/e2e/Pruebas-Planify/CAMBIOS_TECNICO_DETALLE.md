# 📝 CAMBIOS EN CÓDIGO - REFERENCIA TÉCNICA

## MODIFICACIONES POR ARCHIVO

### 1. types.ts
**Agregado:**
```typescript
export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileType: 'image' | 'video' | 'document';
  fileSize: number;
  fileData: string; // base64 encoded data
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

// En Task interface:
export interface Task {
  // ... otros campos ...
  attachments?: TaskAttachment[];
}
```

---

### 2. pages/TaskForm.tsx
**Cambios:**
```typescript
// Agregadas importaciones:
import { TaskAttachment } from '../types';
import { EvidenceManager } from '../components/EvidenceManager';
import { persistenceService } from '../services/persistenceService';

// En formData initial state:
{
  // ... otros campos ...
  attachments: []
}

// En handleSubmit (después de crear/actualizar):
// Guardar backup automático
const allTasks = await api.getTasks();
const allProjects = await api.getProjects();
const allUsers = await api.getUsers();

if (allTasks.data && allProjects.data && allUsers.data) {
  persistenceService.saveBackup(allUsers.data, allProjects.data, allTasks.data);
}

// Agregar componente EvidenceManager:
<EvidenceManager
  taskId={formData.id || id!}
  attachments={formData.attachments || []}
  userId={user?.id || ''}
  onAddAttachment={(attachment) => {
    setFormData({
      ...formData,
      attachments: [...(formData.attachments || []), attachment]
    });
  }}
  onRemoveAttachment={(attachmentId) => {
    setFormData({
      ...formData,
      attachments: (formData.attachments || []).filter(a => a.id !== attachmentId)
    });
  }}
/>
```

---

### 3. pages/Settings.tsx
**Cambios:**
```typescript
// Agregadas importaciones:
import { api } from '../services/mockApi';
import { persistenceService } from '../services/persistenceService';
import { useToast } from '../components/Layout';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Nuevos estados:
const [backupMetadata, setBackupMetadata] = useState(persistenceService.getBackupMetadata());

// Nuevas funciones:
const handleExportData = async () => {
  const tasksRes = await api.getTasks();
  const projectsRes = await api.getProjects();
  const usersRes = await api.getUsers();
  if (tasksRes.data && projectsRes.data && usersRes.data) {
    persistenceService.downloadBackup(usersRes.data, projectsRes.data, tasksRes.data);
    showToast('Datos exportados correctamente', 'success');
  }
};

const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const backup = await persistenceService.importData(file);
  if (backup) {
    setBackupMetadata(persistenceService.getBackupMetadata());
    showToast('Datos importados correctamente', 'success');
  }
};

// Nueva sección en JSX:
<section className="bg-planify-container border border-planify-border rounded-[2.5rem]...">
  {/* Sección de Backup */}
</section>
```

---

### 4. services/mockApi.ts
**Cambios:**
```typescript
// Agregada importación:
import { persistenceService } from './persistenceService';

// Nueva función auxiliar:
const autoBackup = async () => {
  try {
    const users = await db.getAll<User>('users');
    const projects = await db.getAll<Project>('projects');
    const tasks = await db.getAll<Task>('tasks');
    persistenceService.saveBackup(users, projects, tasks);
  } catch (err) {
    console.error('Error en backup automático:', err);
  }
};

// Modificadas estas funciones para llamar autoBackup():
createProject, updateProject, deleteProject
createTask, updateTask, deleteTask

// Ejemplo:
createTask: async (t: any): Promise<APIResponse<Task>> => {
  const nt = { ...t, id: `t-${Date.now()}`, createdAt: new Date().toISOString() };
  await db.put('tasks', nt);
  await autoBackup();  // ← NUEVA LÍNEA
  return { data: nt, status: 201 };
}
```

---

## NUEVOS ARCHIVOS CREADOS

### services/persistenceService.ts
**Métodos principales:**
```typescript
- saveBackup(users, projects, tasks): boolean
- loadBackup(): BackupData | null
- exportData(users, projects, tasks): string
- downloadBackup(users, projects, tasks): void
- importData(file): Promise<BackupData | null>
- getBackupMetadata(): any
- clearBackup(): void
- hasBackup(): boolean
```

**Storage Keys:**
- `planify_users_backup`
- `planify_projects_backup`
- `planify_tasks_backup`
- `planify_backup_metadata`

---

### services/attachmentService.ts
**Métodos principales:**
```typescript
- validateFile(file): { valid, error? }
- getFileType(file): 'image' | 'video' | 'document'
- fileToBase64(file): Promise<string>
- createAttachment(file, taskId, userId, description): Promise<TaskAttachment>
- downloadAttachment(attachment): void
- getPreviewUrl(attachment): string
- getReadableSize(bytes): string
- isImage(attachment): boolean
- isVideo(attachment): boolean
```

**Límites:**
- Max 50MB por archivo
- Extensions: images (jpg, png, gif, webp), videos (mp4, webm, mov, avi, mkv)

---

### components/EvidenceManager.tsx
**Props:**
```typescript
interface EvidenceManagerProps {
  taskId: string;
  attachments: TaskAttachment[];
  userId: string;
  onAddAttachment: (attachment: TaskAttachment) => void;
  onRemoveAttachment: (attachmentId: string) => void;
  readOnly?: boolean;
}
```

**Features:**
- Input file con validación
- Preview de imágenes en modal
- Descarga de archivos
- Lista de attachments con metadata
- Iconos por tipo de archivo

---

## INTEGRACIÓN COMPLETA

```
┌─ types.ts ──────────────┬─ Definen TaskAttachment
│                         │
├─ persistenceService.ts  │ Maneja localStorage backup
│                         │
├─ attachmentService.ts ──┤ Procesa archivos
│                         │
├─ EvidenceManager.tsx ───┤ UI para evidencias
│                         │
├─ TaskForm.tsx ──────────┤ Integra EvidenceManager
│                         │ Auto-backup al guardar
│                         │
├─ Settings.tsx ──────────┤ UI para export/import
│                         │
└─ mockApi.ts ────────────┴─ Auto-backup en cada operación
```

---

## DATOS ALMACENADOS

### localStorage Structure:
```json
{
  "planify_users_backup": "[...User[]]",
  "planify_projects_backup": "[...Project[]]",
  "planify_tasks_backup": "[...Task[]]",
  "planify_backup_metadata": {
    "timestamp": "2026-01-23T10:30:00Z",
    "version": "1.0",
    "userCount": 5,
    "projectCount": 3,
    "taskCount": 12
  }
}
```

### Exported JSON Format:
```json
{
  "users": [...],
  "projects": [...],
  "tasks": [
    {
      "id": "t-xxx",
      "title": "...",
      "attachments": [
        {
          "id": "att-xxx",
          "fileName": "screenshot.png",
          "fileType": "image",
          "fileData": "data:image/png;base64,...",
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

## PUNTOS DE AUTOMATIZACIÓN

1. **createTask** → auto-backup
2. **updateTask** → auto-backup
3. **deleteTask** → auto-backup
4. **createProject** → auto-backup
5. **updateProject** → auto-backup
6. **deleteProject** → auto-backup

Cada cambio dispara automáticamente el backup sin intervención del usuario.

---

## NOTAS IMPORTANTES

- ✅ No rompe compatibilidad con código existente
- ✅ Las actualizaciones de Task mantienen backward compatibility
- ✅ localStorage tiene límite (~5-10MB típicamente)
- ⚠️ Cambiar navegador = datos diferentes
- 🔒 Datos locales, no enviados a servidores

---

*Referencia técnica completa - Enero 23, 2026*
