import styled from 'styled-components';

interface ContainerProps {
  sideBarIsVisible: boolean;
}

export const Container = styled.main<ContainerProps>`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'aside header'
    'aside content';
  grid-template-columns: ${(props) => (props.sideBarIsVisible ? '240px 1fr' : '64px 1fr')};
  grid-template-rows: 64px 1fr;
`;

export const Content = styled.div`
  grid-area: content;

  padding: 1rem;
  background-color: #f1f2f3;
  overflow-x: hidden;
`;
