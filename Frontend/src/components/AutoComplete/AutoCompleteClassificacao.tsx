import { ClassificationList } from "@pages/Lancamentos/api/types/ClassificationEnum";
import useClassificationColor from "@hooks/useClassificationColor";
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
  const getClassificationColor = useClassificationColor();

  return (
    <AutoComplete
      options={ClassificationList}
      label="Classificação"
      name={name}
      idField="value"
      renderOptions={(d) => d.label}
      getOptionColor={(d) => getClassificationColor(d.value)}
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}
