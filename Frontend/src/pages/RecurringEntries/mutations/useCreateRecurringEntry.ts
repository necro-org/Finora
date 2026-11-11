import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyCreate } from "@libs/notification";

import { createRecurringEntry } from "../api/services/createRecurringEntry";
import { recurringEntriesKeys } from "../queries/keys";

export function useCreateRecurringEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecurringEntry,
    onSuccess: () => {
      notifyCreate();
      queryClient.invalidateQueries({ queryKey: recurringEntriesKeys.all });
    },
  });
}
