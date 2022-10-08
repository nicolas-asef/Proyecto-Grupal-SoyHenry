import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  getUserId } from '../../redux/actions/actions'
import {  useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const dispatch = useDispatch();
  const { user: { sub } } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userinfo = useSelector(state=> state.authState)
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const { logout } = useAuth0();


  useEffect(()=>{
    if (users.length === 0) {
    dispatch(getUserId(sub))
    }
  },[dispatch])

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/${sub}`)
    setAnchorElUser(null);
  }
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
  }
  const handleSettings = () => {
    navigate('/profile/settings')
  }
  
  const handleContracts = () => {
    navigate("/contracts/user/"+sub);
    setAnchorElUser(null);
  }

  const settings = [
    {
      name: 'Profile',
      handler: handleOpenProfile
    }, 
    {
      name: "Contratos",
      handler: handleContracts
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
    }
    ];
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" /* src={userinfo.user.img} */ />
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
