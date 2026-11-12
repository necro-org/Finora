using Application.Base;
using Contracts.Repositories.FinancialAccounts;
using Domain.Exceptions;

namespace Application.FinancialAccounts.Delete;

public class DeleteFinancialAccountService : IServiceHandler<DeleteFinancialAccountRequest, Success>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;

    public DeleteFinancialAccountService(IFinancialAccountRepository financialAccountRepository)
    {
        _financialAccountRepository = financialAccountRepository;
    }

    public async Task<Success> Handle(DeleteFinancialAccountRequest request)
    {
        var financialAccount = await _financialAccountRepository.GetById(request.Id);

        if (financialAccount is null) throw new NotFoundException("Não foi possível encontrar uma Conta");

        _financialAccountRepository.Remove(financialAccount);

        return Success.Value;
    }
}
