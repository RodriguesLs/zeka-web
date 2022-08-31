import useAuth from '@/hooks/useAuth';
import apiClient from '@/services/apiClient';
import { useEffect } from 'react';

const Dashboard = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    async function loadData() {
      const res = await apiClient.get('/teste');

      console.log(res);
    }

    loadData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <button type='button' onClick={signOut}>
        Sair da plataforma
      </button>
    </>
  );
};

export default Dashboard;
