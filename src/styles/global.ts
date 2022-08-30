import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 16px;
    font-family: sans-serif;
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
