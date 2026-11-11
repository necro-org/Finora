import { useQuery } from "@tanstack/react-query";

import { getRecurringEntries } from "../api/services/getRecurringEntries";
import { recurringEntriesKeys } from "./keys";

export function useRecurringEntries(date: string) {
  return useQuery({
    queryKey: recurringEntriesKeys.list(date),
    queryFn: () => getRecurringEntries(date),
  });
}
