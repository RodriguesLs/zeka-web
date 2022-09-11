import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...chakraTheme,
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});

export default theme;
