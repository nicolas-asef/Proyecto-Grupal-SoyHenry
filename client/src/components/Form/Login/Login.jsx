import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { validator } from "../validator";

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
          error={errors.pass ? true : false}
          helperText={validator(errors.pass?.type)}
          placeholder="password"
          name="pass"
          {...register("pass", {
            required: true,
          })}
        />
      </div>

      <Button type="submit" value="Ingresar" variant="contained">
        Ingresar
      </Button>
    </form>
  );
};

export default Login;
