using System.Globalization;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialEntries.Dtos;
using Domain.FinancialEntries;
using Infrastructure.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories.FinancialEntries;

public class FinancialEntryRepository : IFinancialEntryRepository
{
    private ApplicationDbContext _context;

    public FinancialEntryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<FinancialEntry>> GetAll(Guid userId, FinancialEntryFilterDto filter)
    {
        var search = filter.SearchText == null ? null : filter.SearchText.Trim();

        var userEntries = _context.FinancialEntries.Where(x => x.UserId == userId);

        return await WhereReferenceDateBetween(
                userEntries,
                filter.DateReference ?? DateReferenceEnum.EntryDate,
                filter.InitialDate,
                filter.FinalDate)
            .Where(x => filter.InitialAmount == null || x.Amount >= filter.InitialAmount)
            .Where(x => filter.FinalAmount == null || x.Amount <= filter.FinalAmount)
            .Where(x => search == null || x.Description == null || EF.Functions.ILike(x.Description, $"%{search}%"))
            .Where(x => filter.TypeId == null || x.TypeId == filter.TypeId)
            .Where(x => filter.AccountId == null || x.AccountId == filter.AccountId)
            .Where(x => filter.Classification == null || x.Classification == filter.Classification)
            .Where(x => filter.IsConfirmed == null || x.TypeId.HasValue == filter.IsConfirmed)
            .Include(x => x.Type)
            .Include(x => x.Account)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<FinancialEntry>> GetEntriesOfMonth(DateTime date, Guid userId, DateReferenceEnum dateReference)
    {
        var firstDayOfMonth = new DateOnly(date.Year, date.Month, 1);
        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        var userEntries = _context.FinancialEntries.Where(x => x.UserId == userId);

        return await WhereReferenceDateBetween(userEntries, dateReference, firstDayOfMonth, lastDayOfMonth)
            .ToListAsync();
    }

    public async Task<List<ChartDataOfYearDto>> GetChartDataOfYear(DateTime date, Guid userId, DateReferenceEnum dateReference)
    {
        var firstDayOfYear = new DateOnly(date.Year, 1, 1);
        var lastDayOfYear = new DateOnly(date.Year, 12, 31);

        var entriesOfYear = WhereReferenceDateBetween(
            _context.FinancialEntries.Where(x => x.UserId == userId),
            dateReference,
            firstDayOfYear,
            lastDayOfYear);

        var entriesWithReferenceDate = dateReference == DateReferenceEnum.PaymentDate
            ? entriesOfYear.Select(x => new { ReferenceDate = x.DatePayment ?? x.Date, x.Classification, x.Amount })
            : entriesOfYear.Select(x => new { ReferenceDate = x.Date, x.Classification, x.Amount });

        var result = await entriesWithReferenceDate
            .GroupBy(x => new
            {
                Month = x.ReferenceDate.Month,
                Classification = x.Classification,
            })
            .Select(g => new
            {
                g.Key.Month,
                Classification = g.Key.Classification,
                Value = g.Sum(x => x.Amount)
            })
            .OrderBy(x => x.Month)
            .ToListAsync();

        return result
            .Select(x => new ChartDataOfYearDto(
                CultureInfo.GetCultureInfo("pt-BR").DateTimeFormat.GetAbbreviatedMonthName(x.Month),
                x.Classification.GetName(),
                x.Classification.GetColor(),
                x.Value))
            .ToList();
    }

    public async Task Add(FinancialEntry financialEntry)
    {
        await _context.FinancialEntries.AddAsync(financialEntry);
    }

    public async Task<FinancialEntry?> GetById(Guid id)
    {
        return await _context.FinancialEntries.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Remove(FinancialEntry financialEntry)
    {
        _context.FinancialEntries.Remove(financialEntry);
    }

    public async Task AddRange(List<FinancialEntry> financialEntries)
    {
        await _context.FinancialEntries.AddRangeAsync(financialEntries);
    }

    private static IQueryable<FinancialEntry> WhereReferenceDateBetween(
        IQueryable<FinancialEntry> query,
        DateReferenceEnum dateReference,
        DateOnly? initialDate,
        DateOnly? finalDate)
    {
        if (dateReference == DateReferenceEnum.PaymentDate)
        {
            return query
                .Where(x => initialDate == null || (x.DatePayment ?? x.Date) >= initialDate)
                .Where(x => finalDate == null || (x.DatePayment ?? x.Date) <= finalDate);
        }

        return query
            .Where(x => initialDate == null || x.Date >= initialDate)
            .Where(x => finalDate == null || x.Date <= finalDate);
    }
}
