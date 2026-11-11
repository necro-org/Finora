export const financialTypesKeys = {
  all: ["financialTypes"] as const,
  lists: () => [...financialTypesKeys.all, "list"] as const,
  details: () => [...financialTypesKeys.all, "detail"] as const,
  detail: (id: string) => [...financialTypesKeys.details(), id] as const,
};
