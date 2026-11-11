import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyCreate } from "@libs/notification";

import { createFinancialType } from "../api/services/createFinancialType";
import { financialTypesKeys } from "../queries/keys";

export function useCreateFinancialType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinancialType,
    onSuccess: () => {
      notifyCreate();
      queryClient.invalidateQueries({ queryKey: financialTypesKeys.all });
    },
  });
}
