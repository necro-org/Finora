using FluentValidation;

namespace Application.RecurringEntries.ListRecurringEntries;

public class GetAllRecurringEntriesValidator : AbstractValidator<GetAllRecurringEntriesRequest>
{
    public GetAllRecurringEntriesValidator()
    {
        RuleFor(x => x.Date).NotEmpty();
    }
}
