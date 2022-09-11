import { FiSearch } from 'react-icons/fi';
import { Input, HStack, Icon } from '@chakra-ui/react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <HStack
      w='100%'
      maxW='300px'
      p='0.5rem'
      borderWidth='1px'
      borderColor='gray.300'
      borderRadius='6px'
    >
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Pesquisar pelo nome...'
        border='none'
        _focus={{
          boxShadow: 'none',
        }}
      />
      <Icon as={FiSearch} w='18px' h='18px' color='gray.500' />
    </HStack>
  );
};

export default SearchBox;
