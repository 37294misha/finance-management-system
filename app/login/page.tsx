// app/login/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'superadmin' && password === '12345') {
      localStorage.setItem('userRole', 'SuperAdmin');
      router.push('/dashboard');
    } else if (username === 'admin' && password === '1234') {
      localStorage.setItem('userRole', 'Admin');
      router.push('/dashboard');
    } else if (username === 'manager' && password === '123') {
      localStorage.setItem('userRole', 'Manager');
      router.push('/dashboard');
    } else if (username === 'user' && password === '12') {
      localStorage.setItem('userRole', 'User');
      router.push('/dashboard');
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Finance App Login</h1>
          <p className="text-xs text-slate-400"> Finance App Managment </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="superadmin / admin / manager / user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Demo Logins:</p>
            <p>• SuperAdmin: <code className="text-indigo-400">superadmin</code> / <code className="text-indigo-400">12345</code></p>
            <p>• Admin: <code className="text-indigo-400">admin</code> / <code className="text-indigo-400">1234</code></p>
            <p>• Manager: <code className="text-indigo-400">manager</code> / <code className="text-indigo-400">123</code></p>
            <p>• User: <code className="text-indigo-400">user</code> / <code className="text-indigo-400">12</code></p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}