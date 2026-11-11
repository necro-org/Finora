import { useQuery } from "@tanstack/react-query";

import { getFinancialTypeById } from "../api/services/getFinancialTypeById";
import { financialTypesKeys } from "./keys";

export function useFinancialType(id?: string) {
  return useQuery({
    queryKey: financialTypesKeys.detail(id ?? ""),
    queryFn: () => getFinancialTypeById(id as string),
    enabled: !!id,
  });
}
