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
import {
  createOrganization,
  fetchOrganizationById,
  updateOrganization,
  fetchOperationAreas,
} from './services/apiHandlers';
import useAuth from '@/hooks/useAuth';

export interface OrganizationFormData {
  logo: File;
  name: string;
  oficial_name: string;
  phone_number: number | string;
  cnpj: string | number;
  site: string;
  department: string;
  address: string;
  contact_person_1: string;
  contact_person_2: string;
  email_contact_person_1: string;
  email_contact_person_2: string;
  phone_contact_person_1: string;
  phone_contact_person_2: string;
  total_uses: number;
  available_uses: number;
}

const organizationFormSchema = yup.object().shape({
  name: yup.string(),
  phone_number: yup.string(),
  cnpj: yup.string(),
  site: yup.string(),
});

const CreateUpdateOrganization = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [operationAreas, setOperationAreas] = useState([]);
  const { orgId } = useParams();

  const isCreateMode = !orgId;

  const navigate = useNavigate();
  const { addToast } = useToast();
  const { role } = useAuth();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(
    ['organizations', orgId],
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
  } = useForm<OrganizationFormData>({
    resolver: yupResolver(organizationFormSchema),
  });

  useEffect(() => {
    if (!isCreateMode && user) reset(user);
    // setOperationAreas(operationAreasResp);
  }, [isCreateMode, user, operationAreas]);

  const { mutate } = useMutation(
    (data: any) => (isCreateMode ? createOrganization(data) : updateOrganization(orgId, data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['organizations']);
      },
      onError: () => console.log('ERRO'),
    },
  );

  const onSubmit = (formData: any) => {
    try {
      mutate(formData);
      addToast({
        title: 'Sucesso!',
        description: `Usuário ${isCreateMode ? 'cadastrado' : 'atualizado'} com sucesso!`,
        type: 'success',
      });

      role === 'admin_school' ? navigate('/farol-plan') : navigate('/empresas');
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
                    name='oficial_name'
                    placeholder='Ex: Empresa Silva LTDA'
                    error={errors.oficial_name}
                    register={register}
                    autoComplete='off'
                    label='Razão Social'
                  />
                  <Input
                    type='text'
                    name='name'
                    placeholder='Ex: Coca-cola'
                    error={errors.name}
                    register={register}
                    autoComplete='off'
                    label='Nome Fantasia'
                  />
                  <Input
                    type='text'
                    name='slug'
                    placeholder='Ex: coca ou coca_cola'
                    register={register}
                    autoComplete='off'
                    label='Apelido'
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
                    name='site'
                    placeholder='Ex: www.empresax.com.br'
                    error={errors.site}
                    register={register}
                    autoComplete='off'
                    label='Site:'
                  />
                  <Input
                    type='text'
                    name='address'
                    placeholder='Ex: Rua Minas Gerais, 400 - Pq. Industrial - Jaú/ SP'
                    error={errors.address}
                    register={register}
                    autoComplete='off'
                    label='Endereço completo:'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='department'
                    placeholder='Financeiro'
                    error={errors.department}
                    register={register}
                    autoComplete='off'
                    label='Segmento de atuação da empresa:'
                  />
                  <Input
                    type='number'
                    name='license.total_uses'
                    placeholder='Ex: 12'
                    error={errors.total_uses}
                    register={register}
                    autoComplete='off'
                    label='Quantidade de licenças disponíveis:'
                  />
                  <Input
                    type='number'
                    name='available_uses'
                    placeholder='Ex: 9'
                    error={errors.available_uses}
                    register={register}
                    autoComplete='off'
                    label='Quantidade de licenças ativas:'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='contact_person_1'
                    placeholder='Ex: José Carlos'
                    error={errors.contact_person_1}
                    register={register}
                    autoComplete='off'
                    label='Ponto focal principal:'
                  />
                  <Input
                    type='text'
                    name='email_contact_person_1'
                    placeholder='Ex: jose@carlos.com'
                    error={errors.email_contact_person_1}
                    register={register}
                    autoComplete='off'
                    label='E-mail do ponto focal principal:'
                  />
                  <Input
                    type='text'
                    name='phone_contact_person_1'
                    placeholder='Ex: (99) 99999-9999'
                    error={errors.phone_contact_person_1}
                    register={register}
                    autoComplete='off'
                    label='Telefone ponto focal principal:'
                    mask={'(99) 99999-9999'}
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='contact_person_2'
                    placeholder='Ex: José Carlos'
                    error={errors.contact_person_2}
                    register={register}
                    autoComplete='off'
                    label='Ponto focal backup:'
                  />
                  <Input
                    type='text'
                    name='email_contact_person_2'
                    placeholder='Ex: jose@carlos.com'
                    error={errors.email_contact_person_2}
                    register={register}
                    autoComplete='off'
                    label='E-mail do ponto focal backup:'
                  />
                  <Input
                    type='text'
                    name='phone_contact_person_2'
                    placeholder='Ex: (99) 99999-9999'
                    error={errors.phone_contact_person_2}
                    register={register}
                    autoComplete='off'
                    label='Telefone ponto focal backup:'
                    mask={'(##) #####-####'}
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
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default CreateUpdateOrganization;
