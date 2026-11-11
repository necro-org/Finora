import api from "@libs/api";
import type { ImportationCSVRequest } from "../types/ImportationCSVRequest";
import type { ImportationCSVResponse } from "../types/ImportationCSVResponse";

export async function importCsv({
  file,
  dateFinancialEntry,
  accountId,
}: ImportationCSVRequest) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<ImportationCSVResponse>(
    "/Importations/Csv",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params: { dateFinancialEntry, accountId },
    },
  );
  return response.data;
}
