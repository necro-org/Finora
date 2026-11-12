using Application.Base;
using Application.FinancialTypes.Common;
using Contracts.Repositories.FinancialTypes;
using Domain.Exceptions;

namespace Application.FinancialTypes.GetById;

public class GetFinancialTypeByIdService : IServiceHandler<GetFinancialTypeByIdRequest, FinancialTypeResponse>
{
    private readonly IFinancialTypeRepository _financialTypeRepository;

    public GetFinancialTypeByIdService(IFinancialTypeRepository financialTypeRepository)
    {
        _financialTypeRepository = financialTypeRepository;
    }

    public async Task<FinancialTypeResponse> Handle(GetFinancialTypeByIdRequest request)
    {
        var financialType = await _financialTypeRepository.GetById(request.Id);

        if (financialType is null) throw new NotFoundException("Não foi possível encontrar um Tipo");

        return new FinancialTypeResponse(financialType.Id, financialType.Name, financialType.Color);
    }
}