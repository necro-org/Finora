import api from "@libs/api";
import type { CreateFinancialEntryRequest } from "../types/CreateFinancialEntryRequest";

interface CreateFinancialEntryParams {
  data: CreateFinancialEntryRequest;
  replicateUntilDate: string | null;
}

export async function createFinancialEntry({
  data,
  replicateUntilDate,
}: CreateFinancialEntryParams) {
  await api.post("/FinancialEntries", data, {
    params: { replicateUntilDate },
  });
}
