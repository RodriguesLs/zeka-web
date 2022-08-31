import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const PrivateRoutes = () => {
  const location = useLocation();

  const { token } = useAuth();

  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
};

export default PrivateRoutes;
