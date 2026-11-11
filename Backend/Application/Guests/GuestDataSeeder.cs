using Application.FinancialTypes;
using Application.Guests.ResetGuest;
using Contracts.Authentications;
using Contracts.Repositories;
using Contracts.Repositories.FinancialAccounts;
using Contracts.Repositories.FinancialEntries;
using Contracts.Repositories.FinancialTypes;
using Contracts.Repositories.RecurringEntries;
using Contracts.Repositories.Users;
using Domain.FinancialAccounts;
using Domain.FinancialEntries;
using Domain.FinancialTypes;
using Domain.RecurringEntries;
using Domain.Users;

namespace Application.Guests;

public class GuestDataSeeder
{
    private const string CheckingAccount = "Conta Corrente";
    private const string CreditCard = "Cartão de Crédito";
    private const string Wallet = "Carteira";
    private const string InvestmentAccount = "Investimentos";

    private static readonly (string Name, string Color)[] FinancialAccounts =
    [
        (CheckingAccount, "#1565C0"),
        (CreditCard, "#7B1FA2"),
        (Wallet, "#43A047"),
        (InvestmentAccount, "#00897B"),
    ];

    private static readonly RecurringTemplate[] RecurringTemplates =
    [
        new("Salário", 9200m, ClassificationEnum.Revenue, 5, "Salário", CheckingAccount),
        new("Aluguel", 2200m, ClassificationEnum.Expense, 10, "Casa", CheckingAccount),
        new("Condomínio", 650m, ClassificationEnum.Expense, 10, "Casa", CheckingAccount),
        new("Internet", 119.90m, ClassificationEnum.Expense, 15, "Casa", CheckingAccount),
        new("Academia", 119.90m, ClassificationEnum.Expense, 1, "Saúde", CreditCard),
        new("Plano de saúde", 480m, ClassificationEnum.Expense, 20, "Saúde", CheckingAccount),
        new("Curso de inglês", 350m, ClassificationEnum.Expense, 25, "Educação", CheckingAccount),
        new("Streaming de vídeo", 55.90m, ClassificationEnum.Expense, 18, "Assinaturas", CreditCard),
        new("Streaming de música", 21.90m, ClassificationEnum.Expense, 18, "Assinaturas", CreditCard),
        new("Aporte mensal", 1000m, ClassificationEnum.Expense, 6, "Investimentos", InvestmentAccount),
        new("Previdência privada", 300m, ClassificationEnum.Expense, 6, "Longo Prazo", InvestmentAccount),
    ];

    private static readonly VariableTemplate[] VariableTemplates =
    [
        new("Supermercado", ["Compra do mês", "Supermercado", "Hortifruti", "Atacadão"], 3, 4, 180m, 620m, CreditCard),
        new("Alimentação", ["Restaurante", "Delivery", "Padaria", "Almoço no trabalho", "Lanchonete"], 4, 6, 28m, 130m, CreditCard),
        new("Transporte", ["Combustível", "Aplicativo de transporte", "Estacionamento", "Pedágio"], 3, 5, 25m, 230m, CreditCard),
        new("Lazer", ["Cinema", "Show", "Bar com amigos", "Passeio no parque", "Ingresso de jogo"], 1, 3, 45m, 280m, CreditCard),
        new("Cuidados Pessoais", ["Cabeleireiro", "Barbearia", "Cosméticos"], 0, 1, 60m, 180m, Wallet),
        new("Vestuário", ["Roupas", "Tênis", "Loja de departamento"], 0, 2, 90m, 380m, CreditCard),
        new("Necessidades básicas", ["Farmácia", "Gás de cozinha", "Lavanderia"], 1, 2, 25m, 120m, Wallet),
        new("Gastos Extras", ["Conserto do celular", "Presente para amigo", "Multa de trânsito"], 0, 1, 50m, 260m, CheckingAccount),
        new("Educação", ["Livro", "Curso online"], 0, 1, 40m, 160m, CreditCard),
        new("Renda Extra", ["Freelance", "Venda de itens usados", "Consultoria"], 0, 1, 450m, 2200m, CheckingAccount),
    ];

