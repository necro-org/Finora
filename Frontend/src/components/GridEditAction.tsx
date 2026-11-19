import EditIcon from "@mui/icons-material/Edit";
import {
  GridActionsCellItem,
  type GridActionsCellItemProps,
} from "@mui/x-data-grid";
import { Link } from "react-router";

type GridEditActionProps = Omit<
  Extract<GridActionsCellItemProps, { showInMenu?: false }>,
  "icon" | "label"
> & { to: string; state?: unknown };

export default function GridEditAction({
  to,
  state,
  ...props
}: GridEditActionProps) {
  const linkProps = { component: Link, to, state };

  return (
    <GridActionsCellItem
      {...props}
      {...linkProps}
      icon={<EditIcon />}
      label="Editar"
    />
  );
}
