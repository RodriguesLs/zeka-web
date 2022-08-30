import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';

import logoImg from '@/assets/img/logo.png';

import * as S from './styles';
import { useState } from 'react';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const [load, setLoad] = useState(false);

  const onSubmit = (data: SignInFormData) => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  };

  return (
    <S.Container>
      <div className='content'>
        <img src={logoImg} alt='logo zeka' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='email'
            name='email'
            placeholder='E-mail*'
            error={errors.email}
            register={register}
          />
          <Input
            type='password'
            name='password'
            containerStyle={{ marginTop: '8px' }}
            placeholder='Senha*'
            error={errors.password}
            register={register}
          />
          <Link to='/esqueci-senha'>Esqueceu sua senha?</Link>
          <Button loading={load} type='submit'>
            Entrar
          </Button>
        </form>
        <p className='signupNow'>
          Não tem uma conta ainda? <Link to='cadastrar-me'>Cadastre-se agora</Link>
        </p>
      </div>
      <span>
        O estudo que <strong>abre um mundo</strong> de oportunidades.
      </span>
    </S.Container>
  );
};

export default Signin;
