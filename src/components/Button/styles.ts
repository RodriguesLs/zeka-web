import styled, { css } from 'styled-components';

interface ButtonProps {
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'danger';
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 42px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: var(--primary-color);
  border-radius: 6px;
  border: 0;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  transition: linear 150ms all 0s;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
  }

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

    ${({ variant }) =>
    variant === 'danger' &&
    css`
      background-color: var(--error-color);
      color: #fff;

      &:focus {
        outline: 2px solid var(--error-color);
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
