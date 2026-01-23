
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/mockApi';
import { Project, ProjectStatus, Permission } from '../types';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  FolderIcon, 
  Squares2X2Icon, 
  TableCellsIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { SearchInput } from '../components/FormElements';

type ViewMode = 'grid' | 'table';

const Projects: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');

  const canManage = hasPermission(Permission.PROJECT_MANAGE);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.getProjects();
      if (res.data) setProjects(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!canManage) return;
    if (window.confirm("Permanently purge this project protocol?")) {
      setDeletingId(id);
      try {
        const res = await api.deleteProject(id);
        if (res.status < 300) {
          setProjects(prev => prev.filter(p => p.id !== id));
          showToast("Project protocol purged successfully.", "success");
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <ProjectsSkeleton />;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Project Protocols</h1>
          <p className="text-planify-text-secondary font-medium">Strategic governance of organizational workstreams.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-planify-container p-1 rounded-xl border border-planify-border">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-planify-accent text-white shadow-sm' : 'text-planify-text-muted hover:text-planify-text-primary'}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-planify-accent text-white shadow-sm' : 'text-planify-text-muted hover:text-planify-text-primary'}`}
              >
                <TableCellsIcon className="w-5 h-5" />
              </button>
           </div>
           {canManage && (
             <Link
               to="/projects/new"
               className="inline-flex items-center px-6 py-2.5 bg-planify-accent text-white rounded-xl hover:bg-planify-accent-hover font-black text-sm transition shadow-lg shadow-planify-accent/20"
             >
               <PlusIcon className="w-5 h-5 mr-2" />
               Initiate Protocol
             </Link>
           )}
        </div>
      </div>

      <div className="bg-planify-container p-6 rounded-2xl border border-planify-border shadow-2xl flex flex-col md:flex-row gap-4 items-center">
         <SearchInput 
            placeholder="Search protocol identity..."
            value={search}
            onChange={setSearch}
         />
         <div className="hidden md:block w-px h-8 bg-planify-border"></div>
         <div className="flex items-center gap-2 whitespace-nowrap text-[10px] font-black text-planify-text-muted uppercase tracking-widest px-2">
            Registry Count: {filtered.length}
         </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-planify-container border-2 border-dashed border-planify-border rounded-[2rem] p-32 text-center shadow-inner">
           <FolderIcon className="w-16 h-16 text-planify-panel mx-auto mb-4" />
           <p className="text-planify-text-muted font-black uppercase tracking-widest">No matching protocols identified</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} canManage={canManage} onDelete={handleDelete} deletingId={deletingId} />
          ))}
        </div>
      ) : (
        <div className="bg-planify-container rounded-[2rem] border border-planify-border shadow-2xl overflow-hidden">
           <table className="min-w-full divide-y divide-planify-border">
              <thead className="bg-planify-panel/30">
                 <tr className="text-left">
                    <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest">Identity</th>
                    <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest">Protocol Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest">Timeline Alignment</th>
                    <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-planify-border bg-planify-container">
                 {filtered.map(project => (
                   <tr key={project.id} className="hover:bg-planify-hover transition group">
                      <td className="px-8 py-6">
                         <div className="font-black text-planify-text-primary group-hover:text-planify-accent-light transition-colors">{project.name}</div>
                         <div className="text-xs text-planify-text-muted truncate max-w-xs">{project.description}</div>
                      </td>
                      <td className="px-8 py-6">
                         <StatusBadge status={project.status} />
                      </td>
                      <td className="px-8 py-6">
                         <div className="text-xs font-bold text-planify-text-secondary">{project.startDate} &mdash; {project.endDate || 'Undetermined'}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                            {canManage && (
                              <>
                                <Link to={`/projects/${project.id}/edit`} className="p-2 text-planify-text-muted hover:text-planify-accent-light transition">
                                   <PencilSquareIcon className="w-5 h-5" />
                                </Link>
                                <button onClick={() => handleDelete(project.id)} className="p-2 text-planify-text-muted hover:text-red-500 transition">
                                   <TrashIcon className="w-5 h-5" />
                                </button>
                              </>
                            )}
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, canManage, onDelete, deletingId }: any) => (
  <div className="bg-planify-container p-8 rounded-[2rem] border border-planify-border shadow-2xl hover:shadow-card-hover hover:border-planify-accent/50 hover:scale-[1.02] transition-all group flex flex-col h-full relative overflow-hidden">
    {/* Brand Accent Bar */}
    <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent opacity-30 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="flex justify-between items-start mb-6">
       <StatusBadge status={project.status} />
       {canManage && (
         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
           <Link to={`/projects/${project.id}/edit`} className="p-2 bg-planify-panel rounded-lg text-planify-text-muted hover:text-planify-accent-light transition">
             <PencilSquareIcon className="w-5 h-5" />
           </Link>
           <button 
             onClick={() => onDelete(project.id)} 
             disabled={deletingId === project.id}
             className="p-2 bg-planify-panel rounded-lg text-planify-text-muted hover:text-red-500 transition"
           >
             <TrashIcon className="w-5 h-5" />
           </button>
         </div>
       )}
    </div>
    <h3 className="text-xl font-black text-planify-text-primary mb-2 group-hover:text-planify-accent-light transition-colors">{project.name}</h3>
    <p className="text-sm text-planify-text-secondary font-medium leading-relaxed mb-8 flex-1 opacity-80">{project.description || 'System mission objectives not established.'}</p>
    
    <div className="pt-6 border-t border-planify-border flex items-center justify-between">
       <div>
          <span className="block text-[10px] font-black text-planify-text-muted uppercase tracking-widest mb-1">Timeline Protocol</span>
          <span className="text-xs font-bold text-planify-text-primary">{project.startDate} &mdash; {project.endDate || 'Ongoing'}</span>
       </div>
       <Link to={`/tasks?projectId=${project.id}`} className="p-2.5 bg-planify-accent/10 text-planify-accent-light rounded-xl hover:bg-planify-accent hover:text-white transition shadow-sm group/btn ring-1 ring-planify-accent/20">
          <ArrowRightIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition" />
       </Link>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const styles = {
    [ProjectStatus.ACTIVE]: 'bg-planify-accent/10 text-planify-accent-glow border-planify-accent/20',
    [ProjectStatus.ON_HOLD]: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    [ProjectStatus.COMPLETED]: 'bg-green-500/10 text-green-500 border-green-500/20',
    [ProjectStatus.CANCELLED]: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${styles[status]}`}>{status}</span>;
};

const ProjectsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="flex justify-between items-center">
       <div className="h-10 bg-planify-container rounded w-1/4"></div>
       <div className="h-10 bg-planify-container rounded w-1/6"></div>
    </div>
    <div className="h-12 bg-planify-container rounded-2xl w-full"></div>
    <div className="grid grid-cols-3 gap-8">
      {[1,2,3].map(i => <div key={i} className="h-64 bg-planify-container rounded-[2rem]"></div>)}
    </div>
  </div>
);

export default Projects;
