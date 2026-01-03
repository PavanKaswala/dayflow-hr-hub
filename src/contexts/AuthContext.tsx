import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dayflow.com',
    employeeId: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    phone: '+1 234 567 8900',
    address: '123 Corporate Ave, Suite 500',
    joiningDate: '2020-03-15',
    status: 'active',
  },
  {
    id: '2',
    email: 'employee@dayflow.com',
    employeeId: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    phone: '+1 234 567 8901',
    address: '456 Tech Park, Building A',
    joiningDate: '2022-06-01',
    status: 'active',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('dayflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // In real app, validate password here
    setUser(foundUser);
    localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
  };

  const signup = async (data: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      department: 'Unassigned',
      position: 'New Employee',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    
    setUser(newUser);
    localStorage.setItem('dayflow_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dayflow_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
