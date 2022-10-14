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
import { registerLicense, fetchLicenses, fetchStudents } from './services/apiHandlers';

export interface LicenseFormData {
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

const RegisterLicense = () => {
  const { licenseId } = useParams();
  const isCreateMode = !licenseId;

  const navigate = useNavigate();
  const { addToast } = useToast();

  const [licenses, setLicenses] = useState([]);
  const [students, setStudents] = useState([]);

  const { data: licensesResp }: any = useQuery(['licenses-select'], fetchLicenses);
  const { data: studentsResp }: any = useQuery(['students-select'], fetchStudents);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LicenseFormData>({
    resolver: yupResolver(licenseFormSchema),
  });

  useEffect(() => {
    setLicenses(licensesResp?.data);
    setStudents(studentsResp?.data);
  }, [licenses, students, licensesResp, studentsResp]);

  const { mutateAsync } = useMutation((data: any) => registerLicense(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-licenses']);
    },
  });

  const onSubmit = async (formData: LicenseFormData) => {
    try {
      await mutateAsync(formData);
      addToast({
        title: 'Sucesso!',
        description: `Licença ${isCreateMode ? 'cadastrada' : 'atualizada'} com sucesso!`,
        type: 'success',
      });

      navigate('/licencas');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: `Erro ao ${
          isCreateMode ? 'salvar nova' : 'atualizar'
        }  licença, tente novamente!`,
        type: 'error',
      });
    }
  };

  // if (!isCreateMode && isLoading)
  //   return (
  //     <Box w='100%' pt='10rem' display='grid' placeContent='center'>
  //       <Spinner />
  //     </Box>
  //   );

  // if (error) {
  //   return <Error onClick={() => navigate('../')} />;
  // }

  return (
    <Box as='section' w='100%'>
      <Box as='form' w='100%' maxWidth='700px' onSubmit={handleSubmit(onSubmit)}>
        <VStack gap='1rem'>
          <HStack w='100%'>
            <Select name='license_id' label='Licença' register={register}>
              <option value={null}>Selecione</option>
              {licenses?.map((o: any) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </Select>
            <Select name='student_id' label='Estudante' register={register}>
              <option>Selectione</option>
              {students?.map((o: any) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </Select>
          </HStack>
          <Flex w='100%' mt='2rem' alignItems='center' gap='1rem'>
            <Button type='button' onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type='submit' variant='primary' disabled={isSubmitting}>
              Atribuir licença
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegisterLicense;
