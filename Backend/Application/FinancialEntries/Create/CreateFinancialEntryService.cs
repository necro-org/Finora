using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.FinancialEntries;
using Domain.FinancialEntries;

namespace Application.FinancialEntries.Create;

public class CreateFinancialEntryService : IServiceHandler<CreateFinancialEntryRequest, Success>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public CreateFinancialEntryService(IFinancialEntryRepository financialEntryRepository, IUserAuthenticated userAuthenticated)
    {
        _financialEntryRepository = financialEntryRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<Success> Handle(CreateFinancialEntryRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        if (request.ReplicateUntilDate is null)
        {
            await CreateOneFinancialEntry(request, userId);
        }
        else
        {
            await CreateManyFinancialEntry(request, userId);
        }

        return Success.Value;
    }

    private async Task CreateOneFinancialEntry(CreateFinancialEntryRequest request, Guid userId)
    {
        var financialEntry = new FinancialEntry(
            request.Date,
            request.Amount,
            request.Classification,
            userId,
            request.TypeId,
            request.Description,
            request.DatePayment,
            request.AccountId);

        await _financialEntryRepository.Add(financialEntry);
    }

    private async Task CreateManyFinancialEntry(CreateFinancialEntryRequest request, Guid userId)
    {
        var replicateUntilDate = request.ReplicateUntilDate!.Value;

        var currentDate = request.Date;

        var financialEntries = new List<FinancialEntry>();

        while (currentDate.Year < replicateUntilDate.Year ||
              (currentDate.Year == replicateUntilDate.Year && currentDate.Month <= replicateUntilDate.Month))
        {
            financialEntries.Add(new FinancialEntry(
                currentDate,
                request.Amount,
                request.Classification,
                userId,
                request.TypeId,
                request.Description,
                request.DatePayment,
                request.AccountId));

            currentDate = currentDate.AddMonths(1);
        }

        await _financialEntryRepository.AddRange(financialEntries);
    }
}
