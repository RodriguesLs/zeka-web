import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import RouteWrapper from './utils/RouteWrapper';

// LAYOUTS
const DefaultLoggedLayout = lazy(() => import('@/layouts/DefaultLogged'));
const OnboardingLayout = lazy(() => import('@/layouts/Onboarding'));

// PAGES
const CreateUpdateLicense = lazy(() => import('@/pages/CreateUpdateLicense'));
const RegisterLicense = lazy(() => import('@/pages/RegisterLicense'));
const CreateUpdateOrganization = lazy(() => import('@/pages/CreateUpdateOrganization'));
const CreateUpdateActivity = lazy(() => import('@/pages/CreateUpdateActivity'));
const CreateUpdateExceed = lazy(() => import('@/pages/CreateUpdateExceed'));
const ExceedTeachers = lazy(() => import('@/pages/ExceedTeachers'));
const CreateUpdateUser = lazy(() => import('@/pages/CreateUpdateUser'));
const CreateUpdateUserZeka = lazy(() => import('@/pages/CreateUpdateUserZeka'));
const CreateUpdateTeacher = lazy(() => import('@/pages/CreateUpdateTeacher'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const FarolPlan = lazy(() => import('@/pages/FarolPlan'));
const UserDashboard = lazy(async () => import('@/pages/UserDashboard'));
const Welcome = lazy(() => import('@/pages/Welcome'));
const Payment = lazy(() => import('@/pages/Payment'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Licenses = lazy(() => import('@/pages/Licenses'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));
const Users = lazy(() => import('@/pages/Users'));
const UsersZeka = lazy(() => import('@/pages/UsersZeka'));
const Organizations = lazy(() => import('@/pages/Organizations'));
const Activities = lazy(() => import('@/pages/Activities'));
const Teachers = lazy(() => import('@/pages/Teachers'));
const OperationAreas = lazy(() => import('@/pages/OperationAreas'));
const CreateUpdateOperationArea = lazy(() => import('@/pages/CreateUpdateOperationArea'));
const ShowLicense = lazy(() => import('@/pages/ShowLicense'));
const UpdateProfile = lazy(() => import('@/pages/UpdateProfile'));

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
      <Route path='/welcome' element={<RouteWrapper title='Bem-vindo!' component={Welcome} />} />
      <Route path='/payment' element={<RouteWrapper title='Status do pagamento' component={Payment} />} />
      <Route path='/user-dashboard' element={<RouteWrapper title='Dashboard' component={UserDashboard} />} />
      <Route path='/farol-plan' element={<RouteWrapper title='Planilha Farol' component={FarolPlan} />} />
      <Route path='/dashboard' element={<RouteWrapper title='Dashboard' component={Dashboard} />} />
      <Route path='/meu-perfil/:userId' element={<RouteWrapper title='Editar perfil' component={UpdateProfile} />} />
      <Route path='licencas'>
        <Route
          index
          element={<RouteWrapper title='Gerenciamento de Licenças' component={Licenses} />}
        />
        <Route
          path='nova-licenca'
          element={<RouteWrapper title='Nova licença' component={CreateUpdateLicense} />}
        />
        <Route
          path='edita-licenca/:licenseId'
          element={<RouteWrapper title='Editar licença' component={CreateUpdateLicense} />}
        />
        <Route
          path='licenca'
          element={<RouteWrapper title='Detalhes da licença' component={ShowLicense} />}
        />
        <Route
          path='atribuir-licenca'
          element={<RouteWrapper title='Atribuir licença' component={RegisterLicense} />}
        />
      </Route>
      <Route path='usuarios'>
        <Route index element={<RouteWrapper title='Usuários' component={Users} />} />
        <Route
          path='novo-usuario'
          element={<RouteWrapper title='Novo usuário' component={CreateUpdateUser} />}
        />
        <Route
          path='edita-usuario/:userId'
          element={<RouteWrapper title='Editar usuário' component={CreateUpdateUser} />}
        />
      </Route>
      <Route path='usuarios-zeka'>
        <Route index element={<RouteWrapper title='Usuários Zeka' component={UsersZeka} />} />
        <Route
          path='novo-usuario-zeka'
          element={<RouteWrapper title='Novo usuário zeka' component={CreateUpdateUserZeka} />}
        />
        <Route
          path='edita-usuario-zeka/:userId'
          element={<RouteWrapper title='Editar usuário zeka' component={CreateUpdateUserZeka} />}
        />
      </Route>
      <Route path='professores'>
        <Route index element={<RouteWrapper title='Professores' component={Teachers} />} />
        <Route
          path='novo-professor'
          element={<RouteWrapper title='Novo professor' component={CreateUpdateTeacher} />}
        />
        <Route
          path='edita-professor/:teacherId'
          element={<RouteWrapper title='Editar professor' component={CreateUpdateTeacher} />}
        />
      </Route>
      <Route path='empresas'>
        <Route index element={<RouteWrapper title='Empresas' component={Organizations} />} />
        <Route
          path='nova-empresa'
          element={<RouteWrapper title='Nova empresa' component={CreateUpdateOrganization} />}
        />
        <Route
          path='edita-empresa/:orgId'
          element={<RouteWrapper title='Editar empresa' component={CreateUpdateOrganization} />}
        />
      </Route>
      <Route path='departamentos'>
        <Route index element={<RouteWrapper title='Departamentos' component={OperationAreas} />} />
        <Route
          path='novo-departamento'
          element={<RouteWrapper title='Novo departamento' component={CreateUpdateOperationArea} />}
        />
      </Route>
      <Route path='excedente'>
        <Route index element={<RouteWrapper title='Excedente Professores' component={ExceedTeachers} />} />
        <Route
          path='novo-excedente'
          element={<RouteWrapper title='Novo excedente' component={CreateUpdateExceed} />}
        />
      </Route>
      <Route path='atividades'>
        <Route index element={<RouteWrapper title='Atividades' component={Activities} />} />
        <Route
          path='nova-atividade'
          element={<RouteWrapper title='Nova atividade' component={CreateUpdateActivity} />}
        />
        <Route
          path='edita-atividade/:activityId'
          element={<RouteWrapper title='Editar atividade' component={CreateUpdateActivity} />}
        />
      </Route>
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
