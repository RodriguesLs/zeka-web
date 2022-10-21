import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack } from '@chakra-ui/react';

import { OperationAreasTable } from './components';
import fetchOperationAreas from './services/fetchOperationAreas';
import insertInBatch from './services/insertInBatch';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/services/queryClient';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';

const OperationAreas = () => {
  const { data, error, isLoading } = useQuery(['operation_areas'], fetchOperationAreas);

  const navigate = useNavigate();

  const handleClick = () => {
    document.getElementById('file-csv').click()
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]
    const data: any = await parseExcelToJSON(file);

    await insertInBatch(data);

    queryClient.invalidateQueries(['operation_areas'])
  }

  const styledLink: any = {
    backgroundColor: '#31aeb9',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  }

  return (
    <Box width='100%'>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        <a href='departments.csv' style={styledLink} download='departamentos-exemplo.csv'>
          Download planilha de exemplo
        </a>
        <input type="file" id="file-csv" onChange={handleChange} style={{display: 'none'}}/> 
        <Button variant='primary' onClick={handleClick} icon={FiUpload} style={{ width: '300px' }}>
          Importar Departamentos
        </Button>
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
