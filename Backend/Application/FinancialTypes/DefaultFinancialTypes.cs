namespace Application.FinancialTypes;

public static class DefaultFinancialTypes
{
    public static readonly IReadOnlyList<(string Name, string Color)> Types =
    [
        ("Salário", "#2E7D32"),
        ("Renda Extra", "#66BB6A"),
        ("Investimentos", "#00897B"),
        ("Longo Prazo", "#26A69A"),
        ("Presente", "#EC407A"),
        ("Transporte", "#1E88E5"),
        ("Alimentação", "#FB8C00"),
        ("Supermercado", "#F4511E"),
        ("Necessidades básicas", "#8D6E63"),
        ("Casa", "#5D4037"),
        ("Saúde", "#E53935"),
        ("Educação", "#8E24AA"),
        ("Vestuário", "#D81B60"),
        ("Assinaturas", "#3949AB"),
        ("Viagem", "#00ACC1"),
        ("Lazer", "#FDD835"),
        ("Cuidados Pessoais", "#F06292"),
        ("Gastos Extras", "#78909C"),
    ];
}
