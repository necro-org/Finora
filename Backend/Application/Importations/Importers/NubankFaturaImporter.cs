using System.Globalization;
using Application.Importations.Maps;
using Application.Importations.Templates;
using Application.Importations.Utils;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.FinancialEntries;

namespace Application.Importations.Importers;

public sealed class NubankFaturaImporter : ICsvImporter
{
    private static readonly string[] ExpectedHeaders = ["date", "title", "amount"];

    public string Delimiter => ",";

    public bool Matches(string[] headers) => HeaderMatcher.HasAll(headers, ExpectedHeaders);

    public List<FinancialEntry> Import(TextReader reader, DateOnly dateFinancialEntry, Guid userId, Guid? accountId)
    {
        var config = new CsvConfiguration(CultureInfo.InvariantCulture) { Delimiter = Delimiter };
        using var csv = new CsvReader(reader, config);
        csv.Context.RegisterClassMap<NubankFaturaMap>();

        return csv.GetRecords<NubankFaturaTemplateCSV>()
            .Select(x => FinancialEntry.FromImport(
                date: dateFinancialEntry,
                transactionDate: x.Date,
                amount: Math.Abs(x.Amount),
                classification: ClassificationEnum.Expense,
                userId: userId,
                description: x.Title,
                accountId: accountId))
            .ToList();
    }
}
