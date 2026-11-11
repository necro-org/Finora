import { Chip } from "@mui/material";
import dayjs from "dayjs";

interface RecurringStatusChipProps {
  isPaid: boolean;
  occurrenceDate: string;
  isApplicable?: boolean;
}

export default function RecurringStatusChip({
  isPaid,
  occurrenceDate,
  isApplicable = true,
}: RecurringStatusChipProps) {
  if (isPaid) {
    return <Chip label="Lançado" color="success" size="small" />;
  }

  if (!isApplicable) {
    return "—";
  }

  if (dayjs(occurrenceDate).isBefore(dayjs(), "day")) {
    return <Chip label="Atrasado" color="error" size="small" />;
  }

  return (
    <Chip label="Pendente" color="warning" variant="outlined" size="small" />
  );
}
