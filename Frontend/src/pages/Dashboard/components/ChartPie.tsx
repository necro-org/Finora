import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

import SectionCard from "@components/SectionCard";
import { useGoTo } from "@hooks/useGoTo";
import { formatCurrency } from "@utils";

import type { GetStatisticMonthItemResponse } from "../api/types/GetStatisticMonthItemResponse";

interface ChartPieProps {
  data: GetStatisticMonthItemResponse[];
  title: string;
  subtitle?: string;
  innerRadius?: number;
  getItemLink?: (item: GetStatisticMonthItemResponse) => string;
}

const CHART_SIZE = 200;

export default function ChartPie({
  data,
  title,
  subtitle,
  innerRadius = 55,
  getItemLink,
}: ChartPieProps) {
  const { goTo } = useGoTo();

  const items = data.filter((item) => item.value > 0);
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <SectionCard title={title} subtitle={subtitle} sx={{ height: "100%" }}>
      {items.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ py: 6, height: "100%" }}
        >
          <Typography variant="body2" color="text.secondary">
            Nenhum lançamento neste mês
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ xs: 3, sm: 5 }}
          sx={{ height: "100%" }}
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
              onItemClick={
                getItemLink &&
                ((event, _identifier, pieItem) => {
                  const item = items.find((x) => x.id === pieItem.id);
                  if (!item) return;
                  goTo(getItemLink(item), event);
                })
              }
              sx={getItemLink && { "& path": { cursor: "pointer" } }}
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

          <Stack
            gap={1.25}
            sx={{ flex: 1, width: "100%", minWidth: 0, maxWidth: 360 }}
          >
            {items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                gap={1.5}
                {...(getItemLink && {
                  component: Link,
                  to: getItemLink(item),
                  title: "Ver lançamentos",
                })}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  borderRadius: 1,
                  mx: -1,
                  px: 1,
                  py: 0.25,
                  ...(getItemLink && {
                    "&:hover": { backgroundColor: "action.hover" },
                  }),
                }}
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
