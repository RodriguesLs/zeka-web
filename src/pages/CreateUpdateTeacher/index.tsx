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
import { createTeacher, fetchTeacherById, updateTeacher } from './services/apiHandlers';
import { Levels } from '@/constants/level';

export interface UserZekaFormData {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  document_number: string;
  cellphone: string;
  address: string;
  discipline: string;
}

const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  role: yup.string(),
  email: yup.string(),
  password: yup.string(),
  document_number: yup.string(),
  cellphone: yup.string(),
  address: yup.string(),
  discipline: yup.string(), 
});

const CreateUpdateTeacher = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { teacherId } = useParams();

  const isCreateMode = !teacherId;

  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['teachers', teacherId],
    async () => {
      const { data } = await fetchTeacherById(teacherId);

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
    (data: UserZekaFormData) => isCreateMode ? createTeacher(data) : updateTeacher(teacherId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teachers']);
        queryClient.invalidateQueries(['teachers', '1']);
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

    navigate('/professores');
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
                  {
                    !isCreateMode &&
                    <Select name='active' label='Status' register={register} defaultValue='true'>
                      <option value='true'>Ativo</option>
                      <option value='false'>Inativo</option>
                    </Select>
                  }
                </HStack>
                {
                  isCreateMode &&
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
                }
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='document_number'
                    placeholder='Ex: 999.999.999-99'
                    error={errors.document_number}
                    register={register}
                    autoComplete='off'
                    label='CPF/CNPJ:*'
                    mask='999.999.999-99'
                    isDisabled={!isCreateMode}
                  />
                  <Input
                    type='text'
                    name='cellphone'
                    placeholder='Ex: (11) 98888-8888'
                    error={errors.cellphone}
                    register={register}
                    autoComplete='off'
                    mask={'(99) 99999-9999'}
                    label='Telefone:*'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='address'
                    placeholder='Ex: Rua Minas Gerais, 200 - Vila Central, Araraquara'
                    error={errors.address}
                    register={register}
                    autoComplete='off'
                    label='Endereço completo:*'
                  />
                  <Input
                    type='text'
                    name='discipline'
                    placeholder='Ex: História'
                    error={errors.discipline}
                    register={register}
                    autoComplete='off'
                    label='Disciplina:*'
                  />
                </HStack>
                {
                  !isCreateMode &&
                  <HStack w='100%'>
                    <Select name='level' label='Nível' register={register} defaultValue={1}>
                      {Levels.map(l => <option key={l.number} value={l.number}>{l.alias}</option>)}
                    </Select>
                  </HStack>
                }
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

export default CreateUpdateTeacher;
