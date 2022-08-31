import styled, { keyframes } from 'styled-components';

import OnboardingImg from '@/assets/img/onboarding_woman.jpg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-90px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;

  .imageOnboarding {
    flex: 1;
    height: 100%;
    background: url(${OnboardingImg}) no-repeat;
    background-size: cover;
  }

  @media (min-width: 1921px) {
    .imageOnboarding {
      background-size: 100%;
      background-position: 0 20%;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    .imageOnboarding {
      display: none;
    }
  }

  @media (min-width: 1921px) {
    .imageOnboarding {
      flex: 2;
    }
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 3rem;
  flex: 1;
  background-color: '#FFF';
  animation: ${appearFromLeft} 1s;

  @media (min-width: 1921px) {
    flex: 2;
  }

  @media (max-width: 720px) {
    padding: 1rem;
    height: 100%;
  }
`;
