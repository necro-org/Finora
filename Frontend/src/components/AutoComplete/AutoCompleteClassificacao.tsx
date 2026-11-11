import { ClassificationList } from "@pages/Lancamentos/api/types/ClassificationEnum";
import AutoComplete from "./AutoComplete";

interface AutoCompleteClassificacaoProps {
  name: string;
  required?: boolean;
  onChange?: (d: string | null) => void;
  value?: string;
}
export default function AutoCompleteClassificacao({
  name,
  required,
  onChange,
  value,
}: AutoCompleteClassificacaoProps) {
  return (
    <AutoComplete
      options={ClassificationList}
      label="Classificação"
      name={name}
      idField="value"
      renderOptions={(d) => d.label}
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}
