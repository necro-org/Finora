import api from "@libs/api";
import type { RecurringEntryResponse } from "../types/RecurringEntryResponse";

export async function getRecurringEntryById(id: string) {
  const response = await api.get<RecurringEntryResponse>(
    `/RecurringEntries/${id}`,
  );
  return response.data;
}
