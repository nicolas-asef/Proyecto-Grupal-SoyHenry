import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { temporalLogout } from '../../redux/actions/actions';
import { useEffect } from 'react';
import { getUsers } from '../../redux/actions/actions'
import {  Route, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';


const Profile = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userinfo = useSelector(state=> state.authState)
  const users = useSelector(state => state.users)
  const userProfileInfo = users.filter(user=> user.id === userinfo.user.id)
  const navigate = useNavigate()


  useEffect(()=>{
    if (users.length === 0) {
    dispatch(getUsers())
    }
    console.log(users)
  },[dispatch])

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/${userProfileInfo[0].Worker.ID}`)
    setAnchorElUser(null);
    console.log(userinfo.user)
    console.log(users)
    console.log(userProfileInfo)
  }
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(temporalLogout());
  }
  
  const settings = [
    {
      name: 'Profile',
      handler: handleOpenProfile
    }, 
    {
      name: "Account",
      handler: handleCloseUserMenu
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
          <Avatar alt="Remy Sharp" src={userinfo.user.img} />
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
          <MenuItem component={Link} href={setting.ruta} key={setting.name} onClick={setting.handler}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Profile;
