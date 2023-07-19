import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack, Spinner } from '@chakra-ui/react';

import { UsersTable } from './components';
import fetchUsers, { insertInBatch } from './services/fetchUsers';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';
import { queryClient } from '@/services/queryClient';
import useAuth from '@/hooks/useAuth';

const Users = () => {
  let loading: boolean;
  const { role, organizationId } = useAuth();
  const { data, error, isLoading } = useQuery(['users'], () => fetchUsers(role, organizationId));
  const navigate = useNavigate();

  const handleClick = () => document.getElementById('file-csv').click();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const data: any = await parseExcelToJSON(file);

    loading = true;
    await insertInBatch(data);
    loading = false;

    queryClient.invalidateQueries(['users']);
  };

  const styledLink: any = {
    backgroundColor: '#31aeb9',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  };

  if (loading) {
    return (
      <Box w='100%' pt='10rem' display='grid' placeContent='center'>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <a href='users.csv' style={styledLink} download='usuarios-exemplo.csv'>
          Download planilha de exemplo
        </a>
        <input type="file" id="file-csv" onChange={handleChange} style={{display: 'none'}}/> 
        <Button variant='primary' onClick={handleClick} icon={FiUpload} style={{ width: '250px' }}>
          Importar usuários
        </Button>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./novo-usuario')}
        >
          Adicionar usuário
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='users' />}
      {data && <UsersTable data={data} />}
    </Box>
  );
};

export default Users;
