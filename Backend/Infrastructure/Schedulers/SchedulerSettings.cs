namespace Infrastructure.Schedulers;

public class SchedulerSettings
{
    public const string SectionName = "SchedulerSettings";

    public string ApiKey { get; set; } = string.Empty;
}
