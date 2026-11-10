import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "@components/PageContainer";
import DataTable from "@components/DataTable";

import useRecurringEntriesList from "./data/useRecurringEntriesList";
import useRecurringEntriesDelete from "./data/useRecurringEntriesDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import Chip from "@mui/material/Chip";
import { formatDateToShow } from "@utils";
import AmountText from "@components/AmountText";
import ClassificationChip from "@components/ClassificationChip";

export default function RecurringEntries() {
  const pageTitle = "Lançamentos Recorrentes";

  const { data, isLoading, isFetching } = useRecurringEntriesList();
  const { mutateAsync } = useRecurringEntriesDelete();
  const { goToRecurringEntriesForm } = useGoTo();

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
      <DataTable
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
            field: "dayOfMonth",
            headerName: "Dia",
            width: 70,
            valueFormatter: (value) => `Dia ${value}`,
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
    </PageContainer>
  );
}
