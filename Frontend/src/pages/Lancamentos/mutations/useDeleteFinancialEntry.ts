import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyRemove } from "@libs/notification";

import { deleteFinancialEntry } from "../api/services/deleteFinancialEntry";
import { financialEntriesKeys } from "../queries/keys";

export function useDeleteFinancialEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFinancialEntry,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({ queryKey: financialEntriesKeys.all });
    },
  });
}
