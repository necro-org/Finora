import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";

import SectionCard from "@components/SectionCard";
import { formatCurrency } from "@utils";

import type { GetStatisticMonthTypeEvolutionResponse } from "../api/types/GetStatisticMonthTypeEvolutionResponse";

interface ChartTypeEvolutionProps {
  data: GetStatisticMonthTypeEvolutionResponse[];
  year: number;
}

const MONTHS = Array.from({ length: 12 }, (_, index) =>
  dayjs().month(index).format("MMM"),
);

export default function ChartTypeEvolution({
  data,
  year,
}: ChartTypeEvolutionProps) {
  return (
    <SectionCard
      title="Despesas por tipo no ano"
      subtitle={`Os 5 tipos com maior gasto mês a mês em ${year}`}
    >
      <LineChart
        height={340}
        xAxis={[{ scaleType: "point", data: MONTHS }]}
        yAxis={[
          {
            valueFormatter: (value: number) =>
              new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
                value,
              ),
          },
        ]}
        series={data.map((item) => ({
          id: item.id,
          label: item.label,
          color: item.color || undefined,
          data: item.values,
          curve: "monotoneX",
          showMark: false,
          valueFormatter: (value: number | null) => formatCurrency(value),
        }))}
        grid={{ horizontal: true }}
        localeText={{
          noData: "Nenhuma despesa neste ano",
        }}
      />
    </SectionCard>
  );
}
