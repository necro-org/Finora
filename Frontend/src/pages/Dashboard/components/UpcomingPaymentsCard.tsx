import { LinearProgress, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import SectionCard from "@components/SectionCard";
import { formatCurrency } from "@utils";

import type { UpcomingPaymentDto } from "../api/types/UpcomingPaymentDto";

interface UpcomingPaymentsCardProps {
  data: UpcomingPaymentDto[];
}

function formatMonth({ year, month }: UpcomingPaymentDto) {
  const label = dayjs(new Date(year, month - 1, 1)).format("MMMM [de] YYYY");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function UpcomingPaymentsCard({
  data,
}: UpcomingPaymentsCardProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const highestAmount = Math.max(...data.map((item) => item.amount), 0);

  return (
    <SectionCard
      title="Contas a pagar"
      subtitle="Despesas já lançadas para os próximos meses"
      sx={{ height: "100%" }}
    >
      {data.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ py: 6, height: "100%" }}
        >
          <Typography variant="body2" color="text.secondary">
            Nenhuma despesa agendada para os próximos meses
          </Typography>
        </Stack>
      ) : (
        <Stack gap={2}>
          <Stack>
            <Typography variant="caption" color="text.secondary">
              Total comprometido
            </Typography>
            <Typography
              variant="h6"
              lineHeight={1.3}
              color="error.main"
              sx={{ whiteSpace: "nowrap" }}
            >
              {formatCurrency(total)}
            </Typography>
          </Stack>

          <Stack gap={1.5}>
            {data.map((item) => (
              <Stack key={`${item.year}-${item.month}`} gap={0.5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  gap={1}
                >
                  <Typography variant="body2">{formatMonth(item)}</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      fontVariantNumeric: "tabular-nums",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(item.amount)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(item.amount / highestAmount) * 100}
                  color="error"
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {item.count === 1
                    ? "1 lançamento"
                    : `${item.count} lançamentos`}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </SectionCard>
  );
}
