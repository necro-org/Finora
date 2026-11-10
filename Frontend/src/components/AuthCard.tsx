import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        background: `radial-gradient(circle at 15% 20%, ${alpha(primary.light, 0.25)}, transparent 45%),
          radial-gradient(circle at 85% 85%, ${alpha(secondary.main, 0.18)}, transparent 40%),
          linear-gradient(160deg, ${alpha(primary.main, 0.08)}, ${theme.palette.background.default})`,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent
          sx={{ p: { xs: 3, sm: 4 }, "&:last-child": { pb: { xs: 3, sm: 4 } } }}
        >
          <Stack alignItems="center" gap={1} sx={{ mb: 3 }}>
            <Box
              component="img"
              src="/finora.svg"
              alt="Finora"
              sx={{ width: 56, height: 56 }}
            />
            <Typography
              variant="h5"
              sx={{ color: primary.main, letterSpacing: "-0.02em" }}
            >
              Finora
            </Typography>
            <Stack alignItems="center">
              <Typography component="h1" variant="subtitle1">
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
