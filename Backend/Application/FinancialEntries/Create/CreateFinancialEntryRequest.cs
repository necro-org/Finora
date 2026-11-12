using Domain.FinancialEntries;

namespace Application.FinancialEntries.Create;

public record CreateFinancialEntryRequest(
    DateOnly? ReplicateUntilDate,
    DateOnly Date,
    decimal Amount,
    Guid TypeId,
    ClassificationEnum Classification,
    string? Description,
    DateOnly? DatePayment,
    Guid? AccountId);
