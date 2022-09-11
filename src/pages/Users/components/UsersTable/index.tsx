import { useMemo, useState } from 'react';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUser, FilterOptions } from '../../types';

import Table from '@/components/Table';
import { formatCpf, formatPhoneNumber } from '@/utils/formats';

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
    ],
    [],
  );

  return (
    <>
      <FilterUsers typeSelected={selectedTypeUser} onChangeType={setSelectedTypeUser} />
      <SearchBox
        value={nameFiltered}
        onChange={setNameFiltered}
        containerStyle={{ margin: '1rem 0' }}
      />
      <Table data={users} columns={columns} />
    </>
  );
};

export default UsersTable;
