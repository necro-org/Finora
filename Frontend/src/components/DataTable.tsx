import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import type {
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import { Box, type SxProps, type Theme } from "@mui/material";
import FetchingLoading from "./FetchingLoading";
import {
  defaultPaginationModel,
  useTablePaginationStore,
} from "@stores/tablePaginationStore";

interface DataTableProps<TData extends GridValidRowModel> {
  tableKey: string;
  data?: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  getRowClassName?: (params: GridRowClassNameParams<TData>) => string;
  sx?: SxProps<Theme>;
}

export default function DataTable<TData extends GridValidRowModel>({
  tableKey,
  data,
  columns,
  isLoading,
  isFetching,
  getRowClassName,
  sx,
}: DataTableProps<TData>) {
  const apiRef = useGridApiRef();
  const paginationModel = useTablePaginationStore(
    (state) => state.paginations[tableKey] ?? defaultPaginationModel,
  );
  const setPagination = useTablePaginationStore((state) => state.setPagination);

  return (
    <Box>
      <FetchingLoading loading={isFetching} />
      <DataGrid
        apiRef={apiRef}
        autoHeight
        loading={isLoading}
        columns={columns}
        rows={data}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPagination(tableKey, model)}
        density="compact"
        disableColumnMenu
        disableVirtualization
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50, 100]}
        localeText={{
          noRowsLabel: "Sem dados",
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} linhas selecionadas`
              : `${count.toLocaleString()} linha selecionada`,
          paginationRowsPerPage: "Linhas por página",
          paginationDisplayedRows: ({ from, to, count }) =>
            `${from}-${to} de ${count}`,
        }}
        getRowClassName={getRowClassName}
        sx={sx}
      />
    </Box>
  );
}
