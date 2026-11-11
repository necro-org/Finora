using System.Globalization;
using Application.Base;
using Contracts.Authentications;
using Contracts.Repositories.FinancialEntries;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.Exceptions;

namespace Application.Importations;

public class ImportationCSVService : IServiceHandler<ImportationCSVRequest, ImportationCSVResponse>
{
    private readonly IUserAuthenticated _userAuthenticated;
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IEnumerable<ICsvImporter> _importers;

    public ImportationCSVService(
        IUserAuthenticated userAuthenticated,
        IFinancialEntryRepository financialEntryRepository,
        IEnumerable<ICsvImporter> importers)
    {
        _userAuthenticated = userAuthenticated;
        _financialEntryRepository = financialEntryRepository;
        _importers = importers;
    }

    public async Task<ImportationCSVResponse> Handle(ImportationCSVRequest request)
    {
        var userId = _userAuthenticated.GetUserId();

        using var memory = new MemoryStream();
        await request.File.CopyToAsync(memory);

        var importer = ResolveImporter(memory)
            ?? throw new BadRequestException("O arquivo não corresponde a nenhum template suportado (Nubank/Rico — extrato ou fatura).");

        memory.Position = 0;
        using var reader = new StreamReader(memory);
        var entries = importer.Import(reader, request.DateFinancialEntry, userId, request.AccountId);

        if (entries.Count == 0)
            return new ImportationCSVResponse(0, importer.GetType().Name);

        await _financialEntryRepository.AddRange(entries);

        return new ImportationCSVResponse(entries.Count, importer.GetType().Name);
    }

    private ICsvImporter? ResolveImporter(MemoryStream content)
    {
        foreach (var importer in _importers)
        {
            content.Position = 0;
            var headers = ReadHeader(content, importer.Delimiter);
            if (importer.Matches(headers))
                return importer;
        }
        return null;
    }

    private static string[] ReadHeader(Stream stream, string delimiter)
    {
        using var reader = new StreamReader(stream, leaveOpen: true);
        var config = new CsvConfiguration(CultureInfo.InvariantCulture) { Delimiter = delimiter };
        using var csv = new CsvReader(reader, config);

        if (!csv.Read() || !csv.ReadHeader()) return [];
        return csv.HeaderRecord ?? [];
    }
}
