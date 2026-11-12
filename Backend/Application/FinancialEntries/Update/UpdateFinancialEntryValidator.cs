using FluentValidation;

namespace Application.FinancialEntries.Update;

public class UpdateFinancialEntryValidator : AbstractValidator<UpdateFinancialEntryRequest>
{
    public UpdateFinancialEntryValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty().GreaterThan(0);
        RuleFor(x => x.TypeId).NotEmpty();
        RuleFor(x => x.Classification).IsInEnum();
    }
}
