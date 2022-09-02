import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 200px;
    margin-bottom: 2.5rem;
  }

  a {
    color: var(--primary-color);

    &:focus {
      text-decoration: underline;
    }
  }

  form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;

    .forgotPassword {
      margin: 1rem 0;
      text-align: end;
      font-size: 0.875rem;
    }
  }

  .signupNow {
    text-align: center;
    margin-top: 2rem;
  }

  .footerText {
    width: 50%;
    font-size: 1.25rem;
    text-align: center;
    line-height: 1.75rem;
    color: var(--primary-color);

    strong {
      color: var(--secondary-color);
    }
  }

  @media (max-width: 720px) {
    .footerText {
      width: 100%;
      font-size: 1.15rem;
    }
  }
`;
