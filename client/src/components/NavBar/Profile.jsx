import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getUserDetail,
  getUserId,
  changeStatus,
} from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { style } from "@mui/system";
import Chip from "@mui/material/Chip";
import s from "./Profile.module.css";
import { FaHeart } from "react-icons/fa";
import Favorites from "../Favorites/Favorites";
import { agregarSocker } from "../../redux/actions/actions";
import { Badge, ClickAwayListener } from "@mui/material";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import { useState } from "react";
import PopUps from "../PopUps/PopUps";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    user: { sub },
  } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    logout,
    user: { picture },
  } = useAuth0();
  const socket = useSelector((state) => state.socket);
  const [cantNotificaciones, setcantNotificaciones] = useState(0);
  const [popUpsEnabled, setPopUpsEnabled] = useState(false);
  const [popUps, setPopUps] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUserId(sub));
      dispatch(getUserDetail(sub, "GET_USER"));
    }
  }, [dispatch, users.img]);

  useEffect(() => {
    if (sub) {
      dispatch(agregarSocker(sub));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      let popUpsAux = [];
      user.popUps?.forEach((e) => {
        const popUpAux = {};
        popUpAux.img = e.Emiter.img;
        popUpAux.type = e.type;
        popUpAux.name = e.Emiter.name;
        popUpAux.viewed = e.viewed;
        popUpAux.id = e.id;
        popUpsAux.push(popUpAux);
      });
      if (popUpsAux.length > 0) popUpsAux = popUpsAux.reverse(); //Deberia ordenarlos por fecha, para no tener que usar esto que da vuelta cuando quiere las notificaciones jaja
      setPopUps(popUpsAux);
    }
  }, [user]);

  useEffect(() => {
    // console.log(sub);
    if (sub) dispatch(agregarSocker(sub));
  }, [sub]);

  useEffect(() => {
    let cantidadAuxiliar = 0;
    popUps?.forEach((e) => (e.viewed ? cantidadAuxiliar : cantidadAuxiliar++));
    setcantNotificaciones(cantidadAuxiliar);
  }, [popUps, forceUpdate]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);
  useEffect(() => {
    socket?.on("obtenerNotificacion", ({ id, img, nombre_emisor, tipo }) => {
      let popsAuxiliar = popUps;
      let popAuxiliar = {};
      popAuxiliar = {
        type: tipo,
        viewed: false,
        img: img,
        name: nombre_emisor,
      };
      popsAuxiliar.push(popAuxiliar);
      popsAuxiliar = popsAuxiliar.reverse();
      setPopUps(popsAuxiliar);
      let cantidadAuxiliar = 0;
      popsAuxiliar?.forEach((e) =>
        e.viewed ? cantidadAuxiliar : cantidadAuxiliar++
      );
      setcantNotificaciones(cantidadAuxiliar);
    });
  }, [socket, popUps]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/user/${sub}`);
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(changeStatus(sub, false)).then((data) => logout());
  };
  const handleSettings = () => {
    navigate("/profile/settings");
  };

  const handleContracts = () => {
    navigate("/contracts/user/" + sub);
    setAnchorElUser(null);
  };

  const showPopUps = () => {
    setPopUpsEnabled(!popUpsEnabled);
    let vistos = [];
    vistos = popUps.filter((e) => !e.viewed);
    vistos = vistos.map((e) => e.id);
    setPopUps(
      popUps.map((e) => {
        return { ...e, viewed: true };
      })
    ); //Me pinto freestylear jaja
    socket.emit("seen", vistos);
  };
  const DshowPopUps = () => {
    setPopUpsEnabled(false);
  };

  const settings = [
    {
      name: "Profile",
      handler: handleOpenProfile,
    },
    {
      name: "Contratos",
      handler: handleContracts,
    },
    {
      name: "Settings",
      handler: handleSettings,
    },
    {
      name: "Dashboard",
      handler: handleCloseUserMenu,
    },
    {
      name: "Logout",
      handler: handleLogout,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={s.contenedor}>
        <div className={s.badge}>
          <ClickAwayListener onClickAway={DshowPopUps}>
            <div>
              <Badge
                onClick={showPopUps}
                badgeContent={cantNotificaciones}
                color="primary"
              >
                <NotificationsNoneTwoToneIcon />
              </Badge>
              {popUpsEnabled ? <PopUps popUps={popUps} /> : <></>}
            </div>
          </ClickAwayListener>
        </div>
        <div className={s.but}>
          <Button onClick={handleOpen}>
            <FaHeart />
          </Button>

          {open && (
            <Modal open={open} onClick={handleClose}>
              <Box className={s.st}>
                <Favorites />
              </Box>
            </Modal>
          )}
        </div>
        <div>
          <Chip
            className={s.name}
            label={`${users.name} ${users.lastName}`}
            variant="outlined"
          />
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={users.img} />
            </IconButton>
          </Tooltip>
        </div>
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
      </div>
    </>
  );
};

export default Profile;
