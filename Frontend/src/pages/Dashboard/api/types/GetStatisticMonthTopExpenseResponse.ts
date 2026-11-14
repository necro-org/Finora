export interface GetStatisticMonthTopExpenseResponse {
  id: string;
  description: string | null;
  amount: number;
  date: string;
  typeName: string | null;
  typeColor: string | null;
}
