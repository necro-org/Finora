using Api.Controllers.Base;
using Api.Filters;
using Application.Authentications.Common;
using Application.Base;
using Application.Guests.ResetGuest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]/[action]")]
[AllowAnonymous]
public class GuestsController : ApiController
{
    [HttpPost]
    public async Task<IActionResult> Login(IServiceHandler<Unit, AuthenticationResponse> service)
    {
        var response = await service.Handle(Unit.Value);
        return Ok(response);
    }

    [HttpPost]
    [ApiKeyAuthorization]
    public async Task<IActionResult> Reset(IServiceHandler<Unit, ResetGuestResponse> service)
    {
        var response = await service.Handle(Unit.Value);
        return Ok(response);
    }
}
