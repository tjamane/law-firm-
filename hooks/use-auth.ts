'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';

// Custom hook for managing authentication state
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lawfirm_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('lawfirm_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function - stores user name in localStorage
  const login = useCallback((name: string) => {
    const userData: User = {
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@lawfirm.com`,
      role: 'Attorney',
    };
    localStorage.setItem('lawfirm_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  // Logout function - clears user from localStorage
  const logout = useCallback(() => {
    localStorage.removeItem('lawfirm_user');
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
