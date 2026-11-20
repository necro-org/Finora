import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";

import SectionCard from "@components/SectionCard";
import LinkBarElement from "@components/LinkBarElement";
import { formatCurrency } from "@utils";
import {
  ClassificationEnum,
  ClassificationLabel,
} from "@pages/Lancamentos/api/types/ClassificationEnum";

import type { GetStatisticMonthAccountResponse } from "../api/types/GetStatisticMonthAccountResponse";

interface ChartAccountsProps {
  data: GetStatisticMonthAccountResponse[];
  getItemLink?: (
    item: GetStatisticMonthAccountResponse,
    classification: ClassificationEnum,
  ) => string;
}

const BAR_HEIGHT_PER_ACCOUNT = 56;
const MIN_HEIGHT = 200;
const EXPENSE_OPACITY = 0.4;

export default function ChartAccounts({
  data,
  getItemLink,
}: ChartAccountsProps) {
  const theme = useTheme();

  const neutralColor = theme.palette.text.secondary;

  function getAccountColor(dataIndex: number) {
    return data[dataIndex]?.color || neutralColor;
  }

  function getExpenseColor(color: string) {
    try {
      return alpha(color, EXPENSE_OPACITY);
    } catch {
      return alpha(neutralColor, EXPENSE_OPACITY);
    }
  }

  const minHeight = Math.max(
    MIN_HEIGHT,
    data.length * BAR_HEIGHT_PER_ACCOUNT + 80,
  );

  return (
    <SectionCard
      title="Por conta"
      subtitle="Entradas e saídas do mês em cada conta"
      sx={{ height: "100%" }}
    >
      <Box sx={{ height: "100%", minHeight }}>
        <BarChart
          layout="horizontal"
          borderRadius={6}
          yAxis={[
            {
              scaleType: "band",
              data: data.map((item) => item.label),
              width: 110,
            },
          ]}
          xAxis={[
            {
              valueFormatter: (value: number) =>
                new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
                  value,
                ),
            },
          ]}
          series={[
            {
              id: ClassificationEnum.Revenue,
              label: ClassificationLabel.Revenue,
              color: neutralColor,
              colorGetter: ({ dataIndex }) => getAccountColor(dataIndex),
              valueFormatter: (value: number | null) => formatCurrency(value),
              data: data.map((item) => item.revenue),
            },
            {
              id: ClassificationEnum.Expense,
              label: ClassificationLabel.Expense,
              color: getExpenseColor(neutralColor),
              colorGetter: ({ dataIndex }) =>
                getExpenseColor(getAccountColor(dataIndex)),
              valueFormatter: (value: number | null) => formatCurrency(value),
              data: data.map((item) => item.expense),
            },
          ]}
          slots={{ bar: LinkBarElement }}
          slotProps={{
            bar: ({ id, dataIndex }) => {
              const item = data[dataIndex];
              return {
                href: item && getItemLink?.(item, id as ClassificationEnum),
              };
            },
          }}
          grid={{ vertical: true }}
          localeText={{
            noData: "Nenhum lançamento neste mês",
          }}
        />
      </Box>
    </SectionCard>
  );
}
