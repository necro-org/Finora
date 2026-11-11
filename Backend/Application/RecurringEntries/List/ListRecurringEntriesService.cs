using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.RecurringEntries;

namespace Application.RecurringEntries.ListRecurringEntries;

public class ListRecurringEntriesService : IServiceHandler<ListRecurringEntriesRequest, List<ListRecurringEntriesResponse>>
{
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public ListRecurringEntriesService(
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository,
        IUserAuthenticated userAuthenticated)
    {
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<List<ListRecurringEntriesResponse>> Handle(ListRecurringEntriesRequest request)
    {
        var userId = _userAuthenticated.GetUserId();
        var year = request.Date.Year;
        var month = request.Date.Month;

        var recurringEntries = await _recurringEntryRepository.GetAll(userId);

        var paidRecurringEntryIds = (await _recurringEntryOccurrenceRepository
            .GetRecurringEntryIdsWithOccurrenceInMonth(userId, year, month))
            .ToHashSet();

        return recurringEntries
            .Select(x => new ListRecurringEntriesResponse(
                x.Id,
                x.Description,
                x.Amount,
                x.Classification,
                x.DayOfMonth,
                x.StartDate,
                x.EndDate,
                x.IsActive,
                x.TypeId,
                x.AccountId,
                x.GetOccurrenceDate(year, month),
                x.IsApplicableInMonth(year, month),
                paidRecurringEntryIds.Contains(x.Id)))
            .ToList();
    }
}