    private readonly IUserRepository _userRepository;
    private readonly IFinancialTypeRepository _financialTypeRepository;
    private readonly IFinancialAccountRepository _financialAccountRepository;
    private readonly IRecurringEntryRepository _recurringEntryRepository;
    private readonly IRecurringEntryOccurrenceRepository _recurringEntryOccurrenceRepository;
    private readonly IFinancialEntryRepository _financialEntryRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUnitOfWork _unitOfWork;

    public GuestDataSeeder(
        IUserRepository userRepository,
        IFinancialTypeRepository financialTypeRepository,
        IFinancialAccountRepository financialAccountRepository,
        IRecurringEntryRepository recurringEntryRepository,
        IRecurringEntryOccurrenceRepository recurringEntryOccurrenceRepository,
        IFinancialEntryRepository financialEntryRepository,
        IPasswordHasher passwordHasher,
        IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _financialTypeRepository = financialTypeRepository;
        _financialAccountRepository = financialAccountRepository;
        _recurringEntryRepository = recurringEntryRepository;
        _recurringEntryOccurrenceRepository = recurringEntryOccurrenceRepository;
        _financialEntryRepository = financialEntryRepository;
        _passwordHasher = passwordHasher;
        _unitOfWork = unitOfWork;
    }

    public async Task<(User Guest, ResetGuestResponse Summary)> Reset()
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        var guest = await _userRepository.GetByEmail(GuestAccount.Email);

        if (guest is null)
        {
            var unusablePassword = _passwordHasher.HashPassword(Guid.NewGuid().ToString());
            guest = new User(GuestAccount.Name, GuestAccount.Email, unusablePassword);
            await _userRepository.Add(guest);
        }
        else
        {
            await _userRepository.RemoveAllData(guest.Id);
        }

        var types = new Dictionary<string, FinancialType>();
        foreach (var (name, color) in DefaultFinancialTypes.Types)
        {
            var type = new FinancialType(name, color, guest.Id);
            types[name] = type;
            await _financialTypeRepository.Add(type);
        }

        var accounts = new Dictionary<string, FinancialAccount>();
        foreach (var (name, color) in FinancialAccounts)
        {
            var account = new FinancialAccount(name, color, guest.Id);
            accounts[name] = account;
            await _financialAccountRepository.Add(account);
        }

        var startOfYear = new DateOnly(today.Year, 1, 1);
        var recurringEntries = new List<RecurringEntry>();
        foreach (var template in RecurringTemplates)
        {
            var recurringEntry = new RecurringEntry(
                template.Description,
                template.Amount,
                template.Classification,
                template.DayOfMonth,
                startOfYear,
                null,
                guest.Id,
                types[template.TypeName].Id,
                accounts[template.AccountName].Id);

            recurringEntries.Add(recurringEntry);
            await _recurringEntryRepository.Add(recurringEntry);
        }

        var random = new Random(today.Year);
        var financialEntries = new List<FinancialEntry>();

