import { useMemo, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUser, FilterOptions } from '../../types';
import Table from '@/components/Table';

const ExceedTable = ({ data }: any) => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const getUsersFiltered = (organizations: IUser[]) => {
    switch (selectedTypeUser) {
      case 'active':
        return organizations.filter((organization) => organization.active);
      case 'inactive':
        return organizations.filter((organization) => !organization.active);
      default:
        return organizations;
    }
  };

  const getUsersByName = (exceeds: any[]) => {
    return exceeds.filter(exceed => {
      const name = exceed.created_by.toLowerCase();

      return name.includes(nameFiltered.toLowerCase()) && exceed;
    });
  };

  const organizations = useMemo(() => {
    const usersFilteredByStatus = getUsersFiltered(data);

    if (nameFiltered !== '') return getUsersByName(data);

    return usersFilteredByStatus;
  }, [data, selectedTypeUser, nameFiltered]);

  const columns = useMemo(
    () => [
      {
        Header: 'Registrado em',
        accessor: 'created_at',
      },
      {
        Header: 'Criado por',
        accessor: 'created_by',
      },
      {
        Header: 'Valor (R$)',
        accessor: 'value',
      },
    ],
    [],
  );

  return (
    <VStack width='100%' gap='1rem' alignItems='start'>
      <FilterUsers typeSelected={selectedTypeUser} onChangeType={setSelectedTypeUser} />
      <SearchBox value={nameFiltered} onChange={setNameFiltered} />
      <Table data={organizations} columns={columns} />
    </VStack>
  );
};

export default ExceedTable;
