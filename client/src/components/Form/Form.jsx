import React from "react";
import style from "./Form.module.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useLocation } from "react-router-dom";

const Form = () => {
  let location = useLocation();
	const { pathname } = location;

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        {/* Imagen */}
        <div>
          {pathname === "/users/login" && <Login />}
          {pathname === "/users/register" && <Register />}
        </div>
      </div>
    </div>
  );
};

export default Form;
