import { useState } from "react";
import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import DatePicker from "@components/DatePicker";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";
import AutoCompleteAccount from "@components/AutoComplete/AutoCompleteAccount";
import { Close, Help } from "@mui/icons-material";

import { Button, Grid, IconButton, Stack, Tooltip } from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGoTo } from "@hooks/useGoTo";

import { useCreateFinancialEntry } from "./mutations/useCreateFinancialEntry";
import { useUpdateFinancialEntry } from "./mutations/useUpdateFinancialEntry";
import { useFinancialEntry } from "./queries/useFinancialEntry";
import CurrencyTextField from "@components/CurrencyTextField";
import { formatDate, formatToDayjs, todayDate } from "@utils";
import FetchingLoading from "@components/FetchingLoading";
import FormProvider from "@components/FormProvider";

import { ClassificationEnum } from "./api/types/ClassificationEnum";
import type { GetFinancialEntryResponse } from "./api/types/GetFinancialEntryResponse";

const schema = z.object({
  id: z.guid().optional(),
  date: z.string({ message: "Informe uma Data" }),
  amount: z
    .number({ message: "Informe um Valor" })
    .min(0.01, "Informe pelo menos 0.01"),
  typeId: z.guid({ message: "Informe um Tipo" }),
  classification: z.enum(ClassificationEnum, {
    error: () => ({ message: "Informe uma Classificação" }),
  }),
  description: z.string().nullable(),
  datePayment: z.string().nullable(),
  accountId: z.guid().nullable(),
});

type DataType = z.infer<typeof schema>;

function mapToForm(data: GetFinancialEntryResponse): DataType {
  return {
    ...data,
    typeId: data.typeId ?? "",
  };
}

export default function LancamentosForm() {
  const { typeId } = useParams();

  const [openReplicate, setOpenReplicate] = useState(false);
  const [replicateUntilDate, setReplicateUntilDate] = useState<string | null>(
    null,
  );

  const isEdit = !!typeId;

  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const { data, isLoading: _isLoading, isFetching } = useFinancialEntry(typeId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreateFinancialEntry();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdateFinancialEntry();
  const { goToLancamentos } = useGoTo();

  const isLoading = _isLoading || isFetching;
  const isSubmitting = isPendingCreate || isPendingUpdate;

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      description: null,
      classification: "Expense",
      datePayment: null,
      date: todayDate(),
      accountId: null,
    },
    values: data ? mapToForm(data) : undefined,
  });

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({ ...d, id: d.id });
    } else {
      await mutateAsyncCreate({ data: d, replicateUntilDate });
    }
    goToLancamentos();
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: "Lançamentos", path: "/lancamentos" },
        { title: pageTitle },
      ]}
    >
      <FormProvider {...form}>
        <Stack gap={1}>
          <Grid container spacing={1}>
            <FetchingLoading loading={isLoading} />
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Descrição"
                name="description"
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker label="Data" name="date" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker label="Data de Pagamento" name="datePayment" />
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteTipo name="typeId" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteAccount name="accountId" />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            gap={1}
            justifyContent="space-between"
            alignItems="center"
          >
            {isEdit ? (
              <div />
            ) : openReplicate ? (
              <Stack direction="row" gap={1} alignItems="center">
                <DatePicker
                  label="Replicar até"
                  name="replicateUntilDate"
                  format="MM/YYYY"
                  value={formatToDayjs(replicateUntilDate)}
                  onChange={(newValue) => {
                    setReplicateUntilDate(formatDate(newValue));
                  }}
                />
                <Tooltip title="Vamos replicar até o mês informado e vamos inclui-lo também">
                  <Help color="info" />
                </Tooltip>
                <IconButton
                  onClick={() => {
                    setOpenReplicate(false);
                    setReplicateUntilDate(null);
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>
            ) : (
              <Button onClick={() => setOpenReplicate(true)}>
                Replicar o registro?
              </Button>
            )}

            <Stack direction="row" gap={1} justifyContent="end">
              <Button onClick={goToLancamentos} variant="outlined">
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
        </Stack>
      </FormProvider>
    </PageContainer>
  );
}
