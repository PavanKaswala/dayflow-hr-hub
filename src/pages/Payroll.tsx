import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PayrollRecord } from '@/types';

// Mock data
const mockPayroll: PayrollRecord[] = [
  {
    id: '1',
    userId: '2',
    month: 'January',
    year: 2026,
    basicSalary: 4000,
    allowances: 850,
    deductions: 200,
    netSalary: 4650,
    status: 'pending',
  },
  {
    id: '2',
    userId: '2',
    month: 'December',
    year: 2025,
    basicSalary: 4000,
    allowances: 850,
    deductions: 180,
    netSalary: 4670,
    status: 'paid',
    paidDate: '2025-12-28',
  },
  {
    id: '3',
    userId: '2',
    month: 'November',
    year: 2025,
    basicSalary: 4000,
    allowances: 850,
    deductions: 200,
    netSalary: 4650,
    status: 'paid',
    paidDate: '2025-11-29',
  },
  {
    id: '4',
    userId: '2',
    month: 'October',
    year: 2025,
    basicSalary: 4000,
    allowances: 800,
    deductions: 150,
    netSalary: 4650,
    status: 'paid',
    paidDate: '2025-10-30',
  },
];

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [selectedYear, setSelectedYear] = useState('2026');

  const currentSalary = mockPayroll[0];
  const previousSalary = mockPayroll[1];
  const salaryDiff = currentSalary.netSalary - previousSalary.netSalary;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout
      title="Payroll"
      subtitle={isAdmin ? 'Manage employee payroll' : 'View your salary details'}
    >
      <div className="space-y-6">
        {/* Salary Summary Card */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm opacity-80">
                  {isAdmin ? 'Total Payroll This Month' : 'Your Current Salary'}
                </p>
                <p className="text-4xl font-bold mt-1">
                  {formatCurrency(isAdmin ? 156000 : currentSalary.netSalary)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {salaryDiff >= 0 ? (
                    <TrendingUp size={16} className="text-success-foreground" />
                  ) : (
                    <TrendingDown size={16} className="text-destructive-foreground" />
                  )}
                  <span className="text-sm opacity-80">
                    {salaryDiff >= 0 ? '+' : ''}
                    {formatCurrency(salaryDiff)} from last month
                  </span>
                </div>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <DollarSign size={32} />
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="p-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              {currentSalary.month} {currentSalary.year} Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm text-muted-foreground">Basic Salary</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(currentSalary.basicSalary)}
                </p>
              </div>
              <div className="rounded-lg bg-success/10 p-4">
                <p className="text-sm text-muted-foreground">Allowances</p>
                <p className="text-xl font-bold text-success">
                  +{formatCurrency(currentSalary.allowances)}
                </p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-4">
                <p className="text-sm text-muted-foreground">Deductions</p>
                <p className="text-xl font-bold text-destructive">
                  -{formatCurrency(currentSalary.deductions)}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm text-muted-foreground">Net Salary</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(currentSalary.netSalary)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll History */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Payroll History</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              
              {!isAdmin && (
                <Button variant="outline" size="sm" className="gap-2">
                  <Download size={16} />
                  Export
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  {isAdmin && <TableHead>Employee</TableHead>}
                  <TableHead className="text-right">Basic</TableHead>
                  <TableHead className="text-right">Allowances</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayroll.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.month} {record.year}
                    </TableCell>
                    {isAdmin && <TableCell>Michael Chen</TableCell>}
                    <TableCell className="text-right">
                      {formatCurrency(record.basicSalary)}
                    </TableCell>
                    <TableCell className="text-right text-success">
                      +{formatCurrency(record.allowances)}
                    </TableCell>
                    <TableCell className="text-right text-destructive">
                      -{formatCurrency(record.deductions)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(record.netSalary)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                          record.status === 'paid'
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        )}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
