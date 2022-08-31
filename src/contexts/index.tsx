import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AppProvider;
