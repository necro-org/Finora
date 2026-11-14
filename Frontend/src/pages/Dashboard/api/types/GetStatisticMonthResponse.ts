import type { ChartDataOfYearDto } from "./ChartDataOfYearDto";
import type { GetStatisticMonthAccountResponse } from "./GetStatisticMonthAccountResponse";
import type { GetStatisticMonthItemResponse } from "./GetStatisticMonthItemResponse";
import type { GetStatisticMonthRecurringEntryResponse } from "./GetStatisticMonthRecurringEntryResponse";
import type { UpcomingPaymentDto } from "./UpcomingPaymentDto";

export interface GetStatisticMonthResponse {
  expensesByType: GetStatisticMonthItemResponse[];
  revenuesByType: GetStatisticMonthItemResponse[];
  classifications: GetStatisticMonthItemResponse[];
  previousMonthClassifications: GetStatisticMonthItemResponse[];
  accounts: GetStatisticMonthAccountResponse[];
  classificationsOfYear: ChartDataOfYearDto[];
  recurringEntries: GetStatisticMonthRecurringEntryResponse[];
  upcomingPayments: UpcomingPaymentDto[];
}
