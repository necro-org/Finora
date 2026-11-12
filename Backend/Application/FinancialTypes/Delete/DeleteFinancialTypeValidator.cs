using FluentValidation;

namespace Application.FinancialTypes.Delete;

public class DeleteFinancialTypeValidator : AbstractValidator<DeleteFinancialTypeRequest>
{
    public DeleteFinancialTypeValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
