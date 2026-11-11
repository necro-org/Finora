using Contracts.Repositories.Users;
using Domain.Users;
using Infrastructure.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Repositories.Users;

public class UserRepository: IUserRepository
{
    private ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Add(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<User?> GetByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task RemoveAllData(Guid userId)
    {
        var occurrences = await _context.RecurringEntryOccurrences
            .Where(x => x.RecurringEntry.UserId == userId)
            .ToListAsync();

        var recurringEntries = await _context.RecurringEntries
            .Where(x => x.UserId == userId)
            .ToListAsync();

        var financialEntries = await _context.FinancialEntries
            .Where(x => x.UserId == userId)
            .ToListAsync();

        var financialTypes = await _context.FinancialTypes
            .Where(x => x.UserId == userId)
            .ToListAsync();

        var financialAccounts = await _context.FinancialAccounts
            .Where(x => x.UserId == userId)
            .ToListAsync();

        _context.RecurringEntryOccurrences.RemoveRange(occurrences);
        _context.RecurringEntries.RemoveRange(recurringEntries);
        _context.FinancialEntries.RemoveRange(financialEntries);
        _context.FinancialTypes.RemoveRange(financialTypes);
        _context.FinancialAccounts.RemoveRange(financialAccounts);
    }
}
