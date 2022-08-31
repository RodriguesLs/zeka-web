import { Outlet } from 'react-router-dom';

import * as S from './styles';

const Onboarding = () => {
  return (
    <S.Container>
      <S.AnimationContainer>
        <Outlet />
      </S.AnimationContainer>
      <div className='imageOnboarding' />
    </S.Container>
  );
};

export default Onboarding;
