using Application.Base;
using Contracts.Repositories.FinancialAccounts;
using Domain.Exceptions;

namespace Application.FinancialAccounts.Update;

public class UpdateFinancialAccountService : IServiceHandler<UpdateFinancialAccountRequest, Success>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;

    public UpdateFinancialAccountService(IFinancialAccountRepository financialAccountRepository)
    {
        _financialAccountRepository = financialAccountRepository;
    }

    public async Task<Success> Handle(UpdateFinancialAccountRequest request)
    {
        var financialAccount = await _financialAccountRepository.GetById(request.Id);

        if (financialAccount is null) throw new NotFoundException("Não foi possível encontrar uma Conta");

        financialAccount.Update(request.Name, request.Color);

        return Success.Value;
    }
}
