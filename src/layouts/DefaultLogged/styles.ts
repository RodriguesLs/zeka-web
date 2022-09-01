import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'aside header header'
    'aside content content'
    'aside content content';
  grid-template-columns: 240px auto;
  grid-template-rows: 64px auto;
`;

export const Content = styled.div`
  grid-area: content;
  padding: 2rem;
  background-color: #f1f2f3;
`;
