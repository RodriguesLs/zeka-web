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
import { createUser, fetchUserById, updateUser, fetchDepartments } from './services/apiHandlers';

interface AddressFormData {
  street: string;
  complement: string;
  cep: string;
  city: string;
  uf: string;
  district: string;
}

export interface UserFormData {
  imageProfile: File;
  id: number;
  code: string; // matrícula
  name: string;
  gender: string;
  email: string;
  password: string;
  phone: number | string;
  cpf: string | number;
  // rg: string | number;
  last_school_year: string | number;
  ocupation: string;
  organization_time: string | number;
  department: string;
  address: AddressFormData;
}

const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  gender: yup.string(),
  email: yup.string().required('E-mail é obrigatório'),
  password: yup.string().min(6, 'No mínimo 6 dígitos').required('Senha é obrigatória'),
  code: yup.string().required('Você deve informar a matrícula'),
  phone: yup.string().required('Telefone é obrigatório'),
  cpf: yup.string(),
  last_school_year: yup.string(),
  organization_time: yup.string(),
  ocupation: yup.string(),
  department: yup.string(),
  address: yup.object().shape({
    cep: yup
      .string()
      .notRequired()
      .matches(/^[0-9]{5}-[0-9]{3}$/, 'Você deve preencher o CEP corretamente'),
    street: yup.string(),
    city: yup.string(),
    district: yup.string(),
    complement: yup.string(),
    uf: yup.string(),
  }),
});

const CreateUpdateUser = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [departments, setDepartments] = useState([]);

  const { userId } = useParams();

  const isCreateMode = !userId;

  const navigate = useNavigate();
  const { addToast } = useToast();

  const { data: departmentsResp } = useQuery(['departments'], async () => {
    const { data } = await fetchDepartments();

    return data;
  });

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
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
  });

  useEffect(() => {
    if (!isCreateMode && user) reset(user);

    setDepartments(departmentsResp);
  }, [isCreateMode, user, departmentsResp]);

  const { mutate } = useMutation(
    (data: UserFormData) => isCreateMode ? createUser(data) : updateUser(userId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        queryClient.invalidateQueries(['users', '1']);
        addToast({
          title: 'Sucesso!',
          description: `Usuário ${isCreateMode ? 'cadastrado' : 'atualizado'} com sucesso!`,
          type: 'success',
        });
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

  const onSubmit = (formData: UserFormData) => {
    mutate(formData);

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
            <Tab fontWeight='bold' _selected={{ color: 'brand.500' }}>
              Endereço
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
                  <Select name='gender' label='Gênero' register={register} defaultValue='F'>
                    <option value='F'>Feminino</option>
                    <option value='M'>Masculino</option>
                  </Select>
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='code'
                    placeholder='Ex: A1B2C3D4'
                    error={errors.code}
                    register={register}
                    autoComplete='off'
                    label='Matrícula:*'
                  />
                  <Input
                    type='text'
                    name='cpf'
                    placeholder='Ex: 000.000.000-00'
                    error={errors.cpf}
                    register={register}
                    autoComplete='off'
                    label='CPF:'
                    mask='999.999.999-99'
                  />
                  {/* <Input
                    type='text'
                    name='rg'
                    placeholder='Ex: 9090909-0'
                    error={errors.rg}
                    register={register}
                    autoComplete='off'
                    label='RG:'
                    mask='9999999-9'
                  /> */}
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='email'
                    placeholder='Ex: email@email.com'
                    error={errors.email}
                    register={register}
                    autoComplete='off'
                    label='E-mail:*'
                  />
                  <Input
                    type='text'
                    name='phone'
                    placeholder='Ex: (16) 99090-9090'
                    error={errors.phone}
                    register={register}
                    autoComplete='off'
                    label='Telefone:*'
                    mask='(99)99999-9999'
                  />
                  <Input
                    type='password'
                    name='password'
                    error={errors.password}
                    register={register}
                    autoComplete='off'
                    label='Senha:*'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='last_school_year'
                    placeholder='Ex: 2022'
                    error={errors.last_school_year}
                    register={register}
                    autoComplete='off'
                    label='Último ano na escola:'
                  />
                  <Input
                    type='text'
                    name='organization_time'
                    placeholder='Ex: 3 anos'
                    error={errors.organization_time}
                    register={register}
                    autoComplete='off'
                    label='Tempo na empresa:'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='ocupation'
                    placeholder='Ex: Desenvolvedor de sistemas'
                    error={errors.ocupation}
                    register={register}
                    autoComplete='off'
                    label='Cargo:'
                  />
                  <Select name='department' label='Departamento' register={register}>
                    {departments?.map((d: any) => (
                      <option key={d.id} value={d.description}>
                        {d.description}
                      </option>
                    ))}
                  </Select>
                  <Select name='status' label='Status' register={register}>
                    <option value={'active'}>
                      Ativo
                    </option>
                    <option value={'no_confirmed'}>
                      Não confirmado
                    </option>
                    <option value={'inactive'}>
                      Inativo
                    </option>
                  </Select>
                </HStack>
                <Flex w='100%' pt='1.5rem' alignItems='center' gap='1rem'>
                  <Button type='button' onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                  <Button
                    type='button'
                    variant='primary'
                    onClick={() => setTabIndex((oldState) => oldState + 1)}
                  >
                    Próximo
                  </Button>
                </Flex>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack gap='1rem' w='100%' alignItems='start'>
                <Heading as='legend' size='md'>
                  Endereço
                </Heading>
                <HStack w='100%'>
                  <Input
                    type='text'
                    label='CEP'
                    name='address.cep'
                    placeholder='Ex: 69000-000*'
                    error={errors?.address?.cep}
                    register={register}
                    mask='99999-999'
                  />
                  <Input
                    type='text'
                    label='Endereço'
                    name='address.street'
                    placeholder='Ex: Av. João da Silva'
                    error={errors?.address?.street}
                    register={register}
                    autoComplete='off'
                  />
                  <Input
                    type='text'
                    label='Complemento'
                    name='address.complement'
                    placeholder='Ex: fundos'
                    error={errors?.address?.complement}
                    register={register}
                    autoComplete='off'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    label='Bairro'
                    name='address.district'
                    placeholder='Ex: Centro'
                    error={errors?.address?.district}
                    register={register}
                    autoComplete='off'
                  />
                  <Input
                    type='text'
                    label='Cidade'
                    name='address.city'
                    placeholder='Ex: São Paulo'
                    error={errors?.address?.city}
                    register={register}
                    autoComplete='off'
                  />
                  <Input
                    type='text'
                    label='UF'
                    name='address.uf'
                    placeholder='Ex: SP'
                    error={errors?.address?.uf}
                    register={register}
                    autoComplete='off'
                  />
                </HStack>
                <Flex w='100%' pt='1.5rem' alignItems='center' gap='1rem'>
                  <Button type='button' onClick={() => setTabIndex((oldState) => oldState - 1)}>
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

export default CreateUpdateUser;
