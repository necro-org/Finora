using Domain.FinancialEntries;

namespace Application.FinancialEntries.GetAll;

public record GetAllFinancialEntriesResponse(
    Guid Id,
    DateOnly Date,
    DateOnly? TransactionDate,
    decimal Amount,
    Guid? TypeId,
    string? TypeName,
    string? TypeColor,
    Guid? AccountId,
    string? AccountName,
    string? AccountColor,
    ClassificationEnum Classification,
    string ClassificationName,
    string ClassificationColor,
    string? Description,
    bool IsConfirmed);