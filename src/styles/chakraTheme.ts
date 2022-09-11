import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...chakraTheme,
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        outline: 0,
        boxSizing: 'border-box',
      },

      'html,body': {
        color: 'gray.900',
        fontSize: '16px',
      },

      'a, button': {
        cursor: 'pointer',
      },
    },
  },
  colors: {
    brand: {
      200: '#B0DFE3',
      300: '#88CED4',
      400: '#61BEC6',
      500: '#31aeb9',
    },
    blue: {
      200: '#B0C2DD',
      300: '#88A2CC',
      400: '#6084BC',
      500: '#3763ac',
    },
    red: {
      200: '#f7c1ca',
      300: '#ee8295',
      400: '#e95871',
      500: '#e62b4b',
    },
    green: {
      200: '#dce7c3',
      300: '#b9cc85',
      400: '#a1bd5c',
      500: '#89ac27',
    },
    yellow: {
      200: '#fce6c1',
      300: '#face83',
      400: '#f8be58',
      500: '#f8af15',
    },
    gray: {
      100: '#f2f0f0',
      200: '#e1e2e3',
      300: '#cccccc',
      400: '#b3b3b3',
      500: '#808080',
      900: '#4d4d4d',
    },
    background: {
      white: '#FFF',
      layout: 'rgb(241, 242, 243)',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});

export default theme;
