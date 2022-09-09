import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;

  text-align: left;
  border-radius: 6px;
  border-spacing: 0;
  border: 1px solid var(--gray-300);

  thead {
    th {
      padding: 1rem;
      background: none;
      color: var(--text-color);
      text-transform: uppercase;
    }
  }

  tbody {
    background: #fff;
    tr {
      cursor: pointer;
      td {
        padding: 1rem;
      }

      transition: all 200ms linear;
    }

    button {
      background: none;
      border: none;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
