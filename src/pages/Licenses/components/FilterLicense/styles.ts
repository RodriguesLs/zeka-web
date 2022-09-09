import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 4px solid var(--gray-300);
`;

interface ItemProps {
  isActive: boolean;
}

export const Item = styled.button<ItemProps>`
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
