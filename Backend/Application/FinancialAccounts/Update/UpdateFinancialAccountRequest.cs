namespace Application.FinancialAccounts.Update;

public record UpdateFinancialAccountRequest(Guid Id, string Name, string? Color);
