import api from "@libs/api";
import type { FinancialTypeResponse } from "../types/FinancialTypeResponse";

export async function getFinancialTypes() {
  const response = await api.get<FinancialTypeResponse[]>("/FinancialTypes");
  return response.data;
}
