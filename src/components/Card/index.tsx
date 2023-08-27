import { ReactNode } from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface CardProps {
  children: ReactNode;
  title?: string;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <Box w='100%' h='100%' bg='background.white' p='1rem' borderRadius='6px'>
      {title && (
        <Heading as='h3' size='base' color='gray.500' mb='1rem'>
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
};

export default Card;
