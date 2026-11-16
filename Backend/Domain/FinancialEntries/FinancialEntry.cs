using Domain.Base;
using Domain.FinancialAccounts;
using Domain.FinancialTypes;
using Domain.Users;

namespace Domain.FinancialEntries;

public class FinancialEntry : Entity
{
    public DateOnly Date { get; protected set; }
    public decimal Amount { get; protected set; }
    public ClassificationEnum Classification { get; protected set; }
    public string? Description { get; protected set; }
    public DateOnly? TransactionDate { get; protected set; }
    public Guid UserId { get; protected set; }
    public User User { get; protected set; }
    public Guid? TypeId { get; protected set; }
    public FinancialType? Type { get; protected set; }
    public Guid? AccountId { get; protected set; }
    public FinancialAccount? Account { get; protected set; }

    public bool IsConfirmed => TypeId.HasValue;

    protected FinancialEntry() { }

    public FinancialEntry(DateOnly date, decimal amount, ClassificationEnum classification, Guid userId, Guid typeId, string? description, DateOnly? transactionDate, Guid? accountId)
    {
        Date = date;
        Amount = amount;
        Classification = classification;
        UserId = userId;
        TypeId = typeId;
        Description = description;
        TransactionDate = transactionDate;
        AccountId = accountId;
    }

    public void Update(DateOnly date, decimal amount, ClassificationEnum classification, Guid typeId, string? description, DateOnly? transactionDate, Guid? accountId)
    {
        Date = date;
        Amount = amount;
        Classification = classification;
        TypeId = typeId;
        Description = description;
        TransactionDate = transactionDate;
        AccountId = accountId;
    }

    public static FinancialEntry FromImport(DateOnly date, DateOnly transactionDate, decimal amount, ClassificationEnum classification, Guid userId, string? description, Guid? accountId)
    {
        return new FinancialEntry
        {
            Date = date,
            TransactionDate = transactionDate,
            Amount = amount,
            Classification = classification,
            UserId = userId,
            TypeId = null,
            Description = description,
            AccountId = accountId
        };
    }
}
