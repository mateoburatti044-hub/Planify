
import { ProjectStatus, TaskStatus, Priority, Permission, TaskCategory } from './types';

export const ADMIN_PERMISSIONS = [
  Permission.USER_CREATE,
  Permission.USER_EDIT,
  Permission.USER_DELETE,
  Permission.USER_VIEW,
  Permission.PROJECT_MANAGE,
  Permission.TASK_MANAGE
];

export const APP_CONFIG = {
  API_DELAY: 300,
  SYSTEM_VERSION: '3.0.0-planify',
  INITIAL_ADMIN_EMAIL: 'admin@planify.io',
  INITIAL_ADMIN_PASS: 'password123'
};

// Seed Projects and Tasks are kept for initial DB bootstrap only
export const SEED_PROJECTS = [
  { 
    id: 'p-1', 
    name: 'Planify Core Launch', 
    description: 'Initial branding and functional rollout of the Planify SaaS platform.', 
    status: ProjectStatus.ACTIVE, 
    startDate: '2025-01-01', 
    endDate: '2025-06-30', 
    ownerId: 'u-admin', 
    createdAt: '2025-01-01', 
    updatedAt: '2025-01-01' 
  }
];

export const SEED_TASKS = [
  { 
    id: 't-1', 
    projectId: 'p-1', 
    title: 'Finalize Branding Assets', 
    description: 'Implement dark theme, violet accents, and updated slogans across the dashboard and login screens.', 
    status: TaskStatus.DONE, 
    priority: Priority.CRITICAL, 
    category: TaskCategory.FEATURE,
    assigneeId: 'u-admin', 
    reporterId: 'u-admin', 
    dueDate: '2025-02-15', 
    createdAt: '2025-01-10', 
    updatedAt: '2025-02-15' 
  }
];
