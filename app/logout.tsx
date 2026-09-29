// app/layout.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, SlidersHorizontal, Settings, Wallet, LogOut } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState('SuperAdmin');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'SuperAdmin';
    setRole(savedRole);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  if (pathname === '/login') {
    return (
      <html lang="en">
        <head><title>Login - Finance Management</title></head>
        <body className="bg-slate-900 text-white font-sans">{children}</body>
      </html>
    );
  }

  // Settings tab sirf SuperAdmin ko dikhega (User aur Manager ke liye hide)
  // app/layout.tsx (menuItems update)
const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, show: true },
  { name: 'Control Panel', href: '/control-panel', icon: SlidersHorizontal, show: true },
  { name: 'Settings (RBAC)', href: '/settings', icon: Settings, show: true }, // Yeh ab sabko nazar aaye ga
];

  return (
    <html lang="en">
      <head><title>Finance Management System</title></head>
      <body className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden font-sans">
        
        {/* Left Side Navigation Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-xl hidden md:flex">
          
          <div>
            {/* Top Logo & Top Logout */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm tracking-tight">Finance App</h2>
                  <p className="text-[11px] text-indigo-400 font-semibold">{role}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-6 space-y-1.5">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-3">Main Navigation</p>
              {menuItems.filter(item => item.show).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 translate-x-1'
                        : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer User Info */}
          <div className="p-4 m-4 bg-slate-800/50 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              {role.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">{role} Account</p>
              <span className="text-[10px] text-emerald-400 font-medium">● Online</span>
            </div>
          </div>

        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
          {children}
        </main>

      </body>
    </html>
  );
}