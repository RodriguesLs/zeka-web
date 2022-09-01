import { ReactNode } from 'react';

import { NavSectionContainer } from './styles';

interface NavSectionProps {
  children: ReactNode;
  title: string;
}

const NavSection = ({ children, title }: NavSectionProps) => {
  return (
    <NavSectionContainer>
      <h3>{title}</h3>
      <div className='content'>{children}</div>
    </NavSectionContainer>
  );
};

export default NavSection;
