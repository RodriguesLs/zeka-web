import { useForm } from 'react-hook-form';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Select } from '@/components';
import useToast from '@/hooks/useToast';
import apiClient from '@/services/apiClient';
import { queryClient } from '@/services/queryClient';

interface LicenseFormData {
  id: number;
  code: string;
  name: string;
  expiration_date: Date;
  available_uses: number;
  status: boolean | string;
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
    return apiClient.post('/licenses', {
      license: {
        ...data,
        status: data.status == '1' ? true : false,
      },
    });
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

      navigate('/licencas');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: 'Erro ao salvar nova licença, tente novamente!',
        type: 'error',
      });
    }
  };

  return (
    <Box as='section' w='100%'>
      <Box as='form' w='100%' maxWidth='700px' onSubmit={handleSubmit(onSubmit)}>
        <VStack gap='1rem'>
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
          />
          <Input
            type='text'
            name='available_uses'
            placeholder='Ex: 20'
            error={errors.available_uses}
            register={register}
            autoComplete='off'
            label='Quantidade para uso*'
          />
          <Select name='status' label='Status' register={register} defaultValue='1'>
            <option value='1'>Ativo</option>
            <option value='0'>Inativo</option>
          </Select>
          <Flex w='100%' mt='2rem' alignItems='center' gap='1rem'>
            <Button type='button' onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type='submit' variant='primary' disabled={isSubmitting}>
              Salvar
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateLicense;
