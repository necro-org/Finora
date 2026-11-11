using Application.Base;
using Contracts.Repositories.FinancialEntries;
using Domain.Exceptions;

namespace Application.FinancialEntries.DeleteFinancialEntry;

public class DeleteFinancialEntryService : IServiceHandler<DeleteFinancialEntryRequest, Success>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;

    public DeleteFinancialEntryService(IFinancialEntryRepository financialEntryRepository)
    {
        _financialEntryRepository = financialEntryRepository;
    }

    public async Task<Success> Handle(DeleteFinancialEntryRequest request)
    {
        var financialEntry = await _financialEntryRepository.GetById(request.Id);

        if (financialEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Financeiro");

        _financialEntryRepository.Remove(financialEntry);

        return Success.Value;
    }
}
