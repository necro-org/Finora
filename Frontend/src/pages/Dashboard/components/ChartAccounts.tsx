import { BarChart } from "@mui/x-charts/BarChart";

import SectionCard from "@components/SectionCard";
import useClassificationColor from "@hooks/useClassificationColor";
import { formatCurrency } from "@utils";
import {
  ClassificationEnum,
  ClassificationLabel,
} from "@pages/Lancamentos/api/types/ClassificationEnum";

import type { GetStatisticMonthAccountResponse } from "../api/types/GetStatisticMonthAccountResponse";

interface ChartAccountsProps {
  data: GetStatisticMonthAccountResponse[];
}

const BAR_HEIGHT_PER_ACCOUNT = 56;
const MIN_HEIGHT = 200;

export default function ChartAccounts({ data }: ChartAccountsProps) {
  const getClassificationColor = useClassificationColor();

  const height = Math.max(
    MIN_HEIGHT,
    data.length * BAR_HEIGHT_PER_ACCOUNT + 80,
  );

  return (
    <SectionCard
      title="Por conta"
      subtitle="Entradas e saídas do mês em cada conta"
    >
      <BarChart
        layout="horizontal"
        height={height}
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
            label: ClassificationLabel.Revenue,
            color: getClassificationColor(ClassificationEnum.Revenue),
            valueFormatter: (value: number | null) => formatCurrency(value),
            data: data.map((item) => item.revenue),
          },
          {
            label: ClassificationLabel.Expense,
            color: getClassificationColor(ClassificationEnum.Expense),
            valueFormatter: (value: number | null) => formatCurrency(value),
            data: data.map((item) => item.expense),
          },
        ]}
        grid={{ vertical: true }}
        localeText={{
          noData: "Nenhum lançamento neste mês",
        }}
      />
    </SectionCard>
  );
}
