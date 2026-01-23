
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_CONFIG } from '../constants';
import { Input, PrimaryButton } from '../components/FormElements';
import { Logo } from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Access denied. Verify your credentials.');
        setIsLoading(false);
      }
    } catch (err) {
      setError("Connectivity failure. Authentication server unreachable.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-planify-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-12 animate-fade-in">
        <div className="text-center flex flex-col items-center">
          <Logo size={80} className="mb-8" />
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Enter Protocol</h1>
          <p className="mt-2 text-xs font-bold text-planify-text-muted uppercase tracking-[0.2em]">Secure Authentication Gateway</p>
        </div>

        <div className="bg-planify-container p-10 rounded-[2rem] shadow-2xl border border-planify-border relative overflow-hidden ring-1 ring-planify-accent/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-planify-accent to-planify-accent-light"></div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center" data-testid="login-error-message">
                <span className="mr-3 text-lg">!</span>
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <Input
                id="email-address"
                label="Organization Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@planify.io"
                data-testid="login-email-input"
              />

              <Input
                id="password"
                label="Security Key"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid="login-password-input"
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={isLoading}
              data-testid="login-submit-button"
              className="w-full py-4 text-sm mt-4"
            >
              {isLoading ? 'Authenticating...' : 'Authorize Access'}
            </PrimaryButton>
          </form>

          <div className="mt-12 pt-8 border-t border-planify-border">
             <div className="p-5 bg-planify-bg/50 rounded-2xl border border-dashed border-planify-border">
                <p className="text-[9px] text-planify-text-muted uppercase font-black mb-3 opacity-60 tracking-widest">Master Protocol Credentials:</p>
                <div className="flex flex-col gap-1">
                  <code className="text-[11px] text-planify-accent-glow font-bold block">{APP_CONFIG.INITIAL_ADMIN_EMAIL}</code>
                  <code className="text-[11px] text-planify-text-secondary font-bold block">password123</code>
                </div>
             </div>
             <p className="mt-6 text-[9px] text-planify-text-muted text-center font-bold uppercase tracking-widest leading-loose opacity-40">
                Planify Enterprise System v3.0<br/>Secure Multi-Factor Authentication Active
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
