import api from "@libs/api";
import type { FinancialEntryFilterDto } from "../types/FinancialEntryFilterDto";
import type { ListFinancialEntryResponse } from "../types/ListFinancialEntryResponse";

export async function getFinancialEntries(filter: FinancialEntryFilterDto) {
  const response = await api.post<ListFinancialEntryResponse[]>(
    "/FinancialEntries/List",
    filter,
  );
  return response.data;
}
