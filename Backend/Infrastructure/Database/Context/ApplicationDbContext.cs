using Domain.FinancialAccounts;
using Domain.FinancialEntries;
using Domain.FinancialTypes;
using Domain.RecurringEntries;
using Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Context;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<FinancialType> FinancialTypes { get; set; }
    public DbSet<FinancialAccount> FinancialAccounts { get; set; }
    public DbSet<FinancialEntry> FinancialEntries { get; set; }
    public DbSet<RecurringEntry> RecurringEntries { get; set; }
    public DbSet<RecurringEntryOccurrence> RecurringEntryOccurrences { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        modelBuilder.HasDefaultSchema(Schemas.Default);
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<Enum>().HaveConversion<string>();
    }
}