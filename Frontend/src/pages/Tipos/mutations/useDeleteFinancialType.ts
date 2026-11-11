import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyRemove } from "@libs/notification";

import { deleteFinancialType } from "../api/services/deleteFinancialType";
import { financialTypesKeys } from "../queries/keys";

export function useDeleteFinancialType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFinancialType,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({ queryKey: financialTypesKeys.all });
    },
  });
}
