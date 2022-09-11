import { FiPlus, FiUpload } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';

import { UsersTable } from './components';
import fetchUsers from './services/fetchLicenses';

import { Button } from '@/components';
import { TableError, TableSkeleton } from '@/components/Table';

import * as S from './styles';

const Users = () => {
  const { data, error, isLoading } = useQuery(['admin-users'], fetchUsers);

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
      </S.HeaderContainer>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='admin-users' />}
      {data && <UsersTable data={data} />}
    </>
  );
};

export default Users;
