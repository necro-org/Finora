using Domain.FinancialEntries;

namespace Application.RecurringEntries.GenerateOccurrences;

public record GenerateRecurringEntryOccurrencesResponse(
    DateOnly ProcessingDate,
    int ActiveCount,
    int GeneratedCount,
    int AlreadyProcessedCount,
    int NotDueYetCount,
    List<GeneratedRecurringEntryOccurrenceResponse> Generated);

public record GeneratedRecurringEntryOccurrenceResponse(
    Guid RecurringEntryId,
    Guid FinancialEntryId,
    Guid UserId,
    string? Description,
    decimal Amount,
    ClassificationEnum Classification,
    DateOnly OccurrenceDate);
