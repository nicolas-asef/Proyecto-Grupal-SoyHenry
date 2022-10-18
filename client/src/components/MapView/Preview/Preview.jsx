import React from "react";
import s from "./styles/Preview.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Preview = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={s.container}>
      <div className={s.preview}>
        <h4>Está caracteristica es solo para usuarios registrados.</h4>
        <Link to="/">
          <div className={s.button} onClick={loginWithRedirect}>
            Iniciar sesión
          </div>
        </Link>
      </div>
      <div>
        <img src={"https://i.imgur.com/pJOAomT.png"} alt="preview" />
      </div>
    </div>
  );
};

export default Preview;
