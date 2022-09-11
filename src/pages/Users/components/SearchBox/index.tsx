import { FiSearch } from 'react-icons/fi';
import { CSSProperties } from 'styled-components';

import * as S from './styles';

interface SearchBoxProps {
  containerStyle?: CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange, containerStyle = {} }: SearchBoxProps) => {
  return (
    <S.Container style={containerStyle}>
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
