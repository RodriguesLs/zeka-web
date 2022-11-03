import { useMemo, useState } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUserZeka, FilterOptions } from '../../types';

import Table from '@/components/Table';

interface UsersZekaTableProps {
  data: IUserZeka[];
}

const TeachersTable = ({ data }: UsersZekaTableProps) => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const navigate = useNavigate();

  const getUsersFiltered = (users: IUserZeka[]) => {
    switch (selectedTypeUser) {
      case 'active':
        return users.filter((user) => user.active);
      case 'inactive':
        return users.filter((user) => !user.active);
      default:
        return users;
    }
  };

  const getUsersByName = (users: IUserZeka[]) => {
    return users.filter((user) => {
      const name = user.name.toLowerCase();

      return name.includes(nameFiltered.toLowerCase()) && user;
    });
  };

  const users = useMemo(() => {
    const usersFilteredByStatus = getUsersFiltered(data);

    if (nameFiltered !== '') return getUsersByName(data);

    return usersFilteredByStatus;
  }, [data, selectedTypeUser, nameFiltered]);

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Matérias',
        accessor: 'discipline',
      },
      {
        Header: 'Nível',
        accessor: 'level',
      },
      {
        Header: 'Telefone',
        accessor: 'cellphone',
      },
      {
        Header: 'Ação',
        accessor: 'action',
        Cell: ({ row }: any) => (
          <IconButton
            aria-label='edita professsor'
            icon={<FiEdit />}
            bg='none'
            _hover={{ bg: 'none' }}
            onClick={() => navigate(`./edita-professor/${row.original.id}`)}
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
      <Table data={users} columns={columns} />
    </VStack>
  );
};

export default TeachersTable;
