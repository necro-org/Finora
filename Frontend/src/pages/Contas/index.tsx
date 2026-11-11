import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";
import BoxColor from "@components/BoxColor";

import { useFinancialAccounts } from "./queries/useFinancialAccounts";
import { useDeleteFinancialAccount } from "./mutations/useDeleteFinancialAccount";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";

export default function Contas() {
  const pageTitle = "Contas";

  const { data, isLoading, isFetching } = useFinancialAccounts({
    enabled: true,
  });
  const { mutateAsync } = useDeleteFinancialAccount();

  const { goToContasForm } = useGoTo();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToContasForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <DataTable
        tableKey="accounts"
        columns={[
          {
            field: "name",
            headerName: "Nome",
            flex: 1,
          },
          {
            field: "color",
            headerName: "Cor",
            renderCell: ({ row }) => <BoxColor color={row.color} />,
          },
          {
            field: "id",
            type: "actions",
            align: "right",
            getActions: ({ row }) => [
              <GridActionsCellItem
                key="edit-item"
                icon={<EditIcon />}
                label="Edit"
                onClick={() => goToContasForm(row.id)}
              />,
              <GridActionsCellItem
                key="delete-item"
                icon={<DeleteIcon />}
                label="Delete"
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
