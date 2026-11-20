import { Box, type SxProps, type Theme } from "@mui/material";

interface ColorDotProps {
  color: string | null | undefined;
  sx?: SxProps<Theme>;
}

export default function ColorDot({ color, sx }: ColorDotProps) {
  return (
    <Box
      sx={[
        {
          width: 10,
          height: 10,
          borderRadius: "50%",
          flexShrink: 0,
          backgroundColor: color || "grey.400",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
