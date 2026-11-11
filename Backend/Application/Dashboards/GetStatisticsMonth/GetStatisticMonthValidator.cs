using FluentValidation;

namespace Application.Dashboards.GetStatisticsMonth;

public class GetStatisticMonthValidator: AbstractValidator<GetStatisticMonthRequest>
{
    public GetStatisticMonthValidator()
    {
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.DateReference).IsInEnum();
    }
}
