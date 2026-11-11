import { LinearProgress, Stack, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import SectionCard from "@components/SectionCard";
import AmountText from "@components/AmountText";
import RecurringStatusChip from "@components/RecurringStatusChip";
import { formatCurrency, formatDateToShow } from "@utils";
import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

import type { GetStatisticMonthRecurringEntryResponse } from "../api/types/GetStatisticMonthRecurringEntryResponse";

interface RecurringEntriesCardProps {
  data: GetStatisticMonthRecurringEntryResponse[];
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
          </Stack>

          <TableContainer>
            <Table size="small">
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      opacity: row.isPaid ? 0.6 : 1,
                    }}
                  >
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {formatDateToShow(row.date)}
                    </TableCell>
                    <TableCell sx={{ width: "100%" }}>
                      {row.description ?? "—"}
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
