using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialEntries.Dtos;
using Domain.FinancialEntries;

namespace Application.FinancialEntries.ListFinancialEntry;

public class ListFinancialEntryService : IServiceHandler<FinancialEntryFilterDto, List<ListFinancialEntryResponse>>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public ListFinancialEntryService(IFinancialEntryRepository financialEntryRepository, IUserAuthenticated userAuthenticated)
    {
        _financialEntryRepository = financialEntryRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<List<ListFinancialEntryResponse>> Handle(FinancialEntryFilterDto request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialEntrys = await _financialEntryRepository.GetAll(userId, request);

        return financialEntrys
            .Select(x => new ListFinancialEntryResponse(
                x.Id,
                x.Date,
                x.DatePayment,
                x.Amount,
                x.TypeId,
                x.Type?.Name,
                x.Type?.Color,
                x.AccountId,
                x.Account?.Name,
                x.Account?.Color,
                x.Classification,
                x.Classification.GetName(),
                x.Classification.GetColor(),
                x.Description,
                x.IsConfirmed))
            .ToList();
    }
}
