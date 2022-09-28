import React from "react";
import { useForm } from "react-hook-form";
import style from "./styles/User.module.css";

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
      <div className={style.inputContainer}>
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          placeholder="Alfonso.."
          {...register("name", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
        {errors.name?.type === "required" && <span>El campo es requerido</span>}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Apellido: </label>
        <input
          type="text"
          placeholder="Gutierrez.."
          {...register("lastname", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
        {errors.lastname?.type === "required" && (
          <span>El campo es requerido</span>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Usuario: </label>
        <input
          type="text"
          placeholder="Usuario_202.."
          {...register("user", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
        {errors.user?.type === "required" && <span>El campo es requerido</span>}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Contraseña: </label>
        <input
          type="password"
          placeholder="Contraseña.."
          {...register("pass", {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
        />
        {errors.pass?.type === "required" && <span>El campo es requerido</span>}
        {errors.pass?.type === "pattern" && (
          <span>Ingresa una contraseña valida</span>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Telefono: </label>
        <input
          type="text"
          placeholder="123456789.."
          {...register("phone", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
        {errors.phone?.type === "required" && (
          <span>El campo es requerido</span>
        )}
        {errors.phone?.type === "pattern" && (
          <span>Ingresa un numero valido</span>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Documento de identidad: </label>
        <input
          type="text"
          placeholder="123456789.."
          {...register("dni", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
        {errors.dni?.type === "required" && <span>El campo es requerido</span>}
        {errors.dni?.type === "pattern" && (
          <span>Ingresa un documento valido</span>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Ubicacion: </label>
        <input
          type="text"
          placeholder="San miguel.."
          {...register("location", {
            required: true,
          })}
        />
        {errors.location?.type === "required" && (
          <span>El campo es requerido</span>
        )}
      </div>
      {props.type === "worker" && (
        <>
          <div className={style.inputContainer}>
            <label htmlFor="name">Oficio: </label>
            <input
              type="text"
              placeholder="Electricista.."
              {...register("work", {
                required: true,
              })}
            />
            {errors.location?.type === "required" && (
              <span>El campo es requerido</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="name">Certificacion: </label>
            <input
              type="text"
              {...register("certificate", {
                required: true,
              })}
            />
            {errors.location?.type === "required" && (
              <span>El campo es requerido</span>
            )}
          </div>
        </>
      )}
      <input type="submit" value="Registrarse" />
    </form>
  );
};

export default User;
