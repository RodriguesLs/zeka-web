import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import * as S from './styles';

interface AddressStepFormData {
  cep: string;
  address: string;
  district: string;
  complement: string;
  city: string;
  uf: string;
}

interface AddressStepProps {
  onBackStep: () => void;
  onNextStep: () => void;
}

const addressStepFormSchema = yup.object().shape({
  cep: yup.string().required('O CEP é obrigatório'),
  address: yup.string().required('O endereço é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  district: yup.string().required('O bairro é obrigatório'),
  complement: yup.string(),
  uf: yup.string().required('O estado é obrigatório'),
});

const AddressStep = ({ onBackStep, onNextStep }: AddressStepProps) => {
  const { handleUpdateSignupFormData, formData } = useSignUpForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressStepFormData>({
    resolver: yupResolver(addressStepFormSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: AddressStepFormData) => {
    handleUpdateSignupFormData(data);
    onNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Row>
        <Input
          type='text'
          label='CEP*'
          name='cep'
          placeholder='Ex: 69000-000*'
          error={errors.cep}
          register={register}
          containerStyle={{ flex: 1 }}
          typeMask='cep'
        />
        <Input
          type='text'
          label='Endereço*'
          name='address'
          placeholder='Ex: Av. Fulano da Silva'
          error={errors.address}
          register={register}
          containerStyle={{ flex: 3 }}
        />
      </S.Row>
      <S.Row>
        <Input
          type='text'
          label='Bairro*'
          name='district'
          placeholder='Ex: Fulano da Silva'
          error={errors.district}
          register={register}
        />
        <Input
          type='text'
          label='Complemento*'
          name='complement'
          placeholder='Ex: 2240'
          error={errors.complement}
          register={register}
        />
      </S.Row>
      <S.Row>
        <Input
          type='text'
          label='Cidade*'
          name='city'
          placeholder='Ex: São Paulo'
          error={errors.city}
          register={register}
        />
        <Input
          type='text'
          label='UF*'
          name='uf'
          placeholder='Ex: AM'
          error={errors.uf}
          register={register}
        />
      </S.Row>
      <S.Row>
        <Button type='button' onClick={() => onBackStep()}>
          Voltar passo
        </Button>
        <Button type='submit' style={{ marginLeft: '0.5rem' }}>
          Próximo passo
        </Button>
      </S.Row>
    </form>
  );
};

export default AddressStep;
