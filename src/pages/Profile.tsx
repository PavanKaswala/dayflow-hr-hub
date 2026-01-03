import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Calendar,
  IdCard,
  Edit3,
  Save,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been saved.',
    });
    setIsEditing(false);
  };

  const profileFields = [
    {
      label: 'Employee ID',
      value: user?.employeeId,
      icon: IdCard,
      editable: false,
    },
    {
      label: 'Email',
      value: user?.email,
      icon: Mail,
      editable: false,
    },
    {
      label: 'Department',
      value: user?.department,
      icon: Building,
      editable: false,
    },
    {
      label: 'Position',
      value: user?.position,
      icon: Briefcase,
      editable: false,
    },
    {
      label: 'Joining Date',
      value: user?.joiningDate
        ? new Date(user.joiningDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '-',
      icon: Calendar,
      editable: false,
    },
    {
      label: 'Phone',
      value: user?.phone || 'Not provided',
      icon: Phone,
      editable: true,
      field: 'phone',
    },
    {
      label: 'Address',
      value: user?.address || 'Not provided',
      icon: MapPin,
      editable: true,
      field: 'address',
    },
  ];

  return (
    <DashboardLayout title="My Profile" subtitle="View and manage your profile information">
      <div className="max-w-4xl space-y-6">
        {/* Profile Header Card */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div className="h-32 bg-gradient-primary" />
          <div className="relative px-6 pb-6">
            <div className="-mt-16 flex flex-col sm:flex-row sm:items-end sm:gap-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-card bg-primary text-primary-foreground shadow-lg">
                <span className="text-4xl font-bold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="mt-4 flex-1 sm:mt-0">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-muted-foreground">{user?.position}</p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium capitalize',
                      user?.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {user?.status}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                    {user?.role}
                  </span>
                </div>
              </div>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 sm:mt-0"
              >
                {isEditing ? (
                  <>
                    <X size={16} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 size={16} />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Profile Information</h3>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {profileFields.map((field) => (
              <div key={field.label} className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <field.icon size={16} />
                  {field.label}
                </Label>
                {isEditing && field.editable ? (
                  field.field === 'address' ? (
                    <Textarea
                      value={formData[field.field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.field!]: e.target.value })
                      }
                      className="min-h-[80px]"
                    />
                  ) : (
                    <Input
                      value={formData[field.field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.field!]: e.target.value })
                      }
                    />
                  )
                ) : (
                  <p className="text-foreground font-medium">{field.value}</p>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Employment Summary */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Employment Summary</h3>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-primary/10 p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {user?.joiningDate
                  ? Math.floor(
                      (new Date().getTime() - new Date(user.joiningDate).getTime()) /
                        (1000 * 60 * 60 * 24 * 365)
                    )
                  : 0}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Years of Service</p>
            </div>
            <div className="rounded-lg bg-success/10 p-4 text-center">
              <p className="text-3xl font-bold text-success">12</p>
              <p className="mt-1 text-sm text-muted-foreground">Leave Balance</p>
            </div>
            <div className="rounded-lg bg-info/10 p-4 text-center">
              <p className="text-3xl font-bold text-info">92%</p>
              <p className="mt-1 text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
