
import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Label: React.FC<{ children: React.ReactNode; required?: boolean; htmlFor?: string }> = ({ children, required, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-[11px] font-extrabold text-planify-text-secondary uppercase tracking-widest mb-1.5 ml-0.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, required, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && <Label required={required} htmlFor={props.id}>{label}</Label>}
    <input
      ref={ref}
      className={`w-full px-4 py-2.5 bg-planify-panel border ${error ? 'border-red-500' : 'border-planify-border'} text-planify-text-primary rounded-lg text-sm placeholder-planify-text-muted focus:ring-2 focus:ring-planify-accent focus:border-planify-accent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
  </div>
));

export const Select = React.forwardRef<HTMLSelectElement, any>(({ label, error, required, options, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && <Label required={required}>{label}</Label>}
    <select
      ref={ref}
      className={`w-full px-4 py-2.5 bg-planify-panel border ${error ? 'border-red-500' : 'border-planify-border'} text-planify-text-primary rounded-lg text-sm focus:ring-2 focus:ring-planify-accent focus:border-planify-accent outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23F9FAFB%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.25em_1.25em] bg-[right_0.75rem_center] bg-no-repeat ${className}`}
      {...props}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-planify-container">{opt.label}</option>
      ))}
    </select>
    {error && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
  </div>
));

export const TextArea = React.forwardRef<HTMLTextAreaElement, any>(({ label, error, required, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && <Label required={required}>{label}</Label>}
    <textarea
      ref={ref}
      className={`w-full px-4 py-2.5 bg-planify-panel border ${error ? 'border-red-500' : 'border-planify-border'} text-planify-text-primary rounded-lg text-sm placeholder-planify-text-muted focus:ring-2 focus:ring-planify-accent focus:border-planify-accent outline-none transition-all resize-none ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
  </div>
));

export const SearchInput: React.FC<{ value: string; onChange: (val: string) => void; placeholder?: string; className?: string }> = ({ value, onChange, placeholder = "Search assignments...", className = "" }) => (
  <div className={`relative w-full ${className}`}>
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <MagnifyingGlassIcon className="h-5 w-5 text-planify-text-muted" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="block w-full pl-11 pr-10 py-2.5 bg-planify-panel border border-planify-border text-planify-text-primary rounded-lg text-sm placeholder-planify-text-muted focus:ring-2 focus:ring-planify-accent focus:border-planify-accent outline-none shadow-sm transition-all"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-planify-text-muted hover:text-planify-text-primary"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    )}
  </div>
);

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button
    className={`px-8 py-2.5 bg-planify-accent text-planify-text-primary text-xs font-black uppercase tracking-widest rounded-lg hover:bg-planify-accent-hover shadow-lg shadow-planify-accent/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button
    className={`px-8 py-2.5 bg-planify-hover text-planify-text-primary border border-planify-accent text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-planify-accent/10 transition-all active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);
