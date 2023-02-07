import useAuth from '@/hooks/useAuth';

const Welcome = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Seja bem-vindo a ZEKA, {user.avatar_name}</h1>
    </>
  );
};

export default Welcome;
