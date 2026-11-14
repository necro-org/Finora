namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthTopExpenseResponse(
    Guid Id,
    string? Description,
    decimal Amount,
    DateOnly Date,
    string? TypeName,
    string? TypeColor);
