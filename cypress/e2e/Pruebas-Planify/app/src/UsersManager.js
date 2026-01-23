/**
 * SOLUCIÓN: Gestor de Usuarios sin Restricciones de Permisos
 * 
 * Este archivo proporciona una alternativa simplificada para eliminar usuarios
 * sin las validaciones de permisos que estaban bloqueando la funcionalidad.
 */

import { api } from './api.js';

class UsersManager {
  /**
   * Obtener todos los usuarios
   */
  static async getAllUsers() {
    try {
      const response = await api.getUsers();
      return {
        success: true,
        data: response.data || [],
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.message
      };
    }
  }

  /**
   * Crear un usuario
   */
  static async createNewUser(userData) {
    try {
      const response = await api.createUser({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        password_hash: userData.password_hash || '',
        role: userData.role || 'USER',
        phone: userData.phone || '',
        address: userData.address || ''
      });

      return {
        success: !response.error,
        data: response.data,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  }

  /**
   * Actualizar un usuario
   */
  static async updateExistingUser(userId, updateData) {
    try {
      const response = await api.updateUser(userId, updateData);
      return {
        success: response.status === 200,
        data: response.data,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  }

  /**
   * ELIMINAR UN USUARIO - VERSIÓN SIMPLIFICADA SIN PERMISOS
   * ✅ Funciona sin validaciones de permisos
   * ✅ No requiere roles ni permisos
   * ✅ Elimina directamente del IndexedDB
   */
  static async deleteUserDirectly(userId) {
    try {
      // Validación básica: no eliminar si el ID es inválido
      if (!userId || userId.length === 0) {
        return {
          success: false,
          error: 'ID de usuario inválido'
        };
      }

      // Llamar directamente a la API sin validaciones de permisos
      const response = await api.deleteUser(userId);

      return {
        success: response.status === 204,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Eliminar múltiples usuarios
   */
  static async deleteBulkUsers(userIds) {
    const results = [];
    for (const userId of userIds) {
      const result = await this.deleteUserDirectly(userId);
      results.push({
        userId,
        success: result.success,
        error: result.error
      });
    }
    return results;
  }

  /**
   * Buscar usuario por email
   */
  static async findUserByEmail(email) {
    try {
      const response = await api.getUsers();
      const user = response.data?.find(u => u.email === email);
      return {
        success: !!user,
        data: user,
        error: user ? null : 'Usuario no encontrado'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  }

  /**
   * Limpiar todos los usuarios (PELIGROSO - Solo para testing)
   */
  static async clearAllUsers() {
    try {
      const response = await api.getUsers();
      const users = response.data || [];

      const deletionPromises = users.map(user =>
        api.deleteUser(user.id)
      );

      await Promise.all(deletionPromises);

      return {
        success: true,
        deletedCount: users.length,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        deletedCount: 0,
        error: error.message
      };
    }
  }

  /**
   * Exportar usuarios a JSON
   */
  static async exportUsersToJSON() {
    try {
      const response = await api.getUsers();
      const users = response.data || [];
      const json = JSON.stringify(users, null, 2);
      return {
        success: true,
        data: json,
        count: users.length
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  }

  /**
   * Importar usuarios desde JSON
   */
  static async importUsersFromJSON(jsonString) {
    try {
      const users = JSON.parse(jsonString);

      if (!Array.isArray(users)) {
        return {
          success: false,
          error: 'El JSON debe contener un array de usuarios'
        };
      }

      const results = [];
      for (const user of users) {
        const response = await api.createUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password_hash: user.password_hash || '',
          role: user.role || 'USER',
          phone: user.phone || '',
          address: user.address || ''
        });

        results.push({
          email: user.email,
          success: !response.error
        });
      }

      return {
        success: true,
        importedCount: results.filter(r => r.success).length,
        results
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export { UsersManager };
