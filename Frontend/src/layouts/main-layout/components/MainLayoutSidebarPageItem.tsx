import * as React from "react";
import { alpha } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router";

import MainLayoutSidebarContext from "../context/MainLayoutSidebarContext";

export interface MainLayoutSidebarPageItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  selected?: boolean;
}

export default function MainLayoutSidebarPageItem({
  title,
  icon,
  href,
  selected = false,
}: MainLayoutSidebarPageItemProps) {
  const sidebarContext = React.useContext(MainLayoutSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }
  const { mini, onPageItemClick } = sidebarContext;

  return (
    <ListItem disablePadding sx={{ display: "block", px: 1.5, py: 0.25 }}>
      <Tooltip title={mini ? title : ""} placement="right" disableInteractive>
        <ListItemButton
          component={Link}
          to={href}
          selected={selected}
          onClick={onPageItemClick}
          aria-label={title}
          sx={(theme) => ({
            position: "relative",
            minHeight: 42,
            px: 2,
            borderRadius: 2.5,
            justifyContent: mini ? "center" : "flex-start",
            color: theme.palette.text.secondary,
            transition: theme.transitions.create(
              ["background-color", "color"],
              { duration: theme.transitions.duration.shortest },
            ),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
              color: theme.palette.text.primary,
              "& .MuiListItemIcon-root": {
                color: theme.palette.primary.main,
              },
            },
            "&.Mui-selected": {
              color: theme.palette.primary.dark,
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              "&::before": {
                content: '""',
                position: "absolute",
                left: -12,
                top: 8,
                bottom: 8,
                width: 4,
                borderRadius: "0 4px 4px 0",
                backgroundColor: theme.palette.primary.main,
              },
            },
          })}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: mini ? 0 : 1.75,
              color: selected ? "primary.main" : "inherit",
              "& svg": { fontSize: 20 },
            }}
          >
            {icon}
          </ListItemIcon>
          {!mini ? (
            <ListItemText
              primary={title}
              slotProps={{
                primary: {
                  variant: "body2",
                  noWrap: true,
                  fontWeight: selected ? 600 : 500,
                },
              }}
            />
          ) : null}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
