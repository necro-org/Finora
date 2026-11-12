using Application.Base;
using Application.FinancialAccounts.Common;
using Contracts.Repositories.FinancialAccounts;
using Domain.Exceptions;

namespace Application.FinancialAccounts.GetById;

public class GetFinancialAccountByIdService : IServiceHandler<GetFinancialAccountByIdRequest, FinancialAccountResponse>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;

    public GetFinancialAccountByIdService(IFinancialAccountRepository financialAccountRepository)
    {
        _financialAccountRepository = financialAccountRepository;
    }

    public async Task<FinancialAccountResponse> Handle(GetFinancialAccountByIdRequest request)
    {
        var financialAccount = await _financialAccountRepository.GetById(request.Id);

        if (financialAccount is null) throw new NotFoundException("Não foi possível encontrar uma Conta");

        return new FinancialAccountResponse(financialAccount.Id, financialAccount.Name, financialAccount.Color);
    }
}
