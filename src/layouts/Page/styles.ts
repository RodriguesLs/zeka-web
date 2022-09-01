import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  > h1 {
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-size: 1.5rem;
  }
`;
