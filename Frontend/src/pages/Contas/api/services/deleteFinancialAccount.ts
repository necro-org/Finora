import api from "@libs/api";

export async function deleteFinancialAccount(id: string) {
  await api.delete(`/FinancialAccounts/${id}`);
}
