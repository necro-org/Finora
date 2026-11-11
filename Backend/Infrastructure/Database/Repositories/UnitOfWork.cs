using Contracts.Repositories;
using Infrastructure.Database.Context;

namespace Infrastructure.Database.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SaveChanges()
    {
        if (!_context.ChangeTracker.HasChanges())
        {
            return;
        }

        await _context.SaveChangesAsync();
    }
}
