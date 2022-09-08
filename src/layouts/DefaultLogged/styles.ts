import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'aside header'
    'aside content';
  grid-template-columns: auto 1fr;
  grid-template-rows: 64px 1fr;

  background-color: #f1f2f3;
`;

export const Content = styled.div`
  grid-area: content;

  padding: 1.5rem;
  background-color: #f1f2f3;

  h1 {
    margin-bottom: 1rem;
    color: var(--text-color);
    font-size: 1.5rem;
  }
`;
