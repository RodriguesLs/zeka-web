import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import * as S from './styles';
import apiClient from '@/services/apiClient';

interface AccountStepFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AccountStepProps {
  onBackStep: () => void;
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

const AccountStep = ({ onBackStep }: AccountStepProps) => {
  const { formData } = useSignUpForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountStepFormData>({
    resolver: yupResolver(AccountStepFormSchema),
    defaultValues: formData,
  });

  const onSubmit = async (data: AccountStepFormData) => {
    try {
      // const signUpFormCompleted = {
      //   ...formData,
      //   ...data,
      // };

      const signUpFormData = new FormData();

      // TO-DO -> Convert signUpFormCompleted to FormData

      const response = await apiClient.post('/signup', signUpFormData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        label='Email*'
        name='email'
        placeholder='Ex: fulano@zeka.com*'
        error={errors.email}
        register={register}
      />
      <Input
        type='password'
        label='Senha*'
        name='password'
        error={errors.password}
        register={register}
        containerStyle={{ marginTop: '0.5rem' }}
      />
      <Input
        type='password'
        label='Repetir senha*'
        name='confirmPassword'
        error={errors.confirmPassword}
        register={register}
        containerStyle={{ marginTop: '0.5rem' }}
      />
      <S.Row>
        <Button type='button' onClick={() => onBackStep()}>
          Voltar passo
        </Button>
        <Button type='submit'>Finalizar cadastro</Button>
      </S.Row>
    </form>
  );
};

export default AccountStep;
