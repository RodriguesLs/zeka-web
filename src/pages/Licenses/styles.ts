import styled, { css } from 'styled-components';

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

export const FilterLicenseTypeContainer = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 4px solid var(--gray-300);
`;

interface FilterLicenseTypeItemProps {
  isActive: boolean;
}

export const FilterLicenseTypeItem = styled.button<FilterLicenseTypeItemProps>`
  max-width: 100px;
  margin-bottom: -4px;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 0;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  color: var(--text-color);
  cursor: pointer;

  transition: all 200ms linear;

  &::after {
    content: '';
    width: 100%;
    height: 4px;
    margin-top: 1rem;
    display: block;

    background: var(--gray-300);
  }

  &:hover {
    color: var(--primary-color);
    &::after {
      background: var(--primary-color);
    }
  }

  ${(props) =>
    props.isActive &&
    css`
      color: var(--primary-color);
      &::after {
        background: var(--primary-color);
      }
    `}
`;

export const SearchBoxContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;

  display: flex;
  align-items: center;

  border: 1px solid var(--gray-300);
  border-radius: 6px;

  input {
    flex: 1;
    width: 100%;
    background: none;
    border: none;
  }

  svg {
    width: 18px;
    height: 18px;

    color: var(--text-color);
  }
`;

export const TableContainer = styled.table`
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
