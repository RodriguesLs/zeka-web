import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppProvider from './contexts';
import Loading from './pages/Loading';
import Routes from './routes';
import { queryClient } from './services/queryClient';

const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <Routes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </AppProvider>
  );
};

export default App;
