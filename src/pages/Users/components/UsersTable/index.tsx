import { useMemo, useState } from 'react';
import { Button, IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUser, FilterOptions } from '../../types';

import Table from '@/components/Table';
import { formatCpf, formatPhoneNumber } from '@/utils/formats';
import Actions from './Actions';

interface UsersTableProps {
  data: IUser[];
}

const UsersTable = ({ data }: UsersTableProps) => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const getUsersFiltered = (users: IUser[]) => {
    switch (selectedTypeUser) {
      case 'active':
        return users.filter((user) => user.active);
      case 'inactive':
        return users.filter((user) => !user.active);
      default:
        return users;
    }
  };

  const getUsersByName = (users: IUser[]) => {
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
        Header: 'Matrícula',
        accessor: 'code',
      },
      {
        Header: 'CPF',
        accessor: 'cpf',
        Cell: ({ value }) => formatCpf(value),
      },
      {
        Header: 'Gênero',
        accessor: 'gender',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: 'phone',
        Cell: ({ value }) => formatPhoneNumber(value),
      },
      {
        Header: 'Ação',
        accessor: 'action',
        Cell: ({ row }: any) => (<Actions userId={row.original.id} />),
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

export default UsersTable;
