import { useFinancialAccounts } from "@pages/Contas/queries/useFinancialAccounts";
import AutoComplete from "./AutoComplete";

interface AutoCompleteAccountProps {
  name: string;
  required?: boolean;
  onChange?: (d: string | null) => void;
  value?: string;
}

export default function AutoCompleteAccount({
  name,
  required,
  onChange,
  value,
}: AutoCompleteAccountProps) {
  const {
    data,
    isLoading: _isLoading,
    isFetching,
    refetch,
  } = useFinancialAccounts({ enabled: false });
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Conta"
      name={name}
      idField="id"
      renderOptions={(d) => d.name}
      onRefetch={refetch}
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}
