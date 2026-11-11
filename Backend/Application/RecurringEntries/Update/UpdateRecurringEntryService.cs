using Application.Base;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.RecurringEntries.UpdateRecurringEntry;

public class UpdateRecurringEntryService : IServiceHandler<UpdateRecurringEntryRequest, Success>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;

    public UpdateRecurringEntryService(IRecurringEntryRepository recurringEntryRepository)
    {
        _recurringEntryRepository = recurringEntryRepository;
    }

    public async Task<Success> Handle(UpdateRecurringEntryRequest request)
    {
        var recurringEntry = await _recurringEntryRepository.GetById(request.Id);

        if (recurringEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Recorrente");

        recurringEntry.Update(request.Description, request.Amount, request.Classification, request.DayOfMonth, request.StartDate, request.EndDate, request.IsActive, request.TypeId, request.AccountId);

        return Success.Value;
    }
}
