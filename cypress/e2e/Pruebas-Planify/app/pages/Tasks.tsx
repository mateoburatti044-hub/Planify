
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/mockApi';
import { Task, TaskStatus, Priority, Project, Permission, User } from '../types';
import { PlusIcon, ClipboardDocumentListIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { SearchInput, Select } from '../components/FormElements';
import TaskDetailSidePanel from '../components/TaskDetailSidePanel';

const Tasks: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, hasPermission } = useAuth();
  const { showToast } = useToast();
  
  const projectIdParam = searchParams.get('projectId');
  const priorityParam = searchParams.get('priority') as Priority | null;
  const statusParam = searchParams.get('status') as TaskStatus | null;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [filterProject, setFilterProject] = useState(projectIdParam || '');
  const [filterStatus, setFilterStatus] = useState(statusParam || '');
  const [filterPriority, setFilterPriority] = useState(priorityParam || '');
  const [search, setSearch] = useState('');

  const canManage = hasPermission(Permission.TASK_MANAGE);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [taskRes, projRes, userRes] = await Promise.all([
        api.getTasks({ projectId: filterProject || undefined }),
        api.getProjects(),
        api.getUsers()
      ]);
      if (taskRes.data) setTasks(taskRes.data);
      if (projRes.data) setProjects(projRes.data);
      if (userRes.data) setUsers(userRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterProject]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const statusMatch = filterStatus ? t.status === filterStatus : true;
      const priorityMatch = filterPriority ? t.priority === filterPriority : true;
      const searchMatch = t.title.toLowerCase().includes(search.toLowerCase()) || (t.description || '').toLowerCase().includes(search.toLowerCase());
      return statusMatch && priorityMatch && searchMatch;
    });
  }, [tasks, filterStatus, filterPriority, search]);

  const handleTaskDrop = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
      const res = await api.updateTask(taskId, { status: newStatus });
      if (res.status >= 300) {
        showToast("System Protocol Error: Failed to update assignment status.", "error");
        fetchData();
      }
    } catch (err) {
      showToast("Connectivity Protocol Error.", "error");
      fetchData();
    }
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const closeDetail = () => {
    setSelectedTaskId(null);
    fetchData();
  };

  if (loading) return <TasksSkeleton />;

  return (
    <div className="space-y-10 min-h-screen pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Mission Board</h1>
          <p className="text-planify-text-secondary font-medium">Coordinate deployment vectors across the organizational workflow.</p>
        </div>
        {canManage && (
          <Link
            to={`/tasks/new${filterProject ? `?projectId=${filterProject}` : ''}`}
            className="inline-flex items-center px-6 py-2.5 bg-planify-accent text-white rounded-xl hover:bg-planify-accent-hover font-black text-sm transition shadow-lg shadow-planify-accent/20"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Initiate Assignment
          </Link>
        )}
      </div>

      <div className="bg-planify-container p-6 rounded-2xl border border-planify-border shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
         <SearchInput 
            placeholder="Search assignments..."
            value={search}
            onChange={setSearch}
            className="flex-1"
         />
         <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <Select 
               value={filterProject} 
               onChange={(e: any) => setFilterProject(e.target.value)}
               className="!py-2 min-w-[160px] !bg-planify-panel"
               options={[{ value: '', label: 'All Projects' }, ...projects.map(p => ({ value: p.id, label: p.name }))]}
            />
            <Select 
               value={filterPriority} 
               onChange={(e: any) => setFilterPriority(e.target.value)}
               className="!py-2 min-w-[140px] !bg-planify-panel"
               options={[{ value: '', label: 'All Severities' }, ...Object.values(Priority).map(p => ({ value: p, label: p }))]}
            />
            {(filterProject || filterStatus || filterPriority || search) && (
               <button 
                  onClick={() => { setFilterProject(''); setFilterStatus(''); setFilterPriority(''); setSearch(''); }}
                  className="text-xs font-black text-planify-accent-light uppercase tracking-widest px-2 hover:underline"
               >
                  Reset Protocol
               </button>
            )}
         </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
        <KanbanColumn 
          title="BACKLOG" 
          status={TaskStatus.TODO} 
          tasks={filteredTasks.filter(t => t.status === TaskStatus.TODO)}
          onDrop={handleTaskDrop}
          onTaskClick={handleTaskClick}
          users={users}
        />
        <KanbanColumn 
          title="OPERATIONAL" 
          status={TaskStatus.IN_PROGRESS} 
          tasks={filteredTasks.filter(t => t.status === TaskStatus.IN_PROGRESS)}
          onDrop={handleTaskDrop}
          onTaskClick={handleTaskClick}
          users={users}
        />
        <KanbanColumn 
          title="VALIDATION" 
          status={TaskStatus.REVIEW} 
          tasks={filteredTasks.filter(t => t.status === TaskStatus.REVIEW)}
          onDrop={handleTaskDrop}
          onTaskClick={handleTaskClick}
          users={users}
        />
        <KanbanColumn 
          title="DEPLOYED" 
          status={TaskStatus.DONE} 
          tasks={filteredTasks.filter(t => t.status === TaskStatus.DONE)}
          onDrop={handleTaskDrop}
          onTaskClick={handleTaskClick}
          users={users}
        />
      </div>

      {/* Side Panel Task Detail */}
      {selectedTaskId && (
        <TaskDetailSidePanel 
          taskId={selectedTaskId} 
          onClose={closeDetail} 
          projects={projects}
          users={users}
        />
      )}
    </div>
  );
};

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDrop: (taskId: string, status: TaskStatus) => void;
  onTaskClick: (taskId: string) => void;
  users: User[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, status, tasks, onDrop, onTaskClick, users }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  return (
    <div 
      className={`flex flex-col min-h-[600px] w-full bg-planify-container rounded-[2rem] p-4 transition-all duration-300 border-2 ${isOver ? 'border-planify-accent bg-planify-accent/5 shadow-accent-glow' : 'border-planify-border shadow-2xl'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-6 px-4">
        <h3 className="text-[10px] font-black text-planify-text-muted uppercase tracking-[0.25em]">{title}</h3>
        <span className="bg-planify-panel text-planify-text-primary text-[10px] font-black px-2.5 py-1 rounded-full border border-planify-border">{tasks.length}</span>
      </div>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task.id)} users={users} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-planify-text-muted opacity-20">
            <ClipboardDocumentListIcon className="w-12 h-12 mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest">Protocol Buffer Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  users: User[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, users }) => {
  const assignee = users.find(u => u.id === task.assigneeId);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const priorityStyles = {
    [Priority.LOW]: 'text-planify-text-muted',
    [Priority.MEDIUM]: 'text-planify-accent-light',
    [Priority.HIGH]: 'text-amber-500',
    [Priority.CRITICAL]: 'text-red-500',
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="bg-planify-panel p-5 rounded-2xl shadow-lg border border-planify-border hover:shadow-card-hover hover:border-planify-accent/50 transition-all cursor-pointer group active:scale-95 active:rotate-1 relative overflow-hidden"
    >
      {/* Accent Indicator */}
      <div className={`absolute left-0 top-0 h-full w-1 ${task.priority === Priority.CRITICAL ? 'bg-red-500' : 'bg-planify-accent'} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className="flex items-start justify-between mb-3">
        <span className={`text-[9px] font-black uppercase tracking-widest ${priorityStyles[task.priority]}`}>
          {task.priority} Vector
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-planify-accent-glow animate-pulse"></div>
        </div>
      </div>
      <h4 className="text-sm font-bold text-planify-text-primary leading-snug group-hover:text-planify-accent-light transition-colors line-clamp-2">{task.title}</h4>
      
      <div className="mt-5 pt-4 border-t border-planify-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {assignee ? (
            <div className="w-6 h-6 rounded-full bg-planify-accent text-white flex items-center justify-center text-[10px] font-black border border-planify-bg shadow-sm ring-1 ring-planify-accent-glow/20">
              {assignee.name.charAt(0)}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-planify-hover border border-planify-border flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-planify-text-muted" />
            </div>
          )}
          {task.dueDate && (
             <span className="text-[9px] font-bold text-planify-text-muted flex items-center gap-1">
               <CalendarIcon className="w-3 h-3" />
               {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
             </span>
          )}
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-planify-text-muted/40 group-hover:text-planify-accent-glow/60 transition-colors uppercase tracking-tight">{task.id}</span>
        </div>
      </div>
    </div>
  );
};

const TasksSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-10 bg-planify-container rounded w-1/4"></div>
    <div className="h-14 bg-planify-container rounded-2xl w-full"></div>
    <div className="grid grid-cols-4 gap-6">
      {[1,2,3,4].map(i => (
        <div key={i} className="h-80 bg-planify-container rounded-[2rem] p-4 space-y-4">
          <div className="h-4 bg-planify-panel rounded w-1/2 mb-4"></div>
          <div className="h-24 bg-planify-panel rounded-2xl shadow-sm border border-planify-border"></div>
          <div className="h-24 bg-planify-panel rounded-2xl shadow-sm border border-planify-border"></div>
        </div>
      ))}
    </div>
  </div>
);

export default Tasks;
