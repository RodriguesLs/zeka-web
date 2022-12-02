import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { ExceedTable } from './components';
import fetchOperationAreas from './services/fetchOperationAreas';
import insertInBatch from './services/insertInBatch';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/services/queryClient';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';

const ExceedTeachers = () => {
  const { data, error, isLoading } = useQuery(['exceed_teachers'], fetchOperationAreas);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <Button
          variant='primary'
          icon={FiPlus}
          style={{ width: '250px' }}
          onClick={() => navigate('./novo-excedente')}
        >
          Registrar nova divisão
        </Button>
      </HStack>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='exceed_teachers' />}
      {data && <ExceedTable data={data} />}
    </Box>
  );
};

export default ExceedTeachers;
