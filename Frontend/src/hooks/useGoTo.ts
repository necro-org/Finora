import { useNavigate } from "react-router";

import { paths } from "@libs/paths";

export function useGoTo() {
  const navigate = useNavigate();

  return {
    goToTipos: () => navigate(paths.tipos()),
    goToContas: () => navigate(paths.contas()),
    goToLancamentos: () => navigate(paths.lancamentos()),
    goToRecurringEntries: () => navigate(paths.recurringEntries()),
    goToPainel: () => navigate(paths.painel()),
  };
}
