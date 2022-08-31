import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root{
    --secondary-color: #3763ac;
    --primary-color: #31aeb9;
    --error-color: #e62b4b;
    --text-color: #333;
    --text-complementary-color: #808080;
    --gray-300: #ccc;
    --border-color: #e1e2e3;
  }

  html, body {
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    width: 100%;
    min-height: 100vh;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a, button {
    cursor: pointer;
  }

  @media(max-width: 1366px){
    html: {
      font-size: 93.75%;
    }
  }

  @media(max-width: 720px){
    html: {
      font-size: 86.25%;
    }
  }

`;
