import styled from 'styled-components';
import { Table } from '@chakra-ui/react';

export const Wrapper = styled.div`
  overflow-y: auto;
  max-height: 560px;
`;

export const TableContainer = styled(Table)`
  thead {
    position: sticky;
    top: 0;

    background: #f1f2f3;
    th {
      padding: 1rem;
      text-align: center;
      color: var(--text-color);
    }
  }

  tbody {
    background: #fff;

    tr {
      td {
        padding: 1rem;
        text-align: center;
      }

      transition: all 200ms linear;

      &:hover {
        background: var(--border-color);
      }
    }
  }
`;

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
