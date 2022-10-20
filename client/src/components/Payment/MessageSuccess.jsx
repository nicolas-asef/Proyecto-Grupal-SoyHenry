import { useNavigate } from "react-router-dom";
import s from "./MessageSuccess.module.css";

export function MessageSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div className={s.globalCont}>
      <div id={s.containerM}>
        <div id={s.successBox}>
          <div className={s.dot}></div>
          <div className={`${s.dot} ${s.two}`}></div>
          <div className={s.face}>
            <div className={s.eye}></div>
            <div className={`${s.eye} ${s.right}`}></div>
            <div className={`${s.mouth} ${s.happy}`}></div>
          </div>
          <div className={`${s.shadow} ${s.scale}`}></div>
          <div className={s.message}>
            <h1 className={s.alertM}>EXITO!</h1>
            <h1 className={s.alertM}>ERES PREMIUM AHORA!</h1>
          </div>
          <button className={s.buttonBoxM} onClick={handleClick}>
            <h1 className={s.green}>CONTINUAR</h1>
          </button>
        </div>
        {/* <div id="error-box">
                <div className="dot"></div>
                <div className="dot two"></div>
                <div className="face2">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth sad"></div>
                </div>
                <div className="shadow move"></div>
                <div className="message"><h1 className="alert">Error!</h1><p>oh no, something went wrong.</p></div>
                <button className="button-box"><h1 className="red">try again</h1></button>
            </div> */}
      </div>
    </div>
  );
}
