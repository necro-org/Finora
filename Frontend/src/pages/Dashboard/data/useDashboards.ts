import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { fireError } from "@libs/alert";
import type { DateReferenceEnum } from "@pages/Lancamentos/data/dtos/DateReferenceEnum";
import type { GetStatisticMonthResponse } from "./dtos/GetStatisticMonthResponse";

const url = "/Dashboards";

const queryDashboards = [url];

interface RequestProps {
  date: string;
  dateReference: DateReferenceEnum;
}

export default function useDashboards({ date, dateReference }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<GetStatisticMonthResponse>(url, {
      params: {
        date,
        dateReference,
      },
    });
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [...queryDashboards, date, dateReference],
    queryFn: handleRequest,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
