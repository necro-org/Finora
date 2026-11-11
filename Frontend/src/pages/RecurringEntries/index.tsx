import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "@components/PageContainer";
import DataTable from "@components/DataTable";
import SectionCard from "@components/SectionCard";
import StatCard from "@components/StatCard";
import MonthNavigator from "@components/MonthNavigator";
import RecurringStatusChip from "@components/RecurringStatusChip";
import AmountText from "@components/AmountText";
import ClassificationChip from "@components/ClassificationChip";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import { formatCurrency, formatDate, formatDateToShow } from "@utils";
import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

import { useRecurringEntries } from "./queries/useRecurringEntries";
import { useDeleteRecurringEntry } from "./mutations/useDeleteRecurringEntry";
import type { ListRecurringEntriesResponse } from "./api/types/ListRecurringEntriesResponse";

function sumByClassification(
  entries: ListRecurringEntriesResponse[],
  classification: ClassificationEnum,
) {
  return entries
    .filter((x) => x.classification === classification)
    .reduce((total, x) => total + x.amount, 0);
}

export default function RecurringEntries() {
  const pageTitle = "Lançamentos Recorrentes";

  const [month, setMonth] = useState(() => dayjs().startOf("month"));

  const { data, isLoading, isFetching } = useRecurringEntries(
    formatDate(month) as string,
  );
  const { mutateAsync } = useDeleteRecurringEntry();
  const { goToRecurringEntriesForm } = useGoTo();

  const entriesOfMonth = (data || []).filter(
    (x) => x.isApplicableInMonth || x.isPaidInMonth,
  );
  const paidEntries = entriesOfMonth.filter((x) => x.isPaidInMonth);
  const pendingEntries = entriesOfMonth.filter((x) => !x.isPaidInMonth);

  const pendingRevenue = sumByClassification(
    pendingEntries,
    ClassificationEnum.Revenue,
  );
  const pendingExpense = sumByClassification(
    pendingEntries,
    ClassificationEnum.Expense,
  );

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToRecurringEntriesForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <Stack gap={2}>
        <SectionCard
          title="Período"
          subtitle="Escolha o mês para conferir o que já foi lançado"
          action={<MonthNavigator value={month} onChange={setMonth} />}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                label="Lançados"
                value={`${paidEntries.length} de ${entriesOfMonth.length}`}
                icon={<EventAvailableRoundedIcon />}
                color="primary"
                caption={
                  pendingEntries.length > 0
                    ? `${pendingEntries.length} ainda pendentes`
                    : "Todos os recorrentes do mês lançados"
                }
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                label="Receitas a entrar"
                value={formatCurrency(pendingRevenue)}
                icon={<TrendingUpRoundedIcon />}
                color="success"
                caption="Recorrentes de receita pendentes"
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                label="Despesas a sair"
                value={formatCurrency(pendingExpense)}
                icon={<TrendingDownRoundedIcon />}
                color="error"
                caption="Recorrentes de despesa pendentes"
                loading={isLoading}
              />
            </Grid>
          </Grid>
        </SectionCard>

        <DataTable
          tableKey="recurring-entries"
          columns={[
            {
              field: "description",
              headerName: "Descrição",
              flex: 1,
              valueFormatter: (value) => value ?? "—",
            },
            {
              field: "amount",
              headerName: "Valor",
              width: 130,
              align: "right",
              headerAlign: "right",
              renderCell: ({ row }) => (
                <AmountText
                  amount={row.amount}
                  classification={row.classification}
                />
              ),
            },
            {
              field: "classification",
              headerName: "Classificação",
              width: 130,
              renderCell: ({ row }) => (
                <ClassificationChip classification={row.classification} />
              ),
            },
            {
              field: "occurrenceDate",
              headerName: "Data no mês",
              width: 110,
              valueFormatter: (value) => formatDateToShow(value),
            },
            {
              field: "startDate",
              headerName: "Início",
              width: 110,
              valueFormatter: (value) => formatDateToShow(value),
            },
            {
              field: "endDate",
              headerName: "Encerramento",
              width: 120,
              valueFormatter: (value) => formatDateToShow(value) || "—",
            },
            {
              field: "isActive",
              headerName: "Status",
              width: 100,
              renderCell: ({ row }) => (
                <Chip
                  label={row.isActive ? "Ativo" : "Inativo"}
                  color={row.isActive ? "success" : "default"}
                  variant="outlined"
                  size="small"
                />
              ),
            },
            {
              field: "isPaidInMonth",
              headerName: "No mês",
              width: 110,
              renderCell: ({ row }) => (
                <RecurringStatusChip
                  isPaid={row.isPaidInMonth}
                  isApplicable={row.isApplicableInMonth}
                  occurrenceDate={row.occurrenceDate}
                />
              ),
            },
            {
              field: "id",
              type: "actions",
              align: "right",
              getActions: ({ row }) => [
                <GridActionsCellItem
                  key="edit-item"
                  icon={<EditIcon />}
                  label="Editar"
                  onClick={() => goToRecurringEntriesForm(row.id)}
                />,
                <GridActionsCellItem
                  key="delete-item"
                  icon={<DeleteIcon />}
                  label="Remover"
                  onClick={() =>
                    confirmDelete(async () => await mutateAsync(row.id))
                  }
                />,
              ],
            },
          ]}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </Stack>
    </PageContainer>
  );
}
