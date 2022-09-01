import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
import { SidebarProvider } from './SidebarContext';
import { ToastProvider } from './ToastContext';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default AppProvider;
