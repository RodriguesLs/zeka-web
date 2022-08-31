import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

// LAYOUTS
const OnboardingLayout = lazy(() => import('@/layouts/Onboarding'));

// PAGES
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));

const Routes = () => {
  return (
    <AppRoutes>
      <Route element={<OnboardingLayout />}>
        <Route path='/' element={<Wrapper component={Signin} />} />
        <Route
          path='/esqueci-senha'
          element={<Wrapper component={ForgotPassword} title='Esqueci minha senha' />}
        />
        <Route
          path='/cadastrar-me'
          element={<Wrapper component={Signup} title='Criando minha conta' />}
        />
      </Route>
      <Route
        path='/dashboard'
        element={<Wrapper component={Dashboard} title='Dashboard' isPrivate />}
      />
      <Route path='*' element={<NotFound />} />
    </AppRoutes>
  );
};

export default Routes;
