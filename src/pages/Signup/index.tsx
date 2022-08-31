import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import AccountStep from './Steps/AccountStep';
import AddressStep from './Steps/AddressStep';
import CompanyStep from './Steps/CompanyStep';

import { SignUpFormProvider } from '@/contexts/SignUpFormContext';

import * as S from './styles';

const SignUp = () => {
  const [step, setStep] = useState(1);

  const handleBackStep = useCallback(() => {
    if (step > 1) setStep((oldState) => oldState - 1);
  }, [step]);

  const handleNextStep = useCallback(() => {
    setStep((oldState) => oldState + 1);
  }, [step]);

  return (
    <SignUpFormProvider>
      <S.Container>
        <Link className='backButton' to='/'>
          <FiArrowLeft />
          Voltar para login
        </Link>
        <h1>Crie sua conta agora mesmo!</h1>
        <Steps currentStep={step} />
        <div className='content'>
          {step === 1 && <CompanyStep onNextStep={handleNextStep} />}
          {step === 2 && <AddressStep onBackStep={handleBackStep} onNextStep={handleNextStep} />}
          {step === 3 && <AccountStep onBackStep={handleBackStep} />}
        </div>
      </S.Container>
    </SignUpFormProvider>
  );
};

interface StepsProps {
  currentStep: number;
}

const Steps = ({ currentStep }: StepsProps) => {
  return (
    <S.StepsContainer>
      <li className={currentStep > 0 ? 'active' : ''}>1. Dados da empresa</li>
      <li className={currentStep > 1 ? 'active' : ''}>2. Endereço</li>
      <li className={currentStep > 2 ? 'active' : ''}>3. Minha conta Zeka</li>
    </S.StepsContainer>
  );
};

export default SignUp;
