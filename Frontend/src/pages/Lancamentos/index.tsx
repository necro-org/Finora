import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";

import PageContainer from "@components/PageContainer";
import DataTable from "@components/DataTable";
import SectionCard from "@components/SectionCard";
import StatCard from "@components/StatCard";
import AmountText from "@components/AmountText";
import ClassificationChip from "@components/ClassificationChip";

import useFinancialEntriesList from "./data/useFinancialEntriesList";
import useFinancialEntriesDelete from "./data/useFinancialEntriesDelete";
import { ClassificationEnum } from "./data/dtos/ClassificationEnum";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import { formatCurrency, formatDateToShow } from "@utils";

import BoxColor from "@components/BoxColor";
import UploadCsvButton from "@components/UploadCsvButton";
import { useLancamentosFilterStore } from "@stores/lancamentosFilterStore";
import FormFilter from "./components/form-filter";

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const { filters } = useLancamentosFilterStore();

  const { isNotConfirmed, ...restOfFilters } = filters;

  const { data, isLoading, isFetching } = useFinancialEntriesList({
    data: {
      ...restOfFilters,
      isConfirmed: isNotConfirmed === null ? null : !isNotConfirmed,
    },
  });

  const { mutateAsync } = useFinancialEntriesDelete();
  const { goToLancamentosForm } = useGoTo();

  const entries = data || [];
  const sumOf = (classification: ClassificationEnum) =>
    entries
      .filter((entry) => entry.classification === classification)
      .reduce((sum, entry) => sum + entry.amount, 0);

  const revenue = sumOf(ClassificationEnum.Revenue);
  const expense = sumOf(ClassificationEnum.Expense);
  const balance = revenue - expense;
  const pendingCount = entries.filter((entry) => !entry.isConfirmed).length;

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack flexDirection="row" gap={1}>
          <UploadCsvButton />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToLancamentosForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <Stack gap={2}>
        <SectionCard title="Filtros" subtitle="Refine os lançamentos exibidos">
          <FormFilter />
        </SectionCard>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Receitas"
              value={formatCurrency(revenue)}
              icon={<TrendingUpRoundedIcon />}
              color="success"
              loading={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Despesas"
              value={formatCurrency(expense)}
              icon={<TrendingDownRoundedIcon />}
              color="error"
              loading={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Saldo"
              value={formatCurrency(balance)}
              icon={<AccountBalanceWalletRoundedIcon />}
              color={balance < 0 ? "error" : "primary"}
              caption={
                pendingCount > 0
                  ? `${entries.length} lançamentos · ${pendingCount} não confirmados`
                  : `${entries.length} lançamentos`
              }
              loading={isLoading}
            />
          </Grid>
        </Grid>

        <DataTable
          columns={[
            {
              field: "description",
              headerName: "Descrição",
              flex: 1,
            },
            {
              field: "date",
              headerName: "Data",
              valueFormatter: formatDateToShow,
            },
            {
              field: "amount",
              headerName: "Valor",
              align: "right",
              headerAlign: "right",
              minWidth: 130,
              renderCell: ({ row }) => (
                <AmountText
                  amount={row.amount}
                  classification={row.classification}
                />
              ),
            },
            {
              field: "typeName",
              headerName: "Tipo",
              minWidth: 150,
              renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" height="100%" gap={1}>
                  <BoxColor color={row.typeColor} fine />
                  {row.typeName}
                </Box>
              ),
            },
            {
              field: "classificationName",
              headerName: "Classificação",
              minWidth: 120,
              renderCell: ({ row }) => (
                <ClassificationChip classification={row.classification} />
              ),
            },
            {
              field: "accountName",
              headerName: "Conta",
              minWidth: 150,
              renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" height="100%" gap={1}>
                  <BoxColor color={row.accountColor} fine />
                  {row.accountName}
                </Box>
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
                  onClick={() => goToLancamentosForm(row.id)}
                />,
                <GridActionsCellItem
                  key="delete-item"
                  icon={<DeleteIcon />}
                  label="Excluir"
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
          getRowClassName={(params) =>
            !params.row.isConfirmed ? "row-not-confirmed" : ""
          }
          sx={(theme) => ({
            "& .row-not-confirmed": {
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              boxShadow: `inset 3px 0 0 ${theme.palette.warning.main}`,
              "&:hover": {
                backgroundColor: alpha(theme.palette.warning.main, 0.18),
              },
            },
          })}
        />
      </Stack>
    </PageContainer>
  );
}
