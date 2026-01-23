
import React, { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { Task, TaskStatus, Priority, Project, User, TaskCategory, TaskComment } from '../types';
import { XMarkIcon, CalendarIcon, UserIcon, ClockIcon, ChatBubbleBottomCenterTextIcon, ListBulletIcon, DocumentTextIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { Select, TextArea, Input, PrimaryButton } from './FormElements';

interface TaskDetailSidePanelProps {
  taskId: string;
  onClose: () => void;
  projects: Project[];
  users: User[];
}

const TaskDetailSidePanel: React.FC<TaskDetailSidePanelProps> = ({ taskId, onClose, projects, users }) => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'activity'>('details');

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await api.getTask(taskId);
        if (res.data) setTask(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = async (updates: Partial<Task>) => {
    if (!task) return;
    setSaving(true);
    try {
      const activity = updates.status && updates.status !== task.status 
        ? `Transitioned status to ${updates.status}`
        : updates.assigneeId && updates.assigneeId !== task.assigneeId
        ? `Reassigned ownership`
        : 'Modified task metadata';

      const updatedTask = {
        ...task,
        ...updates,
        activity: [
          {
            id: `act-${Date.now()}`,
            userId: currentUser?.id || 'unknown',
            action: activity,
            timestamp: new Date().toISOString()
          },
          ...(task.activity || [])
        ]
      };

      const res = await api.updateTask(taskId, updatedTask);
      if (res.data) {
        setTask(res.data);
      }
    } catch (err) {
      showToast("Sync failure.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddComment = async () => {
    if (!task || !commentText.trim()) return;
    const newComment: TaskComment = {
      id: `c-${Date.now()}`,
      userId: currentUser?.id || 'unknown',
      text: commentText,
      createdAt: new Date().toISOString()
    };
    
    const updatedTask = {
      ...task,
      comments: [newComment, ...(task.comments || [])]
    };

    try {
      const res = await api.updateTask(taskId, updatedTask);
      if (res.data) {
        setTask(res.data);
        setCommentText('');
      }
    } catch (err) {
      showToast("Post failure.", "error");
    }
  };

  if (loading) return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-planify-bg h-full shadow-2xl animate-slide-left border-l border-planify-border p-10">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-planify-card rounded w-1/4"></div>
          <div className="h-12 bg-planify-card rounded w-full"></div>
          <div className="h-64 bg-planify-card rounded-[2rem]"></div>
        </div>
      </div>
    </div>
  );

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-planify-bg h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left border-l border-planify-border">
        
        <div className="flex items-center justify-between p-8 border-b border-planify-border bg-planify-card/30">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-xl bg-planify-accent/10 text-planify-accent border border-planify-accent/20">
                <DocumentTextIcon className="w-5 h-5" />
             </div>
             <div>
                <span className="text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em] leading-none block mb-2">Item Context</span>
                <h2 className="text-xs font-black text-planify-text leading-none uppercase tracking-widest">{task.id}</h2>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-planify-card rounded-full transition-colors text-planify-text-muted hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-10 space-y-10">
            
            <div className="space-y-6">
              <input 
                className="text-3xl font-black text-planify-text w-full border-none focus:ring-0 p-0 placeholder-planify-border bg-transparent tracking-tight"
                value={task.title}
                onChange={(e) => setTask({...task, title: e.target.value})}
                onBlur={() => handleUpdate({ title: task.title })}
                placeholder="Assign a title..."
              />
              
              <div className="flex flex-wrap gap-4">
                 <Select 
                    className="!py-2 !text-[10px] font-black uppercase tracking-widest min-w-[150px] !bg-planify-card !text-planify-text !border-planify-border"
                    value={task.status}
                    onChange={(e: any) => handleUpdate({ status: e.target.value as TaskStatus })}
                    options={Object.values(TaskStatus).map(s => ({ value: s, label: s }))}
                 />
                 <Select 
                    className="!py-2 !text-[10px] font-black uppercase tracking-widest min-w-[150px] !bg-planify-card !text-planify-text !border-planify-border"
                    value={task.priority}
                    onChange={(e: any) => handleUpdate({ priority: e.target.value as Priority })}
                    options={Object.values(Priority).map(p => ({ value: p, label: p }))}
                 />
              </div>
            </div>

            <div className="border-b border-planify-border">
              <nav className="flex gap-10">
                {['details', 'comments', 'activity'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab ? 'text-planify-accent border-planify-accent' : 'text-planify-text-muted border-transparent hover:text-planify-text'}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-10 animate-fade-in">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest opacity-60">Owner</label>
                    <Select 
                       className="!py-2 !text-xs font-bold !bg-planify-card !text-planify-text !border-planify-border"
                       value={task.assigneeId}
                       onChange={(e: any) => handleUpdate({ assigneeId: e.target.value })}
                       options={[{ value: '', label: 'None' }, ...users.map(u => ({ value: u.id, label: u.name }))]}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest opacity-60">Domain</label>
                    <Select 
                       className="!py-2 !text-xs font-bold !bg-planify-card !text-planify-text !border-planify-border"
                       value={task.category || TaskCategory.FEATURE}
                       onChange={(e: any) => handleUpdate({ category: e.target.value as TaskCategory })}
                       options={Object.values(TaskCategory).map(c => ({ value: c, label: c }))}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest opacity-60">Deadline</label>
                    <Input 
                       type="date"
                       className="!py-2 !text-xs font-bold !bg-planify-card !text-planify-text !border-planify-border"
                       value={task.dueDate}
                       onChange={(e) => handleUpdate({ dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest opacity-60">Initiator</label>
                    <div className="py-2.5 text-xs font-black text-planify-text uppercase tracking-wider">{users.find(u => u.id === task.reporterId)?.name || 'System'}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest opacity-60">Requirement Specification</label>
                  <TextArea 
                    rows={10}
                    className="!text-sm !text-planify-text-muted leading-relaxed font-medium !bg-planify-card !border-planify-border focus:!border-planify-accent"
                    placeholder="Document mission critical details..."
                    value={task.description}
                    onChange={(e: any) => setTask({...task, description: e.target.value})}
                    onBlur={() => handleUpdate({ description: task.description })}
                  />
                </div>

                <div className="pt-10 border-t border-planify-border flex items-center justify-between">
                   <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3 text-planify-text-muted opacity-50">
                         <ClockIcon className="w-4 h-4" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Logged {new Date(task.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                   {saving && <span className="text-[9px] font-black text-planify-accent animate-pulse uppercase tracking-[0.2em]">Synchronizing...</span>}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-6">
                  <TextArea 
                    rows={4}
                    className="!bg-planify-card !border-planify-border focus:!border-planify-accent !text-planify-text"
                    placeholder="Share an insight..."
                    value={commentText}
                    onChange={(e: any) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <PrimaryButton onClick={handleAddComment} disabled={!commentText.trim()}>Publish</PrimaryButton>
                  </div>
                </div>

                <div className="space-y-8">
                  {(task.comments || []).length === 0 ? (
                    <div className="py-16 text-center text-planify-text-muted">
                       <ChatBubbleBottomCenterTextIcon className="w-10 h-10 mx-auto opacity-10 mb-4" />
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Knowledge base empty</p>
                    </div>
                  ) : (
                    task.comments?.map(comment => (
                      <div key={comment.id} className="flex gap-5 group">
                         <div className="w-10 h-10 rounded-xl bg-planify-accent/10 text-planify-accent border border-planify-accent/20 flex items-center justify-center font-black text-xs flex-shrink-0">
                            {users.find(u => u.id === comment.userId)?.name.charAt(0) || '?'}
                         </div>
                         <div className="flex-1 space-y-3 bg-planify-card/50 p-5 rounded-2xl border border-transparent group-hover:border-planify-border transition-colors">
                            <div className="flex items-center justify-between">
                               <span className="text-xs font-black text-planify-text">{users.find(u => u.id === comment.userId)?.name || 'Observer'}</span>
                               <span className="text-[9px] font-bold text-planify-text-muted opacity-50">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-planify-text-muted leading-relaxed font-medium">{comment.text}</p>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-8 animate-fade-in">
                {(task.activity || []).length === 0 ? (
                   <div className="py-16 text-center text-planify-text-muted">
                     <ListBulletIcon className="w-10 h-10 mx-auto opacity-10 mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Log history empty</p>
                   </div>
                ) : (
                  task.activity?.map(act => (
                    <div key={act.id} className="flex gap-5 items-start">
                       <div className="mt-1 flex-shrink-0">
                          <CheckCircleIcon className="w-5 h-5 text-planify-accent opacity-50" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-medium text-planify-text-muted">
                             <span className="font-black text-planify-text">{users.find(u => u.id === act.userId)?.name || 'System'}</span>
                             {' '}{act.action}
                          </p>
                          <span className="text-[9px] font-bold text-planify-text-muted uppercase tracking-widest opacity-40">{new Date(act.timestamp).toLocaleString()}</span>
                       </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailSidePanel;
