namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthAccountResponse(
    string Id,
    string Label,
    string? Color,
    decimal Revenue,
    decimal Expense);
