using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.FinancialAccounts;
using Domain.FinancialAccounts;

namespace Application.FinancialAccounts.Create;

public class CreateFinancialAccountService : IServiceHandler<CreateFinancialAccountRequest, Success>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public CreateFinancialAccountService(IFinancialAccountRepository financialAccountRepository, IUserAuthenticated userAuthenticated)
    {
        _financialAccountRepository = financialAccountRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<Success> Handle(CreateFinancialAccountRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialAccount = new FinancialAccount(request.Name, request.Color, userId);

        await _financialAccountRepository.Add(financialAccount);

        return Success.Value;
    }
}
