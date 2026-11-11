using Application.Base;
using Contracts.Repositories.FinancialTypes;
using Domain.Exceptions;

namespace Application.FinancialTypes.UpdateFinancialType;

public class UpdateFinancialTypeService : IServiceHandler<UpdateFinancialTypeRequest, Success>
{
    private readonly IFinancialTypeRepository _financialTypeRepository;

    public UpdateFinancialTypeService(IFinancialTypeRepository financialTypeRepository)
    {
        _financialTypeRepository = financialTypeRepository;
    }

    public async Task<Success> Handle(UpdateFinancialTypeRequest request)
    {
        var financialType = await _financialTypeRepository.GetById(request.Id);

        if (financialType is null) throw new NotFoundException("Não foi possível encontrar um Tipo");

        financialType.Update(request.Name, request.Color);

        return Success.Value;
    }
}
