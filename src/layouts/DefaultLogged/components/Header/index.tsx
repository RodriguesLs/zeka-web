import { Notifications, Profile } from '@/components';

import * as S from './styles';

const Header = () => {
  return (
    <S.Container>
      <div className='listOptions'>
        <Notifications />
        <Profile />
      </div>
    </S.Container>
  );
};

export default Header;
