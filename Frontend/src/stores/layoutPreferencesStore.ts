import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutPreferencesStore {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (isSidebarExpanded: boolean) => void;
}

export const useLayoutPreferencesStore = create<LayoutPreferencesStore>()(
  persist(
    (set) => ({
      isSidebarExpanded: true,
      setIsSidebarExpanded: (isSidebarExpanded) =>
        set(() => ({ isSidebarExpanded })),
    }),
    {
      name: "layout-preferences",
      partialize: (state) => ({ isSidebarExpanded: state.isSidebarExpanded }),
    },
  ),
);
