import { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthContextProvider } from './AuthContext';
import { TitlePageProvider } from './TitlePageContext';
import { ToastProvider } from './ToastContext';

import chakraTheme from '@/styles/chakraTheme';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <AuthContextProvider>
        <ToastProvider>
          <TitlePageProvider>{children}</TitlePageProvider>
        </ToastProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default AppProvider;
