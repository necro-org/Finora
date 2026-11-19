import QueryClientProvider from "@providers/QueryClientProvider";
import ThemeProvider from "@providers/ThemeProvider";
import LocalizationProvider from "@providers/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import RouterProvider from "@providers/RouterProvider";
import ToastProvider from "@providers/ToastProvider";
import AuthProvider from "@providers/AuthProvider";
import NuqsProvider from "@providers/NuqsProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <ToastProvider>
            <CssBaseline />
            <AuthProvider>
              <NuqsProvider>
                <RouterProvider />
              </NuqsProvider>
            </AuthProvider>
          </ToastProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
