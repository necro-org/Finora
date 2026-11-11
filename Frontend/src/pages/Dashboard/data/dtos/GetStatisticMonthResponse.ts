import type { ChartDataOfYearDto } from "./ChartDataOfYearDto";
import type { GetStatisticMonthItemResponse } from "./GetStatisticMonthItemResponse";
import type { GetStatisticMonthRecurringEntryResponse } from "./GetStatisticMonthRecurringEntryResponse";

export interface GetStatisticMonthResponse {
  types: GetStatisticMonthItemResponse[];
  accounts: GetStatisticMonthItemResponse[];
  classifications: GetStatisticMonthItemResponse[];
  classificationsOfYear: ChartDataOfYearDto[];
  recurringEntries: GetStatisticMonthRecurringEntryResponse[];
}
