import { useState } from 'react';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';

import { FilterUsers, SearchBox, UsersTable } from './components';
import fetchUsers from './services/fetchLicenses';
import { FilterOptions } from './types';

import { Button } from '@/components';

import * as S from './styles';

const Users = () => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const { data, isLoading } = useQuery(['admin-users'], fetchUsers);

  return (
    <>
      <S.HeaderContainer>
        <div className='groupButtons'>
          <Button variant='primary' icon={FiUpload}>
            Importar usuários
          </Button>
          <Button variant='primary' icon={FiPlus}>
            Adicionar usuário
          </Button>
        </div>
        <FilterUsers typeSelected={selectedTypeUser} onChangeType={setSelectedTypeUser} />
        <SearchBox value={nameFiltered} onChange={setNameFiltered} />
      </S.HeaderContainer>
      {!isLoading && data && (
        <UsersTable data={data} filterSelected={selectedTypeUser} nameTyped={nameFiltered} />
      )}
    </>
  );
};

export default Users;
