import { QueryClient } from '@tanstack/react-query';
import { STALE_TIME } from '../constants/constants';

console.log(STALE_TIME);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
