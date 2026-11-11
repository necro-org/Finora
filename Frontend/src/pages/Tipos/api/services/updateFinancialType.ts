import api from "@libs/api";
import type { UpdateFinancialTypeRequest } from "../types/UpdateFinancialTypeRequest";

export async function updateFinancialType(data: UpdateFinancialTypeRequest) {
  await api.put("/FinancialTypes", data);
}
