
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/mockApi';
import { User, Role, Permission } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Layout';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { SearchInput, Select } from '../components/FormElements';

const ITEMS_PER_PAGE = 8;

const Users: React.FC = () => {
  const { user: currentUser, hasPermission } = useAuth();
  const { showToast } = useToast();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


 // ✅ PERMITIR ELIMINACIÓN SIN VALIDACIÓN DE PERMISOS
  const canDeleteUser = true;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.getUsers();
      if (res.data) setUsers(res.data);
      else if (res.error) showToast(res.error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
const handleDeleteUser = async (userToDelete: User) => {
      if (userToDelete.id === currentUser?.id) {
        showToast("Cannot delete your own account", "error");
        return;
      }
      if (window.confirm("Permanently purge this user identity from the registry?")) {
        setDeletingId(userToDelete.id);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
          showToast(`User protocol terminated successfully.`, "success");
        } catch (error) {
          showToast("System error.", "error");
        } finally {
          setDeletingId(null);
        }
      }
    };


  const filteredUsers = useMemo(() => {
    return (users || [])
      .filter(u => {
        const name = (u.name || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        const search = searchQuery.toLowerCase();
        const matchesSearch = name.includes(search) || email.includes(search);
        const matchesRole = roleFilter ? u.role === roleFilter : true;
        const matchesStatus = statusFilter !== '' ? u.isActive === (statusFilter === 'active') : true;
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a: any, b: any) => {
        const valA = String(a[sortField] || '').toLowerCase();
        const valB = String(b[sortField] || '').toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, searchQuery, roleFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSort = (field: keyof User) => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortOrder('asc'); }
  };

  if (loading) return <UsersSkeleton />;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-planify-text-primary tracking-tighter">Team Registry</h1>
          <p className="text-planify-text-secondary font-medium mt-1">Strategic governance of organizational identities and access scopes.</p>
        </div>
        {hasPermission(Permission.USER_CREATE) && (
          <Link
            to="/users/new"
            className="inline-flex items-center px-6 py-2.5 bg-planify-accent text-white rounded-xl hover:bg-planify-accent-hover font-black text-sm transition shadow-lg shadow-planify-accent/20"
          >
            <UserPlusIcon className="w-5 h-5 mr-2" />
            Onboard Member
          </Link>
        )}
      </div>

      <div className="bg-planify-container p-6 rounded-[2rem] border border-planify-border shadow-2xl flex flex-col md:flex-row gap-6 items-center">
        <SearchInput
          placeholder="Search identity by name or corporate email..."
          value={searchQuery}
          onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          className="flex-1"
        />
        <div className="flex gap-4 w-full md:w-auto">
          <Select
            className="!py-2 min-w-[150px] !bg-planify-panel"
            value={roleFilter}
            onChange={(e: any) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            options={[{ value: '', label: 'All Roles' }, ...Object.values(Role).map(r => ({ value: r, label: r.replace('_', ' ') }))]}
          />
          <Select
            className="!py-2 min-w-[150px] !bg-planify-panel"
            value={statusFilter}
            onChange={(e: any) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Locked' }
            ]}
          />
        </div>
      </div>

      <div className="bg-planify-container border border-planify-border rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-planify-accent to-planify-accent-light opacity-50"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-planify-border">
            <thead className="bg-planify-panel/30">
              <tr>
                <th className="px-8 py-6 text-left text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em] cursor-pointer hover:text-planify-accent-light transition" onClick={() => toggleSort('name')}>
                  Identity Protocol {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em]">Communication Vector</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em]">Operational Role</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em]">Registry Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-planify-text-muted uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-planify-border">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center text-planify-text-muted font-black uppercase tracking-widest bg-planify-container">
                    <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    Identity Protocol Buffer Empty
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-planify-hover transition group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-planify-accent/10 text-planify-accent-glow flex items-center justify-center font-black text-sm mr-4 border border-planify-accent/20 shadow-inner">
                          {(u.firstName || '?').charAt(0)}{(u.lastName || '?').charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-planify-text-primary group-hover:text-planify-accent-light transition-colors">{u.name}</div>
                          <div className="text-[9px] text-planify-text-muted font-black uppercase tracking-widest mt-0.5">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-bold text-planify-text-secondary">{u.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-planify-text-muted uppercase tracking-widest">{u.role.replace('_', ' ')}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${u.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {u.isActive ? 'Active' : 'Locked'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {hasPermission(Permission.USER_EDIT) && (
                          <Link to={`/users/${u.id}/edit`} className="p-2.5 bg-planify-panel rounded-lg text-planify-text-muted hover:text-planify-accent-light transition border border-planify-border">
                            <PencilSquareIcon className="w-5 h-5" />
                          </Link>
                        )}
                        
                        {u.id !== currentUser?.id && (
                          <button 
                            onClick={() => handleDeleteUser(u)} 
                            disabled={deletingId === u.id}
                            className="p-2.5 bg-planify-panel rounded-lg text-planify-text-muted hover:text-red-500 transition border border-planify-border"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}
{u.id !== currentUser?.id && (
      <button 
        onClick={() => handleDeleteUser(u)} 
        disabled={deletingId === u.id}
        className="p-2.5 bg-planify-panel rounded-lg text-planify-text-muted hover:text-red-500 transition border border-planify-border"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-planify-panel/20 px-8 py-5 border-t border-planify-border flex items-center justify-between">
           <p className="text-[10px] text-planify-text-muted font-black uppercase tracking-widest">
             Identity Coverage: {paginatedUsers.length} / {filteredUsers.length}
           </p>
           <div className="flex items-center space-x-4">
             <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-xl bg-planify-panel text-planify-text-muted hover:text-planify-text-primary disabled:opacity-20 border border-planify-border transition">
               <ChevronLeftIcon className="w-5 h-5" />
             </button>
             <span className="text-[10px] font-black text-planify-text-primary uppercase tracking-widest px-4 py-2 bg-planify-panel rounded-xl border border-planify-border">Protocol {currentPage} of {totalPages}</span>
             <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-xl bg-planify-panel text-planify-text-muted hover:text-planify-text-primary disabled:opacity-20 border border-planify-border transition">
               <ChevronRightIcon className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const UsersSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    <div className="h-10 bg-planify-container rounded w-1/4"></div>
    <div className="h-20 bg-planify-container rounded-[2rem] w-full"></div>
    <div className="h-[500px] bg-planify-container rounded-[2.5rem] border border-planify-border"></div>
  </div>
);

export default Users;
