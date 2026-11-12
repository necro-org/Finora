import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";
import BoxColor from "@components/BoxColor";

import { useFinancialTypes } from "./queries/useFinancialTypes";
import { useDeleteFinancialType } from "./mutations/useDeleteFinancialType";
import GridEditAction from "@components/GridEditAction";
import { Link } from "react-router";
import { paths } from "@libs/paths";
import { confirmDelete } from "@libs/alert";

export default function Tipos() {
  const pageTitle = "Tipos";

  const { data, isLoading, isFetching } = useFinancialTypes({
    enabled: true,
  });
  const { mutateAsync } = useDeleteFinancialType();

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
            to={paths.tiposForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <DataTable
        tableKey="types"
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
              <GridEditAction key="edit-item" to={paths.tiposForm(row.id)} />,
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
