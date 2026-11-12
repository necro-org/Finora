using Contracts.Repositories.FinancialEntries.Dtos;
using Domain.FinancialEntries;

namespace Contracts.Repositories.FinancialEntries;

public interface IFinancialEntryRepository
{
    Task<List<FinancialEntry>> GetAll(Guid userId, FinancialEntryFilterDto filter);
    Task<List<FinancialEntry>> GetEntriesOfMonth(DateTime date, Guid userId, DateReferenceEnum dateReference);
    Task<List<ChartDataOfYearDto>> GetChartDataOfYear(DateTime date, Guid userId, DateReferenceEnum dateReference);
    Task Add(FinancialEntry financialEntry);
    Task<FinancialEntry?> GetById(Guid id);
    void Remove(FinancialEntry financialEntry);
    Task AddRange(List<FinancialEntry> financialEntries);
    Task<bool> ExistsByTypeId(Guid typeId);
    Task<bool> ExistsByAccountId(Guid accountId);
}
