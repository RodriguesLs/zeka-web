import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

interface SelectProps extends ChakraSelectProps {
  children: React.ReactNode;
  label?: string;
  name: string;
  register: UseFormRegister<any>;
}

const Select = ({ children, label, name, register, ...rest }: SelectProps) => {
  return (
    <FormControl w='100%'>
      {label && (
        <FormLabel mb='0.25rem' htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        name={name}
        w='100%'
        size='lg'
        focusBorderColor='brand.500'
        borderWidth={1}
        borderColor='gray.300'
        _hover={{ borderColor: 'brand.500' }}
        {...register(name)}
        {...rest}
      >
        {children}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select;
