import type { ClassificationEnum } from "./ClassificationEnum";

export interface CreateFinancialEntryRequest {
  date: string;
  amount: number;
  typeId: string;
  classification: ClassificationEnum;
  description: string | null;
  datePayment: string | null;
  accountId: string | null;
}
