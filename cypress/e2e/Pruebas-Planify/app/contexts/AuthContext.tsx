
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, Permission } from '../types';
import { api } from '../services/mockApi';
import { initializationService } from '../services/initializationService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  isRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Inicializar base de datos con backup si es necesario
        await initializationService.initializeDatabase();
        
        const jwt = localStorage.getItem('qa_pro_jwt');
        const savedUser = localStorage.getItem('qa_pro_session');
        
        if (jwt && savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            // Sync check with "server" registry
            const res = await api.getUsers();
            if (res.status === 200) {
              const current = res.data?.find(u => u.id === userData.id);
              if (current) {
                setUser(current);
                localStorage.setItem('qa_pro_session', JSON.stringify(current));
              } else {
                // Usuario no encontrado, logout
                localStorage.removeItem('qa_pro_jwt');
                localStorage.removeItem('qa_pro_session');
              }
            } else {
              // Error en la respuesta, logout
              localStorage.removeItem('qa_pro_jwt');
              localStorage.removeItem('qa_pro_session');
            }
          } catch (e) {
            // Error en la sincronización, logout
            localStorage.removeItem('qa_pro_jwt');
            localStorage.removeItem('qa_pro_session');
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error en inicialización:', error);
        setIsLoading(false);
      }
    };
    
    initApp();
  }, []);  const login = async (email: string, password?: string) => {
    try {
      const response = await api.login(email, password);
      if (response.data) {
        const { user: u, token } = response.data as any;
        setUser(u);
        localStorage.setItem('qa_pro_jwt', token);
        localStorage.setItem('qa_pro_session', JSON.stringify(u));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (e) {
      return { success: false, error: "Network error occurred during authorization." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qa_pro_session');
    localStorage.removeItem('qa_pro_jwt');
  };

  const hasPermission = (permission: Permission) => {
    if (!user) return false;
    if (user.role === Role.SUPER_ADMIN) return true;
    return user.permissions.includes(permission);
  };

  const isRole = (roles: Role[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
