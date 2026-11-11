import type { ClassificationEnum } from "./ClassificationEnum";
import type { DateReferenceEnum } from "./DateReferenceEnum";

export interface FinancialEntryFilterDto {
  initialDate: string | null;
  finalDate: string | null;
  initialAmount: number | null;
  finalAmount: number | null;
  searchText: string | null;
  typeId: string | null;
  accountId: string | null;
  classification: ClassificationEnum | null;
  isConfirmed: boolean | null;
  dateReference: DateReferenceEnum | null;
}
