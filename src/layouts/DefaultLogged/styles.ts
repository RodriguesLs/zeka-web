import styled from 'styled-components';

interface ContainerProps {
  sideBarIsVisible: boolean;
}

export const Container = styled.main<ContainerProps>`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'aside header header'
    'aside content content'
    'aside content content';
  grid-template-columns: ${(props) => (props.sideBarIsVisible ? '240px auto' : '64px auto')};
  grid-template-rows: 64px auto;
`;

export const Content = styled.div`
  grid-area: content;
  padding: 1rem;
  background-color: #f1f2f3;
`;
