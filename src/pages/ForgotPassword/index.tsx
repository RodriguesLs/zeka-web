import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';

import logoImg from '@/assets/img/logo.svg';

import * as S from './styles';

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
    <S.Container>
      <div className='content'>
        <img src={logoImg} alt='logo zeka educação digital' />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Esqueceu a senha?</h1>
          <p>Insira seu e-mail para redefinir sua senha:</p>
          <Input
            type='email'
            name='email'
            placeholder='E-mail*'
            error={errors.email}
            register={register}
          />
          <Button type='submit'>Redefinir senha</Button>
        </form>
        <button className='backLogin' onClick={() => navigate('/')}>
          Voltar para login
        </button>
      </div>
    </S.Container>
  );
};

export default ForgotPassword;
