import api from "@libs/api";
import type { UpdateFinancialEntryRequest } from "../types/UpdateFinancialEntryRequest";

export async function updateFinancialEntry(data: UpdateFinancialEntryRequest) {
  await api.put("/FinancialEntries", data);
}
