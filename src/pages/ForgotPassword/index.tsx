import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, VStack } from '@chakra-ui/react';
import useQuery from '@/hooks/useQuery';
import { Button } from '@/components';

import logoImg from '@/assets/img/logo.svg';
import { ForgotPasswordForm, NewPasswordForm } from './forms';

const ForgotPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    if (query.get('token')) {
      setHasToken(true);
    }
  }, []);

  return (
    <VStack as='section' h='100%' placeContent='center'>
      <Image src={logoImg} maxW='200px' mb='5rem' alt='logo zeka educação digital' />
      {hasToken ? <NewPasswordForm /> : <ForgotPasswordForm />}
      <Button onClick={() => navigate('/')}>Voltar para login</Button>
    </VStack>
  );
};

export default ForgotPassword;
