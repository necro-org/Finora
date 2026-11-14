namespace Application.Dashboards.GetStatisticsMonth.Response;

public record GetStatisticMonthTypeEvolutionResponse(
    string Id,
    string Label,
    string? Color,
    List<decimal> Values);
