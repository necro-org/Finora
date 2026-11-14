namespace Contracts.Repositories.FinancialEntries.Dtos;

public record ExpenseByTypeOfMonthDto(
    int Month,
    Guid? TypeId,
    decimal Amount);
