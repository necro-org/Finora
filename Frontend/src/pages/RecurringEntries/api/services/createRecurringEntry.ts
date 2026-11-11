import api from "@libs/api";
import type { CreateRecurringEntryRequest } from "../types/CreateRecurringEntryRequest";

export async function createRecurringEntry(data: CreateRecurringEntryRequest) {
  await api.post("/RecurringEntries", data);
}
