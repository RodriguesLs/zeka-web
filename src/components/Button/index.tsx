import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'default' | 'primary';
};

const Button: React.FC<ButtonProps> = ({ children, loading, variant = 'default', ...rest }) => (
  <Container type='button' {...rest} isLoading={loading} variant={variant}>
    {loading ? <Spinner /> : children}
  </Container>
);

export default Button;
