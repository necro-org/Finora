using Contracts.Repositories.FinancialEntries.Dtos;

namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthResponse(
    List<GetStatisticMonthItemResponse> ExpensesByType,
    List<GetStatisticMonthItemResponse> RevenuesByType,
    List<GetStatisticMonthItemResponse> Classifications,
    List<GetStatisticMonthItemResponse> PreviousMonthClassifications,
    List<GetStatisticMonthAccountResponse> Accounts,
    List<ChartDataOfYearDto> ClassificationsOfYear,
    List<GetStatisticMonthRecurringEntryResponse> RecurringEntries);
