import { useCallback, useEffect, useRef, useState } from 'react';
import { FiBell } from 'react-icons/fi';

import * as S from './styles';

const Notifications = () => {
  const notifications = [];

  const notificationsRef = useRef<HTMLDivElement>(null);

  const [notificationsIsVisible, setNotificationsIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsIsVisible(false);
      }
    };

    if (notificationsIsVisible) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [notificationsIsVisible]);

  const handleToggleNotifications = useCallback(() => {
    setNotificationsIsVisible((oldState) => !oldState);
  }, []);

  return (
    <>
      <S.BadgeContainer onClick={handleToggleNotifications} isVisible={notificationsIsVisible}>
        <FiBell />
      </S.BadgeContainer>
      {notificationsIsVisible && (
        <S.NotificationsContainer ref={notificationsRef}>
          {notifications.length > 0 ? '' : <p>Nenhuma notificação para ser exibida!</p>}
        </S.NotificationsContainer>
      )}
    </>
  );
};

export default Notifications;
