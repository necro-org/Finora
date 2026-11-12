using Application.Authentications.Common;
using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.Users;
using Domain.Exceptions;

namespace Application.Authentications.Login;

public class LoginUserService : IServiceHandler<LoginUserRequest, AuthenticationResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginUserService(
        IUserRepository userRepository, 
        IPasswordHasher passwordHasher, 
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthenticationResponse> Handle(LoginUserRequest request)
    {
        var user = await _userRepository.GetByEmail(request.Email);

        if (user is null)
        {
            throw new BadRequestException("E-mail ou senha informados estão incorretos.");
        }

        if (!_passwordHasher.VerifyPassword(request.Password, user.Password))
        {
            throw new BadRequestException("E-mail ou senha informados estão incorretos.");
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResponse(token);
    }
}
