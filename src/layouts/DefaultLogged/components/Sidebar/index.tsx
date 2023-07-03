import { useState } from 'react';
import { Heading, HStack, Image, Icon, Link, VStack } from '@chakra-ui/react';
import { FiHome, FiKey, FiUser, FiChevronLeft } from 'react-icons/fi';
import { GrMoney } from 'react-icons/gr';
import { GoOrganization, GoDashboard } from 'react-icons/go';
import { MdOutlineDirections } from 'react-icons/md';
import {
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaRegMoneyBillAlt,
} from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';

import NavLink from './NavLink';
import logoImg from '@/assets/img/logo.svg';

import * as S from './styles';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { role, organizationId, user } = useAuth();
  const API_TAMBORO = import.meta.env.VITE_API_TAMBORO_URL;
  const homeTitle = role === 'student' ? 'Eventos' : 'Home';

  return (
    <S.Container isMinimized={isMinimized}>
      <S.ButtonToggleSidebar
        onClick={() => setIsMinimized((oldState) => !oldState)}
        isMinimized={isMinimized}
      >
        <FiChevronLeft />
      </S.ButtonToggleSidebar>
      <Image
        src={logoImg}
        w='120px'
        alt='logo zeka img'
        visibility={isMinimized ? 'hidden' : 'visible'}
      />
      <VStack as='nav' w='100%' h='100%' px='0.5rem'>
        <NavLink to='/welcome' icon={FiHome} title={homeTitle} />
        { role === 'student' && <NavLink to='/user-dashboard' icon={GoDashboard} title='Dashboard' /> }
        { role === 'sysadmin' && <NavLink to='/farol-plan' icon={GoDashboard} title='Planilha Farol' /> }
        { role === 'admin_organization' && <NavLink to='/dashboard' icon={GoDashboard} title='Dashboard' /> }
        { role === 'admin_organization' && <NavLink to='/usuarios' icon={FiUser} title='Usuários' /> }
        { role === 'sysadmin' && <NavLink to='/usuarios-zeka' icon={FiUser} title='Usuários [Zeka]' /> }
        { role === 'sysadmin' && <NavLink to='/excedente' icon={GrMoney} title='Excedente professores' /> }
        { role === 'sysadmin' && <NavLink to='/empresas' icon={GoOrganization} title='Empresas' /> }
        { role === 'admin_organization' && <NavLink to={`/empresas/edita-empresa/${organizationId}`} icon={GoOrganization} title='Empresa' /> }
        {/* { role === 'sysadmin' && <NavLink to='/licencas' icon={FiKey} title='Licenças' /> } */}
        { role === 'user' && <NavLink to='/professores' icon={FiUser} title='Professores' /> }
        { (role === 'teacher' || role === 'user') && <NavLink to='/atividades' icon={FiKey} title='Atividades' /> }
        { (role === 'teacher' || role === 'student') && <NavLink to='/payment' icon={FaRegMoneyBillAlt} title='Pagamentos' /> }
        {
          role === 'student' && user?.student?.status === 'active' &&
          <a
            href={`${API_TAMBORO}/#/login?userName=${user.email}&token=${user?.student?.token}`}
            className='linkToTamboro'
            target="_blank"
            title='Tamboro'
          >
            <Icon as={MdOutlineDirections} w='24px' h='24px' />
            Acesse o app zeka
          </a>
        }
        { (role === 'admin_organization') && <NavLink to='/departamentos' icon={GoOrganization} title='Departamentos' /> }
        { (role === 'admin_organization') && <NavLink to='/licencas/licenca' icon={FiKey} title='Licença' /> }
      </VStack>
      {!isMinimized && <ListSocial />}
    </S.Container>
  );
};

const linksMidia = [
  {
    href: 'https://www.facebook.com/zeka.edu/',
    icon: FaFacebook,
  },
  {
    href: 'https://www.instagram.com/zekaedu/',
    icon: FaInstagram,
  },
  {
    href: 'https://br.linkedin.com/company/zeka-edu',
    icon: FaLinkedin,
  },
  {
    href: 'https://www.youtube.com/@zekaedu-educacaodigital2992',
    icon: FaYoutube,
  },
];

const ListSocial = () => {
  return (
    <VStack gap='1rem'>
      <Heading as='h4' fontSize='1rem'>
        ZEKA na mídia
      </Heading>
      <HStack w='100%' gap='0.25rem' listStyleType='none' color='gray.500'>
        {linksMidia.map((lm) => (
          <Link key={lm.href} href={lm.href} target='blank' _hover={{ color: 'brand.500' }}>
            <Icon as={lm.icon} h='22px' w='22px' />
          </Link>
        ))}
      </HStack>
    </VStack>
  );
};

export default Sidebar;
