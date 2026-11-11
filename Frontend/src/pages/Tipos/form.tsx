import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import { Button, Stack } from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateFinancialType } from "./mutations/useCreateFinancialType";
import { useUpdateFinancialType } from "./mutations/useUpdateFinancialType";
import { useFinancialType } from "./queries/useFinancialType";
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

export default function TiposForm() {
  const { typeId } = useParams();

  const isEdit = !!typeId;

  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const { data, isLoading: _isLoading, isFetching } = useFinancialType(typeId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreateFinancialType();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdateFinancialType();
  const { goToTipos } = useGoTo();

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
    goToTipos();
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: "Tipos", path: "/tipos" }, { title: pageTitle }]}
    >
      <FormProvider {...form}>
        <Stack gap={1}>
          <FetchingLoading loading={isLoading} />
          <TextField required label="Nome" name="name" autoFocus />
          <ColorPicker label="Cor" name="color" />
          <Stack direction="row" gap={1} justifyContent="end">
            <Button onClick={goToTipos} variant="outlined">
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
