import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Error, Input, Spinner } from '@/components';
import useToast from '@/hooks/useToast';
import { queryClient } from '@/services/queryClient';
import { update, fetchProfileByUserId } from './services/apiHandlers';
import useAuth from '@/hooks/useAuth';

export interface ProfileFormData {
  password: string;
  password_confirmation: string;
}

const profileFormSchema = yup.object().shape({
  password: yup.string(),
  password_confirmation: yup.string(),
});

const UpdateProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['profile', userId],
    async () => {
      const { data } = await fetchProfileByUserId(userId);

      return data;
    },
    {
      enabled: true,
      retry: 1,
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
  });

  const onSubmit = async (formData: any) => {
    try {
      await update(userId, formData);

      addToast({
        title: 'Sucesso!',
        description: 'Usuário atualizado com sucesso!',
        type: 'success',
      });

      navigate('/');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: e?.response?.data?.errors,
        type: 'error',
      });
    }
  };

  if (isLoading)
    return (
      <Box w='100%' pt='10rem' display='grid' placeContent='center'>
        <Spinner />
      </Box>
    );

  if (error) {
    return <Error onClick={() => navigate('../')} />;
  }

  return (
    <Box as='section' w='100%'>
      <Box as='form' w='100%' maxWidth='1000px' onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ fontSize: '2em', margin: '1em 0' }}>
          Alterar senha
        </h1>
        <HStack as='fieldset' w='100%'>
          <Input
            type='text'
            name='password'
            error={errors.password}
            register={register}
            autoComplete='off'
            label='Nova Senha'
          />
          <Input
            type='text'
            name='password_confirmation'
            error={errors.password_confirmation}
            register={register}
            autoComplete='off'
            label='Confirmação da nova senha'
          />
        </HStack>
        <Flex w='100%' pt='1.5rem' alignItems='center' gap='1rem'>
          <Button type='button' onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button type='submit' variant='primary' disabled={isSubmitting}>
            Salvar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
