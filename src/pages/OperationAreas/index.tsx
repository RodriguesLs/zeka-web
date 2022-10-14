import { FiPlus } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { OperationAreasTable } from './components';
import fetchOperationAreas from './services/fetchOperationAreas';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';

const OperationAreas = () => {
  const { data, error, isLoading } = useQuery(['operation_areas'], fetchOperationAreas);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./novo-departamento')}
        >
          Novo departamento
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='operation_areas' />}
      {data && <OperationAreasTable data={data} />}
    </Box>
  );
};

export default OperationAreas;
