using Application.Base;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialTypes;
using Contracts.Repositories.RecurringEntries;
using Domain.Exceptions;

namespace Application.FinancialTypes.Delete;

public class DeleteFinancialTypeService : IServiceHandler<DeleteFinancialTypeRequest, Success>
{
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IRecurringEntryRepository _recurringEntryRepository;

    public DeleteFinancialTypeService(
        IFinancialTypeRepository financialTypeRepository,
        IFinancialEntryRepository financialEntryRepository,
        IRecurringEntryRepository recurringEntryRepository)
    {
        _financialTypeRepository = financialTypeRepository;
        _financialEntryRepository = financialEntryRepository;
        _recurringEntryRepository = recurringEntryRepository;
    }

    public async Task<Success> Handle(DeleteFinancialTypeRequest request)
    {
        var financialType = await _financialTypeRepository.GetById(request.Id);

        if (financialType is null) throw new NotFoundException("Não foi possível encontrar um Tipo");

        if (await _financialEntryRepository.ExistsByTypeId(financialType.Id))
            throw new BadRequestException("Não é possível excluir o Tipo, pois ele está sendo usado em Lançamentos");

        if (await _recurringEntryRepository.ExistsByTypeId(financialType.Id))
            throw new BadRequestException("Não é possível excluir o Tipo, pois ele está sendo usado em Lançamentos Recorrentes");

        _financialTypeRepository.Remove(financialType);

        return Success.Value;
    }
}
