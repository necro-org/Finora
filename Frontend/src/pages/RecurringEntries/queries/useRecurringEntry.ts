import { useQuery } from "@tanstack/react-query";

import { getRecurringEntryById } from "../api/services/getRecurringEntryById";
import { recurringEntriesKeys } from "./keys";

export function useRecurringEntry(id?: string) {
  return useQuery({
    queryKey: recurringEntriesKeys.detail(id ?? ""),
    queryFn: () => getRecurringEntryById(id as string),
    enabled: !!id,
  });
}
