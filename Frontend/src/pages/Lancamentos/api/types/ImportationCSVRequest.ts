export interface ImportationCSVRequest {
  dateFinancialEntry: string;
  timezoneOffsetMinutes: number;
  file: File;
  accountId: string | null;
}
