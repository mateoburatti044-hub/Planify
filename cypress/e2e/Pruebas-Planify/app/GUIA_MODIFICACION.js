/**
 * 🎯 GUÍA DE MODIFICACIÓN - PLANIFY
 * 
 * Cómo modificar, extender y adaptar la aplicación de forma segura
 */

// ============================================
// 1. AGREGAR UN NUEVO OBJETO PARA GUARDAR
// ============================================

/**
 * Ejemplo: Queremos agregar un nuevo objeto "Clientes"
 * 
 * PASO 1: Agregar object store a database.js
 * ────────────────────────────────────────────
 * 
 * En la función onupgradeneeded:
 * 
 * if (!db.objectStoreNames.contains('clientes')) {
 *   const clientStore = db.createObjectStore('clientes', { keyPath: 'id' });
 *   clientStore.createIndex('email', 'email', { unique: true });
 * }
 */

// PASO 2: Agregar método a api.js
// ────────────────────────────────────────────────────────────────

// async getClientes() {
//   try {
//     const clientes = await db.getAll('clientes');
//     return { data: clientes, error: null };
//   } catch (error) {
//     return { data: null, error: error.message };
//   }
// }

// async createCliente(clienteData) {
//   try {
//     const newCliente = {
//       id: Date.now().toString(),
//       ...clienteData,
//       createdAt: new Date().toISOString()
//     };

//     await db.put('clientes', newCliente);
//     return { data: newCliente, status: 201, error: null };
//   } catch (error) {
//     return { data: null, status: 400, error: error.message };
//   }
// }

// PASO 3: Usar en tu componente React
// ────────────────────────────────────────────────────────────────

// import { api } from '../src/api.js';

// export default function ComponenteClientes() {
//   const [clientes, setClientes] = React.useState([]);

//   React.useEffect(() => {
//     const cargarClientes = async () => {
//       const response = await api.getClientes();
//       if (!response.error) {
//         setClientes(response.data);
//       }
//     };
//     cargarClientes();
//   }, []);

//   return (
//     <div>
//       {clientes.map(cliente => (
//         <div key={cliente.id}>{cliente.nombre}</div>
//       ))}
//     </div>
//   );
// }


// ============================================
// 2. MODIFICAR UN MÉTODO DE LA API
// ============================================

/**
 * Ejemplo: Cambiar cómo se crea un usuario
 * 
 * ANTES (en api.js):
 * 
 * async createUser(userData) {
 *   const newUser = {
 *     id: Date.now().toString(),
 *     ...userData,
 *     createdAt: new Date().toISOString(),
 *     isActive: true,
 *     permissions: []
 *   };
 *   await db.put('users', newUser);
 *   return { data: newUser, status: 201, error: null };
 * }
 * 
 * DESPUÉS (si queremos agregar validaciones):
 * 
 * async createUser(userData) {
 *   // Validar email
 *   if (!userData.email.includes('@')) {
 *     return { data: null, status: 400, error: 'Email inválido' };
 *   }
 *   
 *   // Validar contraseña
 *   if (userData.password.length < 8) {
 *     return { data: null, status: 400, error: 'Contraseña debe tener al menos 8 caracteres' };
 *   }
 *   
 *   // Resto del código...
 *   const newUser = {
 *     id: Date.now().toString(),
 *     ...userData,
 *     createdAt: new Date().toISOString(),
 *     isActive: true,
 *     permissions: []
 *   };
 *   await db.put('users', newUser);
 *   return { data: newUser, status: 201, error: null };
 * }
 */


// ============================================
// 3. AGREGAR UN NUEVO PERMISO
// ============================================

/**
 * En types.js:
 * 
 * ANTES:
 * export const Permission = {
 *   USER_CREATE: 'user.create',
 *   USER_EDIT: 'user.edit',
 *   USER_DELETE: 'user.delete',
 * }
 * 
 * DESPUÉS:
 * export const Permission = {
 *   USER_CREATE: 'user.create',
 *   USER_EDIT: 'user.edit',
 *   USER_DELETE: 'user.delete',
 *   REPORT_VIEW: 'report.view',      // ← NUEVO
 *   REPORT_EXPORT: 'report.export'   // ← NUEVO
 * }
 */


// ============================================
// 4. AGREGAR UN NUEVO ESTADO DE TAREA
// ============================================

/**
 * En types.js:
 * 
 * export const TaskStatus = {
 *   TODO: 'TODO',
 *   IN_PROGRESS: 'IN_PROGRESS',
 *   REVIEW: 'REVIEW',
 *   DONE: 'DONE',
 *   ARCHIVED: 'ARCHIVED'  // ← NUEVO
 * }
 */


// ============================================
// 5. MODIFICAR LA BASE DE DATOS (IndexedDB)
// ============================================

/**
 * Si necesitas cambiar la estructura:
 * 
 * 1. Incrementa DB_VERSION en database.js:
 *    const DB_VERSION = 3;  (de 2 a 3)
 * 
 * 2. Agrega la nueva lógica en onupgradeneeded:
 *    if (!db.objectStoreNames.contains('reports')) {
 *      db.createObjectStore('reports', { keyPath: 'id' });
 *    }
 * 
 * 3. IndexedDB automáticamente ejecutará este código
 *    solo una vez, cuando se actualice
 */


