import { useCallback, useMemo, useState } from 'react';
import { Badge, VStack } from '@chakra-ui/react';

import { FiEdit } from 'react-icons/fi';

import FilterLicense from '../FilterLicense';
import { ILicense, FilterOptions } from '../../types';

import { Table } from '@/components';
import { formatDate } from '@/utils/formats';

interface LicenseTableProps {
  data: ILicense[];
}

const LicensesTable = ({ data }: LicenseTableProps) => {
  const [selectedTypeLicense, setSelectedTypeLicense] = useState<FilterOptions>('all');

  const getLicensesFiltered = useCallback(
    (licenses: ILicense[]) => {
      switch (selectedTypeLicense) {
        case 'active':
          return licenses.filter((license) => license.status);
        case 'inactive':
          return licenses.filter((license) => !license.status);
        default:
          return licenses;
      }
    },
    [data, selectedTypeLicense],
  );

  const licenses = useMemo(() => {
    const licensesFilteredByStatus = getLicensesFiltered(data);

    return licensesFilteredByStatus;
  }, [data, getLicensesFiltered]);

  const columns = useMemo(
    () => [
      {
        Header: 'Descrição',
        accessor: 'name',
      },
      {
        Header: 'Data expiração',
        accessor: 'expiration_date',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Total de uso',
        accessor: 'total_uses',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value: isActive }: any) => (
          <Badge colorScheme={isActive ? 'green' : 'red'} borderRadius={15} px={2}>
            {isActive ? 'Ativa' : 'Inativa'}
          </Badge>
        ),
      },
      {
        Header: 'Ação',
        accessor: 'actions',
        Cell: () => (
          <button>
            <FiEdit />
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <VStack w='100%' gap='1rem'>
      <FilterLicense typeSelected={selectedTypeLicense} onChangeType={setSelectedTypeLicense} />
      <Table data={licenses} columns={columns} />
    </VStack>
  );
};

export default LicensesTable;
