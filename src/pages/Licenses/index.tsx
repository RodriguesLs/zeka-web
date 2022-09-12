import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VStack, Box } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { LicensesTable } from './components';
import fetchLicenses from './services/fetchLicenses';

import { TableError, TableSkeleton } from '@/components/Table';
import { Button } from '@/components';

const Licenses = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery(['admin-licenses'], fetchLicenses);

  return (
    <Box w='100%'>
      <VStack mb='1rem' gap='1.5rem' alignItems='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          onClick={() => navigate('/licencas/nova-licenca')}
          style={{ width: '250px' }}
        >
          Adquirir nova licença
        </Button>
      </VStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='admin-licenses' />}
      {data && <LicensesTable data={data} />}
    </Box>
  );
};

export default Licenses;
