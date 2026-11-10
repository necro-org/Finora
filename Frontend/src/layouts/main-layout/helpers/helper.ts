import { type Theme } from "@mui/material/styles";

export function getDrawerWidthTransitionMixin(isExpanded: boolean) {
  return {
    transition: (theme: Theme) =>
      theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
    overflowX: "hidden",
  };
}

export const DRAWER_WIDTH = 248;
export const MINI_DRAWER_WIDTH = 76;
