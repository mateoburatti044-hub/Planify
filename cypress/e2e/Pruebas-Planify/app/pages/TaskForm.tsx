
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../services/mockApi';
import { Task, TaskStatus, Priority, Project, User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Input, Select, TextArea, PrimaryButton, SecondaryButton } from '../components/FormElements';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    projectId: searchParams.get('projectId') || '',
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    assigneeId: '',
    reporterId: user?.id || '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [projRes, userRes] = await Promise.all([
          api.getProjects(),
          api.getUsers()
        ]);
        
        if (projRes.data) setProjects(projRes.data);
        if (userRes.data) setUsers(userRes.data);

        if (isEdit) {
          const taskRes = await api.getTask(id!);
          if (taskRes.data) {
            setFormData(taskRes.data);
          } else {
            setGlobalError(taskRes.error || "Assignment not found in mission parameters.");
            showToast("Failed to load protocol data.", "error");
          }
        }
      } catch (err: any) {
        setGlobalError("Connectivity issue: Unable to synchronize with management server.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Assignment title is mandatory.";
    if (!formData.projectId) newErrors.projectId = "Project linkage is required.";
    if (!formData.dueDate) newErrors.dueDate = "Target delivery date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    setGlobalError('');

    try {
      const response = isEdit 
        ? await api.updateTask(id!, formData)
        : await api.createTask(formData);

      if (response.status < 300) {
        showToast(isEdit ? "Protocol refined." : "Assignment initialized.", "success");
        navigate('/tasks');
      } else {
        if (response.errors) setErrors(response.errors);
        if (response.error) setGlobalError(response.error);
      }
    } catch (err: any) {
      setGlobalError("Unexpected network protocol failure.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-planify-text-muted uppercase tracking-[0.2em]">Constructing assignment environment...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[10px] font-black text-planify-text-muted hover:text-planify-accent-light mb-8 uppercase tracking-[0.2em] transition group"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Mission Board
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter" data-testid="task-form-title">
          {isEdit ? 'Refine Assignment' : 'Initialize Assignment'}
        </h1>
        <p className="text-planify-text-secondary mt-2 font-medium">Configure technical requirements and deployment constraints for this strategic assignment.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {globalError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg">
            <InformationCircleIcon className="w-5 h-5 mr-3" />
            {globalError}
          </div>
        )}

        <div className="bg-planify-container p-10 rounded-[2.5rem] border border-planify-border shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent"></div>
          <Input
            label="Assignment Identity"
            required
            placeholder="e.g. Implement Strategic OIDC Flow"
            value={formData.title}
            error={errors.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />

          <Select
            label="Target Project linkage"
            required
            value={formData.projectId}
            error={errors.projectId}
            onChange={(e: any) => setFormData({...formData, projectId: e.target.value})}
            options={[
              { value: '', label: '-- Select Destination Project Protocol --' },
              ...projects.map(p => ({ value: p.id, label: p.name }))
            ]}
          />

          <TextArea
            label="Requirement Specification"
            rows={6}
            placeholder="Technical context, reproduction vectors, or specification details..."
            value={formData.description}
            onChange={(e: any) => setFormData({...formData, description: e.target.value})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Select
              label="Workflow Vector"
              value={formData.status}
              onChange={(e: any) => setFormData({...formData, status: e.target.value as TaskStatus})}
              options={Object.values(TaskStatus).map(s => ({ value: s, label: s.replace('_', ' ') }))}
            />
            <Select
              label="Task Severity Protocol"
              value={formData.priority}
              onChange={(e: any) => setFormData({...formData, priority: e.target.value as Priority})}
              options={Object.values(Priority).map(p => ({ value: p, label: p }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Select
              label="Mission Owner / Assignee"
              value={formData.assigneeId}
              onChange={(e: any) => setFormData({...formData, assigneeId: e.target.value})}
              options={[
                { value: '', label: 'Unassigned Vector' },
                ...users.map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))
              ]}
            />
            <Input
              label="Target Delivery Protocol (Deadline)"
              type="date"
              required
              value={formData.dueDate}
              error={errors.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-6">
          <SecondaryButton type="button" onClick={() => navigate('/tasks')}>Abort Deployment</SecondaryButton>
          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? 'Synchronizing Protocol...' : (isEdit ? 'Authorize Refinement' : 'Deploy Assignment')}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
