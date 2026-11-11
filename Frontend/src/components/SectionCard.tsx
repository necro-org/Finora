import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

interface SectionCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  sx,
}: SectionCardProps) {
  const hasHeader = Boolean(title || subtitle || action);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", ...sx }}>
      {hasHeader ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ px: 2.5, py: 1.75, flexWrap: "wrap", rowGap: 1 }}
          >
            <Stack sx={{ minWidth: 0 }}>
              {title ? (
                <Typography variant="subtitle1">{title}</Typography>
              ) : null}
              {subtitle ? (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
            {action}
          </Stack>
          <Divider />
        </>
      ) : null}
      <CardContent sx={{ flex: 1, "&:last-child": { pb: 2 } }}>
        {children}
      </CardContent>
    </Card>
  );
}
