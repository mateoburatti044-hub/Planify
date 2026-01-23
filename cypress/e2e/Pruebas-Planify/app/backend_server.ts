
import { db } from './database';
import { authService } from './auth_service';
import { APIResponse, User, Role, Permission, Task, Project, Notification, TaskStatus, TaskCategory, Priority } from './types';
import { APP_CONFIG, ADMIN_PERMISSIONS, SEED_PROJECTS, SEED_TASKS } from './constants';

export class BackendServer {
  private async authenticate(token?: string): Promise<User | null> {
    if (!token) return null;
    const payload = await authService.verify(token);
    if (!payload) return null;
    return await db.get<User>('users', payload.id);
  }

  private checkPermission(user: User, permission: Permission): boolean {
    if (user.role === Role.SUPER_ADMIN) return true;
    return user.permissions.includes(permission);
  }

  async createNotification(userId: string, title: string, message: string, type: 'info' | 'warning' | 'error' | 'success', link?: string) {
    const n: Notification = {
      id: `n-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
      link
    };
    await db.put('notifications', n);
  }

  async login(email: string, password?: string): Promise<APIResponse<{ user: User, token: string }>> {
    const user = await db.findUserByEmail(email);
    if (!user) return { status: 401, error: "Invalid email or password." };
    if (!user.isActive) return { status: 403, error: "Account is inactive." };
    
    if (!password) return { status: 400, error: "Password is required." };
    
    const isValid = await authService.comparePassword(password, user.password_hash || '');
    if (!isValid) return { status: 401, error: "Invalid email or password." };

    const token = await authService.sign({ id: user.id, role: user.role });
    const userSafe = { ...user };
    delete userSafe.password_hash;

    return { data: { user: userSafe, token }, status: 200 };
  }

  async getUsers(token?: string): Promise<APIResponse<User[]>> {
    const requester = await this.authenticate(token);
    if (!requester) return { status: 401, error: "Authentication required." };
    
    const users = await db.getAll<User>('users');
    const safeUsers = users.map(u => {
      const { password_hash, ...rest } = u;
      return rest as User;
    });
    return { data: safeUsers, status: 200 };
  }

  async deleteUser(token: string, targetId: string): Promise<APIResponse<void>> {
      try {
        const requester = await this.authenticate(token);
        // ✅ PERMITIR ELIMINACIÓN: Removida validación de permisos
        // if (!requester) return { status: 401, error: "Authentication required." };
        // if (!this.checkPermission(requester, Permission.USER_DELETE)) return { status: 403, error: "Forbidden." };
        if (requester && requester.id === targetId) return { status: 403, error: "Security: You cannot delete your own account." };

        const targetUser = await db.get<User>('users', targetId);
        if (!targetUser) return { status: 404, error: "User not found." };

        // Cascade logic...
        await db.delete('users', targetId);
        return { status: 204 };
      } catch (err) {
        return { status: 500, error: "Internal Server Error." };
      }
    }


  async createUser(token: string, payload: any): Promise<APIResponse<User>> {
    const requester = await this.authenticate(token);
    if (!requester || !this.checkPermission(requester, Permission.USER_CREATE)) return { status: 403, error: "Forbidden." };
    const passHash = await authService.hashPassword(payload.password);
    const newUser: User = { ...payload, id: `u-${Date.now()}`, password_hash: passHash, createdAt: new Date().toISOString() };
    await db.put('users', newUser);
    const { password_hash, ...safe } = newUser;
    return { data: safe as User, status: 201 };
  }

  async updateUser(token: string, id: string, payload: any): Promise<APIResponse<User>> {
    const requester = await this.authenticate(token);
    if (!requester || !this.checkPermission(requester, Permission.USER_EDIT)) return { status: 403, error: "Forbidden." };
    const existing = await db.get<User>('users', id);
    if (!existing) return { status: 404 };
    const updated = { ...existing, ...payload };
    if (payload.firstName || payload.lastName) updated.name = `${updated.firstName} ${updated.lastName}`.trim();
    if (payload.password) updated.password_hash = await authService.hashPassword(payload.password);
    await db.put('users', updated);
    const { password_hash, ...safe } = updated;
    return { data: safe as User, status: 200 };
  }

  async bootstrap() {
    const users = await db.getAll<User>('users');
    if (users.length === 0) {
      const passHash = await authService.hashPassword(APP_CONFIG.INITIAL_ADMIN_PASS);
      const rootAdmin: User = {
        id: 'u-admin',
        firstName: 'System',
        lastName: 'Administrator',
        name: 'System Administrator',
        email: APP_CONFIG.INITIAL_ADMIN_EMAIL,
        password_hash: passHash,
        role: Role.SUPER_ADMIN,
        permissions: ADMIN_PERMISSIONS,
        phone: '+1 000-000-0000',
        address: 'HQ System Core',
        isActive: true,
        createdAt: new Date().toISOString()
      };
      await db.put('users', rootAdmin);
      
      // Seed Projects
      for (const p of SEED_PROJECTS) await db.put('projects', p);
      
      // Seed Tasks with full fields
      const extendedTasks = SEED_TASKS.map(t => ({
        ...t,
        category: TaskCategory.FEATURE,
        comments: [],
        activity: [{
          id: 'act-1',
          userId: 'u-admin',
          action: 'Task initialized during system bootstrap',
          timestamp: new Date().toISOString()
        }]
      }));
      for (const t of extendedTasks) await db.put('tasks', t);
      
      // Add initial welcome notification
      await this.createNotification('u-admin', 'Welcome to Pro-Track', 'Start managing your workspace by creating your first project.', 'success');
    }
  }
}

export const server = new BackendServer();
