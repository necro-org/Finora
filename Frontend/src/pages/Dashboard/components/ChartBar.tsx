import { BarChart } from "@mui/x-charts/BarChart";

import SectionCard from "@components/SectionCard";
import useClassificationColor from "@hooks/useClassificationColor";
import { formatCurrency } from "@utils";

import type { ChartDataOfYearDto } from "../data/dtos/ChartDataOfYearDto";

interface ChartBarProps {
  data: ChartDataOfYearDto[];
  year: number;
}

export default function ChartBar({ data, year }: ChartBarProps) {
  const getClassificationColor = useClassificationColor();

  const months = [...new Set(data.map((x) => x.month))];
  const labels = [...new Set(data.map((x) => x.label))];

  const series = labels.map((label) => {
    const itemsByLabel = data.filter((x) => x.label === label);

    return {
      label,
      color: getClassificationColor(label, itemsByLabel[0]?.color),
      valueFormatter: (value: number | null) => formatCurrency(value),
      data: months.map((month) => {
        const found = itemsByLabel.find((x) => x.month === month);
        return found?.value ?? 0;
      }),
    };
  });

  return (
    <SectionCard
      title="Evolução no ano"
      subtitle={`Receitas e despesas mês a mês em ${year}`}
    >
      <BarChart
        height={340}
        borderRadius={6}
        xAxis={[{ scaleType: "band", data: months }]}
        yAxis={[
          {
            valueFormatter: (value: number) =>
              new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
                value,
              ),
          },
        ]}
        series={series}
        grid={{ horizontal: true }}
        localeText={{
          noData: "Nenhuma informação para ser exibida",
        }}
      />
    </SectionCard>
  );
}
