import styled from 'styled-components';

export const TableErrorContainer = styled.div`
  width: 100%;
  height: 500px;

  display: grid;
  place-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color);

    img {
      width: 180px;
      height: 180px;

      margin-bottom: 2rem;
    }

    h3 {
      font-weight: bold;
      font-size: 1.5rem;
    }

    p {
      color: var(--text-complementary-color);
    }
  }
`;