        for (var month = 1; month <= today.Month; month++)
        {
            foreach (var recurringEntry in recurringEntries)
            {
                var occurrenceDate = recurringEntry.GetOccurrenceDate(today.Year, month);

                if (occurrenceDate > today)
                    continue;

                var financialEntry = new FinancialEntry(
                    occurrenceDate,
                    recurringEntry.Amount,
                    recurringEntry.Classification,
                    guest.Id,
                    recurringEntry.TypeId,
                    recurringEntry.Description,
                    occurrenceDate,
                    recurringEntry.AccountId);

                financialEntries.Add(financialEntry);
                await _recurringEntryOccurrenceRepository.Add(
                    new RecurringEntryOccurrence(recurringEntry.Id, financialEntry.Id, occurrenceDate));
            }

            var monthEntries = new List<EntryTemplate>();

            monthEntries.Add(new EntryTemplate("Conta de luz", "Casa", CheckingAccount, ClassificationEnum.Expense,
                new DateOnly(today.Year, month, 12), RandomAmount(random, 150m, 270m)));
            monthEntries.Add(new EntryTemplate("Conta de água", "Casa", CheckingAccount, ClassificationEnum.Expense,
                new DateOnly(today.Year, month, 14), RandomAmount(random, 65m, 115m)));
            monthEntries.Add(new EntryTemplate("Dividendos", "Investimentos", InvestmentAccount, ClassificationEnum.Revenue,
                new DateOnly(today.Year, month, 15), RandomAmount(random, 60m, 190m)));

            foreach (var template in VariableTemplates)
            {
                var count = random.Next(template.MinCount, template.MaxCount + 1);

                for (var i = 0; i < count; i++)
                {
                    var day = random.Next(1, DateTime.DaysInMonth(today.Year, month) + 1);
                    var classification = template.TypeName == "Renda Extra"
                        ? ClassificationEnum.Revenue
                        : ClassificationEnum.Expense;

                    monthEntries.Add(new EntryTemplate(
                        template.Descriptions[random.Next(template.Descriptions.Length)],
                        template.TypeName,
                        template.AccountName,
                        classification,
                        new DateOnly(today.Year, month, day),
                        RandomAmount(random, template.MinAmount, template.MaxAmount)));
                }
            }

            monthEntries.AddRange(GetSeasonalEntries(today.Year, month));

            foreach (var entry in monthEntries.Where(x => x.Date <= today))
            {
                var datePayment = entry.AccountName == CreditCard
                    ? new DateOnly(entry.Date.Year, entry.Date.Month, 10).AddMonths(1)
                    : entry.Date;

                financialEntries.Add(new FinancialEntry(
                    entry.Date,
                    entry.Amount,
                    entry.Classification,
                    guest.Id,
                    types[entry.TypeName].Id,
                    entry.Description,
                    datePayment,
                    accounts[entry.AccountName].Id));
            }
        }

        await _financialEntryRepository.AddRange(financialEntries);

        await _unitOfWork.SaveChanges();

        var summary = new ResetGuestResponse(
            today,
            types.Count,
            accounts.Count,
            recurringEntries.Count,
            financialEntries.Count);

        return (guest, summary);
    }

    private static IEnumerable<EntryTemplate> GetSeasonalEntries(int year, int month)
    {
        return month switch
        {
            2 => [new("Material escolar", "Educação", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 2, 8), 420m)],
            4 => [new("Restituição do imposto de renda", "Renda Extra", CheckingAccount, ClassificationEnum.Revenue, new DateOnly(year, 4, 28), 1350m)],
            7 =>
            [
                new("Passagens aéreas", "Viagem", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 7, 3), 1680m),
                new("Hospedagem", "Viagem", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 7, 12), 2150m),
                new("Passeios da viagem", "Viagem", Wallet, ClassificationEnum.Expense, new DateOnly(year, 7, 15), 640m),
            ],
            11 =>
            [
                new("13º salário - 1ª parcela", "Salário", CheckingAccount, ClassificationEnum.Revenue, new DateOnly(year, 11, 28), 4600m),
                new("Black Friday", "Vestuário", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 11, 27), 890m),
            ],
            12 =>
            [
                new("13º salário - 2ª parcela", "Salário", CheckingAccount, ClassificationEnum.Revenue, new DateOnly(year, 12, 18), 4600m),
                new("Presentes de Natal", "Presente", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 12, 20), 1240m),
                new("Ceia de Natal", "Supermercado", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 12, 23), 560m),
                new("Viagem de Ano Novo", "Viagem", CreditCard, ClassificationEnum.Expense, new DateOnly(year, 12, 28), 2300m),
            ],
            _ => [],
        };
    }

    private static decimal RandomAmount(Random random, decimal min, decimal max)
    {
        var amount = min + (max - min) * (decimal)random.NextDouble();
        return Math.Round(amount, 2);
    }

    private record RecurringTemplate(
        string Description,
        decimal Amount,
        ClassificationEnum Classification,
        int DayOfMonth,
        string TypeName,
        string AccountName);

    private record VariableTemplate(
        string TypeName,
        string[] Descriptions,
        int MinCount,
        int MaxCount,
        decimal MinAmount,
        decimal MaxAmount,
        string AccountName);

    private record EntryTemplate(
        string Description,
        string TypeName,
        string AccountName,
        ClassificationEnum Classification,
        DateOnly Date,
        decimal Amount);
}
