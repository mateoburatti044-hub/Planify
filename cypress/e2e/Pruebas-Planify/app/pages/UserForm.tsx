
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/mockApi';
import { User, Role, Permission } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { ArrowLeftIcon, UserCircleIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Input, Select, PrimaryButton, SecondaryButton, Label } from '../components/FormElements';

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser, hasPermission } = useAuth();
  const { showToast } = useToast();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.USER,
    permissions: [],
    phone: '',
    address: '',
    isActive: true
  });

  useEffect(() => {
    if (!hasPermission(Permission.USER_VIEW)) {
      showToast("Identity access protocol denied.", "error");
      navigate('/users');
      return;
    }

    if (isEdit) {
      api.getUser(id!).then(res => {
        if (res.data) setFormData(res.data);
        else setGlobalError(res.error || "Identity not found in registry.");
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName?.trim()) newErrors.firstName = "Required.";
    if (!formData.lastName?.trim()) newErrors.lastName = "Required.";
    if (!formData.email?.trim()) newErrors.email = "Required.";
    if (!isEdit && (!formData.password || formData.password.length < 6)) newErrors.password = "Min 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePermissionToggle = (perm: Permission) => {
    const currentPerms = formData.permissions || [];
    setFormData({
      ...formData,
      permissions: currentPerms.includes(perm) ? currentPerms.filter(p => p !== perm) : [...currentPerms, perm]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setGlobalError('');

    try {
      const payload = { ...formData, name: `${formData.firstName} ${formData.lastName}`.trim() };
      const response = isEdit ? await api.updateUser(id!, payload) : await api.createUser(payload);
      if (response.status < 300) {
        showToast(`Identity protocol ${isEdit ? 'updated' : 'initialized'}.`, "success");
        navigate('/users');
      } else {
        setGlobalError(response.error || "Registry synchronization failed.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-planify-text-muted uppercase tracking-[0.2em]">Synchronizing Identity Data...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-fade-in">
      <button onClick={() => navigate('/users')} className="flex items-center text-[10px] font-black text-planify-text-muted hover:text-planify-accent-light mb-8 uppercase tracking-[0.2em] transition-all group">
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Registry
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">
          {isEdit ? 'Identity Governance' : 'Onboard Team Member'}
        </h1>
        <p className="text-planify-text-secondary mt-2 font-medium">Define identity parameters, corporate access vectors, and authorization scopes.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-planify-container p-10 rounded-[2.5rem] border border-planify-border shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent"></div>
            <div className="flex items-center gap-4 pb-6 border-b border-planify-border">
               <div className="p-3 bg-planify-panel rounded-xl text-planify-accent-glow border border-planify-border shadow-inner">
                  <UserCircleIcon className="w-5 h-5" />
               </div>
               <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.15em]">Corporate Protocol Identity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input
                label="First Name"
                required
                placeholder="Identity Label"
                value={formData.firstName}
                error={errors.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <Input
                label="Last Name"
                required
                placeholder="Protocol Suffix"
                value={formData.lastName}
                error={errors.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input
                label="Communication Vector (Email)"
                required
                type="email"
                placeholder="id@planify.io"
                value={formData.email}
                error={errors.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Input
                label="Primary Contact Phone"
                type="tel"
                placeholder="+1 000-000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-planify-container p-10 rounded-[2.5rem] border border-planify-border shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent/50"></div>
            <div className="flex items-center gap-4 pb-6 border-b border-planify-border">
               <div className="p-3 bg-planify-panel rounded-xl text-planify-accent-glow border border-planify-border shadow-inner">
                  <LockClosedIcon className="w-5 h-5" />
               </div>
               <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.15em]">Security Credentials</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
              <Input
                label={isEdit ? "Update Security Key (Optional)" : "Initial Security Key"}
                required={!isEdit}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                error={errors.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="flex items-center space-x-4 p-3 bg-planify-panel rounded-2xl border border-planify-border h-12">
                 <div className="relative flex items-center">
                   <input
                     type="checkbox"
                     id="isActive"
                     checked={formData.isActive}
                     onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                     className="w-5 h-5 bg-planify-bg border-planify-border rounded text-planify-accent focus:ring-planify-accent cursor-pointer"
                   />
                 </div>
                 <label htmlFor="isActive" className="text-[10px] font-black text-planify-text-secondary uppercase tracking-[0.2em] cursor-pointer">Operational Status Active</label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-planify-container p-10 rounded-[2.5rem] border border-planify-border shadow-2xl space-y-10 sticky top-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-planify-accent"></div>
            <div className="flex items-center gap-4 pb-6 border-b border-planify-border">
               <div className="p-3 bg-planify-panel rounded-xl text-planify-accent-glow border border-planify-border shadow-inner">
                  <ShieldCheckIcon className="w-5 h-5" />
               </div>
               <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.15em]">Authorization Matrix</h3>
            </div>

            {globalError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest">
                {globalError}
              </div>
            )}

            <Select
              label="Organizational Role Scope"
              value={formData.role}
              onChange={(e: any) => setFormData({...formData, role: e.target.value as Role})}
              options={Object.values(Role).map(r => ({ value: r, label: r.replace('_', ' ') }))}
              className="!bg-planify-panel"
            />

            <div className="space-y-4">
              <Label>Permission Scopes</Label>
              <div className="bg-planify-panel/50 border border-planify-border rounded-[2rem] p-6 space-y-5">
                {Object.values(Permission).map(p => (
                  <label key={p} className={`flex items-start gap-4 cursor-pointer group ${formData.role === Role.SUPER_ADMIN ? 'opacity-30 cursor-not-allowed' : ''}`}>
                    <input
                      type="checkbox"
                      disabled={formData.role === Role.SUPER_ADMIN}
                      checked={formData.role === Role.SUPER_ADMIN || formData.permissions?.includes(p)}
                      onChange={() => handlePermissionToggle(p)}
                      className="mt-0.5 w-4 h-4 bg-planify-bg border-planify-border rounded text-planify-accent focus:ring-planify-accent"
                    />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-planify-text-primary uppercase tracking-widest group-hover:text-planify-accent-light transition-colors">{p.replace('.', ' ')}</span>
                      <span className="text-[8px] font-bold text-planify-text-muted mt-1 leading-none uppercase tracking-tighter">System Access Node</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 space-y-4 border-t border-planify-border">
              <PrimaryButton type="submit" className="w-full py-4 text-xs tracking-[0.2em]" disabled={submitting}>
                {submitting ? 'Synchronizing Protocol...' : (isEdit ? 'Update Protocol' : 'Authorize Identity')}
              </PrimaryButton>
              <SecondaryButton type="button" className="w-full py-3 text-xs tracking-[0.2em]" onClick={() => navigate('/users')}>Abort</SecondaryButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
