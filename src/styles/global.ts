import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --secondary-color: #3763ac;
    --primary-color: #31aeb9;
    --error-color: #e62b4b;
    --text-color: #333;
    --text-complementary-color: #808080;
    --gray-300: #ccc;
    --border-color: #e1e2e3;
  }

  .styled-box {
    font-size: 12px;
  }

  .linkToTamboro {
    font-size: 1rem;
    font-weight: bold;
    font-family: var(--chakra-fonts-body);
    margin-left: 1.25rem;
    color: var(--text-complementary-color);
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 1.25rem;
    }
  }
`;
