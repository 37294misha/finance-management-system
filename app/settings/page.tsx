// app/settings/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { initialRoles } from '@/data/mockData';
import { Shield, Save, Check, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [role, setRole] = useState('User');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'User';
    setRole(savedRole);
  }, []);

  const isSuperAdmin = role === 'SuperAdmin';

  const handleToggle = (index: number, field: string) => {
    if (!isSuperAdmin) return; // Non-superadmin cannot change
    const updated = [...roles];
    // @ts-ignore
    updated[index][field] = !updated[index][field];
    setRoles(updated);
    setSaved(false);
  };

  const handleSave = () => {
    if (!isSuperAdmin) return;
    localStorage.setItem('savedRolesConfig', JSON.stringify(roles));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" /> System Settings 
          </h1>
          <p className="text-sm text-slate-500 mt-1">View system access privileges and security configurations.</p>
        </div>

        {/* Save button sirf SuperAdmin ko dikhega */}
        {isSuperAdmin ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Permissions Saved!' : 'Save Permissions'}
          </button>
        ) : (
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold border border-amber-200">
            <ShieldAlert className="w-4 h-4" /> View-Only Mode (SuperAdmin access required to edit)
          </span>
        )}
      </div>

      {/* Matrix Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Role Privilege Control Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">Role Name</th>
                <th className="py-3.5 px-4 text-center">Edit</th>
                <th className="py-3.5 px-4 text-center">Delete</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Settings Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">{r.name}</td>
                  
                  {/* Edit Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.canEdit}
                      disabled={!isSuperAdmin}
                      onChange={() => handleToggle(idx, 'canEdit')}
                      className={`w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 ${!isSuperAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                  </td>

                  {/* Delete Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.canDelete}
                      disabled={!isSuperAdmin}
                      onChange={() => handleToggle(idx, 'canDelete')}
                      className={`w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 ${!isSuperAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                  </td>

                  {/* Settings Checkbox */}
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={r.settings}
                      disabled={!isSuperAdmin}
                      onChange={() => handleToggle(idx, 'settings')}
                      className={`w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 ${!isSuperAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}