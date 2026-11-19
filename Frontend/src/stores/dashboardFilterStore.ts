import dayjs from "dayjs";
import { createParser, parseAsStringLiteral, useQueryStates } from "nuqs";

import { DateReferenceEnum } from "@pages/Lancamentos/api/types/DateReferenceEnum";

const parseAsMonth = createParser({
  parse: (value) => {
    const month = dayjs(value);
    return month.isValid() ? month.startOf("month") : null;
  },
  serialize: (value) => value.format("YYYY-MM"),
  eq: (a, b) => a.isSame(b, "month"),
});

const dashboardFilterParsers = {
  month: parseAsMonth.withDefault(dayjs().startOf("month")),
  dateReference: parseAsStringLiteral(
    Object.values(DateReferenceEnum),
  ).withDefault(DateReferenceEnum.EntryDate),
};

export function useDashboardFilterStore() {
  const [filters, setFilters] = useQueryStates(dashboardFilterParsers, {
    history: "push",
  });

  return { filters, setFilters };
}
