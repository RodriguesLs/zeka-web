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

    a {
      margin: 1rem 0;
      text-align: end;
      font-size: 0.875rem;
    }
  }

  .signupNow {
    text-align: center;
    margin-top: 2rem;
  }

  span {
    justify-self: end;
    width: 50%;
    font-size: 1.875rem;
    text-align: justify;
    line-height: 1.75rem;
    color: var(--primary-color);

    strong {
      color: var(--secondary-color);
    }
  }

  @media (max-width: 720px) {
    span {
      width: 100%;
      font-size: 1.15rem;
      text-align: center;
    }
  }
`;
