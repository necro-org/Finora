using Application.Base;
using Contracts.Repositories.FinancialEntries;
using Domain.Exceptions;

namespace Application.FinancialEntries.Update;

public class UpdateFinancialEntryService : IServiceHandler<UpdateFinancialEntryRequest, Success>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;

    public UpdateFinancialEntryService(IFinancialEntryRepository financialEntryRepository)
    {
        _financialEntryRepository = financialEntryRepository;
    }

    public async Task<Success> Handle(UpdateFinancialEntryRequest request)
    {
        var financialEntry = await _financialEntryRepository.GetById(request.Id);

        if (financialEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Financeiro");

        financialEntry.Update(request.Date, request.Amount, request.Classification, request.TypeId, request.Description, request.DatePayment, request.AccountId);

        return Success.Value;
    }
}
