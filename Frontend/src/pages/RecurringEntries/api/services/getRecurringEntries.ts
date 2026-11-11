import api from "@libs/api";
import type { ListRecurringEntriesResponse } from "../types/ListRecurringEntriesResponse";

export async function getRecurringEntries(date: string) {
  const response = await api.get<ListRecurringEntriesResponse[]>(
    "/RecurringEntries",
    { params: { date } },
  );
  return response.data;
}
