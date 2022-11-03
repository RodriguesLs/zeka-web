import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPasswordFormData, ForgotPasswordFormData } from './formConstants';
import { Heading, VStack } from '@chakra-ui/react';
import { Button, Input } from '@/components';

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

  const onSubmit = (data: NewPasswordFormData) => {
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
        Redefinir senha
      </Button>
    </VStack>
  );
};

export const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
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
