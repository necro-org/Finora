using Api.Controllers.Base;
using Application.Base;
using Application.Dashboards.GetStatisticsMonth;
using Application.Dashboards.GetStatisticsMonth.Response;
using Domain.FinancialEntries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]")]
public class DashboardsController : ApiController
{
    [HttpGet]
    public async Task<IActionResult> List(
        IServiceHandler<GetStatisticMonthRequest, GetStatisticMonthResponse> service,
        DateTime date,
        DateReferenceEnum dateReference = DateReferenceEnum.EntryDate)
    {
        var response = await service.Handle(new GetStatisticMonthRequest(date, dateReference));
        return Ok(response);
    }
}
