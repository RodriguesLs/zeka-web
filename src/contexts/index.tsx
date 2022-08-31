import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthContextProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthContextProvider>
  );
};

export default AppProvider;
