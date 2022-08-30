import { Outlet } from 'react-router-dom';

import * as S from './styles';

const Onboarding = () => {
  return (
    <S.Container>
      <div className='content'>
        <Outlet />
      </div>
      <div className='imageOnboarding' />
    </S.Container>
  );
};

export default Onboarding;
