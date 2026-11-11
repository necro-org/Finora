import { useQuery } from "@tanstack/react-query";

import { getFinancialAccounts } from "../api/services/getFinancialAccounts";
import { financialAccountsKeys } from "./keys";

interface UseFinancialAccountsParams {
  enabled?: boolean;
}

export function useFinancialAccounts({
  enabled = true,
}: UseFinancialAccountsParams = {}) {
  return useQuery({
    queryKey: financialAccountsKeys.lists(),
    queryFn: getFinancialAccounts,
    enabled,
  });
}
