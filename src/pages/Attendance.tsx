import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
import { Clock, LogIn, LogOut, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttendanceRecord } from '@/types';

// Mock data
const mockAttendance: AttendanceRecord[] = [
  { id: '1', userId: '2', date: '2026-01-03', checkIn: '09:00', checkOut: '18:00', status: 'present', workHours: 9 },
  { id: '2', userId: '2', date: '2026-01-02', checkIn: '08:45', checkOut: '17:30', status: 'present', workHours: 8.75 },
  { id: '3', userId: '2', date: '2026-01-01', status: 'leave' },
  { id: '4', userId: '2', date: '2025-12-31', checkIn: '09:15', checkOut: '18:15', status: 'present', workHours: 9 },
  { id: '5', userId: '2', date: '2025-12-30', status: 'absent' },
  { id: '6', userId: '2', date: '2025-12-29', checkIn: '09:00', checkOut: '17:45', status: 'present', workHours: 8.75 },
];

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setCheckInTime(now);
    setIsCheckedIn(true);
    toast({
      title: 'Checked In',
      description: `You checked in at ${now}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setIsCheckedIn(false);
    toast({
      title: 'Checked Out',
      description: `You checked out at ${now}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      present: 'bg-status-present/10 text-status-present',
      absent: 'bg-status-absent/10 text-status-absent',
      leave: 'bg-status-leave/10 text-status-leave',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
          styles[status as keyof typeof styles]
        )}
      >
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout
      title="Attendance"
      subtitle={isAdmin ? 'Track all employee attendance' : 'Track your daily attendance'}
    >
      <div className="space-y-6">
        {/* Check In/Out Card - Only for employees */}
        {!isAdmin && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Today's Attendance</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {isCheckedIn && checkInTime && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Checked in at</p>
                    <p className="text-lg font-semibold text-success">{checkInTime}</p>
                  </div>
                )}
                
                {!isCheckedIn ? (
                  <Button onClick={handleCheckIn} size="lg" className="gap-2">
                    <LogIn size={20} />
                    Check In
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckOut}
                    size="lg"
                    variant="outline"
                    className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <LogOut size={20} />
                    Check Out
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Present Days', value: 22, color: 'success' },
                { label: 'Absent Days', value: 1, color: 'destructive' },
                { label: 'Leave Days', value: 2, color: 'warning' },
                { label: 'Work Hours', value: '176h', color: 'info' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-secondary/50 p-4 text-center"
                >
                  <p
                    className={cn(
                      'text-2xl font-bold',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'destructive' && 'text-destructive',
                      stat.color === 'warning' && 'text-warning',
                      stat.color === 'info' && 'text-info'
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Records */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Attendance Records</h3>
            </div>
            
            {isAdmin && (
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="emp001">Sarah Johnson</SelectItem>
                  <SelectItem value="emp002">Michael Chen</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {isAdmin && <TableHead>Employee</TableHead>}
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    {isAdmin && <TableCell>Michael Chen</TableCell>}
                    <TableCell>{record.checkIn || '-'}</TableCell>
                    <TableCell>{record.checkOut || '-'}</TableCell>
                    <TableCell>
                      {record.workHours ? `${record.workHours}h` : '-'}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
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

export default Attendance;
