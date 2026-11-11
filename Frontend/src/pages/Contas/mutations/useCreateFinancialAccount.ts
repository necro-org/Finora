import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyCreate } from "@libs/notification";

import { createFinancialAccount } from "../api/services/createFinancialAccount";
import { financialAccountsKeys } from "../queries/keys";

export function useCreateFinancialAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinancialAccount,
    onSuccess: () => {
      notifyCreate();
      queryClient.invalidateQueries({ queryKey: financialAccountsKeys.all });
    },
  });
}
