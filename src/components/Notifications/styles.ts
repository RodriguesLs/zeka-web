import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

interface BadgeContainerProps {
  isVisible: boolean;
}

export const BadgeContainer = styled.div<BadgeContainerProps>`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    color: #aaa;
  }

  &:hover {
    svg {
      color: var(--primary-color);
    }
  }

  ${(props) =>
    props.isVisible &&
    css`
      svg {
        color: var(--primary-color);
      }
    `}
`;

export const NotificationsContainer = styled.div`
  position: absolute;
  top: 68px;
  right: 1rem;
  width: 260px;
  max-width: 260px;
  z-index: 2;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid var(--gray-300);
  border-radius: 6px;
  text-align: center;
`;
