import {
  Avatar,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export type StatCardColor =
  "primary" | "secondary" | "success" | "error" | "warning" | "info";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: StatCardColor;
  caption?: React.ReactNode;
  loading?: boolean;
}

export default function StatCard({
  label,
  value,
  icon,
  color = "primary",
  caption,
  loading = false,
}: StatCardProps) {
  const theme = useTheme();
  const paletteColor = theme.palette[color];

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 auto 0 0",
          width: 4,
          backgroundColor: paletteColor.main,
        },
      }}
    >
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Stack gap={0.5} sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              lineHeight={1.5}
            >
              {label}
            </Typography>
            {loading ? (
              <Skeleton
                variant="text"
                width={120}
                sx={{ fontSize: "1.5rem" }}
              />
            ) : (
              <Typography
                variant="h5"
                sx={{ color: paletteColor.dark, whiteSpace: "nowrap" }}
              >
                {value}
              </Typography>
            )}
            {caption ? (
              <Typography variant="caption" color="text.secondary">
                {caption}
              </Typography>
            ) : null}
          </Stack>
          <Avatar
            variant="rounded"
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              color: paletteColor.main,
              backgroundColor: alpha(paletteColor.main, 0.12),
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
