import { FiBell } from 'react-icons/fi';

import Profile from '../Profile';

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

const Notifications = () => {
  return (
    <S.NotificationsBadge>
      <FiBell />
    </S.NotificationsBadge>
  );
};

export default Header;
