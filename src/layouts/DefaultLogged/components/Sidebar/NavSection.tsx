import { ReactNode } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';

interface NavSectionProps {
  children: ReactNode;
  isMinimized: boolean;
  title: string;
}

const NavSection = ({ children, isMinimized, title }: NavSectionProps) => {
  return (
    <Box w='100%' border='1px solid red'>
      {!isMinimized && (
        <Heading as='h3' fontSize='1rem' textTransform='uppercase' color='gray.500'>
          {title}
        </Heading>
      )}
      <VStack w='100%' mt='0.5rem'>
        {children}
      </VStack>
    </Box>
  );
};

export default NavSection;
