import { useState } from 'react';
import { Heading, HStack, Image, Icon, Link, VStack } from '@chakra-ui/react';
import { FiHome, FiKey, FiUser, FiChevronLeft } from 'react-icons/fi';
import { GoOrganization } from 'react-icons/go';
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
  const { role, organizationId } = useAuth();

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
        { role === 'sysadmin' && <NavLink to='/dashboard' icon={FiHome} title='Dashboard' /> }
        { role === 'admin_organization' && <NavLink to='/usuarios' icon={FiUser} title='Usuários' /> }
        { role === 'sysadmin' && <NavLink to='/usuarios-zeka' icon={FiUser} title='Usuários [Zeka]' /> }
        { role === 'sysadmin' && <NavLink to='/empresas' icon={GoOrganization} title='Empresas' /> }
        { role === 'admin_organization' && <NavLink to={`/empresas/edita-empresa/${organizationId}`} icon={GoOrganization} title='Empresa' /> }
        { role === 'sysadmin' && <NavLink to='/licencas' icon={FiKey} title='Licenças' /> }
        { role === 'user' && <NavLink to='/professores' icon={FiUser} title='Professores' /> }
        { (role === 'teacher' || role === 'user') && <NavLink to='/atividades' icon={FiKey} title='Atividades' /> }
        { (role === 'teacher' || role === 'student') && <NavLink to='/' icon={FaRegMoneyBillAlt} title='Pagamentos' /> }
        { (role === 'admin_organization') && <NavLink to='/departamentos' icon={GoOrganization} title='Departamentos' /> }
        { (role === 'admin_organization') && <NavLink to='/licencas/licenca' icon={FiKey} title='Licença' /> }
      </VStack>
      {!isMinimized && <ListSocial />}
    </S.Container>
  );
};

const ListSocial = () => {
  return (
    <VStack gap='1rem'>
      <Heading as='h4' fontSize='1rem'>
        ZEKA na mídia
      </Heading>
      <HStack w='100%' gap='0.25rem' listStyleType='none' color='gray.500'>
        <Link href='https://facebook.com' target='_blank' _hover={{ color: 'brand.500' }}>
          <Icon as={FaFacebook} h='22px' w='22px' />
        </Link>
        <Link href='https://instagram.com' target='_blank' _hover={{ color: 'brand.500' }}>
          <Icon as={FaInstagram} h='22px' w='22px' />
        </Link>
        <Link href='https://linkedin.com' target='_blank' _hover={{ color: 'brand.500' }}>
          <Icon as={FaLinkedin} h='22px' w='22px' />
        </Link>
        <Link href='https://twitter.com' target='_blank' _hover={{ color: 'brand.500' }}>
          <Icon as={FaTwitter} h='22px' w='22px' />
        </Link>
        <Link href='https://youtube.com' target='_blank' _hover={{ color: 'brand.500' }}>
          <Icon as={FaYoutube} h='22px' w='22px' />
        </Link>
      </HStack>
    </VStack>
  );
};

export default Sidebar;
