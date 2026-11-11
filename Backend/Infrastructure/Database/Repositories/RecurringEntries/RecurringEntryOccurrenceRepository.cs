using Contracts.Repositories.RecurringEntries;
using Domain.RecurringEntries;
using Infrastructure.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories.RecurringEntries;

public class RecurringEntryOccurrenceRepository : IRecurringEntryOccurrenceRepository
{
    private readonly ApplicationDbContext _context;

    public RecurringEntryOccurrenceRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ExistsForMonth(Guid recurringEntryId, int year, int month)
    {
        return await _context.RecurringEntryOccurrences
            .AnyAsync(x => x.RecurringEntryId == recurringEntryId
                        && x.OccurrenceDate.Year == year
                        && x.OccurrenceDate.Month == month);
    }

    public async Task<List<Guid>> GetRecurringEntryIdsWithOccurrenceInMonth(Guid userId, int year, int month)
    {
        return await _context.RecurringEntryOccurrences
            .Where(x => x.RecurringEntry.UserId == userId
                        && x.OccurrenceDate.Year == year
                        && x.OccurrenceDate.Month == month)
            .Select(x => x.RecurringEntryId)
            .Distinct()
            .ToListAsync();
    }

    public async Task Add(RecurringEntryOccurrence occurrence)
    {
        await _context.RecurringEntryOccurrences.AddAsync(occurrence);
    }
}
