import type { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

export interface GetStatisticMonthRecurringEntryResponse {
  id: string;
  description: string | null;
  amount: number;
  classification: ClassificationEnum;
  date: string;
  isPaid: boolean;
}
