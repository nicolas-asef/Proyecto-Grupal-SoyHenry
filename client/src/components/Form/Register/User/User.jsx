import { useState, useEffect } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getJobs,
} from "../../../../redux/actions/actions";
import style from "./styles/User.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import { validator } from "../../validator";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const User = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [severity, setseverity] = useState("");
  const { jobs } = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(createUser(data)).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        setseverity("success");
      } else {
        setOpen(true);
        setseverity("error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.userclient}>
      <div className={`${style.inputContainer} ${style.horizontal}`}>
        <TextField
          label="Nombre"
          type="text"
          variant="filled"
          error={errors.name ? true : false}
          helperText={validator(errors.name?.type, "name")}
          placeholder="Alfonso.."
          {...register("name", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
        <TextField
          label="Apellido"
          type="text"
          variant="filled"
          error={errors.lastName ? true : false}
          helperText={validator(errors.lastName?.type, "lastname")}
          placeholder="Gutierrez.."
          {...register("lastName", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          type="text"
          label="Email"
          variant="filled"
          error={errors.email ? true : false}
          helperText={validator(errors.email?.type, "email")}
          placeholder="user@mail.com"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            minLength: 5,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Contaseña"
          type="password"
          variant="filled"
          error={errors.password ? true : false}
          helperText={validator(errors.password?.type, "pass")}
          placeholder="Contraseña.."
          {...register("password", {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
        />
      </div>
      <div className={`${style.inputContainer} ${style.horizontal}`}>
        <TextField
          label="Numero de telefono"
          type="text"
          placeholder="123456789.."
          error={errors.phone ? true : false}
          helperText={validator(errors.phone?.type, "phone")}
          variant="filled"
          {...register("phone", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
        <TextField
          label="Documento (DNI)"
          type="text"
          variant="filled"
          error={errors.dni ? true : false}
          helperText={validator(errors.dni?.type, "dni")}
          placeholder="123456789.."
          {...register("dni", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Ubicacion"
          type="text"
          error={errors.location ? true : false}
          helperText={validator(errors.location?.type, "location")}
          variant="filled"
          placeholder="San miguel.."
          {...register("location", {
            required: true,
          })}
        />
      </div>
      {props.type === "worker" && (
        <>
          <div className={style.inputContainer}>
            <TextField
              label="Oficio"
              select
              defaultValue=""
              variant="filled"
              error={errors.work ? true : false}
              placeholder="Electricista.."
              {...register("work", {
                required: true,
              })}
            >
              {jobs &&
                jobs.map((job) => (
                  <MenuItem key={job.id} value={job.name}>
                    {job.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div className={style.inputContainer}>
            <TextField
              label="Certificacion"
              type="text"
              error={errors.certificate ? true : false}
              helperText={validator(errors.certificate?.type, "certificate")}
              variant="filled"
              {...register("certificate")}
            />
          </div>
        </>
      )}
      <Button type="submit" variant="contained" value="Registrarse">
        Registrarse
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{severity === "success" ? "Registrado con exito!" : "Ocurrio un error en el registro"}</Alert>
      </Snackbar>
    </form>
  );
};

export default User;
