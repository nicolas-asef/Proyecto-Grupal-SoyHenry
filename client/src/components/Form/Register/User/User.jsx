import {React, useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useEffect } from "react-redux";
import { createUser } from "../../../../redux/actions/actions";
import style from "./styles/User.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { validator } from "../../validator";

const User = (props) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [disable, setDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createUser(data))
      .then(res => {
        res.status === 200 ? setDone(true) : setDone(false)
      })
  };

/*   useEffect( () => {

  });
 */
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
              type="text"
              variant="filled"
              error={errors.work ? true : false}
              helperText={validator(errors.work?.type, "work")}
              placeholder="Electricista.."
              {...register("work", {
                required: true,
              })}
            />
          </div>
          <div className={style.inputContainer}>
            <TextField
              label="Certificacion"
              type="text"
              error={errors.certificate ? true : false}
              helperText={validator(errors.certificate?.type, "certificate")}
              variant="filled"
              {...register("certificate", {
                required: true,
              })}
            />
          </div>
        </>
      )}
      <Button type="submit" variant="contained" value="Registrarse">Registrarse</Button>
    </form>
  );
};

export default User;
