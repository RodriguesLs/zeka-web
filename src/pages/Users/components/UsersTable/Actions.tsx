import { ReactNode, useCallback } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Icon,
  BoxProps,
  PopoverArrow,
} from '@chakra-ui/react';

import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/services/queryClient';

import apiClient from '@/services/apiClient';
import useToast from '@/hooks/useToast';

interface ActionsProps {
  userId: number | string;
}

const Actions = ({ userId }: ActionsProps) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const sendResetPassword = async () => {
    await apiClient.get('users/forgot_password');

    navigate('/usuarios');
  };

  const deleteUser = async () => {
    await apiClient.delete(`students/${userId}`);

    queryClient.invalidateQueries(['users']);

    addToast({
      title: 'Sucesso!',
      description: 'Usuário deletado com sucesso!',
      type: 'success',
    });

    navigate('/');
  };

  const handleNavigateToEditLicense = useCallback(() => {
    navigate(`./edita-usuario/${userId}`);
  }, [userId]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg='none' w='24px' _hover={{ bg: 'none' }} zIndex={0}>
          <Icon as={FiEdit} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w='150px'>
          <PopoverArrow />
          <PopoverBody p='0'>
            <CustomItem borderColor='transparent' onClick={handleNavigateToEditLicense}>
              Editar usuário
            </CustomItem>
            <CustomItem onClick={sendResetPassword}>Resetar senha</CustomItem>
            <CustomItem onClick={deleteUser}>Deletar usuário</CustomItem>
            {/* <CustomItem onClick={handleNavigateToEditLicense}>Editar</CustomItem> */}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

interface CustomItemProps extends BoxProps {
  children: ReactNode;
}

const CustomItem = ({ children, ...rest }: CustomItemProps) => {
  return (
    <Box
      w='100%'
      p='0.5rem 1rem'
      textAlign='left'
      borderTop='1px'
      borderColor='gray.300'
      borderRadius='0'
      cursor='pointer'
      _hover={{
        color: 'brand.500',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Actions;
