import { QueryClient } from '@tanstack/react-query';

const MILTOSECOND = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: MILTOSECOND * 5,
      retry: 2,
    },
  },
});
