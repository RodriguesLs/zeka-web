import { useForm } from 'react-hook-form';
import { HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Button, Input, Spinner } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import useToast from '@/hooks/useToast';
import paymentApi from '@/services/paymentApi';

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
  const [showSpinner, setShowSpinner] = useState(false);
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

      const data: any = {
        customer: {
          ...signUpFormCompleted,
        },
        is_organization: true,
        is_b2c: true,
      };

      setShowSpinner(true);

      await paymentApi.post('/', data, { headers: { 'Content-Type': 'application/json' } });

      addToast({
        title: 'Conta criada!',
        description: 'Deu tudo certo! Sua conta foi Zeka foi criada com sucesso e seu pagamento está sendo processado.',
        type: 'success',
      });

      setShowSpinner(false);

      navigate('/');
    } catch (e) {
      addToast({
        title: 'Erro ao criar nova conta!',
        description: e.response?.data?.error || 'Houve um erro ao tentar criar a sua nova conta, tente novamente!',
        type: 'error',
      });

      setShowSpinner(false);
    }
  };

  return (
    <>
      { showSpinner &&
        <>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2em' }}>Processando pagamento...</h1>
            <br />
            <Spinner />
          </div>
        </>
      }
      {
      !showSpinner &&
      <VStack as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Número do cartão*'
          name='number'
          placeholder='Ex: 4566 4546 45456 45454'
          error={errors.number}
          register={register}
          autoComplete='off'
          mask='9999 9999 9999 9999'
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
            placeholder='Ex: 01'
            error={errors.month}
            register={register}
            autoComplete='off'
            mask='99'
          />
          <Input
            type='text'
            label='Ano de validade'
            name='year'
            placeholder='Ex: 24'
            error={errors.year}
            register={register}
            autoComplete='off'
            mask='99'
          />
          <Input
            type='text'
            label='CVV*'
            name='cvv'
            placeholder='Ex: 451'
            error={errors.cvv}
            register={register}
            autoComplete='off'
            mask='999'
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
      }
    </>
  );
};

export default PaymentStep;
