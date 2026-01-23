
import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/mockApi';
import { Project, Task, TaskStatus, Priority } from '../types';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip,
} from 'recharts';
import { 
  BriefcaseIcon, 
  ClipboardDocumentCheckIcon, 
  ClockIcon, 
  ExclamationCircleIcon,
  Squares2X2Icon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

type KPIFilter = 'all' | 'active' | 'overdue' | 'in-progress';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKpi, setActiveKpi] = useState<KPIFilter>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, taskRes] = await Promise.all([
          api.getProjects(),
          api.getTasks()
        ]);
        if (projRes.data) setProjects(projRes.data);
        if (taskRes.data) setTasks(taskRes.data);
      } catch (err) {
        console.error("Network data fetch failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const safeTasks = tasks || [];
    const overdueCount = safeTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.DONE).length;
    return {
      totalProjects: projects.length,
      totalTasks: safeTasks.length,
      inProgress: safeTasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      overdue: overdueCount,
    };
  }, [projects, tasks]);

  const severityData = useMemo(() => {
    const safeTasks = tasks || [];
    return [
      { name: 'Critical', value: safeTasks.filter(t => t.priority === Priority.CRITICAL).length, color: '#EF4444', key: Priority.CRITICAL },
      { name: 'High', value: safeTasks.filter(t => t.priority === Priority.HIGH).length, color: '#F59E0B', key: Priority.HIGH },
      { name: 'Medium', value: safeTasks.filter(t => t.priority === Priority.MEDIUM).length, color: '#6D28D9', key: Priority.MEDIUM },
      { name: 'Low', value: safeTasks.filter(t => t.priority === Priority.LOW).length, color: '#374151', key: Priority.LOW },
    ];
  }, [tasks]);

  const handleSeverityClick = (data: any) => {
    if (data.key) {
      navigate(`/tasks?priority=${data.key}`);
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeKpi === 'all') return projects;
    if (activeKpi === 'active') return projects.filter(p => p.status === 'ACTIVE');
    return projects;
  }, [projects, activeKpi]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Strategic Overview</h1>
          <p className="text-planify-text-secondary mt-2 font-medium">Aggregated real-time insights for {projects.length} workstreams.</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black text-planify-accent-glow uppercase tracking-[0.2em] bg-planify-container px-6 py-3 rounded-2xl border border-planify-border shadow-accent-glow/5">
           <div className="w-2 h-2 bg-planify-accent-light rounded-full animate-ping"></div>
           Synchronized System Protocols
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <KpiCard 
          title="Global Initiatives" 
          value={stats.totalProjects} 
          icon={BriefcaseIcon} 
          active={activeKpi === 'all'} 
          onClick={() => setActiveKpi('all')}
        />
        <KpiCard 
          title="Operational Missions" 
          value={projects.filter(p => p.status === 'ACTIVE').length} 
          icon={ClipboardDocumentCheckIcon} 
          active={activeKpi === 'active'} 
          onClick={() => setActiveKpi('active')}
        />
        <KpiCard 
          title="Active Assignments" 
          value={stats.inProgress} 
          icon={ClockIcon} 
          active={activeKpi === 'in-progress'} 
          onClick={() => setActiveKpi('in-progress')}
        />
        <KpiCard 
          title="Critical Risk Exposure" 
          value={stats.overdue} 
          icon={ExclamationCircleIcon} 
          isRed
          active={activeKpi === 'overdue'} 
          onClick={() => setActiveKpi('overdue')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-planify-container rounded-[2rem] border border-planify-border shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-planify-border flex items-center justify-between bg-planify-panel/30">
                 <h2 className="text-sm font-black text-planify-text-primary uppercase tracking-widest flex items-center">
                    <Squares2X2Icon className="w-5 h-5 mr-3 text-planify-accent-light" />
                    Operational Workload Matrix
                 </h2>
              </div>
              <div className="p-0 overflow-x-auto">
                 <table className="min-w-full divide-y divide-planify-border">
                    <thead className="bg-planify-panel/20">
                       <tr className="text-left">
                          <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest">Protocol Identity</th>
                          <th className="px-8 py-5 text-[10px] font-black text-planify-text-muted uppercase tracking-widest">Workload Distribution</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-planify-border bg-planify-container">
                       {filteredProjects.slice(0, 5).map(p => (
                         <tr key={p.id} className="hover:bg-planify-hover transition group">
                            <td className="px-8 py-8 align-top">
                               <div className="font-black text-planify-text-primary mb-1 group-hover:text-planify-accent-light transition-colors">{p.name}</div>
                               <div className="text-[9px] font-black text-planify-accent-glow uppercase tracking-widest">{p.status}</div>
                            </td>
                            <td className="px-8 py-8">
                               <MiniKanban tasks={tasks.filter(t => t.projectId === p.id)} />
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-6 bg-planify-panel/20 text-center border-t border-planify-border">
                 <button onClick={() => navigate('/projects')} className="text-[10px] font-black text-planify-accent-light uppercase tracking-widest hover:text-planify-text-primary transition flex items-center justify-center mx-auto">
                   Inspect Full Registry <ArrowRightIcon className="w-3 h-3 ml-3" />
                 </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-planify-container p-10 rounded-[2rem] border border-planify-border shadow-2xl">
              <div className="mb-10">
                 <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-widest">Task Severity Vectors</h3>
              </div>
              <div className="h-[280px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={severityData}
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={8}
                          dataKey="value"
                          onClick={handleSeverityClick}
                          stroke="none"
                          cursor="pointer"
                       >
                          {severityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #2A303C', fontSize: '10px', color: '#F9FAFB' }} 
                         itemStyle={{ color: '#F9FAFB' }}
                       />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                    <span className="text-4xl font-black text-planify-text-primary">{tasks.length}</span>
                    <span className="text-[9px] font-black text-planify-text-muted uppercase tracking-widest">Protocol Items</span>
                 </div>
              </div>
              <div className="mt-10 space-y-4">
                 {severityData.map(item => (
                   <div key={item.name} className="flex items-center justify-between text-[10px] p-3 rounded-2xl bg-planify-panel/50 border border-planify-border hover:border-planify-accent/50 transition cursor-pointer" onClick={() => handleSeverityClick({key: item.key})}>
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                         <span className="font-black text-planify-text-secondary uppercase tracking-wider">{item.name}</span>
                      </div>
                      <span className="font-black text-planify-text-primary">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-planify-accent p-10 rounded-[2rem] shadow-accent-glow text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-xl font-black mb-4 relative z-10 tracking-tight">Mission Focus Protocol</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-8 relative z-10 font-medium">
                Targeting <b>{stats.overdue} high-risk vectors</b> to ensure organizational velocity and successful deployment.
              </p>
              <button onClick={() => navigate('/tasks')} className="px-8 py-3 bg-white text-planify-accent rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition relative z-10 shadow-lg">
                Activate Backlog Protocol
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon: Icon, isRed, active, onClick }: any) => {
  return (
    <div 
      onClick={onClick}
      className={`p-8 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden ${
        active 
          ? 'bg-planify-container border-planify-accent shadow-accent-glow scale-[1.02]' 
          : 'bg-planify-container border-planify-border hover:border-planify-accent/50 shadow-2xl'
      }`}
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={`p-4 rounded-2xl ${isRed ? 'bg-red-500/10 text-red-500' : 'bg-planify-accent/10 text-planify-accent-light'} border border-transparent group-hover:border-current/20 transition-colors shadow-inner`}>
          <Icon className="w-6 h-6" />
        </div>
        {active && <div className="w-2 h-2 bg-planify-accent-light rounded-full shadow-[0_0_12px_#7C3AED]"></div>}
      </div>
      <p className="text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em] mb-2 relative z-10">{title}</p>
      <p className={`text-4xl font-black relative z-10 ${isRed ? 'text-red-500' : 'text-planify-text-primary'}`}>{value}</p>
      
      {/* Decorative Background Accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-planify-accent/5 rounded-full -mr-10 -mb-10 group-hover:bg-planify-accent/10 transition-colors"></div>
    </div>
  );
};

const MiniKanban = ({ tasks }: { tasks: Task[] }) => {
  const cols = [
    { label: 'Todo', status: TaskStatus.TODO, color: 'bg-planify-border' },
    { label: 'Active', status: TaskStatus.IN_PROGRESS, color: 'bg-planify-accent' },
    { label: 'Review', status: TaskStatus.REVIEW, color: 'bg-planify-accent-light' },
    { label: 'Done', status: TaskStatus.DONE, color: 'bg-green-500/80' },
  ];

  return (
    <div className="flex gap-4 w-full">
      {cols.map(c => {
        const count = tasks.filter(t => t.status === c.status).length;
        const width = tasks.length ? (count / tasks.length) * 100 : 0;
        return (
          <div key={c.status} className="flex-1 flex flex-col items-center">
             <div className="w-full h-1.5 bg-planify-panel rounded-full mb-3 overflow-hidden border border-planify-border">
                <div className={`h-full ${c.color} shadow-[0_0_8px_currentColor]`} style={{ width: `${width}%` }}></div>
             </div>
             <div className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${count > 0 ? 'bg-planify-panel text-planify-text-primary border border-planify-border shadow-sm' : 'text-planify-text-muted opacity-20'}`}>
                {c.label} {count}
             </div>
          </div>
        );
      })}
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    <div className="h-12 bg-planify-container rounded-2xl w-1/4"></div>
    <div className="grid grid-cols-4 gap-8">
      {[1,2,3,4].map(i => <div key={i} className="h-44 bg-planify-container rounded-[2rem]"></div>)}
    </div>
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-8 h-[600px] bg-planify-container rounded-[2rem]"></div>
      <div className="col-span-4 h-[600px] bg-planify-container rounded-[2rem]"></div>
    </div>
  </div>
);

export default Dashboard;
