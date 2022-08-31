import { useMemo, useState } from 'react';
import { FiCamera, FiTrash } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import { FormGroup, Thumbnail, ThumbnailWrapper } from '../styles';

const LIMIT_SIZE_IMAGE = 1024 * 1024; // 1 MB

interface CompanyStepFormData {
  companyName: string;
  imageProfile: File;
  cnpj: string | number;
  phoneNumber: string | number;
  responsible: string;
}

interface CompanyStepProps {
  onNextStep: () => void;
}

const companyStepFormSchema = yup.object().shape({
  companyName: yup.string().required('Nome da sua empresa é obrigatório'),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Você deve preencher o CNPJ corretamente')
    .required('CNPJ da sua empresa é obrigatório'),
  phoneNumber: yup
    .string()
    .matches(/^\(?([0-9]{2})\)?([0-9]{4,5})-?([0-9]{4})$/, 'Você deve preencher corretamente')
    .required('Telefone para contato é obrigatório'),
  responsible: yup.string().required('Nome do responsável é obrigatório'),
});

const CompanyStep = ({ onNextStep }: CompanyStepProps) => {
  const { handleUpdateSignupFormData, signUpFormData } = useSignUpForm();

  const { imageProfile } = signUpFormData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyStepFormData>({
    resolver: yupResolver(companyStepFormSchema),
    defaultValues: signUpFormData,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(imageProfile);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const onSubmit = (formData: CompanyStepFormData) => {
    handleUpdateSignupFormData({
      ...formData,
      imageProfile: thumbnail,
    });
    onNextStep();
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files[0].size > LIMIT_SIZE_IMAGE) return null;

    setThumbnail(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThumbnailWrapper>
        <Thumbnail style={{ backgroundImage: `url(${preview})` }} hasThumbnail={!!thumbnail}>
          <input type='file' accept='image/*' max='1' onChange={onChangeImage} />
          <FiCamera />
        </Thumbnail>
        {!!thumbnail && (
          <button type='button' className='trashButton' onClick={() => setThumbnail(null)}>
            <FiTrash />
          </button>
        )}
      </ThumbnailWrapper>
      <Input
        type='text'
        label='Nome da empresa*'
        name='companyName'
        placeholder='Nome da empresa*'
        error={errors.companyName}
        register={register}
        autoComplete='off'
      />
      <Input
        type='text'
        label='CNPJ*'
        name='cnpj'
        placeholder='Ex: 99.999.999/9999-99'
        error={errors.cnpj}
        register={register}
        autoComplete='off'
        containerStyle={{ marginTop: '0.5rem' }}
        mask='99.999.999/9999-99'
      />
      <FormGroup>
        <Input
          type='text'
          label='Nome do responsável*'
          name='responsible'
          placeholder='Ex: Fulano da Silva'
          error={errors.responsible}
          register={register}
          autoComplete='off'
          containerStyle={{ marginTop: '0.5rem' }}
        />
        <Input
          type='text'
          label='Telefone para contato*'
          name='phoneNumber'
          placeholder='Ex: (99)99999-9999'
          error={errors.phoneNumber}
          register={register}
          autoComplete='off'
          containerStyle={{ marginTop: '0.5rem' }}
          mask='(99)99999-9999'
        />
      </FormGroup>
      <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
        Avançar
      </Button>
    </form>
  );
};

export default CompanyStep;
