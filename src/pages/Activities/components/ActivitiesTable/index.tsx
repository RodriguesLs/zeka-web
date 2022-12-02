import { useMemo, useState } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import useAuth from '@/hooks/useAuth';
import FilterUsers from '../FilterUsers';
import SearchBox from '../SearchBox';
import { IActivity, FilterOptions } from '../../types';

import Table from '@/components/Table';

interface ActivityTableProps {
  data: IActivity[];
}

const KINDS = {
  'simulate': 'Simulado',
  'live': 'Live',
  'challenge': 'Gincana',
  'writting_core': 'Escrever conteúdo (core)',
  'writting': 'Escrever conteúdo para sala de aula',
  'blog': 'Escrever conteúdo para blog',
  'essay_correction': 'Corrigir redação',
  'teacher_trainer': 'Formação de professores',
  'group_orientation': 'Orientação de grupo'
}

const ActivitiesTable = ({ data }: ActivityTableProps) => {
  const { role } = useAuth(); 
  const [nameFiltered, setNameFiltered] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState<FilterOptions>('all');

  const navigate = useNavigate();

  const getUsersFiltered = (users: IActivity[]) => {
    const acts = users.map((a: any) => ({ ...a, kind: KINDS[a.kind] }));

    switch (selectedTypeUser) {
      case 'active':
        return acts.filter((activity) => activity.active);
      case 'inactive':
        return acts.filter((activity) => !activity.active);
      default:
        return acts;
    }
  };

  const getUsersByName = (users: IActivity[]) => {
    return users.filter((user) => {
      const name = user.description.toLowerCase();

      return name.includes(nameFiltered.toLowerCase()) && user;
    });
  };

  const activities = useMemo(() => {
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

  const columnsWithoutAction = useMemo(
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
    ],
    [],
  );

  return (
    <VStack width='100%' gap='1rem' alignItems='start'>
      <FilterUsers typeSelected={selectedTypeUser} onChangeType={setSelectedTypeUser} />
      <SearchBox value={nameFiltered} onChange={setNameFiltered} />
      <Table data={activities} columns={role === 'teacher' ? columnsWithoutAction : columns} />
    </VStack>
  );
};

export default ActivitiesTable;
