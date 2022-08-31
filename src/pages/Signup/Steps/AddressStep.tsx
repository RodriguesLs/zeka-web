import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import { ButtonGroup, FormGroup } from '../styles';

interface Address {
  cep: string;
  street: string;
  district: string;
  complement: string;
  city: string;
  uf: string;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input
          type='text'
          label='CEP*'
          name='address.cep'
          placeholder='Ex: 69000-000*'
          error={errors?.address?.cep}
          register={register}
          containerStyle={{ flex: 1 }}
          mask='99999-999'
          autoComplete='off'
        />
        <Input
          type='text'
          label='Endereço*'
          name='address.street'
          placeholder='Ex: Av. Fulano da Silva'
          error={errors?.address?.street}
          register={register}
          autoComplete='off'
          containerStyle={{ flex: 3 }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='text'
          label='Bairro*'
          name='address.district'
          placeholder='Ex: Fulano da Silva'
          error={errors?.address?.district}
          register={register}
          autoComplete='off'
        />
        <Input
          type='text'
          label='Complemento*'
          name='address.complement'
          placeholder='Ex: 2240'
          error={errors?.address?.complement}
          register={register}
          autoComplete='off'
        />
      </FormGroup>
      <FormGroup>
        <Input
          type='text'
          label='Cidade*'
          name='address.city'
          placeholder='Ex: São Paulo'
          error={errors?.address?.city}
          register={register}
          autoComplete='off'
        />
        <Input
          type='text'
          label='UF*'
          name='address.uf'
          placeholder='Ex: AM'
          error={errors?.address?.uf}
          register={register}
          autoComplete='off'
        />
      </FormGroup>
      <ButtonGroup>
        <Button type='button' onClick={() => onBackStep()}>
          Voltar
        </Button>
        <Button type='submit' variant='primary'>
          Avançar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default AddressStep;
