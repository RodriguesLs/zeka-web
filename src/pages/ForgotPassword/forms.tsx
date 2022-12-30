import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPasswordFormData, ForgotPasswordFormData } from './formConstants';
import { Heading, VStack } from '@chakra-ui/react';
import { Button, Input } from '@/components';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/services/apiClient';

const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
});

const newPasswordFormSchema = yup.object().shape({
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser idênticas')
    .required(),
});


export const NewPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: yupResolver(newPasswordFormSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    console.log(data);
  };

  return (
    <VStack
      as='form'
      w='100%'
      maxW='500px'
      my='2rem'
      alignItems='baseline'
      gap='1rem'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading lineHeight={0}>Insira uma nova senha</Heading>
      <Input
        type='password'
        name='password'
        placeholder='Senha*'
        error={errors.password}
        register={register}
        label='Nova senha*'
      />
      <Input
        type='password'
        name='confirmPassword'
        placeholder='Confirmação da senha'
        error={errors.confirmPassword}
        register={register}
        label='Confirme sua senha*'
      />
      <Button type='submit' variant='primary'>
        Redefinir senha 2
      </Button>
    </VStack>
  );
};

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await apiClient.get(`users/forgot_password?email=${data.email}`);

    navigate('/');
  };

  return (
    <VStack
      as='form'
      w='100%'
      maxW='500px'
      my='2rem'
      alignItems='baseline'
      gap='1rem'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading lineHeight={0}>Esqueceu a senha?</Heading>
      <Input
        type='email'
        name='email'
        placeholder='E-mail*'
        error={errors.email}
        register={register}
        label='Insira seu e-mail para redefinir sua senha:'
      />
      <Button type='submit' variant='primary'>
        Redefinir senha
      </Button>
    </VStack>
  );
};
