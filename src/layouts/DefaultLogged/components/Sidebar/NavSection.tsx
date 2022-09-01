import { ReactNode } from 'react';

import { NavSectionContainer } from './styles';

interface NavSectionProps {
  children: ReactNode;
  hideTitle?: boolean;
  title: string;
}

const NavSection = ({ children, hideTitle, title }: NavSectionProps) => {
  return (
    <NavSectionContainer>
      {!hideTitle && <h3>{title}</h3>}
      <div className='content'>{children}</div>
    </NavSectionContainer>
  );
};

export default NavSection;
