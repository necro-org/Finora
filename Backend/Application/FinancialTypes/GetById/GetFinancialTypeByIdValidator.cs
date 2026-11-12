using FluentValidation;

namespace Application.FinancialTypes.GetById;

public class GetFinancialTypeByIdValidator : AbstractValidator<GetFinancialTypeByIdRequest>
{
    public GetFinancialTypeByIdValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
