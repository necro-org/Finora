using Application.Base;
using Application.Dashboards.GetStatisticsMonth.Response;
using Contracts.Authentications;
using Contracts.Repositories.FinancialAccounts;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialTypes;
using Domain.FinancialEntries;

namespace Application.Dashboards.GetStatisticsMonth;

public class GetStatisticMonthService : IServiceHandler<GetStatisticMonthRequest, GetStatisticMonthResponse>
{
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public GetStatisticMonthService(
        IFinancialEntryRepository financialEntryRepository,
        IFinancialTypeRepository financialTypeRepository,
        IFinancialAccountRepository financialAccountRepository,
        IUserAuthenticated userAuthenticated)
    {
        _financialEntryRepository = financialEntryRepository;
        _financialTypeRepository = financialTypeRepository;
        _financialAccountRepository = financialAccountRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<GetStatisticMonthResponse> Handle(GetStatisticMonthRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialTypesData = await _financialTypeRepository.GetAll(userId);
        var classificationsData = (ClassificationEnum[])Enum.GetValues(typeof(ClassificationEnum));
        var financialAccountsData = await _financialAccountRepository.GetAll(userId);
        var financialEntriesMonth = await _financialEntryRepository.GetEntriesOfMonth(request.Date, userId, request.DateReference);
        var classificationsOfYear = await _financialEntryRepository.GetChartDataOfYear(request.Date, userId, request.DateReference);

        var financialTypesResponse = new List<GetStatisticMonthItemResponse>();
        var classificationsResponse = new List<GetStatisticMonthItemResponse>();
        var accountsResponse = new List<GetStatisticMonthItemResponse>();

        foreach (var financialType in financialTypesData)
        {
            var sumFinancialType = financialEntriesMonth.Where(x => x.TypeId == financialType.Id).Sum(x => x.Amount);
            financialTypesResponse.Add(new GetStatisticMonthItemResponse(financialType.Id.ToString(), financialType.Name, financialType.Color, sumFinancialType));
        }

        foreach (var account in financialAccountsData)
        {
            var sumAccount= financialEntriesMonth.Where(x => x.AccountId == account.Id).Sum(x => x.Amount);
            accountsResponse.Add(new GetStatisticMonthItemResponse(account.Id.ToString(), account.Name, account.Color, sumAccount));
        }

        foreach (var classification in classificationsData)
        {
            var sumClassification = financialEntriesMonth.Where(x => x.Classification == classification).Sum(x => x.Amount);
            classificationsResponse.Add(new GetStatisticMonthItemResponse(classification.ToString(), classification.GetName(), classification.GetColor(), sumClassification));
        }

        financialTypesResponse = financialTypesResponse.OrderByDescending(x => x.Value).ToList();
        accountsResponse = accountsResponse.OrderByDescending(x => x.Value).ToList();
        classificationsResponse = classificationsResponse.OrderByDescending(x => x.Value).ToList();

        return new GetStatisticMonthResponse(financialTypesResponse, classificationsResponse, accountsResponse, classificationsOfYear);
    }
}
