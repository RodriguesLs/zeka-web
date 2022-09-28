import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { TeachersTable } from './components';
import fetchTeachers from './services/fetchTeachers';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
  const { data, error, isLoading } = useQuery(['teachers'], fetchTeachers);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./novo-professor')}
        >
          Novo professor
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='teachers' />}
      {data && <TeachersTable data={data} />}
    </Box>
  );
};

export default Teachers;
