using Domain.FinancialEntries;

namespace Contracts.Repositories.FinancialEntries.Dtos;

public record ChartDataOfYearDto(
    string Month,
    int MonthNumber,
    ClassificationEnum Classification,
    string Label,
    string? Color,
    decimal Value);
