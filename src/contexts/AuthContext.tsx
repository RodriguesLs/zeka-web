import { createContext, useCallback, useState, ReactNode, useEffect } from 'react';

import apiClient from '@/services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('@Zeka:token');

    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return token;
    }

    return null;
  });

  useEffect(() => {
    async function getUser() {
      try {
        const response = await apiClient.get('/me');

        setUser(response.data);
      } catch (err) {
        console.error('Erro em nossa plataforma');
      }
    }

    if (token) getUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await apiClient.post('sessions', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('@Zeka:token', token);

      setToken(token);
      setUser(user);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      throw new Error();
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Zeka:token');
    localStorage.removeItem('@Zeka:user');

    setToken('');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
