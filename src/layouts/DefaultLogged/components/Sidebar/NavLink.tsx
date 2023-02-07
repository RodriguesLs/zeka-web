import { IconBaseProps } from 'react-icons';
import { Icon, Text } from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { NavLinkContainer } from './styles';

interface NavLinkProps {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  to: string | any;
  target?: string;
}

const NavLink = ({ to, icon, title, target }: NavLinkProps) => {
  return (
    <NavLinkContainer>
      <RouterNavLink to={to} target={target} className={({ isActive }) => (isActive ? 'navLinkActive' : '')}>
        {Icon && <Icon as={icon} w='24px' h='24px' />}
        <Text as='span' ml='1.25rem'>
          {title}
        </Text>
      </RouterNavLink>
    </NavLinkContainer>
  );
};

export default NavLink;
