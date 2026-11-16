using Infrastructure.Authentications;
using Infrastructure.Database;
using Infrastructure.Schedulers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuth(configuration);
        services.AddDatabase(configuration);
        services.AddRepositories();

        var schedulerSettings = configuration
            .GetRequiredSection(SchedulerSettings.SectionName)
            .Get<SchedulerSettings>()!;
        services.AddSingleton(Options.Create(schedulerSettings));
    }
}
