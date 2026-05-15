
import { server } from '../backend_server';
import { db } from '../database';
import { APIResponse, User, Project, Task, Notification } from '../types';
import { persistenceService } from './persistenceService';

// Función auxiliar para guardar backup automático
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

export const api = {
  login: async (email: string, password?: string): Promise<APIResponse<{ user: User, token: string }>> => {
    return await server.login(email, password);
  },

  getUsers: async (): Promise<APIResponse<User[]>> => {
    const token = localStorage.getItem('qa_pro_jwt') || undefined;
    return await server.getUsers(token);
  },
  
  deleteUser: async (id: string): Promise<APIResponse<void>> => {
    const token = localStorage.getItem('qa_pro_jwt') || '';
    return await server.deleteUser(token, id);
  },

  getUser: async (id: string): Promise<APIResponse<User>> => {
    const data = await db.get<User>('users', id);
    if (data) {
       const { password_hash, ...rest } = data;
       return { data: rest as User, status: 200 };
    }
    return { status: 404, error: "User profile not found in directory." };
  },

  createUser: async (payload: any): Promise<APIResponse<User>> => {
    const token = localStorage.getItem('qa_pro_jwt') || '';
    return await server.createUser(token, payload);
  },

  updateUser: async (id: string, payload: any): Promise<APIResponse<User>> => {
    const token = localStorage.getItem('qa_pro_jwt') || '';
    return await server.updateUser(token, id, payload);
  },

  getProjects: async (): Promise<APIResponse<Project[]>> => {
    const data = await db.getAll<Project>('projects');
    return { data, status: 200 };
  },

  getProject: async (id: string): Promise<APIResponse<Project>> => {
    const data = await db.get<Project>('projects', id);
    return { data: data || undefined, status: data ? 200 : 404, error: data ? undefined : "Project record not found." };
  },

  createProject: async (p: any): Promise<APIResponse<Project>> => {
    const np = { ...p, id: `p-${Date.now()}`, createdAt: new Date().toISOString() };
    await db.put('projects', np);
    await autoBackup();
    return { data: np, status: 201 };
  },

  updateProject: async (id: string, p: any): Promise<APIResponse<Project>> => {
    const ex = await db.get<Project>('projects', id);
    if (!ex) return { status: 404, error: "Cannot update: Project not found." };
    const up = { ...ex, ...p, updatedAt: new Date().toISOString() };
    await db.put('projects', up);
    await autoBackup();
    return { data: up, status: 200 };
  },

  deleteProject: async (id: string): Promise<APIResponse<void>> => {
    await db.delete('projects', id);
    await autoBackup();
    return { status: 204 };
  },

  getTasks: async (filters?: { projectId?: string }): Promise<APIResponse<Task[]>> => {
    let tasks = await db.getAll<Task>('tasks');
    if (filters?.projectId) tasks = tasks.filter(t => t.projectId === filters.projectId);
    return { data: tasks, status: 200 };
  },

  getTask: async (id: string): Promise<APIResponse<Task>> => {
    const data = await db.get<Task>('tasks', id);
    return { data: data || undefined, status: data ? 200 : 404, error: data ? undefined : "Task record not found." };
  },

  createTask: async (t: any): Promise<APIResponse<Task>> => {
    const nt = { ...t, id: `t-${Date.now()}`, createdAt: new Date().toISOString() };
    await db.put('tasks', nt);
    await autoBackup();
    return { data: nt, status: 201 };
  },

  updateTask: async (id: string, t: any): Promise<APIResponse<Task>> => {
    const ex = await db.get<Task>('tasks', id);
    if (!ex) return { status: 404, error: "Cannot update: Task not found." };
    const up = { ...ex, ...t, updatedAt: new Date().toISOString() };
    await db.put('tasks', up);
    await autoBackup();
    return { data: up, status: 200 };
  },

  deleteTask: async (id: string): Promise<APIResponse<void>> => {
    await db.delete('tasks', id);
    await autoBackup();
    return { status: 204 };
  },

  getNotifications: async (): Promise<APIResponse<Notification[]>> => {
    const data = await db.getAll<Notification>('notifications');
    return { data: data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), status: 200 };
  },

  markNotificationRead: async (id: string): Promise<APIResponse<void>> => {
    const n = await db.get<Notification>('notifications', id);
    if (n) {
      await db.put('notifications', { ...n, read: true });
    }
    return { status: 200 };
  }
};

// Initialize server bootstrap (handles initial admin creation and DB setup)
server.bootstrap();
