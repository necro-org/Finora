import {
  ThemeProvider as ThemeProviderLib,
  alpha,
  createTheme,
} from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const brand = {
  emerald: "#10B981",
  teal: "#0F766E",
  tealDark: "#115E59",
  gold: "#F59E0B",
  goldLight: "#FDE68A",
  goldDark: "#B45309",
};

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const baseTheme = createTheme({
    palette: {
      primary: {
        light: brand.emerald,
        main: brand.teal,
        dark: brand.tealDark,
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: brand.goldLight,
        main: brand.gold,
        dark: brand.goldDark,
        contrastText: "#1F2937",
      },
      success: {
        light: "#4ADE80",
        main: "#16A34A",
        dark: "#15803D",
        contrastText: "#FFFFFF",
      },
      error: {
        light: "#F87171",
        main: "#DC2626",
        dark: "#B91C1C",
        contrastText: "#FFFFFF",
      },
      warning: {
        light: "#FCD34D",
        main: "#D97706",
        dark: "#B45309",
        contrastText: "#FFFFFF",
      },
      info: {
        light: "#38BDF8",
        main: "#0284C7",
        dark: "#0369A1",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#F3F7F6",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#0F172A",
        secondary: "#64748B",
      },
      divider: "#E2E8F0",
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700, letterSpacing: "-0.02em" },
      h5: { fontWeight: 700, letterSpacing: "-0.01em" },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600 },
      overline: { fontWeight: 600, letterSpacing: "0.08em" },
    },
  });

  const { palette } = baseTheme;

  const theme = createTheme(baseTheme, {
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          size: "small",
          disableElevation: true,
          style: { textTransform: "none" },
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            paddingInline: 14,
          },
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
            backgroundColor: palette.background.paper,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.primary.light,
            },
          },
          input: {
            padding: "8px 10px",
          },
          notchedOutline: {
            borderColor: palette.divider,
          },
        },
      },
      MuiPickersOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: 14,
            backgroundColor: palette.background.paper,
            "&:hover:not(.Mui-focused):not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline":
              {
                borderColor: palette.primary.light,
              },
          },
          notchedOutline: {
            borderColor: palette.divider,
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${palette.divider}`,
            boxShadow:
              "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.paper,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background.paper,
            borderRightColor: palette.divider,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              backgroundColor: alpha(palette.primary.main, 0.1),
              color: palette.primary.main,
              "& .MuiListItemIcon-root": {
                color: palette.primary.main,
              },
              "& .MuiListItemText-primary": {
                fontWeight: 600,
              },
              "&:hover": {
                backgroundColor: alpha(palette.primary.main, 0.16),
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            color: palette.text.secondary,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.paper,
            borderRadius: 14,
            borderColor: palette.divider,
            "--DataGrid-containerBackground": alpha(palette.primary.main, 0.05),
          },
          columnHeaderTitle: {
            fontWeight: 600,
            color: palette.text.secondary,
          },
          row: {
            "&:hover": {
              backgroundColor: alpha(palette.primary.main, 0.04),
            },
          },
        },
      },
    },
  });

  return <ThemeProviderLib theme={theme}>{children}</ThemeProviderLib>;
}
