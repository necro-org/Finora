using Api.Controllers.Base;
using Application.Base;
using Application.FinancialEntries.Create;
using Application.FinancialEntries.Delete;
using Application.FinancialEntries.GetById;
using Application.FinancialEntries.GetAll;
using Application.FinancialEntries.Update;
using Contracts.Repositories.FinancialEntries.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]")]
public class FinancialEntriesController : ApiController
{
    [HttpPost]
    public async Task<IActionResult> Create(IServiceHandler<CreateFinancialEntryRequest, Success> service, DateOnly? replicateUntilDate, CreateFinancialEntryRequest request)
    {
        await service.Handle(new CreateFinancialEntryRequest(replicateUntilDate, request.Date, request.Amount, request.TypeId, request.Classification, request.Description, request.DatePayment, request.AccountId));
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update(IServiceHandler<UpdateFinancialEntryRequest, Success> service, UpdateFinancialEntryRequest request)
    {
        await service.Handle(request);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(IServiceHandler<DeleteFinancialEntryRequest, Success> service, Guid id)
    {
        await service.Handle(new DeleteFinancialEntryRequest(id));
        return Ok();
    }

    [HttpPost("List")]
    public async Task<IActionResult> List(IServiceHandler<FinancialEntryFilterDto, List<GetAllFinancialEntriesResponse>> service, FinancialEntryFilterDto request)
    {
        var response = await service.Handle(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(IServiceHandler<GetFinancialEntryByIdRequest, GetFinancialEntryByIdResponse> service, Guid id)
    {
        var response = await service.Handle(new GetFinancialEntryByIdRequest(id));
        return Ok(response);
    }
}
