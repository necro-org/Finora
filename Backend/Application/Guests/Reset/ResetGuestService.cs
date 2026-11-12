using Application.Base;

namespace Application.Guests.Reset;

public class ResetGuestService : IServiceHandler<Unit, ResetGuestResponse>
{
    private readonly GuestDataSeeder _guestDataSeeder;

    public ResetGuestService(GuestDataSeeder guestDataSeeder)
    {
        _guestDataSeeder = guestDataSeeder;
    }

    public async Task<ResetGuestResponse> Handle(Unit request)
    {
        var (_, summary) = await _guestDataSeeder.Reset();
        return summary;
    }
}
