import api from "@libs/api";

export async function deleteFinancialType(id: string) {
  await api.delete(`/FinancialTypes/${id}`);
}
