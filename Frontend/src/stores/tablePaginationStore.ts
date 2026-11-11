import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GridPaginationModel } from "@mui/x-data-grid";

export const defaultPaginationModel: GridPaginationModel = {
  page: 0,
  pageSize: 25,
};

interface TablePaginationStore {
  paginations: Record<string, GridPaginationModel>;
  setPagination: (tableKey: string, model: GridPaginationModel) => void;
}

export const useTablePaginationStore = create<TablePaginationStore>()(
  persist(
    (set) => ({
      paginations: {},
      setPagination: (tableKey, model) =>
        set((state) => ({
          paginations: { ...state.paginations, [tableKey]: model },
        })),
    }),
    {
      name: "table-pagination",
      partialize: (state) => ({ paginations: state.paginations }),
    },
  ),
);
