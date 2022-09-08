import { useState } from 'react';
import { FiPlus, FiSearch, FiUpload } from 'react-icons/fi';
import { Button } from '@/components';

import * as S from './styles';

const Users = () => {
  const [selectedTypeUser, setSelectedTypeUser] = useState<'all' | 'active' | 'inactive'>('all');

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
        <FilterUserType
          selectedTypeUser={selectedTypeUser}
          setSelectedTypeUser={setSelectedTypeUser}
        />
        <SearchBox />
      </S.HeaderContainer>
      <UsersTable />
    </>
  );
};

interface FilterUserTypeProps {
  selectedTypeUser: 'all' | 'active' | 'inactive';
  setSelectedTypeUser: (typeUser: 'all' | 'active' | 'inactive') => void;
}

const FilterUserType = ({ selectedTypeUser, setSelectedTypeUser }: FilterUserTypeProps) => {
  return (
    <S.FilterUserTypeContainer>
      <S.FilterUserTypeItem
        isActive={selectedTypeUser === 'all'}
        onClick={() => setSelectedTypeUser('all')}
      >
        Todos
      </S.FilterUserTypeItem>
      <S.FilterUserTypeItem
        isActive={selectedTypeUser === 'active'}
        onClick={() => setSelectedTypeUser('active')}
      >
        Ativos
      </S.FilterUserTypeItem>
      <S.FilterUserTypeItem
        isActive={selectedTypeUser === 'inactive'}
        onClick={() => setSelectedTypeUser('inactive')}
      >
        Inativos
      </S.FilterUserTypeItem>
    </S.FilterUserTypeContainer>
  );
};

const SearchBox = () => {
  return (
    <S.SearchBoxContainer>
      <input type='text' placeholder='Pesquisar pelo nome...' />
      <FiSearch />
    </S.SearchBoxContainer>
  );
};

const UsersTable = () => {
  return (
    <S.TableContainer>
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
        <tr>
          <td>Vitor Hugo</td>
          <td>10101010</td>
          <td>000.000.000-00</td>
          <td>Masculino</td>
          <td>vitorfrota.dev@gmail.com</td>
          <td>(99)99999-9999</td>
        </tr>
      </tbody>
    </S.TableContainer>
  );
};

export default Users;
