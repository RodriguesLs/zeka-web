import { IconBaseProps } from 'react-icons';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { NavLinkContainer } from './styles';

interface NavLinkProps {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  to: string;
}

const NavLink = ({ to, icon: Icon, title }: NavLinkProps) => {
  return (
    <NavLinkContainer tabIndex={0}>
      <RouterNavLink to={to} className={({ isActive }) => (isActive ? 'navLinkActive' : '')}>
        {Icon && <Icon />}
        <span>{title}</span>
      </RouterNavLink>
    </NavLinkContainer>
  );
};

export default NavLink;
