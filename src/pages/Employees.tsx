import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, Search, Plus, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User } from '@/types';

// Mock employees data
const mockEmployees: User[] = [
  {
    id: '1',
    email: 'sarah.johnson@dayflow.com',
    employeeId: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    joiningDate: '2020-03-15',
    status: 'active',
  },
  {
    id: '2',
    email: 'michael.chen@dayflow.com',
    employeeId: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    joiningDate: '2022-06-01',
    status: 'active',
  },
  {
    id: '3',
    email: 'emily.davis@dayflow.com',
    employeeId: 'EMP003',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    joiningDate: '2023-01-10',
    status: 'active',
  },
  {
    id: '4',
    email: 'james.wilson@dayflow.com',
    employeeId: 'EMP004',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'employee',
    department: 'Sales',
    position: 'Sales Executive',
    joiningDate: '2021-09-20',
    status: 'active',
  },
  {
    id: '5',
    email: 'lisa.brown@dayflow.com',
    employeeId: 'EMP005',
    firstName: 'Lisa',
    lastName: 'Brown',
    role: 'employee',
    department: 'Finance',
    position: 'Accountant',
    joiningDate: '2022-03-05',
    status: 'inactive',
  },
];

const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Employees" subtitle="Manage all employee records">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Employees', value: 48, color: 'primary' },
            { label: 'Active', value: 45, color: 'success' },
            { label: 'Inactive', value: 3, color: 'muted' },
            { label: 'New This Month', value: 2, color: 'info' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <p
                className={cn(
                  'text-3xl font-bold',
                  stat.color === 'primary' && 'text-primary',
                  stat.color === 'success' && 'text-success',
                  stat.color === 'muted' && 'text-muted-foreground',
                  stat.color === 'info' && 'text-info'
                )}
              >
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Employees Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Employee Directory</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Button className="gap-2">
                <Plus size={18} />
                Add Employee
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{employee.employeeId}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      {new Date(employee.joiningDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                          employee.status === 'active'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye size={16} />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit size={16} />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 size={16} />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="p-12 text-center">
              <Users size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No employees found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
