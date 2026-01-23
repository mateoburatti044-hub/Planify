
import { User, Project, Task, Notification } from './types';

const DB_NAME = 'QA_PRO_PROD_DB';
const DB_VERSION = 2; // Incremented version for notifications

export class Database {
  private db: IDBDatabase | null = null;

  async connect(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('notifications')) {
          db.createObjectStore('notifications', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(storeName: string, id: string): Promise<T | null> {
    const db = await this.connect();
    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.connect();
    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  async put<T>(storeName: string, data: T): Promise<void> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const db = await this.connect();
    return new Promise((resolve) => {
      const transaction = db.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const index = store.index('email');
      const request = index.get(email);
      request.onsuccess = () => resolve(request.result || null);
    });
  }
}

export const db = new Database();
