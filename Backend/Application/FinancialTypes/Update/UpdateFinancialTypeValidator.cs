using FluentValidation;

namespace Application.FinancialTypes.Update;

public class UpdateFinancialTypeValidator : AbstractValidator<UpdateFinancialTypeRequest>
{
    public UpdateFinancialTypeValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
    }
}
