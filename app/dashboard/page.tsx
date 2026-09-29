// app/dashboard/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { initialEmployees, initialExpenses, initialAssets } from '@/data/mockData';
import { LayoutDashboard, Users, CreditCard, HardDrive, TrendingUp, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const [role, setRole] = useState('SuperAdmin');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'SuperAdmin';
    setRole(savedRole);
  }, []);

  // Calculate totals
  const totalPayroll = initialEmployees.reduce((acc, curr) => acc + curr.salary, 0);
  const totalExpenses = initialExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalAssetsValue = initialAssets.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" /> Executive Financial Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back! Here is your company's financial overview and metrics.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold border border-indigo-100">
          Logged in as: {role}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total Payroll */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Monthly Payroll</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Rs. {totalPayroll.toLocaleString()}</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Active Staff: {initialEmployees.length} Members
          </p>
        </div>

        {/* Card 2: Total Expenses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Operational Expenses</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Rs. {totalExpenses.toLocaleString()}</h3>
          <p className="text-xs text-amber-600 font-semibold">
            {initialExpenses.length} Approved Bills & Subscriptions
          </p>
        </div>

        {/* Card 3: Hardware Assets */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Assets Value</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Rs. {totalAssetsValue.toLocaleString()}</h3>
          <p className="text-xs text-emerald-600 font-semibold">
            {initialAssets.length} Hardware Equipment Registered
          </p>
        </div>
      </div>

     
    </div>
  );
}