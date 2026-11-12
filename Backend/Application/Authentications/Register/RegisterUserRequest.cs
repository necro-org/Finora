namespace Application.Authentications.Register;

public record RegisterUserRequest(
    string Name,
    string Email,
    string Password);
