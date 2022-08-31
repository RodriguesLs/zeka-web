import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteWrapperProps {
  component: React.ComponentType;
  isPrivate?: boolean;
  title?: string;
}

const RouteWrapper = ({
  component: Component,
  isPrivate = false,
  title = '',
}: RouteWrapperProps) => {
  const location = useLocation();

  const { user } = useAuth();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (title) document.title = `Zeka | ${title}`;
    else document.title = 'Zeka Educação Digital';
  }, [title]);

  if (isAuthenticated && !isPrivate) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }

  if (!isAuthenticated && isPrivate) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Component />;
};

export default RouteWrapper;
