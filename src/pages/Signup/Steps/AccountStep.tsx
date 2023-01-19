import { useForm } from 'react-hook-form';
import { HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import useToast from '@/hooks/useToast';

import apiClient from '@/services/apiClient';

interface AccountStepFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AccountStepProps {
  onBackStep: () => void;
  onNextStep: () => void;
}

const AccountStepFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirmar senha é obrigatório')
    .oneOf([yup.ref('password'), null], 'As senhas não são iguais'),
});

const AccountStep = ({ onBackStep, onNextStep }: AccountStepProps) => {
  const { handleUpdateSignupFormData, signUpFormData } = useSignUpForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountStepFormData>({
    resolver: yupResolver(AccountStepFormSchema),
    defaultValues: signUpFormData,
  });

  const onSubmit = async (formData: AccountStepFormData) => {
    handleUpdateSignupFormData(formData);
    onNextStep();
  };

  return (
    <VStack as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        label='Email*'
        name='email'
        placeholder='Ex: fulano@zeka.com*'
        error={errors.email}
        register={register}
        autoComplete='off'
      />
      <Input
        type='password'
        label='Senha*'
        name='password'
        error={errors.password}
        register={register}
        autoComplete='off'
      />
      <Input
        type='password'
        label='Repetir senha*'
        name='confirmPassword'
        error={errors.confirmPassword}
        register={register}
        autoComplete='off'
      />
      <HStack width='100%' pt='2rem'>
        <Button type='button' onClick={() => onBackStep()}>
          Voltar
        </Button>
        <Button type='submit' variant='primary'>
          Avançar
        </Button>
      </HStack>
    </VStack>
  );
};

export default AccountStep;
