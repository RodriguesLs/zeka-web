import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Error, Input, Select, Spinner } from '@/components';
import useToast from '@/hooks/useToast';
import { queryClient } from '@/services/queryClient';
import { createLicense } from './services/apiHandlers';

const CreateUpdateOperationArea = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>();

  const { mutateAsync } = useMutation((data: any) => createLicense(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['operation_areas']);
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await mutateAsync(formData);
      addToast({
        title: 'Sucesso!',
        description: 'Licença cadastrada com sucesso!',
        type: 'success',
      });

      navigate('/departamentos');
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
          <HStack w='100%'>
            <Input
              type='text'
              name='description'
              placeholder='Ex: Financeiro'
              register={register}
              autoComplete='off'
              label='Área:*'
            />
          </HStack>
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

export default CreateUpdateOperationArea;
