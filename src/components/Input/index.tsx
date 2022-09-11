import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import ReactInputMask from 'react-input-mask';

export interface InputProps extends ChakraInputProps {
  containerStyle?: React.CSSProperties;
  error?: FieldError;
  label?: string;
  mask?: string;
  name: string;
  register: UseFormRegister<any>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, label, mask, register, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel mb='0.25rem' htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        as={ReactInputMask}
        id={name}
        name={name}
        ref={ref}
        w='100%'
        focusBorderColor='brand.500'
        borderWidth={1}
        borderColor='gray.300'
        variant='outline'
        _hover={{ borderColor: 'brand.500' }}
        size='lg'
        mask={mask}
        {...register(name)}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

const Input = forwardRef(InputBase);

export default Input;
