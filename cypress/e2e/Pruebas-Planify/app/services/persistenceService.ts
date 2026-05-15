import { User, Project, Task } from '../types';

const STORAGE_KEYS = {
  USERS: 'planify_users_backup',
  PROJECTS: 'planify_projects_backup',
  TASKS: 'planify_tasks_backup',
  BACKUP_METADATA: 'planify_backup_metadata'
};

export interface BackupData {
  users: User[];
  projects: Project[];
  tasks: Task[];
  timestamp: string;
  version: string;
}

class PersistenceService {
  /**
   * Guardar todos los datos en localStorage
   */
  saveBackup(users: User[], projects: Project[], tasks: Task[]): boolean {
    try {
      const backup: BackupData = {
        users,
        projects,
        tasks,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      localStorage.setItem(STORAGE_KEYS.BACKUP_METADATA, JSON.stringify({
        timestamp: backup.timestamp,
        version: backup.version,
        userCount: users.length,
        projectCount: projects.length,
        taskCount: tasks.length
      }));

      console.log('✓ Backup guardado correctamente', backup);
      return true;
    } catch (error) {
      console.error('✗ Error al guardar backup:', error);
      return false;
    }
  }

  /**
   * Cargar datos desde localStorage
   */
  loadBackup(): BackupData | null {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      const projects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      const metadata = localStorage.getItem(STORAGE_KEYS.BACKUP_METADATA);

      if (users && projects && tasks && metadata) {
        return {
          users: JSON.parse(users),
          projects: JSON.parse(projects),
          tasks: JSON.parse(tasks),
          timestamp: JSON.parse(metadata).timestamp,
          version: JSON.parse(metadata).version
        };
      }
      return null;
    } catch (error) {
      console.error('✗ Error al cargar backup:', error);
      return null;
    }
  }

  /**
   * Exportar datos como archivo JSON
   */
  exportData(users: User[], projects: Project[], tasks: Task[]): string {
    const backup: BackupData = {
      users,
      projects,
      tasks,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    return JSON.stringify(backup, null, 2);
  }

  /**
   * Descargar datos como archivo
   */
  downloadBackup(users: User[], projects: Project[], tasks: Task[]): void {
    const data = this.exportData(users, projects, tasks);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `planify-backup-${new Date().toISOString().slice(0, 10)}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /**
   * Importar datos desde archivo JSON
   */
  async importData(file: File): Promise<BackupData | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as BackupData;
          this.saveBackup(data.users, data.projects, data.tasks);
          resolve(data);
        } catch (error) {
          console.error('✗ Error al importar datos:', error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    });
  }

  /**
   * Obtener metadata del último backup
   */
  getBackupMetadata(): any {
    try {
      const metadata = localStorage.getItem(STORAGE_KEYS.BACKUP_METADATA);
      return metadata ? JSON.parse(metadata) : null;
    } catch (error) {
      console.error('✗ Error al obtener metadata:', error);
      return null;
    }
  }

  /**
   * Limpiar todos los backups
   */
  clearBackup(): void {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.BACKUP_METADATA);
    console.log('✓ Backup eliminado');
  }

  /**
   * Verificar si hay backup disponible
   */
  hasBackup(): boolean {
    return localStorage.getItem(STORAGE_KEYS.BACKUP_METADATA) !== null;
  }
}

export const persistenceService = new PersistenceService();
