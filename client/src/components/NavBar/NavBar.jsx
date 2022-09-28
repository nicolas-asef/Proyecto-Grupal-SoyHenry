import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';



const NavBar = () => {
  let location = useLocation()
  const {pathname} = location;


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


	return (
    <div className="nav-container">
      <div className="left">
        <div className="logo">
          <img
            src="https://cdn1.vectorstock.com/i/1000x1000/08/15/worker-icon-stylized-logo-construction-vector-30080815.jpg"
            alt="logo"
            width="80px"
            height="80px"
          />
        </div>
      </div>
      <div className="switch-navBar">
        {pathname === "/" && (
          <div className="right-container">
            <div className="login">
              <Link to="/users/login">
                <button className="btn-login">Login</button>
              </Link>
            </div>
            <div className="register">
              <Link to="/users/register">
                <button className="btn-register">Register</button>
              </Link>
            </div>
          </div>
        )}
        {pathname === "/home" && (
          <div className="user-profile">
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 50, height: 50 }}>P</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <CalendarMonthIcon fontSize="small" />
                  </ListItemIcon>
                  Calendary
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Upgrade
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
