import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyUpdate } from "@libs/notification";

import { updateRecurringEntry } from "../api/services/updateRecurringEntry";
import { recurringEntriesKeys } from "../queries/keys";

export function useUpdateRecurringEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecurringEntry,
    onSuccess: () => {
      notifyUpdate();
      queryClient.invalidateQueries({ queryKey: recurringEntriesKeys.all });
    },
  });
}
