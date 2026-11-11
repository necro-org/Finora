using Application.Base;
using Contracts.Repositories.FinancialTypes;
using Domain.Exceptions;

namespace Application.FinancialTypes.DeleteFinancialType;

public class DeleteFinancialTypeService : IServiceHandler<DeleteFinancialTypeRequest, Success>
{
    private readonly IFinancialTypeRepository _financialTypeRepository;

    public DeleteFinancialTypeService(IFinancialTypeRepository financialTypeRepository)
    {
        _financialTypeRepository = financialTypeRepository;
    }

    public async Task<Success> Handle(DeleteFinancialTypeRequest request)
    {
        var financialType = await _financialTypeRepository.GetById(request.Id);

        if (financialType is null) throw new NotFoundException("Não foi possível encontrar um Tipo");

        _financialTypeRepository.Remove(financialType);

        return Success.Value;
    }
}
