import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiPlus } from 'react-icons/fi';

import { FilterLicense, LicensesTable } from './components';
import fetchLicenses from './services/fetchLicenses';
import { FilterOptions } from './types';

import { Button } from '@/components';

import * as S from './styles';

const Licenses = () => {
  const navigate = useNavigate();

  const [selectedTypeLicense, setSelectedTypeLicense] = useState<FilterOptions>('all');

  const { data } = useQuery(['admin-licenses'], fetchLicenses);

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
        <FilterLicense typeSelected={selectedTypeLicense} onChangeType={setSelectedTypeLicense} />
      </S.HeaderContainer>
      {data && <LicensesTable data={data} filterSelected={selectedTypeLicense} />}
    </>
  );
};

export default Licenses;
