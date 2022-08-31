import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';

import logoImg from '@/assets/img/logo.svg';

import * as S from './styles';

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

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <S.Container>
      <div className='content'>
        <img src={logoImg} alt='logo zeka educação digital' />
        <form onSubmit={handleSubmit(onSubmit)}>
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
            containerStyle={{ marginTop: '0.5rem' }}
            placeholder='Senha*'
            error={errors.password}
            register={register}
          />
          <Link to='/esqueci-senha' className='forgotPassword'>
            Esqueceu sua senha?
          </Link>
          <Button type='submit' variant='primary'>
            Entrar
          </Button>
        </form>
        <p className='signupNow'>
          Não tem uma conta ainda? <Link to='cadastrar-me'>Cadastre-se agora</Link>
        </p>
      </div>
      <span className='footerText'>
        O estudo que <strong>abre um mundo</strong> de oportunidades.
      </span>
    </S.Container>
  );
};

export default Signin;
