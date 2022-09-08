import styled, { css } from 'styled-components';

interface IContainer {
  isMinimized: boolean;
}

export const Container = styled.aside<IContainer>`
  width: ${(props) => (props.isMinimized ? '64px' : '240px')};
  position: relative;
  grid-area: aside;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  background: #fff;

  img {
    max-width: 120px;
    margin: 0 2rem;
  }

  ${(props) =>
    props.isMinimized &&
    css`
      > nav {
        margin-top: 4rem;
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

export const ButtonToggleSidebar = styled.button`
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
`;

export const NavContainer = styled.nav`
  height: 100%;
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;

export const NavSectionContainer = styled.div`
  padding: 0 1rem;

  h3 {
    color: var(--text-complementary-color);
    font-size: 1rem;
    text-transform: uppercase;
  }
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

    svg {
      margin-right: 1.125rem;
      width: 24px;
      height: 24px;
    }
  }

  .navLinkActive {
    color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-color);
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: 500;
  }

  .listSocial {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    li {
      a {
        svg {
          width: 22px;
          height: 22px;

          color: var(--text-complementary-color);
        }
      }
      & + li {
        margin-left: 0.75rem;
      }

      &:hover {
        a {
          svg {
            color: var(--primary-color);
          }
        }
      }
    }
  }
`;
