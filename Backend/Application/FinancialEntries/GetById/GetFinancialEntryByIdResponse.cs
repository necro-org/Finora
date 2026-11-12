using Domain.FinancialEntries;

namespace Application.FinancialEntries.GetById;

public record GetFinancialEntryByIdResponse(
    Guid Id,
    DateOnly Date,
    decimal Amount,
    Guid? TypeId,
    Guid? AccountId,
    ClassificationEnum Classification,
    string? Description,
    DateOnly? DatePayment,
    bool IsConfirmed);