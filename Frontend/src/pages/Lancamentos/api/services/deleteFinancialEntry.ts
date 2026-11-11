import api from "@libs/api";

export async function deleteFinancialEntry(id: string) {
  await api.delete(`/FinancialEntries/${id}`);
}
