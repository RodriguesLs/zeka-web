import { FilterOptions } from '../../types';

import * as S from './styles';

interface FilterLicenseProps {
  typeSelected: FilterOptions;
  onChangeType: (typeLicense: FilterOptions) => void;
}

const FilterLicense = ({ typeSelected, onChangeType }: FilterLicenseProps) => {
  return (
    <S.Container>
      <S.Item isActive={typeSelected === 'all'} onClick={() => onChangeType('all')}>
        Todas
      </S.Item>
      <S.Item isActive={typeSelected === 'active'} onClick={() => onChangeType('active')}>
        Ativas
      </S.Item>
      <S.Item isActive={typeSelected === 'inactive'} onClick={() => onChangeType('inactive')}>
        Inativas
      </S.Item>
    </S.Container>
  );
};

export default FilterLicense;
