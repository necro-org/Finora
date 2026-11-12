using FluentValidation;

namespace Application.FinancialAccounts.Delete;

public class DeleteFinancialAccountValidator : AbstractValidator<DeleteFinancialAccountRequest>
{
    public DeleteFinancialAccountValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
