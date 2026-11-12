using Api.Controllers.Base;
using Application.Base;
using Application.RecurringEntries.Common;
using Application.RecurringEntries.CreateRecurringEntry;
using Application.RecurringEntries.DeleteRecurringEntry;
using Application.RecurringEntries.GetRecurringEntry;
using Application.RecurringEntries.ListRecurringEntries;
using Application.RecurringEntries.UpdateRecurringEntry;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]")]
public class RecurringEntriesController : ApiController
{
    [HttpPost]
    public async Task<IActionResult> Create(IServiceHandler<CreateRecurringEntryRequest, Success> service, CreateRecurringEntryRequest request)
    {
        await service.Handle(request);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update(IServiceHandler<UpdateRecurringEntryRequest, Success> service, UpdateRecurringEntryRequest request)
    {
        await service.Handle(request);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(IServiceHandler<DeleteRecurringEntryRequest, Success> service, Guid id)
    {
        await service.Handle(new DeleteRecurringEntryRequest(id));
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> List(IServiceHandler<GetAllRecurringEntriesRequest, List<GetAllRecurringEntriesResponse>> service, DateTime date)
    {
        var response = await service.Handle(new GetAllRecurringEntriesRequest(date));
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(IServiceHandler<GetRecurringEntryByIdRequest, RecurringEntryResponse> service, Guid id)
    {
        var response = await service.Handle(new GetRecurringEntryByIdRequest(id));
        return Ok(response);
    }
}
