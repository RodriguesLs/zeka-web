import { useState } from 'react';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { Button } from '@/components';

import * as S from './styles';

type OptionsFilter = 'all' | 'active' | 'inactive';

const Licenses = () => {
  const [selectedTypeLicense, setSelectedTypeLicense] = useState<OptionsFilter>('all');

  return (
    <>
      <S.HeaderContainer>
        <div className='groupButtons'>
          <Button variant='primary' icon={FiPlus}>
            Adquirir nova licença
          </Button>
        </div>
        <FilterLicenseType
          selectedTypeLicense={selectedTypeLicense}
          setSelectedTypeLicense={setSelectedTypeLicense}
        />
      </S.HeaderContainer>
      <LicensesTable />
    </>
  );
};

interface FilterLicenseTypeProps {
  selectedTypeLicense: OptionsFilter;
  setSelectedTypeLicense: (typeLicense: OptionsFilter) => void;
}

const FilterLicenseType = ({
  selectedTypeLicense,
  setSelectedTypeLicense,
}: FilterLicenseTypeProps) => {
  return (
    <S.FilterLicenseTypeContainer>
      <S.FilterLicenseTypeItem
        isActive={selectedTypeLicense === 'all'}
        onClick={() => setSelectedTypeLicense('all')}
      >
        Todas
      </S.FilterLicenseTypeItem>
      <S.FilterLicenseTypeItem
        isActive={selectedTypeLicense === 'active'}
        onClick={() => setSelectedTypeLicense('active')}
      >
        Ativas
      </S.FilterLicenseTypeItem>
      <S.FilterLicenseTypeItem
        isActive={selectedTypeLicense === 'inactive'}
        onClick={() => setSelectedTypeLicense('inactive')}
      >
        Inativas
      </S.FilterLicenseTypeItem>
    </S.FilterLicenseTypeContainer>
  );
};

const LicensesTable = () => {
  return (
    <S.TableContainer>
      <thead>
        <tr>
          <th>Item</th>
          <th>Usuário</th>
          <th>Data compra</th>
          <th>Data renovação</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lic. Módulo 1</td>
          <td>John Doe</td>
          <td>01/01/2022</td>
          <td>01/01/2023</td>
          <td>Ativo</td>
          <td>
            <button type='button'>
              <FiEdit />
            </button>
          </td>
        </tr>
      </tbody>
    </S.TableContainer>
  );
};

export default Licenses;
