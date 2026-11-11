import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyCreate } from "@libs/notification";

import { createFinancialEntry } from "../api/services/createFinancialEntry";
import { financialEntriesKeys } from "../queries/keys";

export function useCreateFinancialEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinancialEntry,
    onSuccess: () => {
      notifyCreate();
      queryClient.invalidateQueries({ queryKey: financialEntriesKeys.all });
    },
  });
}
