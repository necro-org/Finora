import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ClassificationEnum } from "@pages/Lancamentos/data/dtos/ClassificationEnum";
import { DateReferenceEnum } from "@pages/Lancamentos/data/dtos/DateReferenceEnum";
import { endOfMonth, startOfMonth } from "@utils";

export interface LancamentosFilterData {
  initialDate: string | null;
  finalDate: string | null;
  initialAmount: number | null;
  finalAmount: number | null;
  searchText: string | null;
  typeId: string | null;
  accountId: string | null;
  classification: ClassificationEnum | null;
  isNotConfirmed: boolean | null;
  dateReference: DateReferenceEnum;
}

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

interface LancamentosFilterStore {
  filters: LancamentosFilterData;
  setFilters: (all: LancamentosFilterData) => void;
  clearFilter: () => void;
}

export const useLancamentosFilterStore = create<LancamentosFilterStore>()(
  persist(
    (set) => ({
      filters: getDefaultFilters(),
      setFilters: (all) => set(() => ({ filters: all })),
      clearFilter: () => set(() => ({ filters: getDefaultFilters() })),
    }),
    {
      name: "lancamentos-filters",
      partialize: (state) => ({ filters: state.filters }),
    },
  ),
);
