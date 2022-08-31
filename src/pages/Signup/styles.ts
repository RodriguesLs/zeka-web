import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  .backButton {
    margin-bottom: 2rem;
    background: transparent;
    border: 0;
    font-size: 1.125rem;
    font-weight: bold;
    color: var(--primary-color);

    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  img {
    max-width: 200px;
  }

  a {
    color: var(--primary-color);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-bottom: 1rem;
      color: var(--text-complementary-color);
    }

    button {
      margin-top: 1rem;
    }
  }
`;

export const StepsContainer = styled.ul`
  width: 100%;
  margin: 2rem 0;
  display: flex;

  li {
    flex: 1;
    font-weight: 500;
    color: var(--text-complementary-color);

    & + li {
      margin-left: 0.5rem;
    }

    &::after {
      content: '';
      display: block;
      margin-top: 0.25rem;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background-color: var(--gray-300);
    }
  }

  .active {
    color: var(--primary-color);

    &::after {
      background-color: var(--primary-color);
    }
  }

  @media (max-width: 1180px) {
    margin: 1rem 0 2rem 0;
    flex-direction: column;

    li {
      display: none;
      & + li {
        margin: 0;
      }

      &::after {
        display: none;
      }
    }

    .active {
      display: flex;
      font-size: 1.25rem;
    }
  }
`;
