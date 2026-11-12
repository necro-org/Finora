using Domain.FinancialEntries;

namespace Application.RecurringEntries.ListRecurringEntries;

public record GetAllRecurringEntriesResponse(
    Guid Id,
    string? Description,
    decimal Amount,
    ClassificationEnum Classification,
    int DayOfMonth,
    DateOnly StartDate,
    DateOnly? EndDate,
    bool IsActive,
    Guid TypeId,
    Guid? AccountId,
    DateOnly OccurrenceDate,
    bool IsApplicableInMonth,
    bool IsPaidInMonth);
