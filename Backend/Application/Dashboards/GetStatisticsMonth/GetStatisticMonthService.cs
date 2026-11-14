using Application.Base;
using Application.Dashboards.GetStatisticsMonth.Response;
using Contracts.Authentications;
using Contracts.Repositories.FinancialAccounts;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialTypes;
using Contracts.Repositories.RecurringEntries;
using Domain.FinancialAccounts;
using Domain.FinancialEntries;
using Domain.FinancialTypes;

namespace Application.Dashboards.GetStatisticsMonth;

public class GetStatisticMonthService : IServiceHandler<GetStatisticMonthRequest, GetStatisticMonthResponse>
{
    private const string WithoutTypeId = "without-type";
    private const string WithoutAccountId = "without-account";
    private const int UpcomingPaymentsMonths = 6;
    private const int TopExpensesCount = 5;

    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public GetStatisticMonthService(
        IFinancialEntryRepository financialEntryRepository,
        IFinancialTypeRepository financialTypeRepository,
        IFinancialAccountRepository financialAccountRepository,
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository,
        IUserAuthenticated userAuthenticated)
    {
        _financialEntryRepository = financialEntryRepository;
        _financialTypeRepository = financialTypeRepository;
        _financialAccountRepository = financialAccountRepository;
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<GetStatisticMonthResponse> Handle(GetStatisticMonthRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialTypesData = await _financialTypeRepository.GetAll(userId);
        var financialAccountsData = await _financialAccountRepository.GetAll(userId);
        var financialEntriesMonth = await _financialEntryRepository.GetEntriesOfMonth(request.Date, userId, request.DateReference);
        var financialEntriesPreviousMonth = await _financialEntryRepository.GetEntriesOfMonth(request.Date.AddMonths(-1), userId, request.DateReference);
        var classificationsOfYear = await _financialEntryRepository.GetChartDataOfYear(request.Date, userId, request.DateReference);

        var expenses = financialEntriesMonth.Where(x => x.Classification == ClassificationEnum.Expense).ToList();
        var revenues = financialEntriesMonth.Where(x => x.Classification == ClassificationEnum.Revenue).ToList();

        var classificationsResponse = SumByClassification(financialEntriesMonth);
        var previousMonthClassificationsResponse = SumByClassification(financialEntriesPreviousMonth);

        var expensesByTypeResponse = SumByType(expenses, financialTypesData);
        var revenuesByTypeResponse = SumByType(revenues, financialTypesData);
        var accountsResponse = SumByAccount(financialEntriesMonth, financialAccountsData);

        var recurringEntriesResponse = await GetRecurringEntriesOfMonth(userId, request.Date.Year, request.Date.Month);

        var firstDayOfNextMonth = new DateOnly(request.Date.Year, request.Date.Month, 1).AddMonths(1);
        var upcomingPayments = await _financialEntryRepository.GetUpcomingPayments(
            userId,
            firstDayOfNextMonth,
            firstDayOfNextMonth.AddMonths(UpcomingPaymentsMonths).AddDays(-1),
            request.DateReference);

        return new GetStatisticMonthResponse(
            expensesByTypeResponse,
            revenuesByTypeResponse,
            classificationsResponse,
            previousMonthClassificationsResponse,
            accountsResponse,
            classificationsOfYear,
            recurringEntriesResponse,
            upcomingPayments,
            GetTopExpenses(expenses, financialTypesData, request.DateReference));
    }

    private static List<GetStatisticMonthTopExpenseResponse> GetTopExpenses(
        List<FinancialEntry> expenses,
        IEnumerable<FinancialType> financialTypes,
        DateReferenceEnum dateReference)
    {
        var typesById = financialTypes.ToDictionary(x => x.Id);

        return expenses
            .OrderByDescending(x => x.Amount)
            .Take(TopExpensesCount)
            .Select(x =>
            {
                var type = x.TypeId.HasValue ? typesById.GetValueOrDefault(x.TypeId.Value) : null;
                var referenceDate = dateReference == DateReferenceEnum.PaymentDate ? x.DatePayment ?? x.Date : x.Date;
                return new GetStatisticMonthTopExpenseResponse(x.Id, x.Description, x.Amount, referenceDate, type?.Name, type?.Color);
            })
            .ToList();
    }

    private static List<GetStatisticMonthItemResponse> SumByClassification(List<FinancialEntry> entries)
    {
        return Enum.GetValues<ClassificationEnum>()
            .Select(classification => new GetStatisticMonthItemResponse(
                classification.ToString(),
                classification.GetName(),
                classification.GetColor(),
                entries.Where(x => x.Classification == classification).Sum(x => x.Amount)))
            .OrderByDescending(x => x.Value)
            .ToList();
    }

    private static List<GetStatisticMonthItemResponse> SumByType(List<FinancialEntry> entries, IEnumerable<FinancialType> financialTypes)
    {
        var response = financialTypes
            .Select(type => new GetStatisticMonthItemResponse(
                type.Id.ToString(),
                type.Name,
                type.Color,
                entries.Where(x => x.TypeId == type.Id).Sum(x => x.Amount)))
            .ToList();

        var withoutType = entries.Where(x => x.TypeId == null).Sum(x => x.Amount);
        if (withoutType > 0)
            response.Add(new GetStatisticMonthItemResponse(WithoutTypeId, "Sem tipo", null, withoutType));

        return response
            .Where(x => x.Value > 0)
            .OrderByDescending(x => x.Value)
            .ToList();
    }

    private static List<GetStatisticMonthAccountResponse> SumByAccount(List<FinancialEntry> entries, IEnumerable<FinancialAccount> financialAccounts)
    {
        var response = financialAccounts
            .Select(account => ToAccountResponse(account.Id.ToString(), account.Name, account.Color, entries.Where(x => x.AccountId == account.Id)))
            .ToList();

        response.Add(ToAccountResponse(WithoutAccountId, "Sem conta", null, entries.Where(x => x.AccountId == null)));

        return response
            .Where(x => x.Revenue > 0 || x.Expense > 0)
            .OrderByDescending(x => x.Revenue + x.Expense)
            .ToList();
    }

    private static GetStatisticMonthAccountResponse ToAccountResponse(string id, string label, string? color, IEnumerable<FinancialEntry> entries)
    {
        var entriesList = entries.ToList();
        return new GetStatisticMonthAccountResponse(
            id,
            label,
            color,
            entriesList.Where(x => x.Classification == ClassificationEnum.Revenue).Sum(x => x.Amount),
            entriesList.Where(x => x.Classification == ClassificationEnum.Expense).Sum(x => x.Amount));
    }

    private async Task<List<GetStatisticMonthRecurringEntryResponse>> GetRecurringEntriesOfMonth(Guid userId, int year, int month)
    {
        var recurringEntries = await _recurringEntryRepository.GetAll(userId);

        var paidRecurringEntryIds = (await _recurringEntryOccurrenceRepository
            .GetRecurringEntryIdsWithOccurrenceInMonth(userId, year, month))
            .ToHashSet();

        return recurringEntries
            .Where(x => x.IsApplicableInMonth(year, month) || paidRecurringEntryIds.Contains(x.Id))
            .Select(x => new GetStatisticMonthRecurringEntryResponse(
                x.Id,
                x.Description,
                x.Amount,
                x.Classification,
                x.GetOccurrenceDate(year, month),
                paidRecurringEntryIds.Contains(x.Id)))
            .OrderBy(x => x.Date)
            .ToList();
    }
}
