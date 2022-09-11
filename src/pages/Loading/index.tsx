import { Box } from '@chakra-ui/react';

import Spinner from '@/components/Spinner';

const Loading = () => {
  return (
    <Box as='main' w='100vw' h='100vh' display='grid' placeContent='center' bg='rgba(0,0,0,0.15)'>
      <Spinner />
    </Box>
  );
};

export default Loading;
