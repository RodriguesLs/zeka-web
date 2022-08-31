import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  div {
    & + div {
      margin-left: 0.5rem;
    }
  }

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;

    div {
      & + div {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }
`;
