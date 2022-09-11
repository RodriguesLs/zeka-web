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
    border-color: var(--primary-color);
  }

  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }

  ${(props) =>
    props.isVisible &&
    css`
      border-color: var(--primary-color);
    `}
`;

export const SignOutButton = styled.button`
  padding: 1rem;
  display: flex;
  align-items: center;

  background: none;
  border: none;
  color: var(--error-color);
  font-weight: bold;
  font-size: 1rem;

  svg {
    margin-right: 1rem;
    width: 22px;
    height: 22px;
  }
`;
