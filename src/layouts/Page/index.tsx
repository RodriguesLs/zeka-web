import { ReactNode } from 'react';

import * as S from './styles';

interface PageProps {
  children: ReactNode;
  title: string;
}

const Page = ({ children, title }: PageProps) => {
  return (
    <S.Container>
      <h1>{title}</h1>
      {children}
    </S.Container>
  );
};

export default Page;
