import { Stack, Skeleton, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useTable } from 'react-table';

import Button from '../Button';

import NoFetchImg from '@/assets/img/noFetchTable.svg';
import { queryClient } from '@/services/queryClient';

import * as S from './styles';

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
    <S.Wrapper>
      <S.TableContainer {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id} onClick={rowFn}>
                {row.cells.map((cell, idx) => {
                  return (
                    <Td {...cell.getCellProps()} key={idx}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </S.TableContainer>
    </S.Wrapper>
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
    <S.TableErrorContainer>
      <div>
        <img src={NoFetchImg} alt='no data' />
        <h3>{title}</h3>
        <p>{description}</p>
        {keyCache !== '' && (
          <Button onClick={handleRetryRefetch} style={{ marginTop: '1rem' }}>
            Tentar novamente
          </Button>
        )}
      </div>
    </S.TableErrorContainer>
  );
};

export default Table;
