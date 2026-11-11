import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Typography } from "@mui/material";

import SectionCard from "@components/SectionCard";
import { formatCurrency } from "@utils";

import type { GetStatisticMonthItemResponse } from "../api/types/GetStatisticMonthItemResponse";

interface ChartPieProps {
  data: GetStatisticMonthItemResponse[];
  title: string;
  subtitle?: string;
  innerRadius?: number;
}

const CHART_SIZE = 200;

export default function ChartPie({
  data,
  title,
  subtitle,
  innerRadius = 55,
}: ChartPieProps) {
  const items = data.filter((item) => item.value > 0);
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <SectionCard title={title} subtitle={subtitle} sx={{ height: "100%" }}>
      {items.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Nenhum lançamento neste mês
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={3}
        >
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <PieChart
              series={[
                {
                  data: items.map((item) => ({
                    id: item.id,
                    value: item.value,
                    label: item.label,
                    color: item.color || undefined,
                  })),
                  innerRadius,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  valueFormatter: ({ value }) => formatCurrency(value),
                },
              ]}
              hideLegend
              height={CHART_SIZE}
              width={CHART_SIZE}
            />
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <Typography variant="caption" color="text.secondary">
                Total
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatCurrency(total)}
              </Typography>
            </Stack>
          </Box>

          <Stack gap={1.25} sx={{ flex: 1, width: "100%", minWidth: 0 }}>
            {items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                gap={1.5}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    flexShrink: 0,
                    backgroundColor: item.color || "grey.400",
                  }}
                />
                <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {((item.value / total) * 100).toFixed(0)}%
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(item.value)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </SectionCard>
  );
}
