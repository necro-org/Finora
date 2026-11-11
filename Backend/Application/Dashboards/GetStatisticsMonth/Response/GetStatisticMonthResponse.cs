using Contracts.Repositories.FinancialEntries.Dtos;

namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthResponse(
    List<GetStatisticMonthItemResponse> Types, 
    List<GetStatisticMonthItemResponse> Classifications,
    List<GetStatisticMonthItemResponse> Accounts,
    List<ChartDataOfYearDto> ClassificationsOfYear,
    List<GetStatisticMonthRecurringEntryResponse> RecurringEntries);
