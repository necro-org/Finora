import api from "@libs/api";
import type { FinancialTypeResponse } from "../types/FinancialTypeResponse";

export async function getFinancialTypeById(id: string) {
  const response = await api.get<FinancialTypeResponse>(
    `/FinancialTypes/${id}`,
  );
  return response.data;
}
