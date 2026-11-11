import api from "@libs/api";
import type { DateReferenceEnum } from "@pages/Lancamentos/api/types/DateReferenceEnum";
import type { GetStatisticMonthResponse } from "../types/GetStatisticMonthResponse";

export async function getDashboard(
  date: string,
  dateReference: DateReferenceEnum,
) {
  const response = await api.get<GetStatisticMonthResponse>("/Dashboards", {
    params: { date, dateReference },
  });
  return response.data;
}
