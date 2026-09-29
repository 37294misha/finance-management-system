// data/mockData.ts

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  assignedTo: string;
  value: number;
  status: 'In Use' | 'Maintenance' | 'Available';
}

export const initialEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Misha Nadeem', email: 'misha@gmail.com', role: 'IT Officer', department: 'IT', salary: 100000, status: 'Active' },
  { id: 'EMP-002', name: 'Bisma', email: 'bisma@gmail.com', role: 'Financial Analyst', department: 'Finance', salary: 110000, status: 'Active' },
  { id: 'EMP-003', name: 'Hafiza', email: 'hafiza@gmail.com', role: 'Fundraising Officer', department: 'Fund Raising', salary: 95000, status: 'Active' },
];

export const initialExpenses: Expense[] = [
  { id: 'EXP-101', title: 'AWS Cloud Hosting Server', category: 'Infrastructure', amount: 45000, date: '2026-09-15', status: 'Approved' },
  { id: 'EXP-102', title: 'Office Pantry Snacks & Coffee', category: 'Operations', amount: 12000, date: '2026-09-18', status: 'Approved' },
];

export const initialAssets: Asset[] = [
  { id: 'AST-501', name: 'MacBook Pro 16" M3', type: 'Hardware', assignedTo: 'Misha Nadeem', value: 350000, status: 'In Use' },
  { id: 'AST-502', name: 'Dell UltraSharp 27" Monitor', type: 'Hardware', assignedTo: 'Bisma', value: 85000, status: 'In Use' },
];

// 4 Roles with precise access definitions
export const initialRoles = [
  { name: 'SuperAdmin', canCreate: ['SuperAdmin', 'Admin', 'Manager', 'User'], canEdit: true, canDelete: true, settings: true },
  { name: 'Admin', canCreate: ['Manager', 'User'], canEdit: true, canDelete: true, settings: false },
  { name: 'Manager', canCreate: ['User'], canEdit: true, canDelete: false, settings: false },
  { name: 'User', canCreate: [], canEdit: false, canDelete: false, settings: false },
];