import type { ClassificationEnum } from "./ClassificationEnum";

export interface GetFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string | null;
  accountId: string | null;
  classification: ClassificationEnum;
  description: string | null;
  datePayment: string | null;
  isConfirmed: boolean;
}
