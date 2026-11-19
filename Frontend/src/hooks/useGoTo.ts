import { useNavigate } from "react-router";

import { paths } from "@libs/paths";
import type { LancamentosFilterData } from "@stores/lancamentosFilterStore";

interface GoToEvent {
  ctrlKey: boolean;
  metaKey: boolean;
}

export function useGoTo() {
  const navigate = useNavigate();

  function goTo(path: string, event?: GoToEvent) {
    if (event?.ctrlKey || event?.metaKey) window.open(path, "_blank");
    else navigate(path);
  }

  return {
    goTo,
    goToTipos: () => goTo(paths.tipos()),
    goToContas: () => goTo(paths.contas()),
    goToLancamentos: (filters?: Partial<LancamentosFilterData>) =>
      goTo(paths.lancamentos(filters)),
    goToRecurringEntries: () => goTo(paths.recurringEntries()),
    goToPainel: () => goTo(paths.painel()),
  };
}
