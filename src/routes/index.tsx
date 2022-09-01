import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import RouteWrapper from './utils/RouteWrapper';

// LAYOUTS
import DefaultLoggedLayout from '@/layouts/DefaultLogged';
const OnboardingLayout = lazy(() => import('@/layouts/Onboarding'));

// PAGES
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));
const Users = lazy(() => import('@/pages/Users'));

const publicRoutes = () => (
  <Route element={<PublicRoutes />}>
    <Route element={<OnboardingLayout />}>
      <Route path='/' element={<RouteWrapper title='Faça seu login' component={Signin} />} />
      <Route
        path='/esqueci-senha'
        element={<RouteWrapper title='Esqueci minha senha' component={ForgotPassword} />}
      />
      <Route
        path='/cadastrar-me'
        element={<RouteWrapper title='Criando minha conta' component={Signup} />}
      />
    </Route>
  </Route>
);

const privateRoutes = () => (
  <Route element={<PrivateRoutes />}>
    <Route element={<DefaultLoggedLayout />}>
      <Route path='/dashboard' element={<RouteWrapper title='Dashboard' component={Dashboard} />} />
      <Route path='/usuarios' element={<RouteWrapper title='Usuários' component={Users} />} />
    </Route>
  </Route>
);

const Routes = () => {
  return (
    <AppRoutes>
      {publicRoutes()}
      {privateRoutes()}
      <Route path='*' element={<NotFound />} />
    </AppRoutes>
  );
};

export default Routes;
