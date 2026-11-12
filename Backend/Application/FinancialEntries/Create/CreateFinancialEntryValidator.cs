using FluentValidation;

namespace Application.FinancialEntries.Create;

public class CreateFinancialEntryValidator : AbstractValidator<CreateFinancialEntryRequest>
{
    public CreateFinancialEntryValidator()
    {
        RuleFor(x => x.ReplicateUntilDate)
            .GreaterThan(x => x.Date)
            .When(x => x.ReplicateUntilDate.HasValue)
            .WithMessage("A data de replicação deve ser maior que a data do lançamento.");
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty().GreaterThan(0);
        RuleFor(x => x.TypeId).NotEmpty();
        RuleFor(x => x.Classification).IsInEnum();
    }
}
