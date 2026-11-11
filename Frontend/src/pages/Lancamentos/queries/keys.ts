import type { FinancialEntryFilterDto } from "../api/types/FinancialEntryFilterDto";

export const financialEntriesKeys = {
  all: ["financialEntries"] as const,
  lists: () => [...financialEntriesKeys.all, "list"] as const,
  list: (filter: FinancialEntryFilterDto) =>
    [...financialEntriesKeys.lists(), filter] as const,
  details: () => [...financialEntriesKeys.all, "detail"] as const,
  detail: (id: string) => [...financialEntriesKeys.details(), id] as const,
};
