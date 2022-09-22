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
import { createOrganization, fetchOrganizationById, updateUser } from './services/apiHandlers';

export interface UserFormData {
  logo: File;
  name: string;
  phone_number: number | string;
  cnpj: string | number;
  site: string;
  operation_area_id: number;
  contact_person: string;
}

const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  logo: yup.string(),
  phone_number: yup.string().required('Telefone é obrigatório'),
  cnpj: yup.string(),
  address: yup.string(),
});

const CreateUpdateOrganization = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { orgId } = useParams();

  const isCreateMode = !orgId;

  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['admin-users', orgId],
    async () => {
      const { data } = await fetchOrganizationById(orgId);

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
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
  });

  useEffect(() => {
    if (!isCreateMode && user) reset(user);
  }, [isCreateMode, user]);

  const { mutateAsync } = useMutation(
    (data: UserFormData) => (isCreateMode ? createOrganization(data) : updateUser(orgId, data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin-users']);
      },
    },
  );

  const onSubmit = async (formData: UserFormData) => {
    try {
      console.log(formData);
      await mutateAsync(formData);
      addToast({
        title: 'Sucesso!',
        description: `Usuário ${isCreateMode ? 'cadastrado' : 'atualizado'} com sucesso!`,
        type: 'success',
      });

      navigate('/empresas');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: `Erro ao ${
          isCreateMode ? 'salvar novo' : 'atualizar'
        }  usuário, tente novamente!`,
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
                    name='name'
                    placeholder='Ex: Coca-cola'
                    error={errors.name}
                    register={register}
                    autoComplete='off'
                    label='Nome'
                  />
                  <Input
                    type='text'
                    name='cnpj'
                    placeholder='Ex: 00.000.000/0000-00'
                    error={errors.cnpj}
                    register={register}
                    autoComplete='off'
                    label='CNPJ:'
                    mask='99.999.999/9999-99'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='contact_person'
                    placeholder='Ex: José Carlos'
                    error={errors.contact_person}
                    register={register}
                    autoComplete='off'
                    label='Pessoa de contato:'
                  />
                  <Input
                    type='text'
                    name='phone_number'
                    placeholder='Ex: (99) 99999-9999'
                    error={errors.phone_number}
                    register={register}
                    autoComplete='off'
                    label='Telefone:'
                  />
                  <Input
                    type='text'
                    name='site'
                    placeholder='Ex: www.empresax.com.br'
                    error={errors.site}
                    register={register}
                    autoComplete='off'
                    label='Site:'
                  />
                  <Select name='operation_area_id' label='Departamento' register={register}>
                    <option>Selecione</option>
                    <option value='1'>TI</option>
                    <option value='2'>Obras</option>
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

export default CreateUpdateOrganization;
