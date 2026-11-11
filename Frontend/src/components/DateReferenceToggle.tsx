import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

import {
  DateReferenceEnum,
  DateReferenceLabel,
} from "@pages/Lancamentos/api/types/DateReferenceEnum";

interface DateReferenceToggleProps {
  value: DateReferenceEnum;
  onChange: (value: DateReferenceEnum) => void;
  label?: string;
}

const OPTIONS = [
  {
    value: DateReferenceEnum.EntryDate,
    icon: <EventNoteRoundedIcon />,
    hint: "Considera a data em que o lançamento foi registrado, por exemplo o mês da fatura",
  },
  {
    value: DateReferenceEnum.PaymentDate,
    icon: <PaymentsRoundedIcon />,
    hint: "Considera a data em que a compra foi feita de fato. Sem data de pagamento, usa a de lançamento",
  },
];

export default function DateReferenceToggle({
  value,
  onChange,
  label = "Datas por",
}: DateReferenceToggleProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: "nowrap" }}
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        color="primary"
        value={value}
        onChange={(_, newValue: DateReferenceEnum | null) => {
          if (newValue) onChange(newValue);
        }}
        aria-label={label}
        sx={{
          backgroundColor: "background.paper",
          "& .MuiToggleButton-root": {
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            textTransform: "none",
            fontWeight: 600,
          },
        }}
      >
        {OPTIONS.map((option) => (
          <Tooltip key={option.value} title={option.hint}>
            <ToggleButton
              value={option.value}
              aria-label={DateReferenceLabel[option.value]}
            >
              {option.icon}
              {DateReferenceLabel[option.value]}
            </ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
