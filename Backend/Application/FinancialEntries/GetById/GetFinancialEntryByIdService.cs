using Application.Base;
using Contracts.Repositories.FinancialEntries;
using Domain.Exceptions;

namespace Application.FinancialEntries.GetById;

public class GetFinancialEntryByIdService : IServiceHandler<GetFinancialEntryByIdRequest, GetFinancialEntryByIdResponse>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;

    public GetFinancialEntryByIdService(IFinancialEntryRepository financialEntryRepository)
    {
        _financialEntryRepository = financialEntryRepository;
    }

    public async Task<GetFinancialEntryByIdResponse> Handle(GetFinancialEntryByIdRequest request)
    {
        var financialEntry = await _financialEntryRepository.GetById(request.Id);

        if (financialEntry is null) throw new NotFoundException("Não foi possível encontrar o Lançamento Financeiro");

        return new GetFinancialEntryByIdResponse(
            financialEntry.Id,
            financialEntry.Date,
            financialEntry.Amount,
            financialEntry.TypeId,
            financialEntry.AccountId,
            financialEntry.Classification,
            financialEntry.Description,
            financialEntry.DatePayment,
            financialEntry.IsConfirmed);
    }
}