import { Box, Link, Typography, Button, Stack } from "@mui/material";
import AuthCard from "@components/AuthCard";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router";
import { useGoTo } from "@hooks/useGoTo";
import { paths } from "@libs/paths";
import useAuth from "@hooks/useAuth";

import { useRegister } from "./mutations/useRegister";
import TextField from "@components/TextField";
import TextFieldPassword from "@components/TextFieldPassword";
import FormProvider from "@components/FormProvider";

const schema = z
  .object({
    name: z.string({ message: "Informe o Nome" }),
    email: z.email({ message: "Informe o Email" }),
    password: z.string({ message: "Informe a senha" }),
    confirmPassword: z.string({ message: "Informe a confirmação da senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

type DataType = z.infer<typeof schema>;

export default function Register() {
  const { mutateAsync, isPending } = useRegister();

  const { setToken } = useAuth();
  const { goToPainel } = useGoTo();

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(d: DataType) {
    const response = await mutateAsync(d);
    setToken(response.token);
    goToPainel();
  }

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Comece a organizar suas finanças em poucos minutos"
    >
      <Box sx={{ width: "100%" }}>
        <FormProvider {...form}>
          <Stack gap={1.5}>
            <TextField
              name="name"
              autoComplete="given-name"
              autoFocus
              required
              sx={{ ariaLabel: "nome" }}
              label="Nome"
            />
            <TextField
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              autoComplete="email"
              required
              sx={{ ariaLabel: "email" }}
              label="Email"
            />
            <TextFieldPassword
              required
              label="Senha"
              name="password"
              autoComplete="new-password"
            />
            <TextFieldPassword
              required
              name="confirmPassword"
              label="Confirme a senha"
              autoComplete="new-password"
            />
          </Stack>

          <Button
            loading={isPending}
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            onClick={form.handleSubmit(onSubmit)}
          >
            Cadastrar
          </Button>
        </FormProvider>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Já tem uma conta?{" "}
          <Link
            component={RouterLink}
            to={paths.login()}
            variant="body2"
            fontWeight={600}
          >
            Entre
          </Link>
        </Typography>
      </Box>
    </AuthCard>
  );
}
