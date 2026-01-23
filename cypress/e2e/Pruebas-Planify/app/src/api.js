// Servicio de API Mock para Planify - Gestión de datos locales sin backend
import { db } from './database.js';

class MockApiService {
  // ========== USUARIOS ==========
  
  async getUsers() {
    try {
      const users = await db.getAll('users');
      return { data: users, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async getUserById(id) {
    try {
      const user = await db.get('users', id);
      if (!user) {
        return { data: null, error: 'Usuario no encontrado' };
      }
      return { data: user, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async createUser(userData) {
    try {
      // Validar que el email no exista
      const existingUser = await db.findUserByEmail(userData.email);
      if (existingUser) {
        return { data: null, error: 'El email ya está registrado' };
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        isActive: true,
        permissions: []
      };

      await db.put('users', newUser);
      return { data: newUser, status: 201, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async updateUser(id, updateData) {
    try {
      const user = await db.get('users', id);
      if (!user) {
        return { data: null, status: 404, error: 'Usuario no encontrado' };
      }

      const updatedUser = { ...user, ...updateData };
      await db.put('users', updatedUser);
      return { data: updatedUser, status: 200, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async deleteUser(id) {
    try {
      await db.delete('users', id);
      return { status: 204, error: null };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }

  // ========== PROYECTOS ==========
  
  async getProjects() {
    try {
      const projects = await db.getAll('projects');
      return { data: projects, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async createProject(projectData) {
    try {
      const newProject = {
        id: Date.now().toString(),
        ...projectData,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE'
      };

      await db.put('projects', newProject);
      return { data: newProject, status: 201, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async updateProject(id, updateData) {
    try {
      const project = await db.get('projects', id);
      if (!project) {
        return { data: null, status: 404, error: 'Proyecto no encontrado' };
      }

      const updatedProject = { ...project, ...updateData };
      await db.put('projects', updatedProject);
      return { data: updatedProject, status: 200, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async deleteProject(id) {
    try {
      await db.delete('projects', id);
      return { status: 204, error: null };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }

  // ========== TAREAS ==========
  
  async getTasks() {
    try {
      const tasks = await db.getAll('tasks');
      return { data: tasks, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async createTask(taskData) {
    try {
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
        status: 'TODO'
      };

      await db.put('tasks', newTask);
      return { data: newTask, status: 201, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async updateTask(id, updateData) {
    try {
      const task = await db.get('tasks', id);
      if (!task) {
        return { data: null, status: 404, error: 'Tarea no encontrada' };
      }

      const updatedTask = { ...task, ...updateData };
      await db.put('tasks', updatedTask);
      return { data: updatedTask, status: 200, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }

  async deleteTask(id) {
    try {
      await db.delete('tasks', id);
      return { status: 204, error: null };
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }

  // ========== NOTIFICACIONES ==========
  
  async getNotifications() {
    try {
      const notifications = await db.getAll('notifications');
      return { data: notifications, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async createNotification(notificationData) {
    try {
      const newNotification = {
        id: Date.now().toString(),
        ...notificationData,
        createdAt: new Date().toISOString(),
        read: false
      };

      await db.put('notifications', newNotification);
      return { data: newNotification, status: 201, error: null };
    } catch (error) {
      return { data: null, status: 400, error: error.message };
    }
  }
}

export const api = new MockApiService();
