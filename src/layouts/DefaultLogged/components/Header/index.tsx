import { Box, Divider, HStack } from '@chakra-ui/react';
import { Notifications, Profile } from '@/components';

const Header = () => {
  return (
    <Box
      as='header'
      display='flex'
      alignItems='center'
      justifyContent='end'
      p='0.75rem 1.5rem'
      borderBottomWidth='1px'
      borderColor='gray.300'
    >
      <HStack spacing='1rem'>
        <Notifications />
        <Divider orientation='horizontal' w='1px' h='30px' bg='gray.300' />
        <Profile />
      </HStack>
    </Box>
  );
};

export default Header;
