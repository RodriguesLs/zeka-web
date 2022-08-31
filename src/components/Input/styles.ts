import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.25rem;
    color: var(--text-complementary-color);
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;

  padding: 1rem;

  display: flex;
  align-items: center;
  color: var(--text-color);
  border: 2px solid var(--border-color);
  border-radius: 6px;

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
