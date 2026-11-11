export const recurringEntriesKeys = {
  all: ["recurringEntries"] as const,
  lists: () => [...recurringEntriesKeys.all, "list"] as const,
  list: (date: string) => [...recurringEntriesKeys.lists(), date] as const,
  details: () => [...recurringEntriesKeys.all, "detail"] as const,
  detail: (id: string) => [...recurringEntriesKeys.details(), id] as const,
};
