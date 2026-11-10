import { Typography } from "@mui/material";

import { ClassificationEnum } from "@pages/Lancamentos/data/dtos/ClassificationEnum";
import { formatMoney } from "@utils";

interface AmountTextProps {
  amount: number;
  classification: ClassificationEnum;
}

export default function AmountText({
  amount,
  classification,
}: AmountTextProps) {
  const isExpense = classification === ClassificationEnum.Expense;

  return (
    <Typography
      component="span"
      variant="body2"
      sx={{
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        color: isExpense ? "error.main" : "success.main",
      }}
    >
      {isExpense ? "− " : "+ "}
      {formatMoney(amount)}
    </Typography>
  );
}
