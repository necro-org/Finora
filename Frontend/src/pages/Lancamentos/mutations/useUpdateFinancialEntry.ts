import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyUpdate } from "@libs/notification";

import { updateFinancialEntry } from "../api/services/updateFinancialEntry";
import { financialEntriesKeys } from "../queries/keys";

export function useUpdateFinancialEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFinancialEntry,
    onSuccess: () => {
      notifyUpdate();
      queryClient.invalidateQueries({ queryKey: financialEntriesKeys.all });
    },
  });
}
