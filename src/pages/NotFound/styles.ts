import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  display: grid;
  place-content: center;
  text-align: center;

  img {
    max-width: 400px;
    margin-bottom: 4rem;
    place-self: center;
  }

  h1 {
    color: var(--text-color);
  }

  p {
    margin-top: 0.25rem;
    color: var(--text-complementary-color);
  }
`;
