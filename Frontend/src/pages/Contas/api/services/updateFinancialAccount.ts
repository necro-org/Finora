import api from "@libs/api";
import type { UpdateFinancialAccountRequest } from "../types/UpdateFinancialAccountRequest";

export async function updateFinancialAccount(
  data: UpdateFinancialAccountRequest,
) {
  await api.put("/FinancialAccounts", data);
}
