
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface RouteProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export const PrivateRoute: React.FC<RouteProps> = ({ children, onNavigate }) => {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !user) {
      onNavigate('login');
    }
  }, [user, isLoading, onNavigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export const PublicRoute: React.FC<RouteProps> = ({ children, onNavigate }) => {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && user) {
      onNavigate('home');
    }
  }, [user, isLoading, onNavigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return !user ? <>{children}</> : null;
};
