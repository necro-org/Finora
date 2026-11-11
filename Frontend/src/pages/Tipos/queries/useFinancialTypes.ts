import { useQuery } from "@tanstack/react-query";

import { getFinancialTypes } from "../api/services/getFinancialTypes";
import { financialTypesKeys } from "./keys";

interface UseFinancialTypesParams {
  enabled?: boolean;
}

export function useFinancialTypes({
  enabled = true,
}: UseFinancialTypesParams = {}) {
  return useQuery({
    queryKey: financialTypesKeys.lists(),
    queryFn: getFinancialTypes,
    enabled,
  });
}
