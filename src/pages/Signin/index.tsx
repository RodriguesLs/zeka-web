import { Link as RouterLink } from 'react-router-dom';
import { Image, Link, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import logoImg from '@/assets/img/logo.svg';
import { Button, Input } from '@/components';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const Signin = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (formData: SignInFormData) => {
    try {
      await signIn(formData);
    } catch (err) {
      addToast({
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, verifique as credenciais',
        type: 'error',
      });
    }
  };

  console.log('===> Version: 17 [20.07] ~ [users.csv - adjust columns]');

  return (
    <VStack position='relative' w='100%' h='100%' placeContent='center'>
      <Image src={logoImg} maxW='200px' mb='2rem' alt='logo zeka educação digital' />
      <VStack as='form' w='100%' maxW='500px' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          name='email'
          placeholder='E-mail*'
          error={errors.email}
          register={register}
          autoComplete='off'
        />
        <Input
          type='password'
          name='password'
          // containerStyle={{ marginTop: '0.5rem' }}
          placeholder='Senha*'
          error={errors.password}
          register={register}
        />
        <Link as={RouterLink} to='/esqueci-senha' py='0.5rem' alignSelf='end' color='brand.500'>
          Esqueceu sua senha?
        </Link>
        <Button type='submit' variant='primary' loading={isSubmitting}>
          Entrar
        </Button>
      </VStack>
      <Text pt='1rem'>
        Não tem uma conta ainda?{' '}
        <Link as={RouterLink} to='cadastrar-me' color='brand.500'>
          Cadastre-se agora
        </Link>
      </Text>
      <Text position='absolute' bottom='0' fontSize='1.25rem' color='brand.500'>
        O estudo que{' '}
        <Text as='span' color='secondary.500'>
          abre um mundo
        </Text>{' '}
        de oportunidades.
      </Text>
    </VStack>
  );
};

export default Signin;
