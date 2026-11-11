import { useQuery } from "@tanstack/react-query";

import type { DateReferenceEnum } from "@pages/Lancamentos/api/types/DateReferenceEnum";
import { getDashboard } from "../api/services/getDashboard";
import { dashboardsKeys } from "./keys";

export function useDashboard(date: string, dateReference: DateReferenceEnum) {
  return useQuery({
    queryKey: dashboardsKeys.detail(date, dateReference),
    queryFn: () => getDashboard(date, dateReference),
  });
}
