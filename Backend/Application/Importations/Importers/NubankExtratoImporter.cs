using System.Globalization;
using Application.Importations.Maps;
using Application.Importations.Templates;
using Application.Importations.Utils;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.FinancialEntries;

namespace Application.Importations.Importers;

public sealed class NubankExtratoImporter : ICsvImporter
{
    private static readonly string[] ExpectedHeaders = ["Data", "Valor", "Identificador", "Descrição"];

    public string Delimiter => ",";

    public bool Matches(string[] headers) => HeaderMatcher.HasAll(headers, ExpectedHeaders);

    public List<FinancialEntry> Import(TextReader reader, DateOnly dateFinancialEntry, Guid userId, Guid? accountId)
    {
        var config = new CsvConfiguration(CultureInfo.InvariantCulture) { Delimiter = Delimiter };
        using var csv = new CsvReader(reader, config);
        csv.Context.RegisterClassMap<NubankExtratoMap>();

        return csv.GetRecords<NubankExtratoTemplateCSV>()
            .Select(x => FinancialEntry.FromImport(
                date: dateFinancialEntry,
                transactionDate: x.Data,
                amount: Math.Abs(x.Valor),
                classification: x.Valor < 0 ? ClassificationEnum.Expense : ClassificationEnum.Revenue,
                userId: userId,
                description: x.Descricao,
                accountId: accountId))
            .ToList();
    }
}
