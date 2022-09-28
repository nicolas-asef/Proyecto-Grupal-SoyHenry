import React from "react";
import { useForm } from "react-hook-form";
import style from "./styles/UserClient.module.css";

const UserClient = () => {
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
						maxLength: 15
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Apellido: </label>
        <input
          type="text"
          placeholder="Gutierrez.."
          {...register("lastname", {
            required: true,
						minLength: 4,
						maxLength: 15
          })}
        />
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
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Contraseña: </label>
        <input
          type="password"
          placeholder="Contraseña.."
          {...register("pass", {
            required: true,
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Telefono: </label>
        <input
          type="text"
          placeholder="123456789.."
          {...register("phone", {
            required: true,
						minLength,
						pattern: /^[0-9]*$/
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="name">Documento de identidad: </label>
        <input
          type="text"
          placeholder="123456789.."
          {...register("dni", {
            required: true,
						pattern: /^[0-9]*$/
          })}
        />
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
      </div>
      <input type="submit" value="Registrarse" />
    </form>
  );
};

export default UserClient;
