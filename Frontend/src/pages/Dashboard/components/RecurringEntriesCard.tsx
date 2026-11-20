import {
  LinearProgress,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router";

import SectionCard from "@components/SectionCard";
import { paths } from "@libs/paths";
import AmountText from "@components/AmountText";
import RecurringStatusChip from "@components/RecurringStatusChip";
import { formatCurrency, formatDateToShow } from "@utils";
import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

import type { GetStatisticMonthRecurringEntryResponse } from "../api/types/GetStatisticMonthRecurringEntryResponse";

interface RecurringEntriesCardProps {
  data: GetStatisticMonthRecurringEntryResponse[];
  currentBalance: number;
}

function sumByClassification(
  entries: GetStatisticMonthRecurringEntryResponse[],
  classification: ClassificationEnum,
) {
  return entries
    .filter((x) => x.classification === classification)
    .reduce((total, x) => total + x.amount, 0);
}

export default function RecurringEntriesCard({
  data,
  currentBalance,
}: RecurringEntriesCardProps) {
  const pendingEntries = data.filter((x) => !x.isPaid);
  const paidCount = data.length - pendingEntries.length;
  const progress = data.length ? (paidCount / data.length) * 100 : 0;

  const pendingRevenue = sumByClassification(
    pendingEntries,
    ClassificationEnum.Revenue,
  );
  const pendingExpense = sumByClassification(
    pendingEntries,
    ClassificationEnum.Expense,
  );
  const forecastBalance = currentBalance + pendingRevenue - pendingExpense;

  return (
    <SectionCard
      title="Lançamentos recorrentes"
      subtitle="Valores fixos do mês já lançados e os que ainda faltam entrar"
      sx={{ height: "100%" }}
    >
      {data.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Nenhum lançamento recorrente para este mês
          </Typography>
        </Stack>
      ) : (
        <Stack gap={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={3}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Stack gap={0.5} sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {paidCount} de {data.length} já lançados
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                color="success"
              />
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Receitas a entrar
              </Typography>
              <Typography color="success.main" fontWeight={600}>
                {formatCurrency(pendingRevenue)}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Despesas a sair
              </Typography>
              <Typography color="error.main" fontWeight={600}>
                {formatCurrency(pendingExpense)}
              </Typography>
            </Stack>
            <Tooltip title="Saldo atual do mês + receitas a entrar - despesas a sair">
              <Stack
                sx={{
                  pl: { sm: 3 },
                  borderLeft: { sm: 1 },
                  borderColor: { sm: "divider" },
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Fechamento previsto
                </Typography>
                <Typography
                  variant="h6"
                  lineHeight={1.3}
                  color={forecastBalance < 0 ? "error.main" : "primary.main"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {formatCurrency(forecastBalance)}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>

          <TableContainer>
            <Table size="small">
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      opacity: row.isPaid ? 0.6 : 1,
                      position: "relative",
                    }}
                  >
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {formatDateToShow(row.date)}
                    </TableCell>
                    <TableCell sx={{ width: "100%" }}>
                      <MuiLink
                        component={Link}
                        to={paths.recurringEntriesForm(row.id)}
                        color="inherit"
                        underline="none"
                        sx={{
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                          },
                        }}
                      >
                        {row.description ?? "—"}
                      </MuiLink>
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <AmountText
                        amount={row.amount}
                        classification={row.classification}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <RecurringStatusChip
                        isPaid={row.isPaid}
                        occurrenceDate={row.date}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </SectionCard>
  );
}
