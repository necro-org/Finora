using Application.Authentications.Common;
using Application.Base;
using Application.FinancialTypes;
using Contracts.Authentications;
using Contracts.Repositories.FinancialTypes;
using Contracts.Repositories.Users;
using Domain.Exceptions;
using Domain.FinancialTypes;
using Domain.Users;

namespace Application.Authentications.Register;

public class RegisterUserService : IServiceHandler<RegisterUserRequest, AuthenticationResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterUserService(
        IUserRepository userRepository,
        IFinancialTypeRepository financialTypeRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _financialTypeRepository = financialTypeRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthenticationResponse> Handle(RegisterUserRequest request)
    {
        var userFounded = await _userRepository.GetByEmail(request.Email);

        if (userFounded is not null)
        {
            throw new BadRequestException("O Email informado já está cadastrado.");
        }

        var hashedPassword = _passwordHasher.HashPassword(request.Password);

        var user = new User(
            request.Name,
            request.Email,
            hashedPassword);

        await _userRepository.Add(user);

        foreach (var (name, color) in DefaultFinancialTypes.Types)
        {
            await _financialTypeRepository.Add(new FinancialType(name, color, user.Id));
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResponse(token);
    }
}
