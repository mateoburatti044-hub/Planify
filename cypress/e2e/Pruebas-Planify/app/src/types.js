// Enums y tipos convertidos a JavaScript

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  DEVELOPER: 'DEVELOPER',
  USER: 'USER'
};

export const Permission = {
  USER_CREATE: 'user.create',
  USER_EDIT: 'user.edit',
  USER_DELETE: 'user.delete',
  USER_VIEW: 'user.view',
  PROJECT_MANAGE: 'project.manage',
  TASK_MANAGE: 'task.manage'
};

export const ProjectStatus = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE'
};

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export const TaskCategory = {
  FEATURE: 'FEATURE',
  BUG: 'BUG',
  IMPROVEMENT: 'IMPROVEMENT',
  RESEARCH: 'RESEARCH'
};
