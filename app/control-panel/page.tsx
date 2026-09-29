// app/control-panel/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialEmployees, Employee } from '@/data/mockData';
import { Users, CreditCard, HardDrive, ShieldAlert, X, Plus, Edit2, Trash2 } from 'lucide-react';

export default function EmployeesControlPage() {
  const [role, setRole] = useState('SuperAdmin');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // Modal Control States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form Input States
  const [currentId, setCurrentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [empRole, setEmpRole] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'SuperAdmin';
    setRole(savedRole);
  }, []);

  // Open Add Modal
  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setEmpRole('');
    setDepartment('');
    setSalary(0);
    setShowAddModal(true);
  };

  // Save New Employee
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: `EMP-00${employees.length + 1}`,
      name: name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@company.com`,
      role: empRole,
      department: department,
      salary: Number(salary),
      status: 'Active',
    };
    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
  };

  // Open Edit Modal
  const handleOpenEdit = (emp: Employee) => {
    setCurrentId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setEmpRole(emp.role);
    setDepartment(emp.department);
    setSalary(emp.salary);
    setShowEditModal(true);
  };

  // Save Updated Employee
  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees(
      employees.map((emp) =>
        emp.id === currentId
          ? { ...emp, name, email, role: empRole, department, salary: Number(salary) }
          : emp
      )
    );
    setShowEditModal(false);
  };

  // Delete Employee
  const handleDelete = (id: string) => {
    if (role === 'Manager') {
      alert('Managers are not permitted to delete employee records.');
      return;
    }
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
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
        <Link href="/control-panel" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-md">
          <Users className="w-4 h-4" /> Employees & Salary
        </Link>
        <Link href="/control-panel/expenses" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100">
          <CreditCard className="w-4 h-4" /> Expenses Management
        </Link>
        <Link href="/control-panel/assets" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100">
          <HardDrive className="w-4 h-4" /> Assets Management
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Employee Directory & Payroll ({employees.length})</h3>
          {role !== 'User' && (
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          )}
        </div>

        <div className="space-y-3">
          {employees.map((e) => (
            <div key={e.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/60 transition-colors">
              <div>
                <p className="font-bold text-slate-800">{e.name}</p>
                <p className="text-xs text-slate-400">{e.role} • {e.department} | <span className="text-indigo-500">{e.email}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">
                    Rs. {e.salary.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">{e.status}</span>
                </div>

                {role !== 'User' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(e)}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white px-3 py-1.5 rounded-lg border shadow-sm cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>

                    {role !== 'Manager' && (
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg border border-slate-200 bg-white shadow-sm transition-all cursor-pointer"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-800">Add New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer"
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IT"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. ali@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Monthly Salary (Rs.)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 120000"
                  value={salary || ''}
                  onChange={(e) => setSalary(Number(e.target.value))}
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
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT EMPLOYEE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-800">Edit Employee Details</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Monthly Salary (Rs.)</label>
                <input
                  type="number"
                  required
                  value={salary || ''}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md cursor-pointer"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}