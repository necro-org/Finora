using Contracts.Repositories;
using Contracts.Repositories.FinancialAccounts;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialTypes;
using Contracts.Repositories.RecurringEntries;
using Contracts.Repositories.Users;
using Infrastructure.Database.Context;
using Infrastructure.Database.Interceptors;
using Infrastructure.Database.Repositories;
using Infrastructure.Database.Repositories.FinancialAccounts;
using Infrastructure.Database.Repositories.FinancialEntries;
using Infrastructure.Database.Repositories.FinancialTypes;
using Infrastructure.Database.Repositories.RecurringEntries;
using Infrastructure.Database.Repositories.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Database;

public static class DependencyInjection
{
    public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddSingleton<AuditableEntityInterceptor>();

        services.AddDbContext<ApplicationDbContext>(
            (serviceProvider, options) => options
                .UseNpgsql(connectionString, npgsqlOptions => npgsqlOptions.MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Default))
                .UseSnakeCaseNamingConvention()
                .AddInterceptors(serviceProvider.GetRequiredService<AuditableEntityInterceptor>()));
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IFinancialTypeRepository, FinancialTypeRepository>();
        services.AddScoped<IFinancialAccountRepository, FinancialAccountRepository>();
        services.AddScoped<IFinancialEntryRepository, FinancialEntryRepository>();
        services.AddScoped<IRecurringEntryRepository, RecurringEntryRepository>();
        services.AddScoped<IRecurringEntryOccurrenceRepository, RecurringEntryOccurrenceRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }
}
