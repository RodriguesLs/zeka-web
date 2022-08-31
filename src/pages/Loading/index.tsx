import Spinner from '@/components/Spinner';

import * as S from './styles';

const Loading = () => {
  return (
    <S.Container>
      <Spinner containerStyle={{ width: '48px', height: '48px' }} />
    </S.Container>
  );
};

export default Loading;
