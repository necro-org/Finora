using Domain.FinancialEntries;

namespace Application.Dashboards.GetStatisticsMonth;

public record GetStatisticMonthRequest(DateTime Date, DateReferenceEnum DateReference = DateReferenceEnum.EntryDate);
