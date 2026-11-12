import { Link, useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import DatePicker from "@components/DatePicker";
import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";
import AutoCompleteAccount from "@components/AutoComplete/AutoCompleteAccount";
import FormProvider from "@components/FormProvider";
import FetchingLoading from "@components/FetchingLoading";

import { Button, FormControlLabel, Grid, Stack, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGoTo } from "@hooks/useGoTo";
import { paths } from "@libs/paths";
import { startOfMonth } from "@utils";
import { ClassificationEnum } from "@pages/Lancamentos/api/types/ClassificationEnum";

import { useCreateRecurringEntry } from "./mutations/useCreateRecurringEntry";
import { useUpdateRecurringEntry } from "./mutations/useUpdateRecurringEntry";
import { useRecurringEntry } from "./queries/useRecurringEntry";

const schema = z.object({
  id: z.guid().optional(),
  description: z.string().nullable(),
  amount: z
    .number({ message: "Informe um Valor" })
    .min(0.01, "Informe pelo menos 0.01"),
  classification: z.enum(ClassificationEnum, {
    error: () => ({ message: "Informe uma Classificação" }),
  }),
  dayOfMonth: z
    .number({ message: "Informe o dia do mês" })
    .min(1, "Dia deve ser entre 1 e 31")
    .max(31, "Dia deve ser entre 1 e 31"),
  startDate: z.string({ message: "Informe a data de início" }),
  endDate: z.string().nullable(),
  isActive: z.boolean().optional(),
  typeId: z.guid({ message: "Informe um Tipo" }),
  accountId: z.guid().nullable(),
});

type DataType = z.infer<typeof schema>;

export default function RecurringEntriesForm() {
  const { recurringEntryId } = useParams();

  const isEdit = !!recurringEntryId;
  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useRecurringEntry(recurringEntryId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreateRecurringEntry();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdateRecurringEntry();
  const { goToRecurringEntries } = useGoTo();

  const isLoading = _isLoading || isFetching;
  const isSubmitting = isPendingCreate || isPendingUpdate;

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: null,
      amount: 0,
      classification: "Expense",
      dayOfMonth: 1,
      startDate: startOfMonth(),
      endDate: null,
      isActive: true,
      typeId: "",
      accountId: null,
    },
    values: data,
  });

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({
        ...d,
        id: d.id,
        isActive: d.isActive ?? true,
      });
    } else {
      await mutateAsyncCreate(d);
    }
    goToRecurringEntries();
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: "Lançamentos Recorrentes", path: "/lancamentos-recorrentes" },
        { title: pageTitle },
      ]}
    >
      <FormProvider {...form}>
        <Stack gap={1}>
          <FetchingLoading loading={isLoading} />
          <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Descrição"
                name="description"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CurrencyTextField
                label="Valor"
                name="amount"
                required
                autoFocus
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteClassificacao name="classification" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Dia do mês"
                name="dayOfMonth"
                type="number"
                required
                slotProps={{ htmlInput: { min: 1, max: 31 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker label="Data de início" name="startDate" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker label="Data de encerramento" name="endDate" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteTipo name="typeId" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteAccount name="accountId" />
            </Grid>
            {isEdit && (
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="isActive"
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value ?? true}
                          onChange={field.onChange}
                        />
                      }
                      label="Ativo"
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <Stack direction="row" gap={1} justifyContent="end">
            <Button
              component={Link}
              to={paths.recurringEntries()}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              loading={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
            >
              Salvar
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </PageContainer>
  );
}
