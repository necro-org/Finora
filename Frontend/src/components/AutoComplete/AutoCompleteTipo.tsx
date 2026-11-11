import { useFinancialTypes } from "@pages/Tipos/queries/useFinancialTypes";
import AutoComplete from "./AutoComplete";

interface AutoCompleteTipoProps {
  name: string;
  required?: boolean;
  onChange?: (d: string | null) => void;
  value?: string;
}

export default function AutoCompleteTipo({
  name,
  required,
  onChange,
  value,
}: AutoCompleteTipoProps) {
  const {
    data,
    isLoading: _isLoading,
    isFetching,
    refetch,
  } = useFinancialTypes({ enabled: false });
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Tipo"
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
