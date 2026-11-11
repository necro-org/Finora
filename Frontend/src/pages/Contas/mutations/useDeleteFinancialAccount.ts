import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyRemove } from "@libs/notification";

import { deleteFinancialAccount } from "../api/services/deleteFinancialAccount";
import { financialAccountsKeys } from "../queries/keys";

export function useDeleteFinancialAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({ queryKey: financialAccountsKeys.all });
    },
  });
}
