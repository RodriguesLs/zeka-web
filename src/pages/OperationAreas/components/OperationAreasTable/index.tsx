import { useMemo, useState } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUser, FilterOptions } from '../../types';

import Table from '@/components/Table';
import { RiDeleteBin4Line } from 'react-icons/ri';
import apiClient from '@/services/apiClient';
import { queryClient } from '@/services/queryClient';

interface UsersTableProps {
  data: IUser[];
}

const OperationAreasTable = ({ data }: UsersTableProps) => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const navigate = useNavigate();

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

  const getUsersByName = (organizations: IUser[]) => {
    return organizations.filter((organization) => {
      const name = organization.name.toLowerCase();

      return name.includes(nameFiltered.toLowerCase()) && organization;
    });
  };

  const organizations = useMemo(() => {
    const usersFilteredByStatus = getUsersFiltered(data);

    if (nameFiltered !== '') return getUsersByName(data);

    return usersFilteredByStatus;
  }, [data, selectedTypeUser, nameFiltered]);

  const onClickDelete = async (id: any) => {
    const response = await apiClient.delete(`operation_areas/${id}`);

    queryClient.invalidateQueries(['operation_areas']);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Departamento',
        accessor: 'description',
      },
      {
        Header: 'Ação',
        accessor: 'action',
        Cell: ({ row }: any) => (
          <IconButton
            aria-label='remover departamento'
            icon={<RiDeleteBin4Line />}
            bg='none'
            _hover={{ bg: 'none' }}
            onClick={() => onClickDelete(row.original.id)}
          />
        ),
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

export default OperationAreasTable;
