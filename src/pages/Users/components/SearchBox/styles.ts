import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;

  display: flex;
  align-items: center;

  border: 1px solid var(--gray-300);
  border-radius: 6px;

  input {
    flex: 1;
    width: 100%;
    background: none;
    border: none;
  }

  svg {
    width: 18px;
    height: 18px;

    color: var(--text-color);
  }
`;
