import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DateReferenceEnum } from "@pages/Lancamentos/data/dtos/DateReferenceEnum";

interface DashboardPreferencesStore {
  dateReference: DateReferenceEnum;
  setDateReference: (dateReference: DateReferenceEnum) => void;
}

export const useDashboardPreferencesStore = create<DashboardPreferencesStore>()(
  persist(
    (set) => ({
      dateReference: DateReferenceEnum.EntryDate,
      setDateReference: (dateReference) => set(() => ({ dateReference })),
    }),
    {
      name: "dashboard-preferences",
      partialize: (state) => ({ dateReference: state.dateReference }),
    },
  ),
);
