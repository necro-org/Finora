using Microsoft.AspNetCore.Mvc;

namespace Api.Filters;

public class SchedulerApiKeyAttribute : ServiceFilterAttribute
{
    public SchedulerApiKeyAttribute() : base(typeof(SchedulerApiKeyFilter))
    {
    }
}
