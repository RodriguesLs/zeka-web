import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

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
      <IconButton
        as='button'
        icon={<FiBell />}
        aria-label='Notificações'
        fontSize='1.5rem'
        color={notificationsIsVisible ? 'brand.500' : 'gray.400'}
        _hover={{
          color: 'brand.500',
        }}
        onClick={handleToggleNotifications}
      />
      {notificationsIsVisible && (
        <Box
          ref={notificationsRef}
          position='absolute'
          top='80px'
          right='1rem'
          w='260px'
          zIndex={2}
          p='1rem'
          bg='background.white'
          borderWidth='1px'
          borderColor='gray.300'
          borderRadius='6px'
          textAlign='center'
        >
          {notifications.length > 0 ? (
            ''
          ) : (
            <Text as='span'>Nenhuma notificação para ser exibida!</Text>
          )}
        </Box>
      )}
    </>
  );
};

export default Notifications;
