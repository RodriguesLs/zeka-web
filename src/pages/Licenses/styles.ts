import styled from 'styled-components';

export const HeaderContainer = styled.header`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .groupButtons {
    display: flex;
    align-items: center;
    justify-content: end;

    button {
      max-width: 250px;

      & + button {
        margin-left: 1rem;
      }
    }
  }
`;
