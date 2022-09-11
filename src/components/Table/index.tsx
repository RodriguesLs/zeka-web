import {
  Box,
  Stack,
  Skeleton,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Image,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useTable } from 'react-table';

import Button from '../Button';

import NoFetchImg from '@/assets/img/noFetchTable.svg';
import { queryClient } from '@/services/queryClient';

interface TableProps {
  columns: any[];
  data: any;
  rowFn?: () => void;
}

const Table = ({ columns, data, rowFn }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Box w='100%' h={[null, null, null, '400px', '400px', '700px']} overflowY='auto'>
      <ChakraTable {...getTableProps()}>
        <Thead position='sticky' top='0' bg='#f1f2f3'>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  key={column.id}
                  p='1rem'
                  textAlign='center'
                  color='gray.900'
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody bg='background.white' {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={row.id}
                onClick={rowFn}
                _hover={{
                  bg: 'gray.300',
                }}
              >
                {row.cells.map((cell, idx) => {
                  return (
                    <Td {...cell.getCellProps()} key={idx} p='1rem' textAlign='center'>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export const TableSkeleton = () => {
  return (
    <Stack>
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
    </Stack>
  );
};

interface TableErrorProps {
  title?: string;
  description?: string;
  keyCache?: string; // to refetch react query
}

export const TableError = ({
  title = 'Oooops!',
  description = 'Ocorreu um erro, tente novamente...',
  keyCache = '',
}: TableErrorProps) => {
  const handleRetryRefetch = () => {
    queryClient.invalidateQueries([keyCache]);
  };

  return (
    <VStack w='100%' h='500px' p='3rem'>
      <Image src={NoFetchImg} w='180px' h='180px' mb='2rem' alt='no data' />
      <Heading as='h3' fontSize='1.5rem'>
        {title}
      </Heading>
      <Text color='gray.500'>{description}</Text>
      {keyCache !== '' && (
        <Button onClick={handleRetryRefetch} style={{ marginTop: '1rem' }}>
          Tentar novamente
        </Button>
      )}
    </VStack>
  );
};

export default Table;
