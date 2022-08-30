import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  display: grid;
  place-content: center;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 20px;
  height: 20px;
  border: 4px solid transparent;
  border-top: 4px solid #fff;
  border-radius: 50%;

  ${(_) =>
    css`
      animation: ${spin} 400ms linear infinite;
    `}
`;
