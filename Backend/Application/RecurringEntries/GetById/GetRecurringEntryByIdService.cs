using Application.Base;
using Application.RecurringEntries.Common;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.RecurringEntries.GetRecurringEntry;

public class GetRecurringEntryByIdService : IServiceHandler<GetRecurringEntryByIdRequest, RecurringEntryResponse>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;

    public GetRecurringEntryByIdService(IRecurringEntryRepository recurringEntryRepository)
    {
        _recurringEntryRepository = recurringEntryRepository;
    }

    public async Task<RecurringEntryResponse> Handle(GetRecurringEntryByIdRequest request)
    {
        var recurringEntry = await _recurringEntryRepository.GetById(request.Id);

        if (recurringEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Recorrente");

        return new RecurringEntryResponse(recurringEntry.Id, recurringEntry.Description, recurringEntry.Amount, recurringEntry.Classification, recurringEntry.DayOfMonth, recurringEntry.StartDate, recurringEntry.EndDate, recurringEntry.IsActive, recurringEntry.TypeId, recurringEntry.AccountId);
    }
}
