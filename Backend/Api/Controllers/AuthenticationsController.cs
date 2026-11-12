using Api.Controllers.Base;
using Application.Authentications.Common;
using Application.Authentications.Register;
using Application.Authentications.Login;
using Application.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("[controller]/[action]")]
public class AuthenticationsController : ApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register(IServiceHandler<RegisterUserRequest, AuthenticationResponse> service, RegisterUserRequest request)
    {
        var response = await service.Handle(request);
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Login(IServiceHandler<LoginUserRequest, AuthenticationResponse> service, LoginUserRequest request)
    {
        var response = await service.Handle(request);
        return Ok(response);
    }
}
