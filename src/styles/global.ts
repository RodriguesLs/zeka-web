import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root{
    --primary-color: #3466AF;
    --secondary-color: #05AEB9;
    --error-color: #c53030;
    --text-color: #333;
    --text-complementary-color: #666360;
    --border-color: #e1e2e3;
  }

  html, body {
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    width: 100%;
    height: 100vh;
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
