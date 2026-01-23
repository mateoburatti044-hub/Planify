
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { Task, Project } from '../types';
import { 
  ArrowDownTrayIcon, 
  ChartBarIcon, 
  HeartIcon, 
  BoltIcon, 
  UserGroupIcon,
  InformationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Reports: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getTasks(), api.getProjects()]).then(([t, p]) => {
      if (t.data) setTasks(t.data);
      if (p.data) setProjects(p.data);
      setLoading(false);
    });
  }, []);

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Project', 'Status', 'Priority', 'Due Date'];
    const rows = tasks.map(t => [
      t.id,
      t.title,
      projects.find(p => p.id === t.projectId)?.name || 'Unknown',
      t.status,
      t.priority,
      t.dueDate
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(r => r.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `planify_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center p-20 font-black text-planify-text-muted uppercase tracking-[0.2em] animate-pulse">Aggregating System Metrics...</div>;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Strategic Intelligence</h1>
          <p className="text-planify-text-secondary mt-2 font-medium">Global analytics and performance vectors for all operational missions.</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center px-8 py-3 bg-planify-accent text-white rounded-xl hover:bg-planify-accent-hover font-black text-xs uppercase tracking-widest transition shadow-lg shadow-planify-accent/20"
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-3" />
          Export Datastore
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ReportCard 
          title="Workstream Health" 
          description="Holistic evaluation of active project status and operational alignment." 
          icon={HeartIcon}
          dataTestId="report-health" 
        />
        <ReportCard 
          title="Execution Velocity" 
          description="Technical metric analysis of task completion rates and transition speed." 
          icon={BoltIcon}
          dataTestId="report-velocity" 
        />
        <ReportCard 
          title="Identity Utilization" 
          description="Strategic workload distribution across the global team registry." 
          // Fix: Correct icon name from UserGroupGroupIcon to UserGroupIcon
          icon={UserGroupIcon}
          dataTestId="report-allocation" 
        />
      </div>

      <div className="bg-planify-accent/10 border border-planify-accent/30 rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-planify-accent/5 rounded-full blur-3xl group-hover:bg-planify-accent/10 transition-all duration-1000"></div>
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-planify-accent/20 text-planify-accent-glow rounded-lg">
                <InformationCircleIcon className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-black text-planify-text-primary tracking-tight">Advanced Custom Analytics</h3>
          </div>
          <p className="text-planify-text-secondary leading-relaxed font-medium">
            Our Enterprise Strategic Suite can generate deep-dive protocols on mission coverage, defect burn-down trajectories, and organizational efficiency benchmarks.
          </p>
        </div>
        <button className="px-10 py-4 bg-planify-accent text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-planify-accent-hover shadow-xl shadow-planify-accent/30 transition-all active:scale-95 whitespace-nowrap relative z-10">
          Initiate Request Protocol
        </button>
      </div>

      <div className="bg-planify-container border border-planify-border rounded-[2.5rem] shadow-2xl overflow-hidden p-10">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.2em]">Live Metric Stream</h3>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></div>
               <span className="text-[9px] font-black text-planify-text-muted uppercase tracking-widest">System Status: Operational</span>
            </div>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MiniStat label="Global Tasks" value={tasks.length} />
            <MiniStat label="Active Missions" value={projects.filter(p => p.status === 'ACTIVE').length} />
            <MiniStat label="Deployment Rate" value="94.2%" />
            <MiniStat label="Registry Entities" value="24 Active" />
         </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, description, icon: Icon, dataTestId }: any) => (
  <div 
    className="bg-planify-container border border-planify-border rounded-[2rem] p-8 shadow-2xl hover:shadow-card-hover hover:border-planify-accent/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden" 
    data-testid={dataTestId}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent opacity-20 group-hover:opacity-100 transition-opacity"></div>
    <div className="mb-6 p-4 bg-planify-panel rounded-2xl text-planify-accent-glow border border-planify-border shadow-inner w-fit group-hover:text-planify-text-primary group-hover:bg-planify-accent transition-all duration-300">
       <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-black text-planify-text-primary mb-3 group-hover:text-planify-accent-light transition-colors">{title}</h3>
    <p className="text-sm text-planify-text-secondary mb-8 leading-relaxed font-medium opacity-80 flex-1">{description}</p>
    <div className="flex items-center gap-2 text-[10px] font-black text-planify-accent-light uppercase tracking-[0.2em] group-hover:text-planify-text-primary transition-colors">
       Analyze Protocol <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-planify-panel/40 p-6 rounded-2xl border border-planify-border shadow-inner text-center">
    <p className="text-[9px] font-black text-planify-text-muted uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-2xl font-black text-planify-text-primary tracking-tighter">{value}</p>
  </div>
);

export default Reports;
