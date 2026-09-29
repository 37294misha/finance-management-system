// app/control-panel/expenses/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialExpenses, Expense } from '@/data/mockData';
import { Users, CreditCard, HardDrive, ShieldAlert, X, Plus, Trash2 } from 'lucide-react';

export default function ExpensesControlPage() {
  const [role, setRole] = useState('SuperAdmin');
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Operations');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'Approved' | 'Pending' | 'Rejected'>('Approved');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'SuperAdmin';
    setRole(savedRole);
  }, []);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: `EXP-10${expenses.length + 1}`,
      title,
      category,
      amount: Number(amount),
      date,
      status,
    };
    setExpenses([...expenses, newExpense]);
    setShowAddModal(false);
    setTitle('');
    setAmount(0);
  };

  const handleDelete = (id: string) => {
    if (role === 'Manager') {
      alert('Managers are not permitted to delete expense records.');
      return;
    }
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter((ex) => ex.id !== id));
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
        <Link href="/control-panel/expenses" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-md">
          <CreditCard className="w-4 h-4" /> Expenses Management
        </Link>
        <Link href="/control-panel/assets" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100">
          <HardDrive className="w-4 h-4" /> Assets Management
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Company Operational Expenses ({expenses.length})</h3>
          {role !== 'User' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" /> Add Expense
            </button>
          )}
        </div>

        <div className="space-y-3">
          {expenses.map((ex) => (
            <div key={ex.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/60 transition-colors">
              <div>
                <p className="font-bold text-slate-800">{ex.title}</p>
                <p className="text-xs text-slate-400">Category: {ex.category} | Date: {ex.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg text-sm">
                    Rs. {ex.amount.toLocaleString()}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-semibold">
                    {ex.status}
                  </span>
                </div>

                {role !== 'User' && role !== 'Manager' && (
                  <button
                    onClick={() => handleDelete(ex.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg border border-slate-200 bg-white shadow-sm transition-all cursor-pointer"
                    title="Delete Expense"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD EXPENSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-800">Add New Expense</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Expense Title / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office Electricity Bill"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Operations">Operations</option>
                    <option value="Software">Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Utilities">Utilities</option>
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
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Amount (Rs.)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 25000"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}