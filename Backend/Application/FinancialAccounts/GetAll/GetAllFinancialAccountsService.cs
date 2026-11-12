using Application.Base;
using Application.FinancialAccounts.Common;
using Contracts.Authentications;
using Contracts.Repositories.FinancialAccounts;

namespace Application.FinancialAccounts.GetAll;

public class GetAllFinancialAccountsService : IServiceHandler<Unit, List<FinancialAccountResponse>>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public GetAllFinancialAccountsService(IFinancialAccountRepository financialAccountRepository, IUserAuthenticated userAuthenticated)
    {
        _financialAccountRepository = financialAccountRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<List<FinancialAccountResponse>> Handle(Unit request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialAccounts = await _financialAccountRepository.GetAll(userId);

        return financialAccounts.Select(x => new FinancialAccountResponse(x.Id, x.Name, x.Color)).ToList();
    }
}
