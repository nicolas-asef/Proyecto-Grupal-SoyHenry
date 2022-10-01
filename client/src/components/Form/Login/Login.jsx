import { useState, useEffect } from "react";
import * as React from "react";
import style from "./Login.module.css";

import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { validator } from "../validator";
import { authenticate } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  let navigate = useNavigate();
  const authState = useSelector( state => state.authState);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (authState.isLoggedIn){
       return navigate("/home");
    }
 },[authState.isLoggedIn]);

  const onSubmit = async (data) => {
    const statusLogin = await dispatch(authenticate(data))
    if(statusLogin === 404 || statusLogin === 400) setOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Ingresar</h2>
      <div className={style.inputContainer}>
        <TextField
          label="Email"
          type="text"
          variant="filled"
          placeholder="user@email.com"
          name="email"
          error={errors.email ? true : false}
          helperText={validator(errors.email?.type, "email")}
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Password"
          type="password"
          variant="filled"
          error={errors.password ? true : false}
          helperText={validator(errors.password?.type)}
          placeholder="password"
          name="password"
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <div className={style.register}>
        ¿No tiene una cuenta? {" "}
        <Link to='/users/register'>
          <strong>Registrate ahora</strong>
        </Link>
      </div>
      <Button type="submit" value="Ingresar" variant="contained">
        Ingresar
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">Email o contraseña erronea</Alert>
      </Snackbar>

    </form>
  );
};

export default Login;
