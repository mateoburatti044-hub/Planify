/**
 * PLANIFY - Sistema de Gestión de Proyectos
 * 
 * Estructura de la Aplicación (JavaScript)
 * 
 * CARPETA: app/src/
 * ├── api.js                    (Servicio de API Mock - Gestiona datos)
 * ├── database.js               (Base de datos IndexedDB - Almacenamiento local)
 * ├── types.js                  (Tipos y constantes globales)
 * ├── components/               (Componentes React reutilizables)
 * ├── pages/                    (Páginas principales)
 * ├── contexts/                 (Context API para estado global)
 * ├── services/                 (Servicios auxiliares)
 * ├── hooks/                    (Custom React Hooks)
 * ├── App.jsx                   (Componente raíz)
 * └── index.jsx                 (Punto de entrada)
 * 
 */

// CÓMO USAR LA API:

// 1. USUARIOS
// ============

// Obtener todos los usuarios
// const response = await api.getUsers();
// if (response.error) {
//   console.error('Error:', response.error);
// } else {
//   console.log('Usuarios:', response.data);
// }

// Crear un usuario
// const newUser = await api.createUser({
//   firstName: 'Juan',
//   lastName: 'Pérez',
//   email: 'juan@example.com',
//   password_hash: 'hashed_password',
//   role: 'DEVELOPER',
//   phone: '+34 123 456 789',
//   address: 'Calle Principal 123'
// });

// Actualizar un usuario
// const updated = await api.updateUser('user_id', {
//   firstName: 'Juan',
//   lastName: 'García'
// });

// Eliminar un usuario
// const deleted = await api.deleteUser('user_id');


// 2. PROYECTOS
// ============

// Obtener todos los proyectos
// const projects = await api.getProjects();

// Crear un proyecto
// const newProject = await api.createProject({
//   name: 'Mi Proyecto',
//   description: 'Descripción del proyecto',
//   ownerId: 'user_id',
//   teamMembers: ['user_id_1', 'user_id_2'],
//   dueDate: '2024-12-31',
//   budget: 10000
// });

// Actualizar un proyecto
// const updated = await api.updateProject('project_id', {
//   name: 'Nuevo Nombre'
// });

// Eliminar un proyecto
// const deleted = await api.deleteProject('project_id');


// 3. TAREAS
// =========

// Obtener todas las tareas
// const tasks = await api.getTasks();

// Crear una tarea
// const newTask = await api.createTask({
//   title: 'Implementar login',
//   description: 'Crear sistema de autenticación',
//   projectId: 'project_id',
//   assignedTo: 'user_id',
//   priority: 'HIGH',
//   dueDate: '2024-11-30',
//   category: 'FEATURE'
// });

// Actualizar una tarea
// const updated = await api.updateTask('task_id', {
//   status: 'IN_PROGRESS'
// });

// Eliminar una tarea
// const deleted = await api.deleteTask('task_id');


// 4. NOTIFICACIONES
// =================

// Obtener todas las notificaciones
// const notifications = await api.getNotifications();

// Crear una notificación
// const newNotif = await api.createNotification({
//   userId: 'user_id',
//   type: 'task_assigned',
//   message: 'Te asignaron una nueva tarea',
//   relatedId: 'task_id'
// });


// CARACTERÍSTICAS PRINCIPALES:
// =============================

/**
 * ✅ Almacenamiento Local (IndexedDB)
 *    - Los datos se guardan en el navegador
 *    - No requiere servidor backend
 *    - Persiste entre sesiones
 * 
 * ✅ Gestión de Usuarios
 *    - Crear, leer, actualizar, eliminar usuarios
 *    - Asignar roles y permisos
 *    - Validación de emails únicos
 * 
 * ✅ Gestión de Proyectos
 *    - Crear proyectos con equipos
 *    - Asignar miembros al equipo
 *    - Rastrear estado y presupuesto
 * 
 * ✅ Gestión de Tareas
 *    - Crear tareas dentro de proyectos
 *    - Asignar prioridades y categorías
 *    - Cambiar estado de tareas
 * 
 * ✅ Sistema de Notificaciones
 *    - Notificaciones de eventos
 *    - Marcar como leídas
 *    - Historial de notificaciones
 */

export const DOCUMENTACION_API = 'Ver arriba';
