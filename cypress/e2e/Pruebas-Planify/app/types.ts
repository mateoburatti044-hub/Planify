
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER'
}

export enum Permission {
  USER_CREATE = 'user.create',
  USER_EDIT = 'user.edit',
  USER_DELETE = 'user.delete',
  USER_VIEW = 'user.view',
  PROJECT_MANAGE = 'project.manage',
  TASK_MANAGE = 'task.manage'
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum TaskCategory {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  IMPROVEMENT = 'IMPROVEMENT',
  RESEARCH = 'RESEARCH'
}

export interface TaskComment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface TaskActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password_hash?: string;
  role: Role;
  permissions: Permission[];
  phone: string;
  address: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  category: TaskCategory;
  assigneeId: string;
  reporterId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  comments?: TaskComment[];
  activity?: TaskActivity[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
  errors?: Record<string, string>;
  status: number;
}
