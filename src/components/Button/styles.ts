import styled, { css } from 'styled-components';

interface ButtonProps {
  isLoading?: boolean;
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  background-color: var(--primary-color);
  color: #fff;
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

  &:hover {
    filter: brightness(0.9);
  }
`;
