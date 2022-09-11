import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiPlus } from 'react-icons/fi';

import { LicensesTable } from './components';
import fetchLicenses from './services/fetchLicenses';

import { TableError, TableSkeleton } from '@/components/Table';
import { Button } from '@/components';

import * as S from './styles';

const Licenses = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery(['admin-licenses'], fetchLicenses);

  return (
    <>
      <S.HeaderContainer>
        <div className='groupButtons'>
          <Button
            variant='primary'
            icon={FiPlus}
            onClick={() => navigate('/licencas/nova-licenca')}
          >
            Adquirir nova licença
          </Button>
        </div>
      </S.HeaderContainer>
      {isLoading && <TableSkeleton />}
      {error && <TableError keyCache='admin-users' />}
      {data && <LicensesTable data={data} />}
    </>
  );
};

export default Licenses;
