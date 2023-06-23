import {
  FormControl,
  FormLabel,
  Checkbox as ChakraCheckBox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

interface CheckboxProps extends ChakraCheckboxProps {
  children: React.ReactNode;
  label?: string;
  name: string;
  register: UseFormRegister<any>;
}

const Checkbox = ({ children, label, name, register, ...rest }: CheckboxProps) => {
  return (
    <FormControl w='100%' alignSelf='baseline'>
      {label && (
        <FormLabel mb='0.25rem' htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraCheckBox
        name={name}
        w='100%'
        size='lg'
        focusBorderColor='brand.500'
        textAlign={'justify'}
        _hover={{ borderColor: 'brand.500' }}
        {...register(name)}
        {...rest}
      >
        {children}
      </ChakraCheckBox>
    </FormControl>
  );
};

export default Checkbox;
