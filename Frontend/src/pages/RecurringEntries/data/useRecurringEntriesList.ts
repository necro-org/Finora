import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";
import { fireError } from "@libs/alert";

import type { ListRecurringEntriesResponse } from "./dtos/ListRecurringEntriesResponse";

const url = "/RecurringEntries";

export const queryRecurringEntriesList = [url];

interface RequestProps {
  date: string;
}

export default function useRecurringEntriesList({ date }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<ListRecurringEntriesResponse[]>(url, {
      params: {
        date,
      },
    });
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [...queryRecurringEntriesList, date],
    queryFn: handleRequest,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
