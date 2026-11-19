import {
  createSerializer,
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
  type inferParserType,
} from "nuqs";

import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";
import { DateReferenceEnum } from "@pages/Lancamentos/api/types/DateReferenceEnum";
import { endOfMonth, startOfMonth } from "@utils";

const lancamentosFilterParsers = {
  initialDate: parseAsString,
  finalDate: parseAsString,
  initialAmount: parseAsFloat,
  finalAmount: parseAsFloat,
  searchText: parseAsString,
  typeId: parseAsString,
  accountId: parseAsString,
  classification: parseAsStringLiteral(Object.values(ClassificationEnum)),
  isNotConfirmed: parseAsBoolean,
  dateReference: parseAsStringLiteral(Object.values(DateReferenceEnum)),
};

export type LancamentosFilterData = inferParserType<
  typeof lancamentosFilterParsers
>;

export const serializeLancamentosFilters = createSerializer(
  lancamentosFilterParsers,
);

export function getDefaultFilters(): LancamentosFilterData {
  return {
    initialDate: startOfMonth(),
    finalDate: endOfMonth(),
    initialAmount: null,
    finalAmount: null,
    searchText: null,
    typeId: null,
    accountId: null,
    classification: null,
    isNotConfirmed: null,
    dateReference: DateReferenceEnum.EntryDate,
  };
}

export function useLancamentosFilterStore() {
  const [filters, setQueryStates] = useQueryStates(lancamentosFilterParsers, {
    history: "push",
  });

  return {
    filters,
    search: serializeLancamentosFilters(filters),
    setFilters: (all: LancamentosFilterData) => setQueryStates(all),
    clearFilter: () => setQueryStates(getDefaultFilters()),
  };
}
