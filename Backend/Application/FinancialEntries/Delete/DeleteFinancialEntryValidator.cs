using FluentValidation;

namespace Application.FinancialEntries.Delete;

public class DeleteFinancialEntryValidator : AbstractValidator<DeleteFinancialEntryRequest>
{
    public DeleteFinancialEntryValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
