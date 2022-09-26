import { useEffect, useMemo, useState } from 'react';
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

import { Button, Error, Input, Select, Spinner } from '@/components';
import useToast from '@/hooks/useToast';
import { queryClient } from '@/services/queryClient';
import { createUser, fetchUserById, updateUser } from './services/apiHandlers';

export interface UserZekaFormData {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  role: yup.string(),
  email: yup.string(),
  password: yup.string(),
});

const CreateUpdateUser = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { userId } = useParams();

  const isCreateMode = !userId;

  console.log('isCreateMode', isCreateMode);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['users', userId],
    async () => {
      const { data } = await fetchUserById(userId);

      return data;
    },
    {
      enabled: !isCreateMode,
      retry: 1,
    },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserZekaFormData>({
    resolver: yupResolver(userFormSchema),
  });

  useEffect(() => {
    if (!isCreateMode && user) reset(user);
  }, [isCreateMode, user]);

  const { mutate } = useMutation(
    (data: UserZekaFormData) => isCreateMode ? createUser(data) : updateUser(userId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        queryClient.invalidateQueries(['users', '1']);
      },
      onError: () => {
        addToast({
          title: 'Opssss..',
          description: `Erro ao ${
            isCreateMode ? 'salvar novo' : 'atualizar'
          }  usuário, tente novamente!`,
          type: 'error',
        });
      },
    },
  );

  const onSubmit = (formData: UserZekaFormData) => {
    mutate(formData);
    addToast({
      title: 'Sucesso!',
      description: `Usuário ${isCreateMode ? 'cadastrado' : 'atualizado'} com sucesso!`,
      type: 'success',
    });

    navigate('/usuarios');
  };

  if (!isCreateMode && isLoading)
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
        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab fontWeight='bold' _selected={{ color: 'brand.500' }}>
              Informações pessoais
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack gap='1rem' w='100%' alignItems='start'>
                <Heading as='legend' size='md'>
                  Informações pessoais
                </Heading>
                <HStack as='fieldset' w='100%'>
                  <Input
                    type='text'
                    name='name'
                    placeholder='Ex: João Pedro'
                    error={errors.name}
                    register={register}
                    autoComplete='off'
                    label='Nome completo*'
                  />
                  <Select name='role' label='Tipo' register={register} defaultValue='user'>
                    <option value='admin'>Administrador</option>
                    <option value='user'>User zeka</option>
                  </Select>
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='email'
                    placeholder='Ex: a@a.com'
                    error={errors.email}
                    register={register}
                    autoComplete='off'
                    label='E-mail:*'
                  />
                  <Input
                    type='text'
                    name='password'
                    placeholder='Ex: @Kldi24'
                    error={errors.password}
                    register={register}
                    autoComplete='off'
                    label='Password:*'
                  />
                </HStack>
                <Flex w='100%' pt='1.5rem' alignItems='center' gap='1rem'>
                  <Button type='button' onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                  <Button type='submit' variant='primary' disabled={isSubmitting}>
                    Salvar
                  </Button>
                </Flex>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default CreateUpdateUser;
