export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  email: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joiningDate: string;
  status: 'active' | 'inactive';
}

export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  workHours?: number;
}

export type LeaveType = 'paid' | 'sick' | 'unpaid';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  adminComment?: string;
  createdAt: string;
}

export interface PayrollRecord {
  id: string;
  userId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
  paidDate?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  pendingLeaves: number;
  onLeaveToday: number;
}
