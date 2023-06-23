import { useCallback, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Box, Heading, HStack, Icon, Link, VStack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import AccountStep from './Steps/AccountStep';
import AddressStep from './Steps/AddressStep';
import CompanyStep from './Steps/CompanyStep';
import StudentStep from './Steps/StudentStep';
import SocialStep from './Steps/SocialStep';
import PaymentStep from './Steps/PaymentStep';

import { SignUpFormProvider } from '@/contexts/SignUpFormContext';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [step, setStep] = useState(1);

  const handleBackStep = useCallback(() => {
    if (step > 1) setStep((oldState) => oldState - 1);
  }, [step]);

  const handleNextStep = useCallback(() => {
    setStep((oldState) => oldState + 1);
  }, [step]);

  return (
    <SignUpFormProvider>
      <VStack as='section' w='100%' h='100%'>
        <VStack alignItems='baseline' w='100%' maxW='600px' gap='1.5rem'>
          <BackButton />
          <Heading>Crie sua conta agora mesmo!</Heading>
          <Steps currentStep={step} />
          {step === 1 && type !== 'student' && <CompanyStep onNextStep={handleNextStep} />}
          {step === 1 && type === 'student' && <StudentStep onNextStep={handleNextStep} />}
          {step === 2 && type === 'student' && <SocialStep onNextStep={handleNextStep} />}
          {step === 2 && type !== 'student' && <AddressStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 3 && type === 'student' && <AddressStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 3 && type !== 'student' && <AccountStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 4 && type === 'student' && <AccountStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 4 && type !== 'student' && <PaymentStep onBackStep={handleBackStep} />}
          {step === 5 && type === 'student' && <PaymentStep onBackStep={handleBackStep} />}
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
      color='brand.500'
      fontSize='1.125rem'
      fontWeight='bold'
    >
      <Icon as={FiArrowLeft} w='20px' h='20px' mr='0.5rem' />
      Voltar para login
    </Link>
  );
};

interface StepsProps {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isStudent = type === 'student';

  const steps = [
    {
      id: 1,
      label: isStudent ? '1. Dados pessoais' : '1. Dados da empresa',
    },
    {
      id: isStudent ? 2 : null,
      label: isStudent ? '2. Dados sociais' : null,
    },
    {
      id: isStudent ? 3 : 2,
      label: `${isStudent ? '3' : '2'}. Endereço`,
    },
    {
      id: isStudent ? 4 : 3,
      label: `${isStudent ? '4' : '3'}. Conta Zeka`,
    },
    {
      id: isStudent ? 5 : 4,
      label: `${isStudent ? '5' : '4'}. Pagamento`,
    },
  ];
  return (
    <HStack as='ul' listStyleType='none' gap='0.5rem' w='100%' pb='1rem'>
      {steps.map((step) =>
          step.id !== null && (
            <Box
              key={step.id}
              w='100%'
              as='li'
              fontWeight='bold'
              color={currentStep === step.id ? 'brand.500' : 'gray.500'}
              className={'styled-box'}
            >
              {step.label}
              <Box
                marginTop='0.25rem'
                w='100%'
                h='6px'
                borderRadius='6px'
                bg={currentStep === step.id ? 'brand.500' : 'gray.300'}
              />
            </Box>
          ),
      )}
    </HStack>
  );
};

export default SignUp;
