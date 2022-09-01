import { createContext, useCallback, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/services/apiClient';

interface User {
  id: string;
  avatar_url: string;
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
  const navigate = useNavigate();

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
        const { data } = await apiClient.get('/me');

        setUser(data);
      } catch (err) {
        throw new Error();
      }
    }

    if (!user && token) getUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await apiClient.post('sessions', { email, password });

      const { token, refreshToken, user } = response.data;

      localStorage.setItem('@Zeka:token', token);
      localStorage.setItem('@Zeka:refreshToken', refreshToken);

      setToken(token);
      setUser(user);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/dashboard');
    } catch (e) {
      throw new Error();
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Zeka:token');
    localStorage.removeItem('@Zeka:refreshToken');

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
