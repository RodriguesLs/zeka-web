import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type='button' {...rest} isLoading={loading}>
    {loading ? <Spinner /> : children}
  </Container>
);

export default Button;
