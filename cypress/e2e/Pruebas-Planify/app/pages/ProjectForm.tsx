
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/mockApi';
import { ProjectStatus, Project } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon, CalendarIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Input, Select, TextArea, PrimaryButton, SecondaryButton } from '../components/FormElements';

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    status: ProjectStatus.ACTIVE,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    ownerId: user?.id || ''
  });

  useEffect(() => {
    if (isEdit) {
      api.getProject(id).then(res => {
        if (res.data) setFormData(res.data);
        else setGlobalError(res.error || "Project protocol not found in registry.");
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "A descriptive project identity is mandatory.";
    if (!formData.startDate) newErrors.startDate = "Start date is required for timeline alignment.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setGlobalError('');
    setSubmitting(true);

    try {
      const response = isEdit 
        ? await api.updateProject(id!, formData)
        : await api.createProject(formData);

      if (response.status < 300) navigate('/projects');
      else setGlobalError(response.error || "Failed to persist protocol data.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-20 animate-pulse font-black text-planify-text-muted uppercase tracking-[0.2em]">Synchronizing workstream data...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      <button 
        onClick={() => navigate('/projects')} 
        className="flex items-center text-[10px] font-black text-planify-text-muted hover:text-planify-accent-light mb-8 uppercase tracking-[0.2em] transition group"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Projects Registry
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter" data-testid="project-form-title">
          {isEdit ? 'Refine Workstream' : 'Initiate Project Protocol'}
        </h1>
        <p className="text-planify-text-secondary mt-2 font-medium">Define the core objectives and timeline alignment for your organization's workstreams.</p>
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
              label="Protocol Identity"
              required
              placeholder="e.g. Project Apollo v2"
              value={formData.name}
              error={errors.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
           />

           <TextArea
              label="Mission Specification"
              rows={4}
              placeholder="Provide high-level context and success criteria..."
              value={formData.description}
              onChange={(e: any) => setFormData({...formData, description: e.target.value})}
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Select
                label="Operational Status"
                value={formData.status}
                onChange={(e: any) => setFormData({...formData, status: e.target.value as ProjectStatus})}
                options={Object.values(ProjectStatus).map(s => ({ value: s, label: s }))}
              />
              <div className="flex flex-col">
                 <span className="block text-[11px] font-extrabold text-planify-text-secondary uppercase tracking-widest mb-1.5 ml-0.5">Project Originator</span>
                 <div className="px-4 py-2.5 bg-planify-panel border border-planify-border rounded-lg font-bold text-planify-text-muted text-sm h-10 flex items-center shadow-inner">
                    {user?.name || formData.ownerId}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Protocol Commencement (Start)"
                type="date"
                required
                value={formData.startDate}
                error={errors.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
              <Input
                label="Target Deployment (End)"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
           </div>
        </div>

        <div className="flex items-center justify-end space-x-6">
          <SecondaryButton type="button" onClick={() => navigate('/projects')}>Abort Change</SecondaryButton>
          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? 'Synchronizing Datastore...' : (isEdit ? 'Authorize Refinement' : 'Confirm Initiation')}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
