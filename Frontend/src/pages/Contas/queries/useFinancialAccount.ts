import { useQuery } from "@tanstack/react-query";

import { getFinancialAccountById } from "../api/services/getFinancialAccountById";
import { financialAccountsKeys } from "./keys";

export function useFinancialAccount(id?: string) {
  return useQuery({
    queryKey: financialAccountsKeys.detail(id ?? ""),
    queryFn: () => getFinancialAccountById(id as string),
    enabled: !!id,
  });
}
