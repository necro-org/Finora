import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import { Button, Stack } from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateFinancialAccount } from "./mutations/useCreateFinancialAccount";
import { useUpdateFinancialAccount } from "./mutations/useUpdateFinancialAccount";
import { useFinancialAccount } from "./queries/useFinancialAccount";
import { useGoTo } from "@hooks/useGoTo";
import FetchingLoading from "@components/FetchingLoading";
import FormProvider from "@components/FormProvider";
import ColorPicker from "@components/ColorPicker";

const schema = z.object({
  id: z.guid().optional(),
  name: z
    .string({ message: "Informe um Nome" })
    .min(1, "Informe pelo menos um caractere"),
  color: z.string().nullable(),
});

type DataType = z.infer<typeof schema>;

export default function ContasForm() {
  const { accountId } = useParams();

  const isEdit = !!accountId;

  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useFinancialAccount(accountId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreateFinancialAccount();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdateFinancialAccount();
  const { goToContas } = useGoTo();

  const isLoading = _isLoading || isFetching;
  const isSubmitting = isPendingCreate || isPendingUpdate;

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
    values: data,
    defaultValues: {
      color: null,
    },
  });

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({ ...d, id: d.id });
    } else {
      await mutateAsyncCreate(d);
    }
    goToContas();
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: "Contas", path: "/contas" }, { title: pageTitle }]}
    >
      <FormProvider {...form}>
        <Stack gap={1}>
          <FetchingLoading loading={isLoading} />
          <TextField required label="Nome" name="name" autoFocus />
          <ColorPicker label="Cor" name="color" />
          <Stack direction="row" gap={1} justifyContent="end">
            <Button onClick={goToContas} variant="outlined">
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
