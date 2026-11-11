using Domain.Base;
using Domain.FinancialAccounts;
using Domain.FinancialEntries;
using Domain.FinancialTypes;
using Domain.Users;

namespace Domain.RecurringEntries;

public class RecurringEntry : Entity
{
    public string? Description { get; protected set; }
    public decimal Amount { get; protected set; }
    public ClassificationEnum Classification { get; protected set; }
    public int DayOfMonth { get; protected set; }
    public DateOnly StartDate { get; protected set; }
    public DateOnly? EndDate { get; protected set; }
    public bool IsActive { get; protected set; }
    public Guid UserId { get; protected set; }
    public User User { get; protected set; }
    public Guid TypeId { get; protected set; }
    public FinancialType Type { get; protected set; }
    public Guid? AccountId { get; protected set; }
    public FinancialAccount? Account { get; protected set; }
    public ICollection<RecurringEntryOccurrence> Occurrences { get; protected set; } = new List<RecurringEntryOccurrence>();

    protected RecurringEntry() { }

    public RecurringEntry(string? description, decimal amount, ClassificationEnum classification, int dayOfMonth, DateOnly startDate, DateOnly? endDate, Guid userId, Guid typeId, Guid? accountId)
    {
        Description = description;
        Amount = amount;
        Classification = classification;
        DayOfMonth = dayOfMonth;
        StartDate = startDate;
        EndDate = endDate;
        IsActive = true;
        UserId = userId;
        TypeId = typeId;
        AccountId = accountId;
    }

    public void Update(string? description, decimal amount, ClassificationEnum classification, int dayOfMonth, DateOnly startDate, DateOnly? endDate, bool isActive, Guid typeId, Guid? accountId)
    {
        Description = description;
        Amount = amount;
        Classification = classification;
        DayOfMonth = dayOfMonth;
        StartDate = startDate;
        EndDate = endDate;
        IsActive = isActive;
        TypeId = typeId;
        AccountId = accountId;
    }

    public DateOnly GetOccurrenceDate(int year, int month)
    {
        var day = Math.Min(DayOfMonth, DateTime.DaysInMonth(year, month));
        return new DateOnly(year, month, day);
    }

    public bool IsApplicableInMonth(int year, int month)
    {
        var firstDayOfMonth = new DateOnly(year, month, 1);
        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        return IsActive
            && StartDate <= lastDayOfMonth
            && (EndDate == null || EndDate >= firstDayOfMonth);
    }
}
