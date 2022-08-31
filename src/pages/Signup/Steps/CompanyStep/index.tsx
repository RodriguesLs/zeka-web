import { useMemo, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import * as S from './styles';

interface CompanyStepFormData {
  companyName: string;
  cnpj: string | number;
  phoneNumber: string | number;
  responsible: string;
}

interface CompanyStepProps {
  onNextStep: () => void;
}

const companyStepFormSchema = yup.object().shape({
  companyName: yup.string().required('Nome da sua empresa é obrigatório'),
  cnpj: yup.string().required('CNPJ da sua empresa é obrigatório'),
  phoneNumber: yup.string().required('Número para contato é obrigatório'),
  responsible: yup.string().required('Nome do responsável é obrigatório'),
});

const CompanyStep = ({ onNextStep }: CompanyStepProps) => {
  const { handleUpdateSignupFormData, formData } = useSignUpForm();

  const { imageProfile } = formData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyStepFormData>({
    resolver: yupResolver(companyStepFormSchema),
    defaultValues: formData,
  });

  const [thumbnail, setThumbnail] = useState(imageProfile);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const onSubmit = (data: CompanyStepFormData) => {
    handleUpdateSignupFormData({
      ...data,
      imageProfile: thumbnail,
    });
    onNextStep();
  };

  const onChangeImage = (event: any) => {
    if (event.target.files[0]) setThumbnail(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Thumbnail style={{ backgroundImage: `url(${preview})` }} hasThumbnail={!!thumbnail}>
        <input type='file' onChange={onChangeImage} accept='image/*' />
        <FiCamera />
      </S.Thumbnail>
      <Input
        type='text'
        label='Nome da empresa*'
        name='companyName'
        placeholder='Nome da empresa*'
        error={errors.companyName}
        register={register}
      />
      <Input
        type='text'
        label='CNPJ*'
        name='cnpj'
        placeholder='Ex: 000000000.00000'
        error={errors.cnpj}
        register={register}
        containerStyle={{ marginTop: '0.5rem' }}
      />
      <Input
        type='text'
        label='Nome do responsável*'
        name='responsible'
        placeholder='Ex: Fulano da Silva'
        error={errors.responsible}
        register={register}
        containerStyle={{ marginTop: '0.5rem' }}
      />
      <Input
        type='text'
        label='Telefone para contato*'
        name='phoneNumber'
        placeholder='Ex: (11)9999-9999'
        error={errors.phoneNumber}
        register={register}
        containerStyle={{ marginTop: '0.5rem' }}
      />
      <Button type='submit'>Próximo passo</Button>
    </form>
  );
};

export default CompanyStep;
