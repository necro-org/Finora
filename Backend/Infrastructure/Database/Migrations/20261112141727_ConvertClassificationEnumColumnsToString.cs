using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class ConvertClassificationEnumColumnsToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "classification",
                schema: "public",
                table: "recurring_entries",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "classification",
                schema: "public",
                table: "financial_entries",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.Sql(@"
                UPDATE public.financial_entries
                SET classification = CASE classification
                    WHEN '0' THEN 'Expense'
                    WHEN '1' THEN 'Revenue'
                END;

                UPDATE public.recurring_entries
                SET classification = CASE classification
                    WHEN '0' THEN 'Expense'
                    WHEN '1' THEN 'Revenue'
                END;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                UPDATE public.financial_entries
                SET classification = CASE classification
                    WHEN 'Expense' THEN '0'
                    WHEN 'Revenue' THEN '1'
                END;

                UPDATE public.recurring_entries
                SET classification = CASE classification
                    WHEN 'Expense' THEN '0'
                    WHEN 'Revenue' THEN '1'
                END;

                ALTER TABLE public.recurring_entries ALTER COLUMN classification TYPE integer USING classification::integer;

                ALTER TABLE public.financial_entries ALTER COLUMN classification TYPE integer USING classification::integer;
            ");
        }
    }
}
