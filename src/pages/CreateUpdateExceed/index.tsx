import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Button, Input } from '@/components';
import useToast from '@/hooks/useToast';
import { queryClient } from '@/services/queryClient';
import { createExceed } from './services/apiHandlers';

const CreateUpdateExceed = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>();

  const { mutateAsync } = useMutation((data: any) => createExceed(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['exceed_teachers']);
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await mutateAsync(formData);
      addToast({
        title: 'Sucesso!',
        description: 'Excedente registrado com sucesso!',
        type: 'success',
      });

      navigate('/excedente');
    } catch (e) {
      addToast({
        title: 'Opssss..',
        description: 'Erro ao criar excedente, tente novamente!',
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
              name='value'
              placeholder='Ex: 568,60'
              register={register}
              autoComplete='off'
              label='Valor:*'
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

export default CreateUpdateExceed;
