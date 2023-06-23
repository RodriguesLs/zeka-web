import { HStack, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Select, Checkbox } from '@/components';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

interface SocialStepFormData {
  social_name: string;
  gender: string;
  range_age: string | number;
  ethnic_group: string;
  deficient: string;
  accessibility: string;
  born_state: string;
  finish_goal: string;
  accept_terms: boolean;
  accept_whatsapp: boolean;
  aditional_resource: string;
  em_goal: string;
}

interface SocialStepProps {
  onNextStep: () => void;
}

const SocialStepFormSchema = yup.object().shape({
  accept_terms: yup.bool().required('Você precisa aceitar os termos'),
});

const SocialStep = ({ onNextStep }: SocialStepProps) => {
  const { handleUpdateSignupFormData, signUpFormData } = useSignUpForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialStepFormData>({
    resolver: yupResolver(SocialStepFormSchema),
    defaultValues: signUpFormData,
  });

  const onSubmit = (formData: SocialStepFormData) => {
    handleUpdateSignupFormData({
      ...formData,
    });
    onNextStep();
  };

  return (
    <VStack as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Nome social'
        name='social_name'
        placeholder='Como você gostaria de ser chamado?'
        error={errors.social_name}
        register={register}
        autoComplete='off'
      />
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Select name='range_age' label='Faixa-etária' register={register} defaultValue='0'>
          <option value='19-29'>19 - 29</option>
          <option value='30-39'>30 - 39</option>
          <option value='40-49'>40 - 49</option>
          <option value='50+'>50+</option>
        </Select>
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Select name='gender' label='Gênero' register={register} defaultValue='0'>
          <option value='1'>Masculino</option>
          <option value='0'>Feminino</option>
        </Select>
        <Select name='race' label='Etnia (autodeclaração)' register={register} defaultValue='0'>
          <option value='0'>Branco</option>
          <option value='1'>Negro</option>
          <option value='2'>Pardo</option>
          <option value='3'>Amarelo</option>
        </Select>
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Select name='deficient' label='Possui alguma deficiência?' register={register} defaultValue='0'>
          <option value='1'>Sim</option>
          <option value='0'>Não</option>
        </Select>
        <Input
          type='text'
          label='Precisa de acessibilidade especial?'
          name='aditional_resource'
          placeholder='Ex: mesa adaptada etc.'
          error={errors.aditional_resource}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Input
          type='text'
          label='Qual seu grande objetivo após a conclusão do ensino médio?'
          name='em_goal'
          placeholder='Ex: entrar na faculdade.'
          error={errors.em_goal}
          register={register}
          autoComplete='off'
        />
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Checkbox name='accept_terms' register={register}>
          Estou de acordo com a utilização destes dados durante o meu período de utilização da
          plataforma Zeka Edu, para envio de informações educacionais e agenda de atividades.
        </Checkbox>
      </HStack>
      <HStack width='100%' gap='1rem' alignItems='baseline'>
        <Checkbox name='whatsapp_agree' register={register}>
          Gostaria de participar da comunidade de alunos Zeka no whatsapp?
        </Checkbox>
      </HStack>
      <Button type='submit' variant='primary' style={{ marginTop: '2rem' }}>
        Avançar
      </Button>
    </VStack>
  );
};

export default SocialStep;
