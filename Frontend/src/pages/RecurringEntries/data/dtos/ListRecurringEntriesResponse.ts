import type { RecurringEntryResponse } from "./RecurringEntryResponse";

export interface ListRecurringEntriesResponse extends RecurringEntryResponse {
  occurrenceDate: string;
  isApplicableInMonth: boolean;
  isPaidInMonth: boolean;
}
