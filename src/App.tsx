import { Suspense } from 'react';

import AppProvider from './contexts';
import Loading from './pages/Loading';
import Routes from './routes';

const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </AppProvider>
  );
};

export default App;
