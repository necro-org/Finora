import { LocalizationProvider as LocalizationProviderLib } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export default function LocalizationProvider({
  children,
}: LocalizationProviderProps) {
  return (
    <LocalizationProviderLib
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </LocalizationProviderLib>
  );
}
