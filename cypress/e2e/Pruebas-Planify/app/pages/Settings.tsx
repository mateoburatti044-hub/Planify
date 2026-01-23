
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">System Configuration</h1>
        <p className="text-planify-text-secondary mt-2 font-medium">Personalize your mission console and manage identity parameters.</p>
      </div>

      <section className="bg-planify-container border border-planify-border rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent"></div>
        <div className="p-8 border-b border-planify-border bg-planify-panel/30">
          <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.2em]">Identity Metadata</h3>
        </div>
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[11px] font-black text-planify-text-muted uppercase tracking-[0.2em] mb-2 ml-1">Protocol Name</label>
              <input 
                type="text" 
                readOnly 
                value={user?.name} 
                className="w-full px-5 py-3 bg-planify-panel border border-planify-border rounded-xl text-planify-text-secondary font-bold text-sm shadow-inner" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-planify-text-muted uppercase tracking-[0.2em] mb-2 ml-1">Communication Vector</label>
              <input 
                type="email" 
                readOnly 
                value={user?.email} 
                className="w-full px-5 py-3 bg-planify-panel border border-planify-border rounded-xl text-planify-text-secondary font-bold text-sm shadow-inner" 
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-planify-text-muted uppercase tracking-[0.2em] mb-2 ml-1">Authorized Access Scope</label>
            <input 
              type="text" 
              readOnly 
              value={user?.role} 
              className="w-full px-5 py-3 bg-planify-panel border border-planify-border rounded-xl text-planify-accent-glow font-black text-xs uppercase tracking-widest shadow-inner" 
            />
          </div>
        </div>
      </section>

      <section className="bg-planify-container border border-planify-border rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-planify-accent/50"></div>
        <div className="p-8 border-b border-planify-border bg-planify-panel/30">
          <h3 className="text-sm font-black text-planify-text-primary uppercase tracking-[0.2em]">Console Preferences</h3>
        </div>
        <div className="p-10 space-y-10">
          <div className="flex items-center justify-between p-6 bg-planify-panel/40 rounded-3xl border border-planify-border shadow-inner">
            <div className="max-w-md">
              <p className="font-black text-planify-text-primary text-sm uppercase tracking-wide">Sync Protocol Notifications</p>
              <p className="text-xs text-planify-text-muted mt-1 font-medium leading-relaxed">Receive automated summaries of task activity and mission deployments.</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full transition-all relative border-2 ${notifications ? 'bg-planify-accent border-planify-accent-light' : 'bg-planify-hover border-planify-border shadow-inner'}`}
              data-testid="toggle-notifications"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${notifications ? 'translate-x-7' : 'translate-x-0'}`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between p-6 bg-planify-panel/40 rounded-3xl border border-planify-border shadow-inner">
            <div>
              <p className="font-black text-planify-text-primary text-sm uppercase tracking-wide">Visual Identity Protocol</p>
              <p className="text-xs text-planify-text-muted mt-1 font-medium leading-relaxed">Select the console's aesthetic profile for high-velocity focus.</p>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-6 py-2.5 bg-planify-container border border-planify-border rounded-xl text-xs font-black text-planify-text-primary uppercase tracking-widest focus:ring-2 focus:ring-planify-accent outline-none shadow-lg"
              data-testid="select-theme"
            >
              <option value="dark" className="bg-planify-container text-planify-text-primary font-bold">Dark Protocol (Active)</option>
              <option value="high-contrast" className="bg-planify-container text-planify-text-primary font-bold">Lethal Contrast</option>
              <option value="light" disabled className="bg-planify-container text-planify-text-muted">Classic White (Deprecated)</option>
            </select>
          </div>
        </div>
      </section>

      <div className="pt-10 text-center space-y-2 opacity-30">
        <p className="text-[10px] font-black text-planify-text-muted uppercase tracking-[0.3em]">Planify Strategic Management v3.0.0-Stable</p>
        <p className="text-[10px] font-black text-planify-text-muted uppercase tracking-[0.3em]">Environment: Production Integrated Registry</p>
      </div>
    </div>
  );
};

export default Settings;
