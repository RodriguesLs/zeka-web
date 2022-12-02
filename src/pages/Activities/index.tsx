import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { ActivitiesTable } from './components';
import fetchActivities from './services/fetchActivities';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';

const Activities = () => {
  const { role } = useAuth();
  const { data, error, isLoading } = useQuery(['activities'], fetchActivities);

  const navigate = useNavigate();

  return (
    <Box width='100%'>
      {
        (role !== 'teacher') &&
        <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
          <Button
            variant='primary'
            icon={FiPlus}
            style={{ width: '250px' }}
            onClick={() => navigate('./nova-atividade')}
          >
            Nova atividade
          </Button>
        </HStack>
      }
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='teachers' />}
      {data && <ActivitiesTable data={data} />}
    </Box>
  );
};

export default Activities;
