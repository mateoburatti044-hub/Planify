
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';

// Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const Tasks = lazy(() => import('./pages/Tasks'));
const TaskForm = lazy(() => import('./pages/TaskForm'));
const Users = lazy(() => import('./pages/Users'));
const UserForm = lazy(() => import('./pages/UserForm'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center p-12" data-testid="global-loader">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Private Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              
              {/* Projects */}
              <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="/projects/new" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
              <Route path="/projects/:id/edit" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
              
              {/* Tasks */}
              <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/tasks/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
              <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
              
              {/* Users */}
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
              <Route path="/users/:id/edit" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
              
              {/* Other Modules */}
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
