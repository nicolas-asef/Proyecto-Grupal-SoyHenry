import React from "react";
import { useForm } from "react-hook-form";
import style from "./styles/User.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { validator } from "../../validator";

const User = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    alert("Registrandose..");
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
          error={errors.lastname ? true : false}
          helperText={validator(errors.lastname?.type, "lastname")}
          placeholder="Gutierrez.."
          {...register("lastname", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          type="text"
          label="Usuario"
          variant="filled"
          error={errors.user ? true : false}
          helperText={validator(errors.user?.type, "user")}
          placeholder="Usuario_2022"
          {...register("user", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Contaseña"
          type="password"
          variant="filled"
          error={errors.pass ? true : false}
          helperText={validator(errors.pass?.type, "pass")}
          placeholder="Contraseña.."
          {...register("pass", {
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
