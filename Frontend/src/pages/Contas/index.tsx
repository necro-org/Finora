import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";
import BoxColor from "@components/BoxColor";

import { useFinancialAccounts } from "./queries/useFinancialAccounts";
import { useDeleteFinancialAccount } from "./mutations/useDeleteFinancialAccount";
import GridEditAction from "@components/GridEditAction";
import { Link } from "react-router";
import { paths } from "@libs/paths";
import { confirmDelete } from "@libs/alert";

export default function Contas() {
  const pageTitle = "Contas";

  const { data, isLoading, isFetching } = useFinancialAccounts({
    enabled: true,
  });
  const { mutateAsync } = useDeleteFinancialAccount();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to={paths.contasForm()}
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
              <GridEditAction key="edit-item" to={paths.contasForm(row.id)} />,
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
