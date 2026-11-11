import api from "@libs/api";
import type { FinancialAccountResponse } from "../types/FinancialAccountResponse";

export async function getFinancialAccountById(id: string) {
  const response = await api.get<FinancialAccountResponse>(
    `/FinancialAccounts/${id}`,
  );
  return response.data;
}
