import * as React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Navigate, Outlet } from "react-router";

import MainLayoutHeader from "./MainLayoutHeader";
import MainLayoutSidebar from "./MainLayoutSidebar";

import useAuth from "@hooks/useAuth";
import { useLayoutPreferencesStore } from "@stores/layoutPreferencesStore";

export default function MainLayout() {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));

  const { isSidebarExpanded: isDesktopExpanded, setIsSidebarExpanded } =
    useLayoutPreferencesStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const setExpanded = React.useCallback(
    (expanded: boolean) => {
      if (isOverSmViewport) {
        setIsSidebarExpanded(expanded);
      } else {
        setIsMobileOpen(expanded);
      }
    },
    [isOverSmViewport, setIsSidebarExpanded],
  );

  const layoutRef = React.useRef<HTMLDivElement>(null);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      ref={layoutRef}
      sx={{
        position: "relative",
        display: "flex",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <MainLayoutHeader onOpenMobileMenu={() => setIsMobileOpen(true)} />
      <MainLayoutSidebar
        expanded={isOverSmViewport ? isDesktopExpanded : isMobileOpen}
        setExpanded={setExpanded}
        containerRef={layoutRef}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: "none" }} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
