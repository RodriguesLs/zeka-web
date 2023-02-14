import useAuth from '@/hooks/useAuth';

const Payment = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Que alegria vê-lo por aqui, {user?.avatar_name || user?.email?.split('@')[0]}</h1>
      <div>
        <p><b>Atualmente sua conta está</b>: {user?.student?.status === 'active' ? 'Ativa' : 'Não confirmada' } </p>
      </div>
    </>
  );
};

export default Payment;
