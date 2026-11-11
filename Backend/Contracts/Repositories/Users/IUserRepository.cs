using Domain.Users;

namespace Contracts.Repositories.Users;

public interface IUserRepository
{
    Task Add(User user);
    Task<User?> GetByEmail(string email);
    Task RemoveAllData(Guid userId);
}
