import styled, { css } from 'styled-components';

interface IContainer {
  isMinimized: boolean;
}

export const Container = styled.aside<IContainer>`
  width: ${(props) => (props.isMinimized ? '64px' : '240px')};
  height: 100%;
  position: relative;
  grid-area: aside;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  background: #fff;

  ${(props) =>
    props.isMinimized &&
    css`
      > nav {
        padding: 0;

        a {
          span {
            display: none;
          }
          > svg {
            margin: 0 auto;
          }
        }
      }
    `}
`;

type ButtonToggleSidebar = IContainer;

export const ButtonToggleSidebar = styled.button<ButtonToggleSidebar>`
  position: absolute;
  top: 1rem;
  right: -1.25rem;

  width: 38px;
  height: 38px;

  display: grid;
  place-content: center;

  border-radius: 50%;
  border: none;
  background: #fff;

  transition: transform 200ms linear;

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--text-complementary-color);
  }

  &:hover {
    svg {
      color: var(--primary-color);
    }
  }

  ${(props) =>
    props.isMinimized
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `}
`;

export const NavLinkContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  color: var(--text-complementary-color);

  transition: all 200ms linear;

  a {
    width: 100%;
    padding: 1rem;

    display: flex;
    align-items: center;

    font-size: 1rem;
    font-weight: bold;
  }

  .navLinkActive {
    color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-color);
  }
`;
