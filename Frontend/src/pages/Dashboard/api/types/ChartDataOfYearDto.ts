import type { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

export interface ChartDataOfYearDto {
  month: string;
  monthNumber: number;
  classification: ClassificationEnum;
  label: string;
  color: string | null;
  value: number;
}
