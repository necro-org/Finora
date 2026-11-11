using FluentValidation;

namespace Application.RecurringEntries.ListRecurringEntries;

public class ListRecurringEntriesValidator : AbstractValidator<ListRecurringEntriesRequest>
{
    public ListRecurringEntriesValidator()
    {
        RuleFor(x => x.Date).NotEmpty();
    }
}
