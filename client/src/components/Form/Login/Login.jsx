import style from "./Login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert("Ingresando");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
			<h2>Login</h2>
      <div className={style.inputContainer}>
        <label htmlFor="userLogin">Email</label>
        <input
          type="text"
          placeholder="user@email.com"
          name="email"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
        {errors.email?.type === "required" && (
          <span>El campo es requerido</span>
        )}
        {errors.email?.type === "pattern" && (
          <span>Ingresa un email valido</span>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="userLogin">Contraseña</label>
        <input
          type="password"
          placeholder="password"
          name="pass"
          {...register("pass", {
            required: true,
          })}
        />
        {errors.pass?.type === "required" && <span>El campo es requerido</span>}
      </div>

      <input type="submit" value="Ingresar" />
    </form>
  );
};

export default Login;
