import { Stack, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

interface TrendCaptionProps {
  current: number | null;
  previous: number | null;
  previousMonthLabel: string;
  higherIsBetter: boolean;
  unit?: "percent" | "points";
}

const MIN_VISIBLE_CHANGE = 0.05;

const numberFormat = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export default function TrendCaption({
  current,
  previous,
  previousMonthLabel,
  higherIsBetter,
  unit = "percent",
}: TrendCaptionProps) {
  if (current === null || previous === null || previous === 0) {
    return (
      <Typography variant="caption" color="text.secondary">
        Sem base em {previousMonthLabel}
      </Typography>
    );
  }

  const change =
    unit === "points"
      ? current - previous
      : ((current - previous) / Math.abs(previous)) * 100;

  if (Math.abs(change) < MIN_VISIBLE_CHANGE) {
    return (
      <Typography variant="caption" color="text.secondary">
        Igual a {previousMonthLabel}
      </Typography>
    );
  }

  const isIncrease = change > 0;
  const isGood = isIncrease === higherIsBetter;
  const suffix = unit === "points" ? " p.p." : "%";

  return (
    <Stack direction="row" alignItems="center" component="span">
      <Stack
        direction="row"
        alignItems="center"
        component="span"
        sx={{ color: isGood ? "success.main" : "error.main", ml: -0.75 }}
      >
        {isIncrease ? (
          <ArrowDropUpRoundedIcon fontSize="small" />
        ) : (
          <ArrowDropDownRoundedIcon fontSize="small" />
        )}
        <Typography variant="caption" fontWeight={600}>
          {numberFormat.format(Math.abs(change))}
          {suffix}
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
        vs. {previousMonthLabel}
      </Typography>
    </Stack>
  );
}
