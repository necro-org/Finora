import {
  serializeLancamentosFilters,
  type LancamentosFilterData,
} from "@stores/lancamentosFilterStore";

export const paths = {
  login: () => "/",
  registrar: () => "/registrar",
  painel: () => "/painel",
  tipos: () => "/tipos",
  tiposForm: (typeId?: string) => (typeId ? `/tipos/${typeId}` : "/tipos/novo"),
  contas: () => "/contas",
  contasForm: (accountId?: string) =>
    accountId ? `/contas/${accountId}` : "/contas/novo",
  lancamentos: (filters: Partial<LancamentosFilterData> = {}) =>
    serializeLancamentosFilters("/lancamentos", filters),
  lancamentosForm: (financialEntryId?: string) =>
    financialEntryId ? `/lancamentos/${financialEntryId}` : "/lancamentos/novo",
  recurringEntries: () => "/lancamentos-recorrentes",
  recurringEntriesForm: (recurringEntryId?: string) =>
    recurringEntryId
      ? `/lancamentos-recorrentes/${recurringEntryId}`
      : "/lancamentos-recorrentes/novo",
};
