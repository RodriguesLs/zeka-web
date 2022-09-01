import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import Spinner from '../Spinner';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ComponentType<IconBaseProps>;
  loading?: boolean;
  variant?: 'default' | 'primary';
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  loading,
  variant = 'default',
  ...rest
}) => (
  <Container type='button' {...rest} isLoading={loading} variant={variant}>
    {Icon && <Icon />}
    {loading ? <Spinner /> : children}
  </Container>
);

export default Button;
