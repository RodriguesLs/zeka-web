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
import {
  createActivity,
  fetchActivityById,
  updateActivity,
  fetchTeachers
} from './services/apiHandlers';
import useAuth from '@/hooks/useAuth';

export interface ActivityFormData {
  description: string;
  kind: number;
  address: string;
  date: string;
  unit_value: string;
  discipline: string;
  topic: string;
}

const organizationFormSchema = yup.object().shape({
  name: yup.string(),
  phone_number: yup.string(),
  cnpj: yup.string(),
  site: yup.string(),
  unit_value: yup.string(),
  discipline: yup.string(),
  topic: yup.string()
});

const CreateUpdateActivity = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [isChallenge, setIsChallenge] = useState(false);
  const { activityId } = useParams();

  const isCreateMode = !activityId;

  const navigate = useNavigate();
  const { addToast } = useToast();
  const { role } = useAuth();

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

  const { data: teachersResp }: any = useQuery(['teachers-select'], fetchTeachers);

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
    setTeachers(teachersResp?.data);
  }, [isCreateMode, user, teachersResp]);

  const { mutate } = useMutation(
    (data: any) => (isCreateMode ? createActivity(data) : updateActivity(activityId, data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['activities']);
      },
      onError: () => console.log('ERRO');
    },
  );

  const actionRegister = (e: any) => {
    if (e.target.value === 'challenge') return setIsChallenge(true);

    setIsChallenge(false);
  }

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
              Registrar atividade
            </Tab>
            {
              isChallenge &&
              <Tab fontWeight='bold' _selected={{ color: 'brand.500' }}>
                Informações adicionais
              </Tab>
            }
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack gap='1rem' w='100%' alignItems='start'>
                <Heading as='legend' size='md'>
                  {/* Informações cadastrais */}
                </Heading>
                <HStack as='fieldset' w='100%'>
                  <Select name='kind' label='Tipo' onChange={actionRegister} register={register}>
                    <option>Selecione</option>
                    <option value='simulate'>Simulado</option>
                    <option value='live'>Live</option>
                    <option value='challenge'>Gincana</option>
                    <option value='writting_core'>{`Escrever conteúdo (core)`} </option>
                    <option value='writting'>Escrever conteúdo para sala de aula</option>
                    <option value='blog'>Escrever para blog</option>
                    <option value='essay_correction'>Correção de redação</option>
                    <option value='group_orientation'>Orientação de grupo</option>
                    <option value='teacher_trainer'>Formação de professores</option>
                  </Select>
                  <Input
                    type='text'
                    name='unit_price'
                    placeholder='Ex: 150.00 (use pontos e vírgulas)'
                    error={errors.unit_value}
                    register={register}
                    autoComplete='off'
                    label='Valor da atividade (R$)'
                  />
                </HStack>
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
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='address'
                    placeholder='Ex: www.xpto.com.br/JDh45I'
                    error={errors.address}
                    register={register}
                    autoComplete='off'
                    label='Site/ endereço:'
                  />
                  {
                    !isChallenge &&
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
                  }
                  {
                    isChallenge &&
                    <Input
                      type='text'
                      name='initial_date'
                      placeholder='Ex.: 01/09/2023'
                      error={errors.date}
                      register={register}
                      autoComplete='off'
                      label='Data de início:'
                      mask='99/99/9999'
                    />
                  }
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    name='discipline'
                    placeholder='Ex: História'
                    error={errors.discipline}
                    register={register}
                    autoComplete='off'
                    label='Disciplina/ Matéria:'
                  />
                  <Input
                    type='text'
                    name='topic'
                    placeholder='Ex.: Brasil Colonial'
                    error={errors.topic}
                    register={register}
                    autoComplete='off'
                    label='Tema/ Assunto:'
                  />
                </HStack>
                {role !== 'teacher' && (
                  <HStack w='100%'>
                    <Select name='teacher_id' label='Professor' register={register}>
                      <option>Selecione</option>
                      {teachers?.map((t: any) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                )}
                <Flex w='100%' pt='1.5rem' alignItems='center' gap='1rem'>
                  <Button type='button' onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                  {
                    isChallenge &&
                    <Button
                      type='button'
                      variant='primary'
                      onClick={() => setTabIndex((oldState) => oldState + 1)}
                    >
                      Próximo
                    </Button>
                  }
                  {
                    !isChallenge &&
                    <Button type='submit' variant='primary' disabled={isSubmitting}>
                      Salvar
                    </Button>
                  }
                </Flex>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack gap='1rem' w='100%' alignItems='start'>
                <Heading as='legend' size='md'>
                  Informações adicionais
                </Heading>
                <HStack w='100%'>
                  <Input
                    type='text'
                    label='Data de término'
                    name='end_date'
                    placeholder='Ex: 15/10/2023'
                    register={register}
                    mask='99/99/9999'
                  />
                  <Input
                    type='text'
                    label='Código'
                    name='code'
                    placeholder='Ex: A4DS578*'
                    register={register}
                  />
                  <Input
                    type='number'
                    label='Limite de alunos'
                    name='student_limit'
                    placeholder='Ex: 10'
                    register={register}
                    autoComplete='off'
                  />
                </HStack>
                <HStack w='100%'>
                  <Input
                    type='text'
                    label='Nome da gincana'
                    name='name'
                    placeholder='Ex: Desafio das maçãs'
                    register={register}
                  />
                  <Input
                    type='text'
                    label='Prêmio'
                    name='award'
                    placeholder='Ex: Uma bicicleta'
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

export default CreateUpdateActivity;
