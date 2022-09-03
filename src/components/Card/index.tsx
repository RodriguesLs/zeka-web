import { CSSProperties, ReactNode } from 'react';
import * as S from './styles';

interface CardProps {
  containerStyle?: CSSProperties;
  children: ReactNode;
  title?: string;
}

const Card = ({ children, containerStyle, title }: CardProps) => {
  return (
    <S.Container style={containerStyle}>
      {title && <h3>{title}</h3>}
      {children}
    </S.Container>
  );
};

export default Card;
