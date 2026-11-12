import { Link, Box, Typography, Stack, Button, Divider } from "@mui/material";
import useAuth from "@hooks/useAuth";
import AuthCard from "@components/AuthCard";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router";
import { useGoTo } from "@hooks/useGoTo";
import { paths } from "@libs/paths";

import TextField from "@components/TextField";
import TextFieldPassword from "@components/TextFieldPassword";
import FormProvider from "@components/FormProvider";
import { useLogin } from "./mutations/useLogin";
import { useGuestLogin } from "./mutations/useGuestLogin";

const schema = z.object({
  email: z.email({ message: "Informe o Email" }),
  password: z.string({ message: "Informe a senha" }),
});

type DataType = z.infer<typeof schema>;

export default function Login() {
  const { mutateAsync, isPending } = useLogin();
  const { mutateAsync: loginAsGuest, isPending: isGuestPending } =
    useGuestLogin();

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

  async function onGuestLogin() {
    const response = await loginAsGuest();
    setToken(response.token);
    goToPainel();
  }

  return (
    <AuthCard
      title="Bem-vindo de volta"
      subtitle="Entre para acompanhar suas finanças"
    >
      <Box sx={{ width: "100%" }}>
        <FormProvider {...form}>
          <Stack gap={1.5}>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              autoComplete="email"
              autoFocus
              required
              variant="outlined"
              sx={{ ariaLabel: "email" }}
              label="Email"
            />

            <TextFieldPassword
              name="password"
              autoComplete="current-password"
              required
              label="Senha"
            />
          </Stack>

          <Button
            loading={isPending}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            onClick={form.handleSubmit(onSubmit)}
          >
            Entre
          </Button>
        </FormProvider>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Button
          loading={isGuestPending}
          disabled={isPending}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onClick={onGuestLogin}
        >
          Testar sem conta
        </Button>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Não tem uma conta?{" "}
          <Link
            component={RouterLink}
            to={paths.registrar()}
            variant="body2"
            fontWeight={600}
          >
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </AuthCard>
  );
}
