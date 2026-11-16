using System.Globalization;
using Application.Importations.Maps;
using Application.Importations.Templates;
using Application.Importations.Utils;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.FinancialEntries;

namespace Application.Importations.Importers;

public sealed class RicoFaturaImporter : ICsvImporter
{
    private static readonly string[] ExpectedHeaders = ["Data", "Estabelecimento", "Portador", "Valor", "Parcela"];

    public string Delimiter => ";";

    public bool Matches(string[] headers) => HeaderMatcher.HasAll(headers, ExpectedHeaders);

    public List<FinancialEntry> Import(TextReader reader, DateOnly dateFinancialEntry, Guid userId, Guid? accountId)
    {
        var config = new CsvConfiguration(CultureInfo.InvariantCulture) { Delimiter = Delimiter };
        using var csv = new CsvReader(reader, config);
        csv.Context.RegisterClassMap<RicoFaturaMap>();

        return csv.GetRecords<RicoFaturaTemplateCSV>()
            .Select(x => FinancialEntry.FromImport(
                date: dateFinancialEntry,
                transactionDate: x.Data,
                amount: Math.Abs(x.Valor),
                classification: ClassificationEnum.Expense,
                userId: userId,
                description: BuildDescription(x),
                accountId: accountId))
            .ToList();
    }

    private static string BuildDescription(RicoFaturaTemplateCSV row)
    {
        var parcela = row.Parcela?.Trim();
        return string.IsNullOrEmpty(parcela) || parcela == "-"
            ? row.Estabelecimento
            : $"{row.Estabelecimento} ({parcela})";
    }
}
