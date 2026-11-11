import { useQuery } from "@tanstack/react-query";

import { getFinancialEntries } from "../api/services/getFinancialEntries";
import type { FinancialEntryFilterDto } from "../api/types/FinancialEntryFilterDto";
import { financialEntriesKeys } from "./keys";

export function useFinancialEntries(filter: FinancialEntryFilterDto) {
  return useQuery({
    queryKey: financialEntriesKeys.list(filter),
    queryFn: () => getFinancialEntries(filter),
  });
}
