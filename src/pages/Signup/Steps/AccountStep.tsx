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
  const { signUpFormData } = useSignUpForm();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountStepFormData>({
    resolver: yupResolver(AccountStepFormSchema),
    defaultValues: signUpFormData,
  });

  const onSubmit = async (formData: AccountStepFormData) => {
    try {
      const signUpFormCompleted = {
        ...signUpFormData,
        ...formData,
      };

      const data = new FormData();

      data.append('companyName', signUpFormCompleted.companyName);
      data.append('cnpj', signUpFormCompleted.cnpj);
      data.append('responsible', signUpFormCompleted.responsible);
      data.append('phoneNumber', signUpFormCompleted.phoneNumber);
      data.append('imageProfile', signUpFormCompleted.imageProfile);
      data.append('address.street', signUpFormCompleted.address.street);
      data.append('address.city', signUpFormCompleted.address.city);
      data.append('address.cep', signUpFormCompleted.address.cep);
      data.append('address.uf', signUpFormCompleted.address.uf);
      data.append('address.complement', signUpFormCompleted.address.complement);
      data.append('address.district', signUpFormCompleted.address.district);
      data.append('email', signUpFormCompleted.email);
      data.append('password', signUpFormCompleted.password);
      data.append('confirmPassword', signUpFormCompleted.confirmPassword);

      await apiClient.post('/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addToast({
        title: 'Conta criada!',
        description: 'Deu tudo certo! Sua conta foi Zeka foi criada com sucesso.',
        type: 'success',
      });
      navigate('/');
    } catch (e) {
      addToast({
        title: 'Erro ao criar nova conta!',
        description: 'Houve um erro ao tentar criar a sua nova conta, tente novamente!',
        type: 'error',
      });
    }
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
          Concluir
        </Button>
      </HStack>
    </VStack>
  );
};

export default AccountStep;
