import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VStack, Box, HStack } from '@chakra-ui/react';
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
      <HStack w='100%' flexDirection='row-reverse'>
        <Button
          variant='primary'
          icon={FiPlus}
          onClick={() => navigate('/licencas/nova-licenca')}
          style={{ width: '250px' }}
        >
          Nova licença
        </Button>
        <Button
          variant='primary'
          icon={FiPlus}
          onClick={() => navigate('/licencas/atribuir-licenca')}
          style={{ width: '300px', marginRight: '1em' }}
        >
          Atribuir licença a usuário
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='admin-licenses' />}
      {data && <LicensesTable data={data} />}
    </Box>
  );
};

export default Licenses;
