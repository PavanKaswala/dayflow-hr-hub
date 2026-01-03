import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Plus, Check, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/types';

// Mock data
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    reason: 'Family vacation',
    status: 'pending',
    createdAt: '2026-01-03',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'sick',
    startDate: '2025-12-28',
    endDate: '2025-12-28',
    reason: 'Not feeling well',
    status: 'approved',
    adminComment: 'Get well soon!',
    createdAt: '2025-12-27',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emily Davis',
    leaveType: 'unpaid',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    reason: 'Personal matters',
    status: 'pending',
    createdAt: '2026-01-02',
  },
  {
    id: '4',
    userId: '2',
    userName: 'Michael Chen',
    leaveType: 'paid',
    startDate: '2025-11-25',
    endDate: '2025-11-26',
    reason: 'Wedding attendance',
    status: 'rejected',
    adminComment: 'Critical project deadline',
    createdAt: '2025-11-20',
  },
];

const Leave: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'pending' : 'all');
  const [formData, setFormData] = useState({
    leaveType: '' as LeaveType | '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Leave request submitted',
      description: 'Your leave request has been submitted for approval.',
    });
    setIsDialogOpen(false);
    setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? 'Leave approved' : 'Leave rejected',
      description: `The leave request has been ${action}d.`,
    });
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const styles = {
      pending: 'bg-warning/10 text-warning',
      approved: 'bg-success/10 text-success',
      rejected: 'bg-destructive/10 text-destructive',
    };

    const icons = {
      pending: Clock,
      approved: Check,
      rejected: X,
    };

    const Icon = icons[status];

    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
          styles[status]
        )}
      >
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    const styles = {
      paid: 'bg-leave-paid/10 text-leave-paid',
      sick: 'bg-leave-sick/10 text-leave-sick',
      unpaid: 'bg-leave-unpaid/10 text-leave-unpaid',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
          styles[type]
        )}
      >
        {type}
      </span>
    );
  };

  const filteredRequests = mockLeaveRequests.filter((request) => {
    if (!isAdmin) return request.userId === '2'; // Show only current user's requests
    if (activeTab === 'pending') return request.status === 'pending';
    if (activeTab === 'approved') return request.status === 'approved';
    if (activeTab === 'rejected') return request.status === 'rejected';
    return true;
  });

  return (
    <DashboardLayout
      title="Leave Management"
      subtitle={isAdmin ? 'Manage employee leave requests' : 'Apply for leave and track your requests'}
    >
      <div className="space-y-6">
        {/* Leave Balance Card */}
        {!isAdmin && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Leave Balance</h3>
                <p className="text-sm text-muted-foreground">Your available leave days</p>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} />
                    Apply for Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                    <DialogDescription>
                      Fill in the details to submit your leave request
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Leave Type</Label>
                      <Select
                        value={formData.leaveType}
                        onValueChange={(value: LeaveType) =>
                          setFormData({ ...formData, leaveType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid Leave</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({ ...formData, startDate: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({ ...formData, endDate: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Textarea
                        placeholder="Describe the reason for your leave"
                        value={formData.reason}
                        onChange={(e) =>
                          setFormData({ ...formData, reason: e.target.value })
                        }
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Request</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Paid Leave', value: 8, total: 12, color: 'success' },
                { label: 'Sick Leave', value: 3, total: 5, color: 'warning' },
                { label: 'Unpaid Leave', value: '∞', total: null, color: 'muted' },
              ].map((leave) => (
                <div
                  key={leave.label}
                  className="rounded-lg bg-secondary/50 p-4 text-center"
                >
                  <p
                    className={cn(
                      'text-2xl font-bold',
                      leave.color === 'success' && 'text-success',
                      leave.color === 'warning' && 'text-warning',
                      leave.color === 'muted' && 'text-muted-foreground'
                    )}
                  >
                    {leave.value}
                    {leave.total && (
                      <span className="text-sm text-muted-foreground">/{leave.total}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{leave.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leave Requests Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Leave Requests</h3>
            </div>
          </div>

          {isAdmin && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
              <TabsList className="grid w-full grid-cols-4 lg:w-96">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {isAdmin && <TableHead>Employee</TableHead>}
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  {isAdmin && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    {isAdmin && <TableCell className="font-medium">{request.userName}</TableCell>}
                    <TableCell>{getLeaveTypeBadge(request.leaveType)}</TableCell>
                    <TableCell>
                      {new Date(request.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(request.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              className="text-success hover:bg-success/10"
                              onClick={() => handleAction(request.id, 'approve')}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleAction(request.id, 'reject')}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    )}
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

export default Leave;
