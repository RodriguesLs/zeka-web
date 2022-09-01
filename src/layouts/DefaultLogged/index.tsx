import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { useSidebar } from '@/contexts/SidebarContext';

import * as S from './styles';

const DefaultLogged = () => {
  const { isVisible } = useSidebar();
  return (
    <S.Container sideBarIsVisible={isVisible}>
      <Header />
      <Sidebar />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default DefaultLogged;
