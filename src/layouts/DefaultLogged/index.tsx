import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { useTitlePage } from '@/contexts/TitlePageContext';

import * as S from './styles';

const DefaultLogged = () => {
  const { title } = useTitlePage();

  return (
    <S.Container>
      <Header />
      <Sidebar />
      <S.Content>
        <h1>{title}</h1>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default DefaultLogged;
