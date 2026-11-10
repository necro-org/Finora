import {
  ThemeProvider as ThemeProviderLib,
  createTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const theme = createTheme({
    palette: {
      primary: {
        light: "#10B981",
        main: "#0F766E",
        dark: "#115E59",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "#FDE68A",
        main: "#F59E0B",
        dark: "#B45309",
        contrastText: "#1F2937",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          size: "small",
          style: { textTransform: "none" },
        },
      },
      MuiFab: {
        defaultProps: {
          style: { textTransform: "none" },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: "small",
        },
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
          fullWidth: true,
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 36,
            fontSize: 14,
          },
          input: {
            padding: "8px 10px",
          },
        },
      },
    },
  });

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
