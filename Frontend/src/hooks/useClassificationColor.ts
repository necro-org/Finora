import { useTheme } from "@mui/material/styles";

import {
  ClassificationEnum,
  ClassificationLabel,
} from "@pages/Lancamentos/api/types/ClassificationEnum";

export default function useClassificationColor() {
  const theme = useTheme();

  return (key: string, fallback?: string | null) => {
    if (
      key === ClassificationEnum.Expense ||
      key === ClassificationLabel.Expense
    ) {
      return theme.palette.error.main;
    }
    if (
      key === ClassificationEnum.Revenue ||
      key === ClassificationLabel.Revenue
    ) {
      return theme.palette.success.main;
    }
    return fallback || undefined;
  };
}
