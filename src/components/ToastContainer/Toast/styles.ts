import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ccd7ea;
    color: #3763ac;
  `,
  success: css`
    background: #aedfe3;
    color: #31aeb9;
  `,
  error: css`
    background: #f8cad2;
    color: #e62b4b;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 340px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 6px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 0.875rem;
      opacity: 0.9;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
