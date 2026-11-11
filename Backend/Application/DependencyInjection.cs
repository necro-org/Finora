using System.Reflection;
using Application.Base;
using Application.Guests;
using Application.Importations;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.Scan(scan => scan
            .FromAssemblies(typeof(IServiceHandler<,>).Assembly)
            .AddClasses(c => c.AssignableTo(typeof(IServiceHandler<,>)))
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        services.Decorate(typeof(IServiceHandler<,>), typeof(ServiceHandlerDecorator<,>));

        services.AddScoped<GuestDataSeeder>();

        services.Scan(scan => scan
            .FromAssemblies(typeof(ICsvImporter).Assembly)
            .AddClasses(c => c.AssignableTo<ICsvImporter>())
            .AsImplementedInterfaces()
            .WithScopedLifetime());
    }
}
