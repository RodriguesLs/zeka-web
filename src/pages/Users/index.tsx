import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { UsersTable } from './components';
import fetchUsers from './services/fetchUsers';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';

const Users = () => {
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  const navigate = useNavigate();

  const handleClick = () => {
    document.getElementById('file-csv').click()
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]

    const data = await parseExcelToJSON(file)
    console.log(data);
  }

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
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
