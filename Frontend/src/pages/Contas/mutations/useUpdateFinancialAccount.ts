import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyUpdate } from "@libs/notification";

import { updateFinancialAccount } from "../api/services/updateFinancialAccount";
import { financialAccountsKeys } from "../queries/keys";

export function useUpdateFinancialAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFinancialAccount,
    onSuccess: () => {
      notifyUpdate();
      queryClient.invalidateQueries({ queryKey: financialAccountsKeys.all });
    },
  });
}
