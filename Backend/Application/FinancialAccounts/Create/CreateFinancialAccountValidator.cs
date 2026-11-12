using FluentValidation;

namespace Application.FinancialAccounts.Create;

public class CreateFinancialAccountValidator : AbstractValidator<CreateFinancialAccountRequest>
{
    public CreateFinancialAccountValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
    }
}
