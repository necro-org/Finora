using Application.Base;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.RecurringEntries.DeleteRecurringEntry;

public class DeleteRecurringEntryService : IServiceHandler<DeleteRecurringEntryRequest, Success>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;

    public DeleteRecurringEntryService(
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository)
    {
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
    }

    public async Task<Success> Handle(DeleteRecurringEntryRequest request)
    {
        var recurringEntry = await _recurringEntryRepository.GetById(request.Id);

        if (recurringEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Recorrente");

        if (await _recurringEntryOccurrenceRepository.ExistsByRecurringEntryId(recurringEntry.Id))
            throw new BadRequestException("Não é possível excluir o Lançamento Recorrente, pois ele já gerou Lançamentos");

        _recurringEntryRepository.Remove(recurringEntry);

        return Success.Value;
    }
}
