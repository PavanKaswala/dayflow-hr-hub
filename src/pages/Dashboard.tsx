import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ModuleCard from '@/components/dashboard/ModuleCard';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  UserCheck,
  Calendar,
  Clock,
  User,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Mock stats for admin
  const adminStats = [
    {
      title: 'Total Employees',
      value: 48,
      icon: Users,
      variant: 'primary' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Present Today',
      value: 42,
      icon: UserCheck,
      variant: 'success' as const,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Pending Leave Requests',
      value: 7,
      icon: Calendar,
      variant: 'warning' as const,
    },
    {
      title: 'On Leave Today',
      value: 3,
      icon: Clock,
      variant: 'info' as const,
    },
  ];

  // Mock stats for employee
  const employeeStats = [
    {
      title: 'Attendance This Month',
      value: '92%',
      icon: Clock,
      variant: 'success' as const,
    },
    {
      title: 'Leave Balance',
      value: 12,
      icon: Calendar,
      variant: 'primary' as const,
    },
    {
      title: 'Pending Requests',
      value: 1,
      icon: AlertCircle,
      variant: 'warning' as const,
    },
    {
      title: 'This Month Salary',
      value: '$4,850',
      icon: DollarSign,
      variant: 'info' as const,
    },
  ];

  const stats = isAdmin ? adminStats : employeeStats;

  const modules = [
    {
      title: 'My Profile',
      description: 'View and manage your personal information',
      icon: User,
      path: '/profile',
      color: 'primary' as const,
    },
    {
      title: 'Attendance',
      description: isAdmin
        ? 'Track employee attendance and work hours'
        : 'Check in/out and view your attendance history',
      icon: Clock,
      path: '/attendance',
      color: 'success' as const,
    },
    {
      title: 'Leave Management',
      description: isAdmin
        ? 'Approve or reject leave requests'
        : 'Apply for leave and track request status',
      icon: Calendar,
      path: '/leave',
      color: 'warning' as const,
    },
    {
      title: 'Payroll',
      description: isAdmin
        ? 'Manage employee salaries and payroll'
        : 'View your salary details and payslips',
      icon: DollarSign,
      path: '/payroll',
      color: 'info' as const,
    },
    ...(isAdmin
      ? [
          {
            title: 'Employees',
            description: 'Manage all employee records and data',
            icon: Users,
            path: '/employees',
            color: 'accent' as const,
          },
        ]
      : []),
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={isAdmin ? 'HR Management Overview' : `Welcome back, ${user?.firstName}!`}
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <div
                key={module.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ModuleCard {...module} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h2>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="space-y-4">
              {[
                {
                  action: isAdmin ? 'John Smith applied for sick leave' : 'You checked in',
                  time: '2 hours ago',
                  icon: isAdmin ? Calendar : Clock,
                  color: 'primary',
                },
                {
                  action: isAdmin ? 'New employee onboarded: Emily Davis' : 'Leave request approved',
                  time: '5 hours ago',
                  icon: isAdmin ? Users : Calendar,
                  color: 'success',
                },
                {
                  action: isAdmin
                    ? 'Monthly payroll processed'
                    : 'Salary credited for December',
                  time: 'Yesterday',
                  icon: DollarSign,
                  color: 'info',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      activity.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : activity.color === 'success'
                        ? 'bg-success/10 text-success'
                        : 'bg-info/10 text-info'
                    }`}
                  >
                    <activity.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <TrendingUp size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
