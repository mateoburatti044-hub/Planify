import { db } from '../database';
import { persistenceService } from './persistenceService';
import { User, Project, Task } from '../types';

/**
 * Servicio de inicialización de datos
 * Carga datos del backup al iniciar la aplicación
 */
export class InitializationService {
  /**
   * Inicializar base de datos con datos del backup
   * Se ejecuta al cargar la aplicación
   */
  static async initializeDatabase(): Promise<void> {
    try {
      // Verificar si ya hay datos en la base de datos
      const existingUsers = await db.getAll<User>('users');
      const existingProjects = await db.getAll<Project>('projects');
      const existingTasks = await db.getAll<Task>('tasks');

      // Si no hay datos, intentar cargar del backup
      if (existingUsers.length === 0 && existingProjects.length === 0 && existingTasks.length === 0) {
        const backup = persistenceService.loadBackup();
        
        if (backup && backup.users.length > 0) {
          console.log('📦 Restaurando datos del backup...');
          
          // Restaurar usuarios
          for (const user of backup.users) {
            await db.put('users', user);
          }
          console.log(`✓ ${backup.users.length} usuarios restaurados`);
          
          // Restaurar proyectos
          for (const project of backup.projects) {
            await db.put('projects', project);
          }
          console.log(`✓ ${backup.projects.length} proyectos restaurados`);
          
          // Restaurar tareas
          for (const task of backup.tasks) {
            await db.put('tasks', task);
          }
          console.log(`✓ ${backup.tasks.length} tareas restauradas`);
          
          console.log('✅ Base de datos inicializada correctamente desde backup');
        } else {
          console.log('ℹ️ No hay backup disponible. Iniciando con base de datos vacía.');
        }
      } else {
        console.log(`ℹ️ Base de datos ya contiene datos (${existingUsers.length} usuarios, ${existingProjects.length} proyectos, ${existingTasks.length} tareas)`);
      }
    } catch (error) {
      console.error('❌ Error al inicializar base de datos:', error);
      // No lanzar error, permitir que la app continúe
    }
  }

  /**
   * Sincronizar cambios en base de datos con persistencia
   * Se ejecuta después de operaciones CRUD importantes
   */
  static async syncToPersistence(): Promise<void> {
    try {
      const users = await db.getAll<User>('users');
      const projects = await db.getAll<Project>('projects');
      const tasks = await db.getAll<Task>('tasks');
      
      persistenceService.saveBackup(users, projects, tasks);
    } catch (error) {
      console.error('Error al sincronizar con persistencia:', error);
    }
  }
}

export const initializationService = InitializationService;
