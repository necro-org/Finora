import type { ClassificationEnum } from "./ClassificationEnum";

export interface UpdateFinancialEntryRequest {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  classification: ClassificationEnum;
  description: string | null;
  transactionDate: string | null;
  accountId: string | null;
}
