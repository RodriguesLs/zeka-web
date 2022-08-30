import * as S from './styles';

interface SpinnerProps {
  containerStyle?: any;
}

const Spinner = ({ containerStyle }: SpinnerProps) => {
  return (
    <S.Wrapper>
      <S.Container style={containerStyle} />
    </S.Wrapper>
  );
};

export default Spinner;
