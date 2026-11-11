import api from "@libs/api";
import type { CreateFinancialTypeRequest } from "../types/CreateFinancialTypeRequest";

export async function createFinancialType(data: CreateFinancialTypeRequest) {
  await api.post("/FinancialTypes", data);
}
