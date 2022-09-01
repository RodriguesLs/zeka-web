import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import * as S from './styles';

const DefaultLogged = () => {
  return (
    <S.Container>
      <Header />
      <Sidebar />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default DefaultLogged;
