import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link } from "react-router";

import MainLayoutUserMenu from "./components/MainLayoutUserMenu";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

export interface MainLayoutHeaderProps {
  onOpenMobileMenu: () => void;
}

export default function MainLayoutHeader({
  onOpenMobileMenu,
}: MainLayoutHeaderProps) {
  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: "none" }}>
      <Toolbar disableGutters sx={{ pl: "22px", pr: 2 }}>
        <Link
          to="/painel"
          aria-label="Ir para o painel"
          style={{ textDecoration: "none" }}
        >
          <Stack direction="row" alignItems="center" gap={1.25}>
            <Box
              component="img"
              src="/finora.svg"
              alt=""
              sx={{ width: 32, height: 32, display: "block" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Finora
            </Typography>
          </Stack>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{ marginLeft: "auto" }}
        >
          <MainLayoutUserMenu />
          <Tooltip title="Abrir menu">
            <IconButton
              onClick={onOpenMobileMenu}
              aria-label="Abrir menu"
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
