using Domain.FinancialEntries;

namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthRecurringEntryResponse(
    Guid Id,
    string? Description,
    decimal Amount,
    ClassificationEnum Classification,
    DateOnly Date,
    bool IsPaid);
