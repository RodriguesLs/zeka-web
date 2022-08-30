import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

const OnboardingLayout = lazy(() => import('@/layouts/Onboarding'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));

const Routes = () => {
  return (
    <AppRoutes>
      <Route element={<OnboardingLayout />}>
        <Route path='/' element={<Wrapper component={Signin} />} />
        <Route path='/signup' element={<Wrapper component={Signup} />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
