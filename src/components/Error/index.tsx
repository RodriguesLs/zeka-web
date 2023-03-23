import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import { Button } from '../';

import NoFetchImg from '@/assets/img/noFetchTable.svg';

interface ErrorProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
}

const Error = ({
  title = 'Oooops!',
  description = 'Ocorreu um erro, tente novamente...',
  onClick,
  buttonText = 'Tente novamente',
}: ErrorProps) => {
  return (
    <VStack w='100%' h='500px' p='3rem'>
      <Image src={NoFetchImg} w='180px' h='180px' mb='2rem' alt='no data' />
      <Heading as='h3' fontSize='1.5rem'>
        {title}
      </Heading>
      <Text color='gray.500'>{description}</Text>
      <Button onClick={onClick}>{buttonText}</Button>
    </VStack>
  );
};

export default Error;
