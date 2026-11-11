import api from "@libs/api";
import type { CreateFinancialAccountRequest } from "../types/CreateFinancialAccountRequest";

export async function createFinancialAccount(
  data: CreateFinancialAccountRequest,
) {
  await api.post("/FinancialAccounts", data);
}
