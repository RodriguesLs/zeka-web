import styled from 'styled-components';

import OnboardingImg from '@/assets/img/onboarding_woman.jpg';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;

  .contentLayout {
    width: 100%;
    height: 100%;
    padding: 2rem 3rem;
    flex: 1;
    background-color: '#FFF';
  }

  .imageOnboarding {
    flex: 1;
    height: 100%;
    background: url(${OnboardingImg}) no-repeat;
    background-size: cover;
  }

  @media (min-width: 1921px) {
    .contentLayout {
      flex: 2;
    }
    .imageOnboarding {
      background-size: 100%;
      background-position: 0 20%;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;

    .contentLayout {
      padding: 1rem;
      height: 100%;
    }
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
