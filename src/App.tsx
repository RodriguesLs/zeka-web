import { Suspense } from 'react';
import Routes from './routes';

const App = () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes />
    </Suspense>
  );
};

export default App;
