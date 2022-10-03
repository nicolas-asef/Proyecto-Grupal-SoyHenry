import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { temporalLogout } from '../../redux/actions/actions';
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(temporalLogout());
  }
  
  const handleSettings = () => {
    navigate('/profile/settings')
  }
  const settings = [
    {
      name: 'Profile',
      handler: handleCloseUserMenu
    }, 
    {
      name: "Settings",
      handler: handleSettings
    },
    {
      name: "Dashboard",
      handler: handleCloseUserMenu
    },
    {
      name: "Logout",
      handler: handleLogout
    }];

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={setting.handler}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Profile;
