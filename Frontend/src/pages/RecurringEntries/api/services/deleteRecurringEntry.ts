import api from "@libs/api";

export async function deleteRecurringEntry(id: string) {
  await api.delete(`/RecurringEntries/${id}`);
}
