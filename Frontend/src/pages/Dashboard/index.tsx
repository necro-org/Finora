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
import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";
import { DateReferenceLabel } from "@pages/Lancamentos/api/types/DateReferenceEnum";
import DateReferenceToggle from "@components/DateReferenceToggle";
import { useDashboardPreferencesStore } from "@stores/dashboardPreferencesStore";

import { useDashboard } from "./queries/useDashboard";
import ChartPie from "./components/ChartPie";
import ChartBar from "./components/ChartBar";
import ChartAccounts from "./components/ChartAccounts";
import RecurringEntriesCard from "./components/RecurringEntriesCard";
import TrendCaption from "./components/TrendCaption";
import UpcomingPaymentsCard from "./components/UpcomingPaymentsCard";
import type { GetStatisticMonthItemResponse } from "./api/types/GetStatisticMonthItemResponse";

function summarize(classifications: GetStatisticMonthItemResponse[] = []) {
  const sumOf = (classification: ClassificationEnum) =>
    classifications.find((item) => item.id === classification)?.value ?? 0;

  const revenue = sumOf(ClassificationEnum.Revenue);
  const expense = sumOf(ClassificationEnum.Expense);
  const balance = revenue - expense;
  const savingsRate = revenue > 0 ? (balance / revenue) * 100 : null;

  return { revenue, expense, balance, savingsRate };
}

export default function Dashboard() {
  const pageTitle = "Painel";

  const todayLocaleDate = dayjs().locale("pt-br");

  const [dateYearMonth, setDateYearMonth] =
    useState<PickerValue>(todayLocaleDate);

  const selectedDate = dateYearMonth ?? todayLocaleDate;

  const { dateReference, setDateReference } = useDashboardPreferencesStore();

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useDashboard(formatDate(selectedDate) as string, dateReference);

  const isLoading = _isLoading || isFetching;

  const getClassificationColor = useClassificationColor();

  const classifications = (data?.classifications || []).map((item) => ({
    ...item,
    color: getClassificationColor(item.id, item.color) ?? null,
  }));

  const { revenue, expense, balance, savingsRate } = summarize(
    data?.classifications,
  );
  const previous = summarize(data?.previousMonthClassifications);

  const previousMonthLabel = selectedDate
    .subtract(1, "month")
    .locale("pt-br")
    .format("MMMM");

  const periodLabel = selectedDate.locale("pt-br").format("MMMM [de] YYYY");
  const periodTitle =
    periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1);

  return (
    <PageContainer
      title={pageTitle}
      actions={
        <DateReferenceToggle
          value={dateReference}
          onChange={setDateReference}
        />
      }
    >
      <Typography color="text.secondary" sx={{ mt: -1.5, mb: 2 }}>
        Resumo de {periodTitle} por data de{" "}
        {DateReferenceLabel[dateReference].toLowerCase()}
      </Typography>

      <FetchingLoading loading={isLoading} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Receitas"
            value={formatCurrency(revenue)}
            icon={<TrendingUpRoundedIcon />}
            color="success"
            caption={
              <TrendCaption
                current={revenue}
                previous={previous.revenue}
                previousMonthLabel={previousMonthLabel}
                higherIsBetter
              />
            }
            loading={_isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Despesas"
            value={formatCurrency(expense)}
            icon={<TrendingDownRoundedIcon />}
            color="error"
            caption={
              <TrendCaption
                current={expense}
                previous={previous.expense}
                previousMonthLabel={previousMonthLabel}
                higherIsBetter={false}
              />
            }
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
              <TrendCaption
                current={balance}
                previous={previous.balance}
                previousMonthLabel={previousMonthLabel}
                higherIsBetter
              />
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
            caption={
              <TrendCaption
                current={savingsRate}
                previous={previous.savingsRate}
                previousMonthLabel={previousMonthLabel}
                higherIsBetter
                unit="points"
              />
            }
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

        <Grid size={{ xs: 12, lg: 8 }}>
          <RecurringEntriesCard
            data={data?.recurringEntries || []}
            currentBalance={balance}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <UpcomingPaymentsCard data={data?.upcomingPayments || []} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPie
            data={data?.expensesByType || []}
            title="Despesas por tipo"
            subtitle="Onde o dinheiro foi gasto no mês"
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPie
            data={data?.revenuesByType || []}
            title="Receitas por tipo"
            subtitle="De onde o dinheiro veio no mês"
          />
        </Grid>

        <Grid size={12}>
          <ChartAccounts data={data?.accounts || []} />
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
