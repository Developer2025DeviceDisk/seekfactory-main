import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, User, LoginCredentials, RegisterData } from '@/lib/api';

interface AuthUser extends User { }

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (userData: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');

      if (token) {
        try {
          const response = await apiClient.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
          } else {
            // Invalid token, remove it
            localStorage.removeItem('auth_token');
            apiClient.setToken(null);
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
          // Invalid token, remove it
          localStorage.removeItem('auth_token');
          apiClient.setToken(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.login(credentials);

      if (response.success && response.user) {
        setUser(response.user);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (userData: RegisterData) => {
    try {
      const response = await apiClient.register(userData);

      if (response.success && response.user) {
        setUser(response.user);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Sign out error:', error);
      // Continue with logout even if API call fails
    } finally {
      setUser(null);
      // Token is already cleared in apiClient.logout()
    }
  };

  const updateUserProfile = async (userData: FormData) => {
    try {
      // Send FormData with proper headers
      const response = await apiClient.updateProfile(userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success && response.user) {
        setUser(response.user);
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };


  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
