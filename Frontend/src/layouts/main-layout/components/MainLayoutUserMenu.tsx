import * as React from "react";
import { alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import useAuth from "@hooks/useAuth";

const MENU_ID = "user-menu";

export default function MainLayoutUserMenu() {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const firstName = user?.name.split(" ")[0];

  const avatar = (size: number) => (
    <Avatar
      sx={(theme) => ({
        width: size,
        height: size,
        fontSize: size * 0.4,
        fontWeight: 700,
        color: theme.palette.primary.contrastText,
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
      })}
    >
      {user?.initials || <PersonRoundedIcon fontSize="small" />}
    </Avatar>
  );

  return (
    <>
      <ButtonBase
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label="Abrir menu do usuário"
        aria-controls={isOpen ? MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        sx={(theme) => ({
          gap: 1,
          py: 0.5,
          pl: 0.5,
          pr: { xs: 0.5, md: 1 },
          borderRadius: 999,
          border: `1px solid ${isOpen ? alpha(theme.palette.primary.main, 0.4) : "transparent"}`,
          backgroundColor: isOpen
            ? alpha(theme.palette.primary.main, 0.08)
            : "transparent",
          transition: theme.transitions.create([
            "background-color",
            "border-color",
          ]),
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
        })}
      >
        {avatar(32)}
        {firstName ? (
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {firstName}
          </Typography>
        ) : null}
        <KeyboardArrowDownRoundedIcon
          sx={{
            display: { xs: "none", md: "block" },
            color: "text.secondary",
            transition: "transform 150ms",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        />
      </ButtonBase>

      <Menu
        id={MENU_ID}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: (theme) => ({
              mt: 1,
              minWidth: 240,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)",
            }),
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1.5}
          sx={{ px: 2, py: 1.5 }}
        >
          {avatar(40)}
          <Stack sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.name || "Usuário"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Conta Finora
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            logout();
          }}
          sx={(theme) => ({
            mx: 1,
            my: 0.5,
            borderRadius: 2,
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
          })}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight={600}>
            Sair
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
