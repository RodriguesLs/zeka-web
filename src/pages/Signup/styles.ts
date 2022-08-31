import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  img {
    max-width: 200px;
  }

  a {
    color: var(--primary-color);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-bottom: 1rem;
      color: var(--text-complementary-color);
    }
  }
`;

export const BackButton = styled(Link)`
  margin-bottom: 2rem;
  background: transparent;
  border: 0;
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--primary-color);

  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  align-items: baseline;
  gap: 1rem;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const StepsContainer = styled.ul`
  width: 100%;
  margin: 2rem 0;
  display: flex;

  li {
    flex: 1;
    font-weight: 500;
    color: var(--text-complementary-color);

    & + li {
      margin-left: 0.5rem;
    }

    &::after {
      content: '';
      display: block;
      margin-top: 0.25rem;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background-color: var(--gray-300);
    }
  }

  .active {
    color: var(--primary-color);

    &::after {
      background-color: var(--primary-color);
    }
  }

  @media (max-width: 1180px) {
    margin: 1rem 0 2rem 0;
    flex-direction: column;

    li {
      display: none;
      & + li {
        margin: 0;
      }

      &::after {
        display: none;
      }
    }

    .active {
      display: flex;
      font-size: 1.25rem;
    }
  }
`;

interface ThumbnailProps {
  hasThumbnail: boolean;
}

export const ThumbnailWrapper = styled.div`
  position: relative;

  .trashButton {
    position: absolute;
    bottom: 20px;
    right: 0;

    border: 0;
    background: transparent;

    svg {
      color: var(--error-color);
      width: 16px;
      height: 16px;
    }

    &:hover {
      svg {
        color: var(--error-color);
      }
    }
  }
`;

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
