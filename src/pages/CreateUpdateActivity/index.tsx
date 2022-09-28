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

import { Button, Error, Input, Select, Spinner } from '@/components';
import useToast from '@/hooks/useToast';
import { queryClient } from '@/services/queryClient';
import { createActivity, fetchActivityById, updateActivity} from './services/apiHandlers';
import apiClient from '@/services/apiClient';

export interface ActivityFormData {
  description: string;
  kind: number;
  address: string;
  date: string;
}

const organizationFormSchema = yup.object().shape({
  name: yup.string(),
  phone_number: yup.string(),
  cnpj: yup.string(),
  site: yup.string(),
});

const CreateUpdateActivity = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { activityId } = useParams();

  const isCreateMode = !activityId;

  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['activities', activityId],
    async () => {
      const { data } = await fetchActivityById(activityId);

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
  } = useForm<ActivityFormData>({
    resolver: yupResolver(organizationFormSchema),
  });

  useEffect(() => {
    if (!isCreateMode && user) reset(user);
  }, [isCreateMode, user]);

  const { mutate } = useMutation(
    (data: any) => (isCreateMode ? createActivity(data) : updateActivity(activityId, data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['activities']);
      },
      onError: () => console.log('ERRO')
    },
  );

  const onSubmit = (formData: any) => {
    try {
      mutate(formData);
      addToast({
        title: 'Sucesso!',
        description: `Atividade ${isCreateMode ? 'cadastrado' : 'atualizado'} com sucesso!`,
        type: 'success',
      });

      navigate('/atividades');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: `Erro ao ${
          isCreateMode ? 'salvar novo' : 'atualizar'
        }  atividade, tente novamente!`,
        type: 'error',
      });
    }
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
              Informações cadastrais
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack gap='1rem' w='100%' alignItems='start'>
                <Heading as='legend' size='md'>
                  {/* Informações cadastrais */}
                </Heading>
                <HStack as='fieldset' w='100%'>
                  <Input
                    type='text'
                    name='description'
                    placeholder='Ex: Live xpto 123...'
                    error={errors.description}
                    register={register}
                    autoComplete='off'
                    label='Descrição'
                  />
                  <Input
                    type='text'
                    name='address'
                    placeholder='Ex: www.xpto.com.br/JDh45I'
                    error={errors.address}
                    register={register}
                    autoComplete='off'
                    label='Site/ endereço:'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='date'
                    placeholder='Ex.: 01/09/2029'
                    error={errors.date}
                    register={register}
                    autoComplete='off'
                    label='Data do evento:'
                    mask='99/99/9999'
                  />
                  <Select name='kind' label='Tipo' register={register}>
                    <option>Selecione</option>
                    <option value='simulate'>Simulado</option>
                    <option value='live'>Live</option>
                  </Select>
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

export default CreateUpdateActivity;
