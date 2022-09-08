import styled from 'styled-components';

export const Container = styled.section`
  --number-columns: 1;
  --number-rows: 1;

  display: grid;
  grid-template-columns: repeat(var(--number-columns), 1fr);
  grid-template-rows: repeat(var(--number-rows), 1fr);
  gap: 1rem;

  .dashboardItem {
    flex: 1 1 50%;
    grid-column-end: span 2;

    &--full {
      flex-basis: 100%;
      grid-column: 1 / -1;
    }

    &--col {
      flex-basis: calc(100% / var(--number-columns));
      grid-column-end: span 1;
    }
  }
`;
