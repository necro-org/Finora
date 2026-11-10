import * as React from "react";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";

import MainLayoutSidebarContext from "../context/MainLayoutSidebarContext";

export interface MainLayoutSidebarHeaderItemProps {
  children?: React.ReactNode;
}

export default function MainLayoutSidebarHeaderItem({
  children,
}: MainLayoutSidebarHeaderItemProps) {
  const sidebarContext = React.useContext(MainLayoutSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }

  if (sidebarContext.mini) {
    return (
      <li>
        <Divider sx={{ mx: 2.5, my: 1.5 }} />
      </li>
    );
  }

  return (
    <ListSubheader
      disableSticky
      sx={{
        px: 3,
        pt: 2,
        pb: 0.75,
        lineHeight: 1.5,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "text.disabled",
        backgroundColor: "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </ListSubheader>
  );
}
