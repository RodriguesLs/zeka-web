import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { UsersTable } from './components';
import fetchUsersZeka from './services/fetchUsersZeka';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { data, error, isLoading } = useQuery(['admin-users'], fetchUsersZeka);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./novo-usuario-zeka')}
        >
          Adicionar usuário zeka
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='admin-users' />}
      {data && <UsersTable data={data} />}
    </Box>
  );
};

export default Users;
