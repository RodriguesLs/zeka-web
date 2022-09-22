import { FiPlus } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { OrganizationsTable } from './components';
import fetchOrganizations from './services/fetchOrganizations';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';

const Organizations = () => {
  const { data, error, isLoading } = useQuery(['organizations'], fetchOrganizations);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./nova-empresa')}
        >
          Adicionar empresa
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='organizations' />}
      {data && <OrganizationsTable data={data} />}
    </Box>
  );
};

export default Organizations;
