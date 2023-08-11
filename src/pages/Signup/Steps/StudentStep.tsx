import { useMemo, useState } from 'react';
import { FiCamera, FiTrash } from 'react-icons/fi';
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input, Select } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

import { Thumbnail } from '../styles';

const LIMIT_SIZE_IMAGE = 1024 * 1024; // 1 MB

interface StudentStepFormData {
  name: string;
  imageProfile: File;
  cpf: string | number;
  phoneNumber: string | number;
  rg: string | number;
  instagram: string;
  social_name: string;
  areaCode: string | number;
}

interface StudentStepProps {
  onNextStep: () => void;
}

const studentStepFormSchema = yup.object().shape({
  // companyName: yup.string().required('Nome é obrigatório'),
  // cnpj: yup
  //   .string()
  //   .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Você deve preencher o CPF corretamente')
  //   .required('CNPJ da sua empresa é obrigatório'),
  areaCode: yup.string(),
  phoneNumber: yup
    .string()
    //.matches(/^\(?([0-9]{2})\)?([0-9]{4,5})-?([0-9]{4})$/, 'Você deve preencher corretamente')
    .required('Telefone para contato é obrigatório'),
});

const StudentStep = ({ onNextStep }: StudentStepProps) => {
  const { handleUpdateSignupFormData, signUpFormData } = useSignUpForm();

  const { imageProfile } = signUpFormData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentStepFormData>({
    resolver: yupResolver(studentStepFormSchema),
    defaultValues: signUpFormData,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(imageProfile);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const onSubmit = (formData: StudentStepFormData) => {
    handleUpdateSignupFormData({
      ...formData,
      // imageProfile: thumbnail,
    });
    onNextStep();
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files[0].size > LIMIT_SIZE_IMAGE) return null;

    setThumbnail(event.target.files[0]);
  };

  return (
    <VStack as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      {/* <Box position='relative'>
        <Thumbnail style={{ backgroundImage: `url(${preview})` }} hasThumbnail={!!thumbnail}>
          <input type='file' accept='image/*' max='1' onChange={onChangeImage} />
          <FiCamera />
        </Thumbnail>
        {!!thumbnail && (
          <IconButton
            aria-label='remove-avatar'
            icon={<FiTrash />}
            position='absolute'
            bottom='12px'
            right='-12px'
            bg='none'
            color='#BBB'
            onClick={() => setThumbnail(null)}
            _hover={{
              color: '#e62b4b',
            }}
          />
        )}
      </Box> */}
      <Input
        type='text'
        label='Nome completo*'
        name='name'
        placeholder='Nome completo*'
        error={errors.name}
        register={register}
        autoComplete='off'
      />
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='RG*'
          name='rg'
          placeholder='Ex: 99.999.999-9'
          error={errors.rg}
          register={register}
          autoComplete='off'
          mask='99.999.999-9'
        />
        <Input
          type='text'
          label='CPF*'
          name='cpf'
          placeholder='Ex: 999.999.999-99'
          error={errors.cpf}
          register={register}
          autoComplete='off'
          mask='999.999.999-99'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='Código de Área*'
          name='areaCode'
          placeholder='Ex: (99)'
          error={errors.areaCode}
          register={register}
          autoComplete='off'
          mask='(99)'
          size='lg'
        />
        <Input
          type='text'
          label='Celular*'
          name='phoneNumber'
          placeholder='Ex: 99999-9999'
          error={errors.phoneNumber}
          register={register}
          autoComplete='off'
          mask='99999-9999'
        />
        <Input
          type='text'
          label='Instagram*'
          name='instagram'
          placeholder='Ex: odiego.silva'
          error={errors.instagram}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Select name='lastyear' label='Último ano na escola' register={register} defaultValue='0'>
          <option value='0'>Ensino Fundamental I</option>
          <option value='1'>Ensino Fundamental II</option>
          <option value='2'>Ensino Médio</option>
        </Select>
      </HStack>
      <Button type='submit' variant='primary' style={{ marginTop: '2rem' }}>
        Avançar
      </Button>
    </VStack>
  );
};

export default StudentStep;
