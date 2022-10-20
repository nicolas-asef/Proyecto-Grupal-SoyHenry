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
import style from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { FaHeart } from "react-icons/fa";


const pages = [
  { name: "Inicio", ruta: "home" },
  { name: "Sobre nosotros", ruta: "about" },
  { name: "Mapa", ruta: "map" },
];

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
          <Link to="/" className={style.linkLogo}>
            <div className={style.logotype}>
              <img src="https://i.imgur.com/mVRDDgD.png" alt="" />
            </div>
            <div className={style.logoText}>Changuitas |</div>
          </Link>
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
                <MenuItem key={page.ruta} onClick={handleCloseNavMenu}>
                  <Typography sx={{ fontWeight: 700 }} textAlign="center">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.ruta}
                onClick={handleCloseNavMenu}
                className={style.buttonLinks}
                sx={{
                  my: 2,
                  color: "white",
                  "&:hover": { color: "white" },
                  display: "block",
                  margin: "0.2%",
                  fontWeight: "bold",
                }}
                component={Link}
                to={`/${page.ruta}`}
              >
                {page.name}
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
                  "&:hover": { color: "white" },
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
