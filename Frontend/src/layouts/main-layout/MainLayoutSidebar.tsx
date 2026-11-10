import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

import { matchPath, useLocation } from "react-router";

import MainLayoutSidebarContext from "./context/MainLayoutSidebarContext";
import MainLayoutSidebarPageItem from "./components/MainLayoutSidebarPageItem";
import MainLayoutSidebarHeaderItem from "./components/MainLayoutSidebarHeaderItem";

import {
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
  getDrawerWidthTransitionMixin,
} from "./helpers/helper";

const NAVIGATION = [
  {
    section: "Visão geral",
    items: [
      { title: "Painel", href: "/painel", icon: <SpaceDashboardRoundedIcon /> },
    ],
  },
  {
    section: "Movimentações",
    items: [
      {
        title: "Lançamentos",
        href: "/lancamentos",
        icon: <ReceiptLongRoundedIcon />,
      },
      {
        title: "Recorrentes",
        href: "/lancamentos-recorrentes",
        icon: <EventRepeatRoundedIcon />,
      },
    ],
  },
  {
    section: "Cadastros",
    items: [
      { title: "Tipos", href: "/tipos", icon: <CategoryRoundedIcon /> },
      { title: "Contas", href: "/contas", icon: <AccountBalanceRoundedIcon /> },
    ],
  },
];

export interface MainLayoutSidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function MainLayoutSidebar({
  expanded,
  setExpanded,
  containerRef,
}: MainLayoutSidebarProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));

  const mini = isOverSmViewport && !expanded;

  const sidebarContextValue = React.useMemo(
    () => ({
      mini,
      onPageItemClick: () => {
        if (!isOverSmViewport) {
          setExpanded(false);
        }
      },
    }),
    [mini, isOverSmViewport, setExpanded],
  );

  const isSelected = (href: string) =>
    !!matchPath({ path: href, end: false }, pathname);

  const navigation = (
    <List disablePadding sx={{ pt: 1 }}>
      {NAVIGATION.map((group) => (
        <React.Fragment key={group.section}>
          <MainLayoutSidebarHeaderItem>
            {group.section}
          </MainLayoutSidebarHeaderItem>
          {group.items.map((item) => (
            <MainLayoutSidebarPageItem
              key={item.href}
              title={item.title}
              icon={item.icon}
              href={item.href}
              selected={isSelected(item.href)}
            />
          ))}
        </React.Fragment>
      ))}
    </List>
  );

  const collapseLabel = expanded ? "Recolher menu" : "Expandir menu";

  const collapseButton = (
    <Box sx={{ p: 1.5 }}>
      <Tooltip title={mini ? collapseLabel : ""} placement="right">
        <ListItemButton
          onClick={() => setExpanded(!expanded)}
          aria-label={collapseLabel}
          sx={{
            minHeight: 40,
            px: 2,
            borderRadius: 2.5,
            justifyContent: mini ? "center" : "flex-start",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: mini ? 0 : 1.75,
              color: "inherit",
              "& svg": { fontSize: 20 },
            }}
          >
            {expanded ? (
              <KeyboardDoubleArrowLeftRoundedIcon />
            ) : (
              <KeyboardDoubleArrowRightRoundedIcon />
            )}
          </ListItemIcon>
          {!mini ? (
            <ListItemText
              primary={collapseLabel}
              slotProps={{
                primary: { variant: "body2", fontWeight: 500, noWrap: true },
              }}
            />
          ) : null}
        </ListItemButton>
      </Tooltip>
    </Box>
  );

  const paperBackground = `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.05,
  )} 0%, ${theme.palette.background.paper} 45%)`;

  const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <MainLayoutSidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={() => containerRef?.current ?? document.body}
        variant="temporary"
        open={!isOverSmViewport && expanded}
        onClose={() => setExpanded(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundImage: paperBackground,
          },
        }}
      >
        <Toolbar disableGutters sx={{ px: "22px" }}>
          <Stack direction="row" alignItems="center" gap={1.25}>
            <Box
              component="img"
              src="/finora.svg"
              alt="Finora"
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="h6" color="primary.main" fontWeight={700}>
              Finora
            </Typography>
          </Stack>
        </Toolbar>
        <Divider />
        <Box
          component="nav"
          aria-label="Menu principal"
          sx={{ overflowY: "auto" }}
        >
          {navigation}
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          ...getDrawerWidthTransitionMixin(expanded),
          "& .MuiDrawer-paper": {
            position: "absolute",
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundImage: paperBackground,
            ...getDrawerWidthTransitionMixin(expanded),
          },
        }}
      >
        <Toolbar />
        <Box
          component="nav"
          aria-label="Menu principal"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Box sx={{ flex: 1 }}>{navigation}</Box>
          <Divider />
          {collapseButton}
        </Box>
      </Drawer>
    </MainLayoutSidebarContext.Provider>
  );
}
