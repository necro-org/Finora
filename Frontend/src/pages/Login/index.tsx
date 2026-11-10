import { Link, Box, Typography, Container, Stack, Button } from "@mui/material";
import useAuth from "@hooks/useAuth";

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/finora.svg"
          alt="Finora"
          sx={{ m: 1, width: 48, height: 48 }}
        />
        <Typography component="h1" variant="h5">
          Entre
        </Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <FormProvider {...form}>
            <Stack gap={1}>
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

          <div className="flex items-center justify-center sm:justify-start">
            <Link
              className="hover:cursor-pointer"
              onClick={() => goToRegistrar()}
              variant="body2"
            >
              Não tem uma conta? Cadastre
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
