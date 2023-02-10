import { useForm } from 'react-hook-form';
import { HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import useToast from '@/hooks/useToast';
import apiClient from '@/services/apiClient';
import apiZeka from '@/services/apiZeka';
import apiPagarme from '@/services/apiPagarme';

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

      const { companyName, name, cnpj, phoneNumber, responsible, imageProfile, email, password } = signUpFormCompleted;

      let data: any = {
        customer: {
          companyName,
          name,
          cnpj,
          phoneNumber,
          responsible,
          imageProfile,
          email,
          password
        },
      };

      let paymentResponse: any;
      try {
        paymentResponse = await apiPagarme.post('/orders', {
          customer: {
            name: companyName || name,
            email,
            "document": "06208085357",
            "type": "individual",
            "document_type": "CPF",
            "address": {
                "line_1": "79, Rua Afonso Pena, Edson Queiroz",
                "line_2": "casa",
                "zip_code": "60834522",
                "city": "Fortaleza",
                "state": "CE",
                "country": "BR"
            },
            "phones": {
                "home_phone": {
                    "country_code": "55",
                    "area_code": "85",
                    "number": "000000000"
                },
                "mobile_phone": {
                    "country_code": "55",
                    "area_code": "85",
                    "number": "000000000"
                }
            },
            "metadata": {
                "company": "Pagar.me"
            }
          },
          payments: [
            {
              payment_method: "credit_card",
              credit_card: {
                installments: 1,
                statement_descriptor: "AVENGERS",
                card: {
                  number: "4242424242424242",
                  holder_name: "Tony Stark",
                  exp_month: 1,
                  exp_year: 30,
                  cvv: "353",
                  billing_address: {
                      line_1: "10880, Malibu Point, Malibu Central",
                      zip_code: "90265",
                      city: "Malibu",
                      state: "CA",
                      country: "US"
                  }
                }
              }
            }
        ]});
      } catch (e) {
        console.log({ e });
        return addToast({
          title: 'Erro ao criar nova conta!',
          description: 'Houve um erro no processo de pagamento, tente novamente!',
          type: 'error',
        });
      }

      if (paymentResponse?.status === 'failed') { console.log('ERRROR', paymentResponse) }

      const { data: { user } }: any = await apiZeka.post('/users', {
        email: signUpFormCompleted.email,
        fullName: signUpFormCompleted.name,
        identifier: signUpFormCompleted.email,
        password: signUpFormCompleted.password,
        channels: [2,3]
      });

      await apiClient.post('/signup', {
        ...data,
        guid: user?.guid,
        token: user?.tokenLogin,
        is_organization: true,
        paymentId: paymentResponse?.id,
        paymentCode: paymentResponse?.code
      }, {
        headers: {
          'Content-Type': 'application/json',
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
  );
};

export default PaymentStep;
