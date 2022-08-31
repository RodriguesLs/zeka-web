import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 200px;
  }

  a {
    color: var(--primary-color);
  }

  form {
    width: 100%;
    max-width: 450px;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    p {
      margin-bottom: 1rem;
      color: var(--text-complementary-color);
    }

    button {
      margin-top: 1rem;
    }
  }

  .backLogin {
    margin-top: 2rem;
    background: transparent;
    border: 0;
    color: var(--primary-color);
    font-size: 1.125rem;

    transition: all 200ms linear;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
