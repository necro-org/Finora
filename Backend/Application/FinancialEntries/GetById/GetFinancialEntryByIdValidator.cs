using FluentValidation;

namespace Application.FinancialEntries.GetById;

public class GetFinancialEntryByIdValidator : AbstractValidator<GetFinancialEntryByIdRequest>
{
    public GetFinancialEntryByIdValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
