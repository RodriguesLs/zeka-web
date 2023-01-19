import styled, { css } from 'styled-components';

interface ThumbnailProps {
  hasThumbnail: boolean;
}

export const Thumbnail = styled.label<ThumbnailProps>`
  height: 120px;
  width: 120px;
  margin-bottom: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background-size: cover;
  cursor: pointer;
  border: 2px solid var(--border-color);

  transition: all 200ms linear;

  svg {
    width: 20px;
    height: 20px;
    color: var(--border-color);
  }

  input {
    display: none;
  }

  &:hover {
    border-color: var(--primary-color);

    > svg {
      color: var(--primary-color);
    }
  }

  ${(props) =>
    props.hasThumbnail &&
    css`
      border: 0;

      > svg {
        display: none;
      }
    `}
`;