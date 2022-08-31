import styled, { css } from 'styled-components';

interface ButtonProps {
  isLoading?: boolean;
  variant?: 'default' | 'primary';
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  background-color: transparent;
  color: var(--primary-color);
  border-radius: 6px;
  border: 0;
  font-weight: 700;
  text-transform: uppercase;
  transition: linear 150ms all 0s;

  ${(props) =>
    props.isLoading &&
    css`
      cursor: not-allowed;
    `}

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: var(--primary-color);
      color: #fff;

      &:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    `}

  &:hover {
    filter: brightness(0.9);
  }

  &:focus {
    outline: 2px solid var(--primary-color);
  }
`;
