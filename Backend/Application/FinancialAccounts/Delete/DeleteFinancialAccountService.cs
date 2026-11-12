using Application.Base;
using Contracts.Repositories.FinancialAccounts;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.FinancialAccounts.Delete;

public class DeleteFinancialAccountService : IServiceHandler<DeleteFinancialAccountRequest, Success>
{
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IRecurringEntryRepository _recurringEntryRepository;

    public DeleteFinancialAccountService(
        IFinancialAccountRepository financialAccountRepository,
        IFinancialEntryRepository financialEntryRepository,
        IRecurringEntryRepository recurringEntryRepository)
    {
        _financialAccountRepository = financialAccountRepository;
        _financialEntryRepository = financialEntryRepository;
        _recurringEntryRepository = recurringEntryRepository;
    }

    public async Task<Success> Handle(DeleteFinancialAccountRequest request)
    {
        var financialAccount = await _financialAccountRepository.GetById(request.Id);

        if (financialAccount is null) throw new NotFoundException("Não foi possível encontrar uma Conta");

        if (await _financialEntryRepository.ExistsByAccountId(financialAccount.Id))
            throw new BadRequestException("Não é possível excluir a Conta, pois ela está sendo usada em Lançamentos");

        if (await _recurringEntryRepository.ExistsByAccountId(financialAccount.Id))
            throw new BadRequestException("Não é possível excluir a Conta, pois ela está sendo usada em Lançamentos Recorrentes");

        _financialAccountRepository.Remove(financialAccount);

        return Success.Value;
    }
}
