import useAuth from '@/hooks/useAuth';

const Payment = () => {
  const { user } = useAuth();

  const convertResponse: any = {
    inactive: 'Inativa',
    active: 'Ativa',
    no_confirmed: 'Não confirmada',
  };

  return (
    <>
      <h1>Que alegria vê-lo por aqui, {user?.avatar_name || user?.email?.split('@')[0]}</h1>
      <div>
        <p>
          <b>Atualmente sua conta está</b>: {convertResponse[user?.student?.status]}
        </p>
      </div>
    </>
  );
};

export default Payment;
