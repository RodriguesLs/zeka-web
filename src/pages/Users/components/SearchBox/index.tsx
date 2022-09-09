import { FiSearch } from 'react-icons/fi';

import * as S from './styles';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <S.Container>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Pesquisar pelo nome...'
      />
      <FiSearch />
    </S.Container>
  );
};

export default SearchBox;
