using Domain.FinancialEntries;

namespace Contracts.Repositories.FinancialEntries.Dtos;

public record FinancialEntryFilterDto(
    DateOnly? InitialDate,
    DateOnly? FinalDate,
    decimal? InitialAmount,
    decimal? FinalAmount,
    string? SearchText,
    Guid? TypeId,
    Guid? AccountId,
    ClassificationEnum? Classification,
    Boolean? IsConfirmed,
    DateReferenceEnum? DateReference = null);