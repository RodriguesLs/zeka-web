import styled from 'styled-components';

export const Container = styled.aside`
  grid-area: aside;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  img {
    max-width: 120px;
    margin: 0 2rem;
  }
`;

export const NavContainer = styled.nav`
  height: 100%;
  width: 100%;
  margin: 2rem 0;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const NavSectionContainer = styled.div`
  padding: 1rem 0;

  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-complementary-color);
    font-size: 1rem;
    text-transform: uppercase;
  }

  .content {
    padding-left: 1rem;
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
    padding: 1rem 0;

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
