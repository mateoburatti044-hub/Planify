
import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  FolderIcon, 
  ClipboardDocumentListIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { Toast, ToastType } from './Toast';
import { api } from '../services/mockApi';
import { Notification } from '../types';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within Layout");
  return context;
};

const NavItem = ({ to, icon: Icon, label, active, dataTestId }: any) => (
  <Link
    to={to}
    data-testid={dataTestId}
    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-planify-accent text-planify-text-primary shadow-accent-glow' 
        : 'text-planify-text-secondary hover:bg-planify-hover hover:text-planify-text-primary'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Fetch notifications
    const fetchNotifs = async () => {
      const res = await api.getNotifications();
      if (res.data) setNotifications(res.data);
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000);

    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const markRead = async (id: string) => {
    await api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: HomeIcon, dataTestId: 'nav-dashboard' },
    { to: '/projects', label: 'Projects', icon: FolderIcon, dataTestId: 'nav-projects' },
    { to: '/tasks', label: 'Board', icon: ClipboardDocumentListIcon, dataTestId: 'nav-tasks' },
    { to: '/users', label: 'Team', icon: UsersIcon, dataTestId: 'nav-users' },
    { to: '/reports', label: 'Reports', icon: ChartBarIcon, dataTestId: 'nav-reports' },
    { to: '/settings', label: 'Settings', icon: Cog6ToothIcon, dataTestId: 'nav-settings' },
  ];

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-planify-bg flex flex-col md:flex-row font-sans text-planify-text-primary">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-1 px-4 text-center text-xs font-bold z-[60] flex items-center justify-center animate-pulse">
            OFFLINE MODE: Limited functionality. Changes may not persist.
          </div>
        )}

        {/* Mobile Header */}
        <div className="md:hidden bg-planify-container border-b border-planify-border px-4 py-3 flex items-center justify-between sticky top-0 z-[50]">
          <div className="flex items-center">
             <Logo size={32} showText={false} />
            <span className="ml-2 font-black text-lg tracking-tighter">Planify</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 relative rounded-md hover:bg-planify-hover" onClick={() => setIsNotifOpen(!isNotifOpen)}>
               <BellIcon className="w-6 h-6 text-planify-text-muted" />
               {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-planify-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-planify-bg">
                  {unreadCount}
                </span>
               )}
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-planify-hover">
              {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/80 z-[40] md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed md:static inset-y-0 left-0 z-[50] w-72 bg-planify-container border-r border-planify-border transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
          <div className="hidden md:flex flex-col px-8 py-10">
            <Logo size={44} />
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                active={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))}
              />
            ))}
          </nav>

          <div className="p-6">
            <div className="flex items-center p-4 mb-4 bg-planify-panel rounded-2xl border border-planify-border">
              <div className="w-10 h-10 rounded-full bg-planify-accent flex items-center justify-center text-white font-black mr-3 border-2 border-planify-bg shadow-lg">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-planify-text-primary truncate" data-testid="user-profile-name">{user?.name}</p>
                <p className="text-[9px] text-planify-text-muted font-bold uppercase tracking-wider truncate">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              data-testid="logout-button"
              className="w-full flex items-center px-4 py-3 text-xs font-black text-red-400/80 uppercase tracking-widest rounded-xl hover:bg-red-500/10 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Terminate Session
            </button>
          </div>
        </aside>

        {/* Notification Dropdown */}
        {isNotifOpen && (
          <div ref={notifRef} className="fixed right-4 md:right-8 top-16 md:top-20 z-[100] w-80 max-h-[480px] bg-planify-container rounded-2xl shadow-2xl border border-planify-border flex flex-col overflow-hidden animate-fade-in ring-1 ring-planify-accent/20">
            <div className="p-4 border-b border-planify-border flex items-center justify-between bg-planify-panel/50">
              <h3 className="font-black text-xs uppercase tracking-widest text-planify-text-primary">Inbox Protocol</h3>
              <span className="text-[9px] font-black text-planify-accent-glow uppercase tracking-widest">{unreadCount} Pending</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-10 text-center">
                  <InformationCircleIcon className="w-10 h-10 text-planify-border mx-auto mb-3" />
                  <p className="text-planify-text-muted text-xs font-medium">Clear visibility. No pending items.</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => markRead(n.id)}
                    className={`p-5 border-b border-planify-border last:border-none cursor-pointer hover:bg-planify-hover transition ${!n.read ? 'bg-planify-accent/5' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${n.type === 'error' ? 'text-red-500' : 'text-planify-accent-light'}`}>{n.title}</span>
                      <span className="text-[8px] text-planify-text-muted font-bold">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-planify-text-secondary leading-relaxed font-medium">{n.message}</p>
                    {!n.read && <div className="mt-3 w-1.5 h-1.5 bg-planify-accent rounded-full shadow-[0_0_8px_#5B21B6]"></div>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Main Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <header className="hidden md:flex items-center justify-between px-10 h-20 bg-planify-bg/80 backdrop-blur-md sticky top-0 z-[30] border-b border-planify-border">
             <div className="flex items-center gap-4">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-planify-text-muted">Enterprise Console Protocol</h2>
             </div>
             <div className="flex items-center gap-6">
                <button 
                  className="p-2 relative rounded-xl hover:bg-planify-hover transition text-planify-text-muted hover:text-planify-accent-light"
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                >
                  <BellIcon className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-planify-accent text-white text-[10px] font-bold px-1 py-0.5 rounded-full ring-2 ring-planify-bg">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="h-6 w-px bg-planify-border"></div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-planify-panel border border-planify-border flex items-center justify-center text-planify-accent-light font-black shadow-inner">
                      {user?.name.charAt(0)}
                   </div>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </ToastContext.Provider>
  );
};
