import { Navigate, useLocation } from 'react-router-dom';

interface RouteWrapperProps {
  component: React.ComponentType;
  isPrivate?: boolean;
}

const RouteWrapper = ({ component: Component, isPrivate = false }: RouteWrapperProps) => {
  const location = useLocation();

  const isAuthenticated = false;

  if (isAuthenticated && !isPrivate) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }

  if (!isAuthenticated && isPrivate) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Component />;
};

export default RouteWrapper;
