/**
 * HERRAMIENTA DE DEBUGGING - Eliminar Usuarios Directamente
 * 
 * Uso en la consola del navegador:
 * await window.deleteUserQuick('user_id')
 * 
 * Ejemplo:
 * await window.deleteUserQuick('1706000000000')
 */

// Asegúrate de que se ejecute después de que la app cargue
window.planifyTools = {
  /**
   * Eliminar usuario directamente sin validaciones
   */
  async deleteUserQuick(userId) {
    try {
      // Obtener la función deleteUser del módulo api
      const response = await fetch('http://localhost:3000/src/api.js');
      
      // Alternativa: usar directamente IndexedDB
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('QA_PRO_PROD_DB', 2);

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('users', 'readwrite');
          const store = transaction.objectStore('users');
          const deleteRequest = store.delete(userId);

          deleteRequest.onsuccess = () => {
            resolve({
              success: true,
              message: `Usuario ${userId} eliminado correctamente`,
              userId
            });
          };

          deleteRequest.onerror = () => {
            reject({
              success: false,
              error: `Error al eliminar usuario ${userId}`
            });
          };
        };

        request.onerror = () => {
          reject({
            success: false,
            error: 'No se pudo abrir IndexedDB'
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Listar todos los usuarios
   */
  async listAllUsers() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QA_PRO_PROD_DB', 2);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('users', 'readonly');
        const store = transaction.objectStore('users');
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          console.table(getAllRequest.result);
          resolve(getAllRequest.result);
        };

        getAllRequest.onerror = () => {
          reject({ error: 'Error al obtener usuarios' });
        };
      };

      request.onerror = () => {
        reject({ error: 'No se pudo abrir IndexedDB' });
      };
    });
  },

  /**
   * Crear usuario de prueba
   */
  async createTestUser(firstName = 'Test', lastName = 'User', email = null) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QA_PRO_PROD_DB', 2);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('users', 'readwrite');
        const store = transaction.objectStore('users');

        const newUser = {
          id: Date.now().toString(),
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email: email || `${firstName.toLowerCase()}@test.com`,
          role: 'USER',
          permissions: [],
          phone: '+34 123 456 789',
          address: 'Test Address',
          isActive: true,
          createdAt: new Date().toISOString()
        };

        const putRequest = store.put(newUser);

        putRequest.onsuccess = () => {
          resolve({
            success: true,
            message: `Usuario creado: ${newUser.name}`,
            user: newUser
          });
        };

        putRequest.onerror = () => {
          reject({ error: 'Error al crear usuario' });
        };
      };

      request.onerror = () => {
        reject({ error: 'No se pudo abrir IndexedDB' });
      };
    });
  },

  /**
   * Limpiar todos los usuarios
   */
  async clearAllUsers() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QA_PRO_PROD_DB', 2);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('users', 'readwrite');
        const store = transaction.objectStore('users');
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
          resolve({
            success: true,
            message: 'Todos los usuarios han sido eliminados'
          });
        };

        clearRequest.onerror = () => {
          reject({ error: 'Error al limpiar usuarios' });
        };
      };

      request.onerror = () => {
        reject({ error: 'No se pudo abrir IndexedDB' });
      };
    });
  },

  /**
   * Obtener usuario por ID
   */
  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QA_PRO_PROD_DB', 2);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('users', 'readonly');
        const store = transaction.objectStore('users');
        const getRequest = store.get(userId);

        getRequest.onsuccess = () => {
          resolve(getRequest.result);
        };

        getRequest.onerror = () => {
          reject({ error: 'Usuario no encontrado' });
        };
      };

      request.onerror = () => {
        reject({ error: 'No se pudo abrir IndexedDB' });
      };
    });
  },

  /**
   * Ayuda
   */
  help() {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║          HERRAMIENTAS DE DEBUGGING - PLANIFY                   ║
╚════════════════════════════════════════════════════════════════╝

COMANDOS DISPONIBLES:

1. Listar usuarios:
   await window.planifyTools.listAllUsers()

2. Eliminar usuario por ID:
   await window.planifyTools.deleteUserQuick('user_id')

3. Crear usuario de prueba:
   await window.planifyTools.createTestUser('Juan', 'Pérez')

4. Obtener usuario por ID:
   await window.planifyTools.getUserById('user_id')

5. Limpiar TODOS los usuarios:
   await window.planifyTools.clearAllUsers()

EJEMPLOS:

// Ver todos los usuarios
await window.planifyTools.listAllUsers()

// Crear un usuario de prueba
const newUser = await window.planifyTools.createTestUser('Carlos', 'López', 'carlos@test.com')
console.log('Usuario creado:', newUser.user.id)

// Eliminar el usuario creado
await window.planifyTools.deleteUserQuick(newUser.user.id)

    `);
  }
};

// Hacer disponible globalmente
window.deleteUserQuick = window.planifyTools.deleteUserQuick.bind(window.planifyTools);
window.listAllUsers = window.planifyTools.listAllUsers.bind(window.planifyTools);
window.createTestUser = window.planifyTools.createTestUser.bind(window.planifyTools);
window.clearAllUsers = window.planifyTools.clearAllUsers.bind(window.planifyTools);

console.log('✅ Herramientas de Planify cargadas. Escribe: window.planifyTools.help()');
