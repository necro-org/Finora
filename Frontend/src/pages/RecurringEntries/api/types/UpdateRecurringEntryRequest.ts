import type { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

export interface UpdateRecurringEntryRequest {
  id: string;
  description: string | null;
  amount: number;
  classification: ClassificationEnum;
  dayOfMonth: number;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  typeId: string;
  accountId: string | null;
}
