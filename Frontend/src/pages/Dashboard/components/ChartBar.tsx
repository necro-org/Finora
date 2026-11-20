import { BarChart } from "@mui/x-charts/BarChart";

import SectionCard from "@components/SectionCard";
import LinkBarElement from "@components/LinkBarElement";
import useClassificationColor from "@hooks/useClassificationColor";
import { formatCurrency } from "@utils";
import type { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

import type { ChartDataOfYearDto } from "../api/types/ChartDataOfYearDto";

interface ChartBarProps {
  data: ChartDataOfYearDto[];
  year: number;
  getItemLink?: (
    monthNumber: number,
    classification: ClassificationEnum,
  ) => string;
}

export default function ChartBar({ data, year, getItemLink }: ChartBarProps) {
  const getClassificationColor = useClassificationColor();

  const months = [
    ...new Map(data.map((x) => [x.monthNumber, x.month])).entries(),
  ];
  const classifications = [...new Set(data.map((x) => x.classification))];

  const series = classifications.map((classification) => {
    const itemsByClassification = data.filter(
      (x) => x.classification === classification,
    );

    return {
      id: classification,
      label: itemsByClassification[0]?.label,
      color: getClassificationColor(
        classification,
        itemsByClassification[0]?.color,
      ),
      valueFormatter: (value: number | null) => formatCurrency(value),
      data: months.map(([monthNumber]) => {
        const found = itemsByClassification.find(
          (x) => x.monthNumber === monthNumber,
        );
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
        xAxis={[{ scaleType: "band", data: months.map(([, month]) => month) }]}
        yAxis={[
          {
            valueFormatter: (value: number) =>
              new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
                value,
              ),
          },
        ]}
        series={series}
        slots={{ bar: LinkBarElement }}
        slotProps={{
          bar: ({ id, dataIndex }) => {
            const month = months[dataIndex];
            return {
              href: month && getItemLink?.(month[0], id as ClassificationEnum),
            };
          },
        }}
        grid={{ horizontal: true }}
        localeText={{
          noData: "Nenhuma informação para ser exibida",
        }}
      />
    </SectionCard>
  );
}
