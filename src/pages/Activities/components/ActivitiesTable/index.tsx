import { useMemo, useState } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IActivity, FilterOptions } from '../../types';

import Table from '@/components/Table';

interface ActivityTableProps {
  data: IActivity[];
}

const ActivitiesTable = ({ data }: ActivityTableProps) => {
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const navigate = useNavigate();

  const getUsersFiltered = (users: IActivity[]) => {
    switch (selectedTypeUser) {
      case 'active':
        return users.filter((user) => user.active);
      case 'inactive':
        return users.filter((user) => !user.active);
      default:
        return users;
    }
  };

  const getUsersByName = (users: IActivity[]) => {
    return users.filter((user) => {
      const name = user.description.toLowerCase();

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
        Header: 'Descrição',
        accessor: 'description',
      },
      {
        Header: 'Tipo',
        accessor: 'kind',
      },
      {
        Header: 'Data',
        accessor: 'date',
      },
      {
        Header: 'Responsável',
        accessor: 'teacher',
      },
      {
        Header: 'Ação',
        accessor: 'action',
        Cell: ({ row }: any) => (
          <IconButton
            aria-label='edita atividade'
            icon={<FiEdit />}
            bg='none'
            _hover={{ bg: 'none' }}
            onClick={() => navigate(`./edita-atividade/${row.original.id}`)}
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

export default ActivitiesTable;
