import api from "@libs/api";
import type { FinancialAccountResponse } from "../types/FinancialAccountResponse";

export async function getFinancialAccounts() {
  const response =
    await api.get<FinancialAccountResponse[]>("/FinancialAccounts");
  return response.data;
}
