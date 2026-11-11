import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifyRemove } from "@libs/notification";

import { deleteRecurringEntry } from "../api/services/deleteRecurringEntry";
import { recurringEntriesKeys } from "../queries/keys";

export function useDeleteRecurringEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecurringEntry,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({ queryKey: recurringEntriesKeys.all });
    },
  });
}
