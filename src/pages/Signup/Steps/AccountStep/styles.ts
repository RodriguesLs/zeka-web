import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;

  button {
    & + button {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;

    button {
      & + button {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }
`;
