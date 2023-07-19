import { createContext, useCallback, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/services/apiClient';
import paymentApi from '@/services/paymentApi';
import localStorageService from '@/services/localStorageService';

interface User {
  id: string;
  avatar_url: string;
  avatar_name: string;
  email: string;
  token: string;
  student: Student;
}

interface Student {
  guid: string;
  token: string;
  status: string;
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
  role: string | null;
  organizationId: number;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [organizationId, setOrganizationId] = useState(0);
  const [token, setToken] = useState(() => {
    const token = localStorageService().getToken;

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
        setRole(data.role);
        setOrganizationId(data.organization_id);
      } catch (err) {
        throw new Error();
      }
    }

    if (!user && token) getUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await apiClient.post('sessions', { email, password });
      const { token, refreshToken, user, student = null, role, organization_id } = response.data;

      localStorageService().signIn({ token, refreshToken });
      setToken(token);
      setUser({ ...user, student });
      setRole(role);
      setOrganizationId(organization_id);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      paymentApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (role === 'student' && student?.status !== 'active') {
        await paymentApi.get(`/${student.id}/verify_payment/${student.payment_id}`);
      }

      navigate('/welcome');
    } catch (e) {
      throw new Error();
    }
  }, []);

  const signOut = useCallback(() => {
    localStorageService().signOut();

    setToken('');
    setUser(null);
    setRole(null);
    setOrganizationId(0);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        organizationId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
