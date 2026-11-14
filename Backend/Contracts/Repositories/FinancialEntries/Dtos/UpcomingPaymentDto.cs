namespace Contracts.Repositories.FinancialEntries.Dtos;

public record UpcomingPaymentDto(
    int Year,
    int Month,
    decimal Amount,
    int Count);
