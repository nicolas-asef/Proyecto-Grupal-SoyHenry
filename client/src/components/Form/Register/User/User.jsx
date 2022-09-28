import React from "react";
import { useForm } from "react-hook-form";
import style from "./styles/User.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
          helperText={errors.name && "El campo es requerido"}
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
          helperText={errors.lastname && "El campo es requerido"}
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
          helperText={errors.user && "El campo es requerido"}
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
          helperText={errors.pass && "El campo es requerido"}
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
          helperText={errors.phone && "El campo es requerido"}
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
          helperText={errors.dni && "El campo es requerido"}
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
          helperText={errors.location && "El campo es requerido"}
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
              helperText={errors.work && "El campo es requerido"}
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
              helperText={errors.certificate && "El campo es requerido"}
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
