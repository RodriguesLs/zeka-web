import styled from 'styled-components';

export const Container = styled.header`
  grid-area: header;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 1rem;

  background-color: #f1f2f3;
  border-bottom: 1px solid var(--gray-300);

  .listOptions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`;
