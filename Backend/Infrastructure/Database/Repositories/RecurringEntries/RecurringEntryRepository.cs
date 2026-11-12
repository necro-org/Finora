using Contracts.Repositories.RecurringEntries;
using Domain.RecurringEntries;
using Infrastructure.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories.RecurringEntries;

public class RecurringEntryRepository : IRecurringEntryRepository
{
    private ApplicationDbContext _context;

    public RecurringEntryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Add(RecurringEntry recurringEntry)
    {
        await _context.RecurringEntries.AddAsync(recurringEntry);
    }

    public async Task<List<RecurringEntry>> GetAll(Guid userId)
    {
        return await _context.RecurringEntries
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<RecurringEntry?> GetById(Guid id)
    {
        return await _context.RecurringEntries.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Remove(RecurringEntry recurringEntry)
    {
        _context.RecurringEntries.Remove(recurringEntry);
    }

    public async Task<List<RecurringEntry>> GetActiveForProcessing(DateOnly date)
    {
        return await _context.RecurringEntries
            .Where(x => x.IsActive && x.StartDate <= date && (x.EndDate == null || x.EndDate >= date))
            .ToListAsync();
    }

    public async Task<bool> ExistsByTypeId(Guid typeId)
    {
        return await _context.RecurringEntries.AnyAsync(x => x.TypeId == typeId);
    }

    public async Task<bool> ExistsByAccountId(Guid accountId)
    {
        return await _context.RecurringEntries.AnyAsync(x => x.AccountId == accountId);
    }
}
