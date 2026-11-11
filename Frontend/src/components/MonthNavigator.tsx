import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface MonthNavigatorProps {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

export default function MonthNavigator({ value, onChange }: MonthNavigatorProps) {
  const label = value.locale("pt-br").format("MMMM [de] YYYY");
  const title = label.charAt(0).toUpperCase() + label.slice(1);
  const isCurrentMonth = value.isSame(dayjs(), "month");

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Tooltip title="Mês anterior">
        <IconButton onClick={() => onChange(value.subtract(1, "month"))}>
          <ChevronLeftRoundedIcon />
        </IconButton>
      </Tooltip>
      <Typography
        variant="subtitle1"
        sx={{ minWidth: 160, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Tooltip title="Próximo mês">
        <IconButton onClick={() => onChange(value.add(1, "month"))}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Tooltip>
      <Button
        size="small"
        variant="outlined"
        disabled={isCurrentMonth}
        onClick={() => onChange(dayjs().startOf("month"))}
      >
        Mês atual
      </Button>
    </Stack>
  );
}
