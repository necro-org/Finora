import { useQuery } from "@tanstack/react-query";

import { getFinancialEntryById } from "../api/services/getFinancialEntryById";
import { financialEntriesKeys } from "./keys";

export function useFinancialEntry(id?: string) {
  return useQuery({
    queryKey: financialEntriesKeys.detail(id ?? ""),
    queryFn: () => getFinancialEntryById(id as string),
    enabled: !!id,
  });
}
