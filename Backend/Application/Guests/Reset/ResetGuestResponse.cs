namespace Application.Guests.Reset;

public record ResetGuestResponse(
    DateOnly ReferenceDate,
    int FinancialTypesCount,
    int FinancialAccountsCount,
    int RecurringEntriesCount,
    int FinancialEntriesCount);
