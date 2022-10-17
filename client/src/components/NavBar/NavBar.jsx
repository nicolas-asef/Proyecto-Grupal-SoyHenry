import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { FaHeart } from "react-icons/fa";

const pages = ["Home", "About", "map"];

const NavBar = () => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const loggedState = useSelector((state) => state.authState);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (location.pathname === "/onboarding") return;

  return (
    <AppBar style={{ background: "#06283D" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Bebas Neue",
              fontWeight: 700,
              letterSpacing: "7px",
              color: "white",
              textShadow: "4px 4px 4px black;",
              fontSize: "2rem",
              textDecoration: "none",
              left: "0",
              transition: "all 2s ease",
              "&:hover": {
                background: "none",
                color: "white",
                textShadow: "4px 4px 4px black;",
              },
            }}
          >
            Changuitas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ fontWeight: 700 }} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,

              fontFamily: "Bebas Neue",
              fontWeight: 700,
              letterSpacing: "7px",
              color: "white",
              textShadow: "4px 4px 4px black;",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "all 2s ease",
              left: "0",
            }}
          >
            Changuitas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  "&:hover": { color: "black" },
                  display: "block",
                  margin: "0.2%",
                  textShadow: "2px 2px 2px black;",
                }}
                component={Link}
                to={`/${page}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <Profile />
            ) : (
              <Button
                onClick={loginWithRedirect}
                sx={{
                  my: 1,
                  color: "white",
                  "&:hover": { color: "black" },
                  display: "flex",
                  textShadow: "4px 4px 4px black;",
                }}
              >
                Ingresar
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
