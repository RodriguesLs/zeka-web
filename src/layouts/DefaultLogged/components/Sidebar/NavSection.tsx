import { ReactNode } from 'react';

import { NavSectionContainer } from './styles';

interface NavSectionProps {
  children: ReactNode;
  isMinimized?: boolean;
  title: string;
}

const NavSection = ({ children, isMinimized, title }: NavSectionProps) => {
  return (
    <NavSectionContainer>
      {!isMinimized && <h3>{title}</h3>}
      <div className='content'>{children}</div>
    </NavSectionContainer>
  );
};

export default NavSection;
