using FluentValidation;

namespace Application.FinancialAccounts.GetById;

public class GetFinancialAccountByIdValidator : AbstractValidator<GetFinancialAccountByIdRequest>
{
    public GetFinancialAccountByIdValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
