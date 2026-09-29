// app/control-panel/assets/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialAssets, Asset } from '@/data/mockData';
import { Users, CreditCard, HardDrive, ShieldAlert, X, Plus, Trash2 } from 'lucide-react';

export default function AssetsControlPage() {
  const [role, setRole] = useState('SuperAdmin');
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [type, setType] = useState('Hardware');
  const [assignedTo, setAssignedTo] = useState('');
  const [value, setValue] = useState<number>(0);
  const [status, setStatus] = useState<'In Use' | 'Maintenance' | 'Available'>('In Use');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'SuperAdmin';
    setRole(savedRole);
  }, []);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset: Asset = {
      id: `AST-50${assets.length + 1}`,
      name,
      type,
      assignedTo: assignedTo || 'General Pool',
      value: Number(value),
      status,
    };
    setAssets([...assets, newAsset]);
    setShowAddModal(false);
    setName('');
    setAssignedTo('');
    setValue(0);
  };

  const handleDelete = (id: string) => {
    if (role === 'Manager') {
      alert('Managers are not permitted to delete asset records.');
      return;
    }
    if (confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">System Control Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Manage employee payroll, company expenses, and hardware assets.</p>
        </div>
        {role === 'User' && (
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold border border-amber-200">
            <ShieldAlert className="w-4 h-4" /> Review Mode (Read-Only)
          </span>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit">
        <Link href="/control-panel" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100">
          <Users className="w-4 h-4" /> Employees & Salary
        </Link>
        <Link href="/control-panel/expenses" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100">
          <CreditCard className="w-4 h-4" /> Expenses Management
        </Link>
        <Link href="/control-panel/assets" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-md">
          <HardDrive className="w-4 h-4" /> Assets Management
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Hardware & Equipment Inventory ({assets.length})</h3>
          {role !== 'User' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" /> Add Asset
            </button>
          )}
        </div>

        <div className="space-y-3">
          {assets.map((a) => (
            <div key={a.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/60 transition-colors">
              <div>
                <p className="font-bold text-slate-800">{a.name}</p>
                <p className="text-xs text-slate-400">Type: {a.type} | Assigned to: <span className="text-indigo-500">{a.assignedTo}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                    Rs. {a.value.toLocaleString()}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-semibold">
                    {a.status}
                  </span>
                </div>

                {role !== 'User' && role !== 'Manager' && (
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg border border-slate-200 bg-white shadow-sm transition-all cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD ASSET MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-800">Add New Hardware Asset</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Asset Name / Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dell Core i7 Workstation"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Asset Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Status</label>
                  <select
                    value={status}
                    // @ts-ignore
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  >
                    <option value="In Use">In Use</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Available">Available</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Assigned To</label>
                <input
                  type="text"
                  placeholder="e.g. Misha Nadeem / Meeting Room"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Asset Value (Rs.)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 150000"
                  value={value || ''}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}