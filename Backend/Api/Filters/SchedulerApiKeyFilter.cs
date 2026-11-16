using System.Security.Cryptography;
using System.Text;
using Infrastructure.Schedulers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace Api.Filters;

public class SchedulerApiKeyFilter : IAsyncActionFilter
{
    private const string HeaderName = "X-Scheduler-Key";

    private readonly SchedulerSettings _schedulerSettings;

    public SchedulerApiKeyFilter(IOptions<SchedulerSettings> schedulerSettings)
    {
        _schedulerSettings = schedulerSettings.Value;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var apiKeyRecebida = context.HttpContext.Request.Headers[HeaderName].ToString();

        if (!ChaveValida(apiKeyRecebida))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        await next();
    }

    private bool ChaveValida(string apiKeyRecebida)
    {
        if (string.IsNullOrEmpty(_schedulerSettings.ApiKey) || string.IsNullOrEmpty(apiKeyRecebida))
            return false;

        var esperada = Encoding.UTF8.GetBytes(_schedulerSettings.ApiKey);
        var recebida = Encoding.UTF8.GetBytes(apiKeyRecebida);

        return esperada.Length == recebida.Length && CryptographicOperations.FixedTimeEquals(esperada, recebida);
    }
}
