import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientProviderLib,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { fireError } from "@libs/alert";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
  queryCache: new QueryCache({ onError: fireError }),
  mutationCache: new MutationCache({ onError: fireError }),
});

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <QueryClientProviderLib client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderLib>
  );
}
