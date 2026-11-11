import api from "@libs/api";
import type { GetFinancialEntryResponse } from "../types/GetFinancialEntryResponse";

export async function getFinancialEntryById(id: string) {
  const response = await api.get<GetFinancialEntryResponse>(
    `/FinancialEntries/${id}`,
  );
  return response.data;
}
