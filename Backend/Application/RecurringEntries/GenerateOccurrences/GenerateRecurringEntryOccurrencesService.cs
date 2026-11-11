using Application.Base;
using Contracts.Repositories;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.RecurringEntries;
using Domain.FinancialEntries;
using Domain.RecurringEntries;

namespace Application.RecurringEntries.GenerateOccurrences;

public class GenerateRecurringEntryOccurrencesService : IServiceHandler<GenerateRecurringEntryOccurrencesRequest, Success>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public GenerateRecurringEntryOccurrencesService(
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository,
        IFinancialEntryRepository financialEntryRepository,
        IUnitOfWork unitOfWork)
    {
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
        _financialEntryRepository = financialEntryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Success> Handle(GenerateRecurringEntryOccurrencesRequest request)
    {
        var processingDate = DateOnly.FromDateTime(DateTime.Today);
        var activeEntries = await _recurringEntryRepository.GetActiveForProcessing(processingDate);

        foreach (var entry in activeEntries)
        {
            var occurrenceDate = entry.GetOccurrenceDate(processingDate.Year, processingDate.Month);

            if (occurrenceDate > processingDate)
                continue;

            var alreadyProcessed = await _recurringEntryOccurrenceRepository
                .ExistsForMonth(entry.Id, processingDate.Year, processingDate.Month);

            if (alreadyProcessed)
                continue;

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
        }

        await _unitOfWork.SaveChanges();

        return Success.Value;
    }
}
