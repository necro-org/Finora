using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.FinancialTypes;
using Domain.FinancialTypes;

namespace Application.FinancialTypes.Create;

public class CreateFinancialTypeService : IServiceHandler<CreateFinancialTypeRequest, Success>
{
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IUserAuthenticated _userAuthenticated;

    public CreateFinancialTypeService(IFinancialTypeRepository financialTypeRepository, IUserAuthenticated userAuthenticated)
    {
        _financialTypeRepository = financialTypeRepository;
        _userAuthenticated = userAuthenticated;
    }

    public async Task<Success> Handle(CreateFinancialTypeRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        var financialType = new FinancialType(request.Name, request.Color, userId);

        await _financialTypeRepository.Add(financialType);

        return Success.Value;
    }
}
