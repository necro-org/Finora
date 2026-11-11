using Application.Base;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.RecurringEntries.DeleteRecurringEntry;

public class DeleteRecurringEntryService : IServiceHandler<DeleteRecurringEntryRequest, Success>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;

    public DeleteRecurringEntryService(IRecurringEntryRepository recurringEntryRepository)
    {
        _recurringEntryRepository = recurringEntryRepository;
    }

    public async Task<Success> Handle(DeleteRecurringEntryRequest request)
    {
        var recurringEntry = await _recurringEntryRepository.GetById(request.Id);

        if (recurringEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Recorrente");

        _recurringEntryRepository.Remove(recurringEntry);

        return Success.Value;
    }
}
