import { Chip } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import {
  ClassificationEnum,
  ClassificationLabel,
} from "@pages/Lancamentos/api/types/ClassificationEnum";

interface ClassificationChipProps {
  classification: ClassificationEnum;
}

export default function ClassificationChip({
  classification,
}: ClassificationChipProps) {
  const theme = useTheme();
  const isExpense = classification === ClassificationEnum.Expense;
  const color = isExpense ? theme.palette.error : theme.palette.success;

  return (
    <Chip
      size="small"
      label={ClassificationLabel[classification]}
      icon={
        isExpense ? <ArrowDownwardRoundedIcon /> : <ArrowUpwardRoundedIcon />
      }
      sx={{
        color: color.dark,
        backgroundColor: alpha(color.main, 0.12),
        "& .MuiChip-icon": { color: color.main },
      }}
    />
  );
}
