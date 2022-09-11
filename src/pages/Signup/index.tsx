import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, HStack, Icon, Link, VStack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import AccountStep from './Steps/AccountStep';
import AddressStep from './Steps/AddressStep';
import CompanyStep from './Steps/CompanyStep';

import { SignUpFormProvider } from '@/contexts/SignUpFormContext';

import * as S from './styles';

const SignUp = () => {
  const [step, setStep] = useState(3);

  const handleBackStep = useCallback(() => {
    if (step > 1) setStep((oldState) => oldState - 1);
  }, [step]);

  const handleNextStep = useCallback(() => {
    setStep((oldState) => oldState + 1);
  }, [step]);

  return (
    <SignUpFormProvider>
      <VStack as='section' width='100%' height='100%'>
        <VStack alignItems='baseline' width='100%' maxW='600px' gap='1.5rem'>
          <BackButton />
          <Heading>Crie sua conta agora mesmo!</Heading>
          <Steps currentStep={step} />
          {step === 1 && <CompanyStep onNextStep={handleNextStep} />}
          {step === 2 && <AddressStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 3 && <AccountStep onBackStep={handleBackStep} />}
        </VStack>
      </VStack>
    </SignUpFormProvider>
  );
};

const BackButton = () => {
  return (
    <Link
      as={RouterLink}
      to='/'
      display='flex'
      alignItems='center'
      color='#31aeb9'
      fontSize='1.125rem'
      fontWeight='bold'
    >
      <Icon as={FiArrowLeft} width='20px' height='20px' mr='0.5rem' />
      Voltar para login
    </Link>
  );
};

interface StepsProps {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    {
      id: 1,
      label: '1. Dados da empresa',
    },
    {
      id: 2,
      label: '  2. Endereço',
    },
    {
      id: 3,
      label: '3. Minha conta Zeka',
    },
  ];
  return (
    <HStack as='ul' gap='0.5rem' width='100%' pb='1rem'>
      {steps.map((step) => (
        <Box
          key={step.id}
          width='100%'
          as='li'
          fontWeight='bold'
          color={currentStep === step.id ? '#31aeb9' : '#808080'}
        >
          {step.label}
          <Box
            marginTop='0.25rem'
            width='100%'
            height='6px'
            borderRadius='6px'
            bg={currentStep === step.id ? '#31aeb9' : '#ccc'}
          />
        </Box>
      ))}
    </HStack>
  );
};

export default SignUp;
