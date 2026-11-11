import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notifySuccess } from "@libs/notification";

import { importCsv } from "../api/services/importCsv";
import { financialEntriesKeys } from "../queries/keys";

export function useImportCsv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importCsv,
    onSuccess: ({ detectedTemplate, importedCount }) => {
      notifySuccess(
        `Importação realizada com sucesso! Template ${detectedTemplate} Quantidade de importados ${importedCount}`,
      );
      queryClient.invalidateQueries({ queryKey: financialEntriesKeys.all });
    },
  });
}
