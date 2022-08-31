import { useNavigate } from 'react-router-dom';
import notFoundImg from '@/assets/img/404.svg';
import { Button } from '@/components';

import * as S from './styles';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <img src={notFoundImg} alt='not found' />
      <h1>Página não encontrada! :(</h1>
      <p>A página que você tentou acessar não existe ou foi temporariamente removida.</p>
      <Button type='button' onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
        Voltar para a página anterior
      </Button>
    </S.Container>
  );
};

export default NotFound;
