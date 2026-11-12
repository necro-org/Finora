using Application.Authentications.Common;
using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.Users;

namespace Application.Guests.Login;

public class LoginGuestService : IServiceHandler<Unit, AuthenticationResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly GuestDataSeeder _guestDataSeeder;

    public LoginGuestService(
        IUserRepository userRepository,
        IJwtTokenGenerator jwtTokenGenerator,
        GuestDataSeeder guestDataSeeder)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _guestDataSeeder = guestDataSeeder;
    }

    public async Task<AuthenticationResponse> Handle(Unit request)
    {
        var guest = await _userRepository.GetByEmail(GuestAccount.Email)
            ?? (await _guestDataSeeder.Reset()).Guest;

        var token = _jwtTokenGenerator.GenerateToken(guest);

        return new AuthenticationResponse(token);
    }
}
