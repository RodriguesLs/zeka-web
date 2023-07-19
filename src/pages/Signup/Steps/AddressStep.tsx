import { useForm } from 'react-hook-form';
import { HStack, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input, Select } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import { States } from '@/constants/statesAndCities';
import { useState } from 'react';

interface Address {
  cep: string;
  street: string;
  district: string;
  complement: string;
  city: string;
  uf: string;
  number: string;
}

interface AddressStepFormData {
  address: Address;
}

interface AddressStepProps {
  onBackStep: () => void;
  onNextStep: () => void;
}

const addressStepFormSchema = yup.object().shape({
  address: yup.object().shape({
    cep: yup
      .string()
      .required('O CEP é obrigatório')
      .matches(/^[0-9]{5}-[0-9]{3}$/, 'Você deve preencher o CEP corretamente'),
    street: yup.string().required('O endereço é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    district: yup.string().required('O bairro é obrigatório'),
    complement: yup.string(),
    uf: yup.string().required('O estado é obrigatório'),
  }),
});

const AddressStep = ({ onBackStep, onNextStep }: AddressStepProps) => {
  const { handleUpdateSignupFormData, signUpFormData } = useSignUpForm();
  const [cities, setCities] = useState(States.find(s => s.sigla === 'AC').cidades);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressStepFormData>({
    resolver: yupResolver(addressStepFormSchema),
    defaultValues: signUpFormData,
  });

  const onSubmit = (formData: AddressStepFormData) => {
    handleUpdateSignupFormData(formData);
    onNextStep();
  };

  const onChangeState = (e: any) =>
    setCities(States.find((s: any) => s.sigla === e.target.value).cidades);

  return (
    <VStack as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='CEP*'
          name='address.cep'
          placeholder='Ex: 69000-000*'
          error={errors?.address?.cep}
          register={register}
          mask='99999-999'
          autoComplete='off'
        />
        <Input
          type='text'
          label='Logradouro*'
          name='address.street'
          placeholder='Ex: Av. Fulano da Silva'
          error={errors?.address?.street}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='Número*'
          name='address.number'
          placeholder='Ex: 2240'
          error={errors?.address?.number}
          register={register}
          autoComplete='off'
        />
        <Input
          type='text'
          label='Bairro*'
          name='address.district'
          placeholder='Ex: Centro'
          error={errors?.address?.district}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='Complemento'
          name='address.complement'
          placeholder='Ex: ao lado da padaria'
          error={errors?.address?.complement}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Select name='address.uf' label='UF*' register={register} onChange={onChangeState}>
          {States.map((s: any) => (
            <option key={s.sigla} value={s.sigla}>
              {s.nome}
            </option>
          ))}
        </Select>
        <Select name='address.city' label='Cidade*' register={register}>
          {cities.map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack width='100%' pt='2rem' gap='1rem'>
        <Button type='button' onClick={() => onBackStep()}>
          Voltar
        </Button>
        <Button type='submit' variant='primary'>
          Avançar
        </Button>
      </HStack>
    </VStack>
  );
};

export default AddressStep;
