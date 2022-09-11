import { Spinner as ChakraSpinner, SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react';

type SpinnerProps = ChakraSpinnerProps;

const Spinner = ({ ...rest }: SpinnerProps) => {
  return (
    <ChakraSpinner
      thickness='4px'
      speed='0.4s'
      emptyColor='gray.300'
      color='background.white'
      size='xl'
      {...rest}
    />
  );
};

export default Spinner;
