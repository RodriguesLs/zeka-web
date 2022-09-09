import { useMemo } from 'react';

import { IUser, FilterOptions } from '../../types';

import * as S from './styles';

interface UsersTableProps {
  data: IUser[];
  filterSelected: FilterOptions;
  nameTyped: string;
}

const UsersTable = ({ data, filterSelected, nameTyped }: UsersTableProps) => {
  const getUsersFiltered = (users: IUser[]) => {
    switch (filterSelected) {
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

      return name.includes(nameTyped.toLowerCase()) && user;
    });
  };

  const users = useMemo(() => {
    const usersFilteredByStatus = getUsersFiltered(data);

    if (nameTyped) return getUsersByName(data);

    return usersFilteredByStatus;
  }, [data, filterSelected, nameTyped]);

  return (
    <S.Container>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>CPF</th>
          <th>Gênero</th>
          <th>E-mail</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: IUser) => (
          <UsersRow key={user.id} user={user} />
        ))}
      </tbody>
    </S.Container>
  );
};

interface UsersRowProps {
  user: IUser;
}

const UsersRow = ({ user }: UsersRowProps) => {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.code}</td>
      <td>{user.cpf}</td>
      <td>{user.gender}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  );
};

export default UsersTable;
