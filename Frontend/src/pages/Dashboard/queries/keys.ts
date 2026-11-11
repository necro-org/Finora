import type { DateReferenceEnum } from "@pages/Lancamentos/api/types/DateReferenceEnum";

export const dashboardsKeys = {
  all: ["dashboards"] as const,
  detail: (date: string, dateReference: DateReferenceEnum) =>
    [...dashboardsKeys.all, date, dateReference] as const,
};
