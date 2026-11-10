import {
  Grid,
  Box,
  Link,
  Typography,
  Container,
  Button,
  Stack,
} from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoTo } from "@hooks/useGoTo";
import useAuth from "@hooks/useAuth";

import { useAuthenticationsRegister } from "./data/useAuthenticationsRegister";
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
  const { mutateAsync, isPending } = useAuthenticationsRegister();

  const { setToken } = useAuth();
  const { goToPainel, goToLogin } = useGoTo();

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
          Cadastre
        </Typography>
        <Box sx={{ mt: 3, width: "100%" }}>
          <FormProvider {...form}>
            <Stack gap={1}>
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

          <Grid container justifyContent="flex-end">
            <Grid>
              <Link
                className="hover:cursor-pointer"
                onClick={() => goToLogin()}
                variant="body2"
              >
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
