import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";
import BoxColor from "@components/BoxColor";

import useFinancialTypesList from "./data/useFinancialTypesList";
import useFinancialTypesDelete from "./data/useFinancialTypesDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";

export default function Tipos() {
  const pageTitle = "Tipos";

  const { data, isLoading, isFetching } = useFinancialTypesList({
    enabled: true,
  });
  const { mutateAsync } = useFinancialTypesDelete();

  const { goToTiposForm } = useGoTo();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToTiposForm()}
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
              <GridActionsCellItem
                key="edit-item"
                icon={<EditIcon />}
                label="Edit"
                onClick={() => goToTiposForm(row.id)}
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
