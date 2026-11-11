using Api.Controllers.Base;
using Api.Filters;
using Application.Base;
using Application.RecurringEntries.GenerateOccurrences;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]")]
[AllowAnonymous]
public class RecurringJobsController : ApiController
{
    [HttpPost("generate-occurrences")]
    [ApiKeyAuthorization]
    public async Task<IActionResult> GenerateOccurrences(
        [FromServices] IServiceHandler<GenerateRecurringEntryOccurrencesRequest, GenerateRecurringEntryOccurrencesResponse> service)
    {
        var response = await service.Handle(new GenerateRecurringEntryOccurrencesRequest());
        return Ok(response);
    }
}
