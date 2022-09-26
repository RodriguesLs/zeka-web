import { useMemo, useState } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IUser, FilterOptions } from '../../types';

import Table from '@/components/Table';
import { formatPhoneNumber } from '@/utils/formats';

interface UsersTableProps {
  data: IUser[];
}

const OrganizationsTable = ({ data }: UsersTableProps) => {
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

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpj',
      },
      {
        Header: 'Telefone',
        accessor: 'phone_number',
        Cell: ({ value }) => (value ? formatPhoneNumber(value) : '-'),
      },
      {
        Header: 'Ação',
        accessor: 'action',
        Cell: ({ row }: any) => (
          <IconButton
            aria-label='editar empresa'
            icon={<FiEdit />}
            bg='none'
            _hover={{ bg: 'none' }}
            onClick={() => navigate(`./edita-empresa/${row.original.id}`)}
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

export default OrganizationsTable;
