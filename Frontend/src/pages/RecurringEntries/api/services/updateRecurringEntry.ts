import api from "@libs/api";
import type { UpdateRecurringEntryRequest } from "../types/UpdateRecurringEntryRequest";

export async function updateRecurringEntry(data: UpdateRecurringEntryRequest) {
  await api.put("/RecurringEntries", data);
}
