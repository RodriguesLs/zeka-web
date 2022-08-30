import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 6px;
  border: 2px solid var(--border-color);
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--text-color);

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--error-color);
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: var(--primary-color);
      border-color: var(--primary-color);
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: var(--primary-color);
    `}
  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: var(--text-color);
    &::placeholder {
      color: var(--text-complementary-color);
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: var(--error-color);
  margin-top: 0.25rem;
`;
