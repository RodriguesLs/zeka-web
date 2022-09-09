import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components';
import useToast from '@/hooks/useToast';
import apiClient from '@/services/apiClient';
import { queryClient } from '@/services/queryClient';

import * as S from './styles';

interface LicenseFormData {
  id: number;
  code: string;
  name: string;
  expiration_date: Date;
  available_uses: number;
}

const licenseFormSchema = yup.object().shape({
  name: yup.string().required('Descrição é obrigatória'),
  code: yup.string().required('Um código é obrigatório'),
  expiration_date: yup.string().required('Uma data é obrigatória'),
  available_uses: yup
    .number()
    .typeError('Quantidade deve ser um número')
    .min(1, 'Quantidade deve ser acima de 0')
    .integer('Valor deve ser um número inteiro. (Ex: 1)')
    .required('Quantidade é obrigatória'),
});

const CreateLicense = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LicenseFormData>({
    resolver: yupResolver(licenseFormSchema),
  });

  const addLicense = (data: LicenseFormData) => {
    return apiClient.post('/licenses', { license: data });
  };

  const { mutateAsync } = useMutation(addLicense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-licenses']);
    },
  });

  const onSubmit = async (formData: LicenseFormData) => {
    try {
      await mutateAsync(formData);
      addToast({
        title: 'Sucesso!',
        description: 'Nova licença cadastrada com sucesso!',
        type: 'success',
      });

      navigate(-1);
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: 'Erro ao salvar nova licença, tente novamente!',
        type: 'error',
      });
    }
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          name='name'
          placeholder='Ex: Básico'
          error={errors.name}
          register={register}
          autoComplete='off'
          label='Descrição*'
        />
        <Input
          type='text'
          name='code'
          placeholder='Ex: A1B2C3D4'
          error={errors.code}
          register={register}
          autoComplete='off'
          label='Código:*'
          containerStyle={{ marginTop: '1rem' }}
        />
        <Input
          type='text'
          name='expiration_date'
          placeholder='Data de expiração*'
          error={errors.expiration_date}
          register={register}
          autoComplete='off'
          label='Data de expiração*'
          mask='99/99/9999'
          containerStyle={{ marginTop: '1rem' }}
        />
        <Input
          type='text'
          name='available_uses'
          placeholder='Ex: 20'
          error={errors.available_uses}
          register={register}
          autoComplete='off'
          label='Quantidade para uso*'
          containerStyle={{ marginTop: '1rem' }}
        />
        <div className='groupButtons'>
          <Button type='button' onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type='submit' variant='primary' disabled={isSubmitting}>
            Salvar
          </Button>
        </div>
      </form>
    </S.Container>
  );
};

export default CreateLicense;
