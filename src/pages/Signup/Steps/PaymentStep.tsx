import { useForm } from 'react-hook-form';
import { HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import useToast from '@/hooks/useToast';
import apiClient from '@/services/apiClient';
import { generateCardHash } from 'pagarme-card-hash';

interface PaymentStepFormData {
  number: string;
  holderName: string;
  month: string;
  year: string;
  cvv: string;
}

interface PaymentStepProps {
  onBackStep: () => void;
}

const PaymentStepFormSchema = yup.object().shape({
  number: yup.string().required('Número do cartão é obrigatório'),
});

const PaymentStep = ({ onBackStep }: PaymentStepProps) => {
  const { signUpFormData } = useSignUpForm();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentStepFormData>({
    resolver: yupResolver(PaymentStepFormSchema),
    defaultValues: signUpFormData,
  });

  const onSubmit = async (formData: PaymentStepFormData) => {
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

      const {
        number,
        holderName,
        month,
        year,
        cvv
      } = signUpFormCompleted;

      const hash = await generateCardHash(
        {
          number,
          holderName,
          expirationDate: `${month}${year}`,
          cvv,
        },
        'sk_test_8dZMKBVspNsL457j'
        );

      data.append('card_hash', hash);

      await apiClient.post('/signup', { ...data, card_hash: hash, is_organization: true }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addToast({
        title: 'Conta criada!',
        description: 'Deu tudo certo! Sua conta foi Zeka foi criada com sucesso e seu pagamento está sendo processado.',
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
        type='text'
        label='Número do cartão*'
        name='number'
        placeholder='Ex: 4566 4546 45456 45454'
        error={errors.number}
        register={register}
        autoComplete='off'
      />
      <Input
        type='text'
        label='Nome (como no cartão)*'
        name='holderName'
        placeholder='Ex: Fulano R Silva'
        error={errors.holderName}
        register={register}
        autoComplete='off'
      />
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='Mês de validade'
          name='month'
          placeholder='Ex: 01/23'
          error={errors.month}
          register={register}
          autoComplete='off'
        />
        <Input
          type='text'
          label='Ano de validade'
          name='year'
          placeholder='Ex: 01/23'
          error={errors.year}
          register={register}
          autoComplete='off'
        />
        <Input
          type='text'
          label='CVV*'
          name='cvv'
          placeholder='Ex: 451'
          error={errors.cvv}
          register={register}
          autoComplete='off'
        />
      </HStack>
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

export default PaymentStep;
