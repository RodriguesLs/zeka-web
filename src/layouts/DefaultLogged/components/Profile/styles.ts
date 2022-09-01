import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

interface ProfileBadgeContainerProps {
  isVisible: boolean;
}

export const ProfileBadgeContainer = styled.div<ProfileBadgeContainerProps>`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--gray-300);
  border-radius: 50%;
  cursor: pointer;

  transition: all 200ms linear;

  &:hover {
    border-color: var(--secondary-color);
  }

  ${(props) =>
    props.isVisible &&
    css`
      border-color: var(--secondary-color);
    `}
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 68px;
  right: 1rem;
  width: 260px;
  max-width: 260px;

  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid var(--gray-300);
  border-radius: 6px;

  ul {
    width: 100%;

    li {
      padding: 1rem;

      color: var(--text-color);

      svg {
        margin-right: 1rem;
        width: 22px;
        height: 22px;
      }

      a {
        display: flex;
        align-items: center;
      }

      & + li {
        border-top: 1px solid var(--gray-300);
      }

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const SignOutButton = styled.button`
  padding: 1rem;
  display: flex;
  align-items: center;

  margin-top: 3rem;

  background: none;
  border: none;
  border-top: 1px solid var(--gray-300);
  color: var(--error-color);
  font-weight: bold;
  font-size: 1rem;

  svg {
    margin-right: 1rem;
    width: 22px;
    height: 22px;
  }
`;
