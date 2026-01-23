# 📋 PLANIFY - Sistema de Gestión de Proyectos

## 🎯 Descripción General

**Planify** es un sistema de gestión de proyectos construido con **React** que funciona completamente en el navegador sin necesidad de un backend externo.

- ✅ **Sin Backend Real**: Usa IndexedDB para almacenamiento local
- ✅ **Completamente en JavaScript**: Todos los archivos convertidos de TypeScript
- ✅ **Fácil de Modificar**: Código limpio y bien documentado
- ✅ **Funciones Completas**: Usuarios, Proyectos, Tareas, Notificaciones

---

## 📁 Estructura de Carpetas

```
app/
├── src/
│   ├── api.js                      # Servicio de API Mock
│   ├── database.js                 # IndexedDB para datos locales
│   ├── types.js                    # Constantes y tipos
│   ├── DOCUMENTACION.js            # Guía de uso de la API
│   ├── components/                 # Componentes React
│   ├── pages/                      # Páginas principales
│   ├── contexts/                   # Context API
│   ├── services/                   # Servicios auxiliares
│   ├── hooks/                      # Custom Hooks
│   ├── App.jsx                     # Componente raíz
│   └── index.jsx                   # Punto de entrada
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
cd app
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

### 3. Compilar para producción
```bash
npm run build
```

---

## 🔧 API Mock - Ejemplos de Uso

### Obtener todos los usuarios
```javascript
import { api } from './src/api.js';

const response = await api.getUsers();
if (response.error) {
  console.error('Error:', response.error);
} else {
  console.log('Usuarios:', response.data);
}
```

### Crear un usuario
```javascript
const newUser = await api.createUser({
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan@example.com',
  password_hash: 'hashed_password',
  role: 'DEVELOPER',
  phone: '+34 123 456 789',
  address: 'Calle Principal 123'
});

if (!newUser.error) {
  console.log('Usuario creado:', newUser.data);
}
```

### Eliminar un usuario
```javascript
const result = await api.deleteUser('user_id');

if (result.status === 204) {
  console.log('Usuario eliminado correctamente');
} else {
  console.log('Error:', result.error);
}
```

### Crear un proyecto
```javascript
const newProject = await api.createProject({
  name: 'Mi Nuevo Proyecto',
  description: 'Descripción del proyecto',
  ownerId: 'user_id',
  teamMembers: ['user_id_1', 'user_id_2'],
  dueDate: '2024-12-31',
  budget: 10000
});
```

### Crear una tarea
```javascript
const newTask = await api.createTask({
  title: 'Implementar login',
  description: 'Crear sistema de autenticación',
  projectId: 'project_id',
  assignedTo: 'user_id',
  priority: 'HIGH',
  dueDate: '2024-11-30',
  category: 'FEATURE'
});
```

---

## 📊 Modelos de Datos

### Usuario
```javascript
{
  id: "123456",
  firstName: "Juan",
  lastName: "Pérez",
  name: "Juan Pérez",
  email: "juan@example.com",
  role: "DEVELOPER",
  permissions: ["user.create", "user.edit"],
  phone: "+34 123 456 789",
  address: "Calle Principal 123",
  isActive: true,
  createdAt: "2024-01-23T00:00:00Z"
}
```

### Proyecto
```javascript
{
  id: "proj123",
  name: "Planify Pro",
  description: "Sistema de gestión avanzado",
  ownerId: "user123",
  teamMembers: ["user123", "user456"],
  status: "ACTIVE",
  dueDate: "2024-12-31",
  budget: 50000,
  createdAt: "2024-01-23T00:00:00Z"
}
```

### Tarea
```javascript
{
  id: "task123",
  title: "Implementar autenticación",
  description: "Sistema de login con JWT",
  projectId: "proj123",
  assignedTo: "user123",
  priority: "HIGH",
  status: "IN_PROGRESS",
  category: "FEATURE",
  dueDate: "2024-11-30",
  createdAt: "2024-01-23T00:00:00Z"
}
```

---

## 🔐 Roles y Permisos

### Roles disponibles
- `SUPER_ADMIN`: Acceso total
- `ADMIN`: Gestión de usuarios y proyectos
- `MANAGER`: Gestión de proyectos y tareas
- `DEVELOPER`: Desarrollo de tareas
- `USER`: Usuario básico

### Permisos
- `user.create`: Crear usuarios
- `user.edit`: Editar usuarios
- `user.delete`: Eliminar usuarios
- `user.view`: Ver usuarios
- `project.manage`: Gestionar proyectos
- `task.manage`: Gestionar tareas

---

## 💾 Base de Datos Local (IndexedDB)

La aplicación utiliza **IndexedDB** para almacenar datos localmente en el navegador:

- **users**: Almacena información de usuarios
- **projects**: Almacena información de proyectos
- **tasks**: Almacena información de tareas
- **notifications**: Almacena notificaciones

Los datos **persisten** entre sesiones del navegador.

---

## 🧪 Testing con Cypress

Para ejecutar tests con Cypress:

```bash
cd ../..  # Volver a la carpeta raíz de Cypress
npm run pruebas-planify-chrome  # O edge/electron
```

---

## 📝 Modificar la Aplicación

### Agregar un nuevo endpoint a la API
```javascript
// En src/api.js
async getNoticias() {
  try {
    const noticias = await db.getAll('noticias');
    return { data: noticias, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
```

### Agregar un nuevo object store
```javascript
// En src/database.js, dentro de onupgradeneeded
if (!db.objectStoreNames.contains('noticias')) {
  db.createObjectStore('noticias', { keyPath: 'id' });
}
```

---

## ⚡ Performance

- **IndexedDB**: Almacenamiento rápido en el navegador
- **React**: Renderizado eficiente
- **Vite**: Build rápido y optimizado
- **Sin requests HTTP**: Todo ocurre localmente

---

## 🎨 Stack Tecnológico

- **Frontend**: React 19
- **Routing**: React Router 7
- **Build Tool**: Vite 6
- **Base de Datos**: IndexedDB (navegador)
- **Visualización**: Recharts
- **Iconos**: Heroicons
- **Lenguaje**: JavaScript (ES Modules)

---

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es parte del sistema Planify © 2024

---

**Última actualización**: 23 de Enero de 2024
