namespace Application.FinancialTypes.Update;

public record UpdateFinancialTypeRequest(Guid Id, string Name, string? Color);
