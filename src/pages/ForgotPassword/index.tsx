import { useNavigate } from 'react-router-dom';
import { Heading, Image, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';

import logoImg from '@/assets/img/logo.svg';

interface ForgotPasswordFormData {
  email: string;
}

const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  };

  return (
    <VStack as='section' h='100%' placeContent='center'>
      <Image src={logoImg} maxW='200px' mb='5rem' alt='logo zeka educação digital' />
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
      <Button onClick={() => navigate('/')}>Voltar para login</Button>
    </VStack>
  );
};

export default ForgotPassword;
