import { Outlet } from 'react-router-dom';
import { Box, Flex, keyframes } from '@chakra-ui/react';

import OnboardingImg from '@/assets/img/onboarding_woman.jpg';

const appearFromLeft = keyframes`
   from {
    opacity: 0;
    transform: translateX(-90px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Onboarding = () => {
  return (
    <Flex w='100%' h='100vh' justifyContent='space-between'>
      <Box flex='1' p={['1rem', '2rem', '2rem', '3rem']} animation={`${appearFromLeft} 1s`}>
        <Outlet />
      </Box>
      <Box
        flex='1'
        h='100%'
        bgImage={OnboardingImg}
        bgSize='cover'
        display={['none', 'none', 'none', 'block']}
      />
    </Flex>
  );
};

export default Onboarding;