// ============================================
// 6. USAR LOS DATOS EN REACT
// ============================================

/**
 * Ejemplo completo de componente que usa la API:
 * 
 * import React, { useState, useEffect } from 'react';
 * import { api } from '../src/api.js';
 * 
 * export default function MisUsuarios() {
 *   const [usuarios, setUsuarios] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     const cargar = async () => {
 *       const response = await api.getUsers();
 *       if (!response.error) {
 *         setUsuarios(response.data);
 *       }
 *       setLoading(false);
 *     };
 *     cargar();
 *   }, []);
 * 
 *   if (loading) return <div>Cargando...</div>;
 * 
 *   return (
 *     <ul>
 *       {usuarios.map(user => (
 *         <li key={user.id}>{user.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 */


// ============================================
// 7. LIMPIAR DATOS DE IndexedDB
// ============================================

/**
 * Código para ejecutar en la consola del navegador:
 * 
 * // Limpiar todos los datos
 * const db = indexedDB.open('QA_PRO_PROD_DB');
 * db.onsuccess = function() {
 *   const database = db.result;
 *   const stores = ['users', 'projects', 'tasks', 'notifications'];
 *   stores.forEach(store => {
 *     const transaction = database.transaction(store, 'readwrite');
 *     transaction.objectStore(store).clear();
 *   });
 * }
 * 
 * // O solo limpiar un tipo de dato:
 * const transaction = database.transaction('users', 'readwrite');
 * transaction.objectStore('users').clear();
 */


// ============================================
// 8. AGREGAR UN NUEVO ENDPOINT A LA API
// ============================================

/**
 * Ejemplo: Búsqueda de usuarios por nombre
 * 
 * En api.js, agregar:
 * 
 * async searchUsers(query) {
 *   try {
 *     const allUsers = await db.getAll('users');
 *     const filtered = allUsers.filter(user => 
 *       user.name.toLowerCase().includes(query.toLowerCase())
 *     );
 *     return { data: filtered, error: null };
 *   } catch (error) {
 *     return { data: null, error: error.message };
 *   }
 * }
 * 
 * Usar en el componente:
 * const results = await api.searchUsers('juan');
 */


// ============================================
// 9. EXPORT/IMPORT DE DATOS
// ============================================

/**
 * Exportar datos como JSON:
 * 
 * async function exportAllData() {
 *   const users = await db.getAll('users');
 *   const projects = await db.getAll('projects');
 *   const tasks = await db.getAll('tasks');
 *   
 *   const data = { users, projects, tasks };
 *   const json = JSON.stringify(data, null, 2);
 *   
 *   // Descargar archivo
 *   const blob = new Blob([json], { type: 'application/json' });
 *   const url = URL.createObjectURL(blob);
 *   const a = document.createElement('a');
 *   a.href = url;
 *   a.download = 'planify-backup.json';
 *   a.click();
 * }
 * 
 * Importar datos desde JSON:
 * 
 * async function importData(jsonData) {
 *   const data = JSON.parse(jsonData);
 *   
 *   for (const user of data.users) {
 *     await db.put('users', user);
 *   }
 *   for (const project of data.projects) {
 *     await db.put('projects', project);
 *   }
 *   // etc...
 * }
 */


// ============================================
// 10. AGREGAR TESTS EN CYPRESS
// ============================================

/**
 * En "Pruebas Planify.cy.js":
 * 
 * it("Mi nuevo test", () => {
 *   // Visitar la página
 *   cy.visit('http://localhost:5173/');
 *   
 *   // Hacer clic en un elemento
 *   cy.contains('Usuarios').click();
 *   
 *   // Verificar que algo existe
 *   cy.get('table').should('be.visible');
 *   
 *   // Llenar un formulario
 *   cy.get('input[name="name"]').type('Juan Pérez');
 *   
 *   // Enviar
 *   cy.get('button[type="submit"]').click();
 *   
 *   // Verificar resultado
 *   cy.contains('Guardado exitosamente').should('be.visible');
 * });
 */


// ============================================
// COMANDOS ÚTILES
// ============================================

/**
 * En la carpeta app/:
 * 
 * npm run dev        → Inicia la aplicación en desarrollo
 * npm run build      → Compila para producción
 * npm run preview    → Ve una vista previa del build
 * 
 * En la carpeta Cypress/:
 * 
 * npx cypress open   → Abre la interfaz de Cypress
 * npx cypress run    → Ejecuta tests sin UI
 */


// ============================================
// RESUMEN
// ============================================

/**
 * La arquitectura es simple:
 * 
 * database.js  →  Almacena datos en IndexedDB
 * api.js       →  Proporciona métodos CRUD
 * React        →  Consume la API
 * types.js     →  Define constantes
 * 
 * TODO funciona localmente, sin servidor backend.
 * Todos los datos se guardan en el navegador automáticamente.
 */

export const GUIA_MODIFICACION_COMPLETADA = true;
