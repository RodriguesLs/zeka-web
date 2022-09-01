import { IconBaseProps } from 'react-icons';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { NavLinkContainer } from './styles';

interface NavLinkProps {
  icon?: React.ComponentType<IconBaseProps>;
  hideTitle?: boolean;
  title: string;
  to: string;
}

const NavLink = ({ to, hideTitle, icon: Icon, title }: NavLinkProps) => {
  return (
    <NavLinkContainer tabIndex={0} hideTitle={hideTitle}>
      <RouterNavLink to={to} className={({ isActive }) => (isActive ? 'navLinkActive' : '')}>
        {Icon && <Icon />}
        {!hideTitle && <span>{title}</span>}
      </RouterNavLink>
    </NavLinkContainer>
  );
};

export default NavLink;
