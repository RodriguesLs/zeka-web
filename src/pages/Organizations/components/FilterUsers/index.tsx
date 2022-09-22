import { FilterOptions } from '../../types';

import * as S from './styles';

interface FilterUsersProps {
  typeSelected: FilterOptions;
  onChangeType: (typeLicense: FilterOptions) => void;
}

const FilterUsers = ({ typeSelected, onChangeType }: FilterUsersProps) => {
  return (
    <S.Container>
      <S.Item isActive={typeSelected === 'all'} onClick={() => onChangeType('all')}>
        Todos
      </S.Item>
      <S.Item isActive={typeSelected === 'active'} onClick={() => onChangeType('active')}>
        Ativos
      </S.Item>
      <S.Item isActive={typeSelected === 'inactive'} onClick={() => onChangeType('inactive')}>
        Inativos
      </S.Item>
    </S.Container>
  );
};

export default FilterUsers;
