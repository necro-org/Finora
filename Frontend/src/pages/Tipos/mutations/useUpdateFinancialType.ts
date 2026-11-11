import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyUpdate } from "@libs/notification";

import { updateFinancialType } from "../api/services/updateFinancialType";
import { financialTypesKeys } from "../queries/keys";

export function useUpdateFinancialType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFinancialType,
    onSuccess: () => {
      notifyUpdate();
      queryClient.invalidateQueries({ queryKey: financialTypesKeys.all });
    },
  });
}
