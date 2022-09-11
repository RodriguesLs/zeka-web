import { useNavigate } from 'react-router-dom';
import { Box, Image, Heading, Text, VStack } from '@chakra-ui/react';

import notFoundImg from '@/assets/img/404.svg';
import { Button } from '@/components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box as='main' w='100vw' h='100vh' display='grid' placeContent='center' bg='background.white'>
      <Image src={notFoundImg} maxW='400px' mx='auto' alt='not found' />
      <VStack gap='0.5rem' mt='4rem'>
        <Heading>Página não encontrada! :(</Heading>
        <Text>A página que você tentou acessar não existe ou foi temporariamente removida.</Text>
        <Button type='button' onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
          Voltar para a página anterior
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
