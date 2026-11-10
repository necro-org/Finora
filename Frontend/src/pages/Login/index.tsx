import { Link, Box, Typography, Stack, Button } from "@mui/material";
import useAuth from "@hooks/useAuth";
import AuthCard from "@components/AuthCard";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoTo } from "@hooks/useGoTo";

import TextField from "@components/TextField";
import TextFieldPassword from "@components/TextFieldPassword";
import FormProvider from "@components/FormProvider";
import { useAuthenticationsLogin } from "./data/useAuthenticationsLogin";

const schema = z.object({
  email: z.email({ message: "Informe o Email" }),
  password: z.string({ message: "Informe a senha" }),
});

type DataType = z.infer<typeof schema>;

export default function Login() {
  const { mutateAsync, isPending } = useAuthenticationsLogin();

  const { setToken } = useAuth();
  const { goToPainel, goToRegistrar } = useGoTo();

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

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Não tem uma conta?{" "}
          <Link
            component="button"
            type="button"
            onClick={() => goToRegistrar()}
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
