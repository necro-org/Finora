import {
  Box,
  ListItemButton,
  Stack,
  Typography,
  type Theme,
} from "@mui/material";
import { Link } from "react-router";

import SectionCard from "@components/SectionCard";
import { formatCurrency, formatDateToShow } from "@utils";
import { paths } from "@libs/paths";

import type { GetStatisticMonthTopExpenseResponse } from "../api/types/GetStatisticMonthTopExpenseResponse";

interface TopExpensesCardProps {
  data: GetStatisticMonthTopExpenseResponse[];
  totalExpense: number;
}

export default function TopExpensesCard({
  data,
  totalExpense,
}: TopExpensesCardProps) {
  return (
    <SectionCard
      title="Maiores gastos"
      subtitle="Os 5 lançamentos de despesa mais altos do mês"
      sx={{ height: "100%" }}
    >
      {data.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ py: 6, height: "100%" }}
        >
          <Typography variant="body2" color="text.secondary">
            Nenhuma despesa neste mês
          </Typography>
        </Stack>
      ) : (
        <Stack gap={0.5} sx={{ mx: -1 }}>
          {data.map((item, index) => (
            <ListItemButton
              key={item.id}
              component={Link}
              to={paths.lancamentosForm(item.id)}
              sx={{ borderRadius: 2, px: 1, gap: 1.5 }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                sx={{ width: 16, textAlign: "center", flexShrink: 0 }}
              >
                {index + 1}
              </Typography>
              <Stack sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {item.description ?? "—"}
                </Typography>
                <Stack direction="row" alignItems="center" gap={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      flexShrink: 0,
                      backgroundColor: (theme: Theme) =>
                        item.typeColor || theme.palette.grey[400],
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {item.typeName ?? "Sem tipo"} ·{" "}
                    {formatDateToShow(item.date)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack alignItems="flex-end" sx={{ flexShrink: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="error.main"
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(item.amount)}
                </Typography>
                {totalExpense > 0 ? (
                  <Typography variant="caption" color="text.secondary">
                    {((item.amount / totalExpense) * 100).toFixed(0)}% do mês
                  </Typography>
                ) : null}
              </Stack>
            </ListItemButton>
          ))}
        </Stack>
      )}
    </SectionCard>
  );
}
