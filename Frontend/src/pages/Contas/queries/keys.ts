export const financialAccountsKeys = {
  all: ["financialAccounts"] as const,
  lists: () => [...financialAccountsKeys.all, "list"] as const,
  details: () => [...financialAccountsKeys.all, "detail"] as const,
  detail: (id: string) => [...financialAccountsKeys.details(), id] as const,
};
