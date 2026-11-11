using Application.Base;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.RecurringEntries;
using Domain.FinancialEntries;
using Domain.RecurringEntries;

namespace Application.RecurringEntries.GenerateOccurrences;

public class GenerateRecurringEntryOccurrencesService : IServiceHandler<GenerateRecurringEntryOccurrencesRequest, GenerateRecurringEntryOccurrencesResponse>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;
    private readonly IFinancialEntryRepository _financialEntryRepository;

    public GenerateRecurringEntryOccurrencesService(
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository,
        IFinancialEntryRepository financialEntryRepository)
    {
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
        _financialEntryRepository = financialEntryRepository;
    }

    public async Task<GenerateRecurringEntryOccurrencesResponse> Handle(GenerateRecurringEntryOccurrencesRequest request)
    {
        var processingDate = DateOnly.FromDateTime(DateTime.Today);
        var activeEntries = await _recurringEntryRepository.GetActiveForProcessing(processingDate);

        var generated = new List<GeneratedRecurringEntryOccurrenceResponse>();
        var alreadyProcessedCount = 0;
        var notDueYetCount = 0;

        foreach (var entry in activeEntries)
        {
            var occurrenceDate = entry.GetOccurrenceDate(processingDate.Year, processingDate.Month);

            if (occurrenceDate > processingDate)
            {
                notDueYetCount++;
                continue;
            }

            var alreadyProcessed = await _recurringEntryOccurrenceRepository
                .ExistsForMonth(entry.Id, processingDate.Year, processingDate.Month);

            if (alreadyProcessed)
            {
                alreadyProcessedCount++;
                continue;
            }

            var financialEntry = new FinancialEntry(
                date: occurrenceDate,
                amount: entry.Amount,
                classification: entry.Classification,
                userId: entry.UserId,
                typeId: entry.TypeId,
                description: entry.Description,
                datePayment: occurrenceDate,
                accountId: entry.AccountId);

            await _financialEntryRepository.Add(financialEntry);

            var occurrence = new RecurringEntryOccurrence(entry.Id, financialEntry.Id, occurrenceDate);

            await _recurringEntryOccurrenceRepository.Add(occurrence);

            generated.Add(new GeneratedRecurringEntryOccurrenceResponse(
                entry.Id,
                financialEntry.Id,
                entry.UserId,
                entry.Description,
                entry.Amount,
                entry.Classification,
                occurrenceDate));
        }

        return new GenerateRecurringEntryOccurrencesResponse(
            processingDate,
            activeEntries.Count,
            generated.Count,
            alreadyProcessedCount,
            notDueYetCount,
            generated);
    }
}
