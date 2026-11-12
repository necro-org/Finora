using FluentValidation;

namespace Application.FinancialTypes.Create;

public class CreateFinancialTypeValidator : AbstractValidator<CreateFinancialTypeRequest>
{
    public CreateFinancialTypeValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
    }
}
