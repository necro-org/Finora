import { Grid, Typography } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { useState } from "react";
import dayjs from "dayjs";

import PageContainer from "@components/PageContainer";
import FetchingLoading from "@components/FetchingLoading";
import SectionCard from "@components/SectionCard";
import StatCard from "@components/StatCard";
import useClassificationColor from "@hooks/useClassificationColor";
import { formatCurrency, formatDate } from "@utils";
import { ClassificationEnum } from "@pages/Lancamentos/data/dtos/ClassificationEnum";

import useDashboards from "./data/useDashboards";
import ChartPie from "./components/ChartPie";
import ChartBar from "./components/ChartBar";

export default function Dashboard() {
  const pageTitle = "Painel";

  const todayLocaleDate = dayjs().locale("pt-br");

  const [dateYearMonth, setDateYearMonth] =
    useState<PickerValue>(todayLocaleDate);

  const selectedDate = dateYearMonth ?? todayLocaleDate;

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useDashboards({
    date: formatDate(selectedDate) as string,
  });

  const isLoading = _isLoading || isFetching;

  const getClassificationColor = useClassificationColor();

  const classifications = (data?.classifications || []).map((item) => ({
    ...item,
    color: getClassificationColor(item.id, item.color) ?? null,
  }));

  const sumOf = (classification: ClassificationEnum) =>
    classifications.find((item) => item.id === classification)?.value ?? 0;

  const revenue = sumOf(ClassificationEnum.Revenue);
  const expense = sumOf(ClassificationEnum.Expense);
  const balance = revenue - expense;
  const savingsRate = revenue > 0 ? (balance / revenue) * 100 : null;

  const periodLabel = selectedDate.locale("pt-br").format("MMMM [de] YYYY");
  const periodTitle =
    periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1);

  return (
    <PageContainer title={pageTitle}>
      <Typography color="text.secondary" sx={{ mt: -1.5, mb: 2 }}>
        Resumo de {periodTitle}
      </Typography>

      <FetchingLoading loading={isLoading} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Receitas"
            value={formatCurrency(revenue)}
            icon={<TrendingUpRoundedIcon />}
            color="success"
            caption="Entradas do mês"
            loading={_isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Despesas"
            value={formatCurrency(expense)}
            icon={<TrendingDownRoundedIcon />}
            color="error"
            caption="Saídas do mês"
            loading={_isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Saldo"
            value={formatCurrency(balance)}
            icon={<AccountBalanceWalletRoundedIcon />}
            color={balance < 0 ? "error" : "primary"}
            caption={
              balance < 0
                ? "Gastou mais do que recebeu"
                : "Receitas menos despesas"
            }
            loading={_isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Economia"
            value={savingsRate === null ? "—" : `${savingsRate.toFixed(1)}%`}
            icon={<SavingsRoundedIcon />}
            color="secondary"
            caption="Parte da receita que sobrou"
            loading={_isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <SectionCard
            title="Período"
            subtitle="Escolha o mês para analisar"
            sx={{ height: "100%" }}
          >
            <StaticDatePicker
              views={["year", "month"]}
              onChange={setDateYearMonth}
              value={dateYearMonth}
              slots={{
                actionBar: () => <div />,
                toolbar: () => <div />,
              }}
              sx={{
                backgroundColor: "transparent",
                "& .MuiDateCalendar-root": {
                  height: "auto",
                  width: "100%",
                },
              }}
              openTo="month"
            />
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <ChartPie
            data={classifications}
            title="Receitas x Despesas"
            subtitle="Resultado do mês por classificação"
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPie
            data={data?.types || []}
            title="Por tipo"
            subtitle="Movimentação do mês em cada tipo"
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPie
            data={data?.accounts || []}
            title="Por conta"
            subtitle="Movimentação do mês em cada conta"
          />
        </Grid>

        <Grid size={12}>
          <ChartBar
            data={data?.classificationsOfYear || []}
            year={selectedDate.year()}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
