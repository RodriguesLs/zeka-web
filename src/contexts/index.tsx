import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
import { TitlePageProvider } from './TitlePageContext';
import { ToastProvider } from './ToastContext';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <TitlePageProvider>{children}</TitlePageProvider>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default AppProvider;
