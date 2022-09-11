import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import Spinner from '../Spinner';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ComponentType<IconBaseProps>;
  loading?: boolean;
  variant?: 'default' | 'primary' | 'danger';
  ref?: any;
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  loading,
  ref,
  variant = 'default',
  ...rest
}) => (
  <Container ref={ref} type='button' {...rest} isLoading={loading} variant={variant}>
    {Icon && <Icon />}
    {loading ? <Spinner size='sm' /> : children}
  </Container>
);

export default Button;
