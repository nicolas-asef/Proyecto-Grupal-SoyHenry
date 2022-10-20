import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
//import ModalPayment from "./modalPayment/ModalPayment.js";
import { pay, premiumPay, sendNotification } from "../../redux/actions/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NestedModal } from "./NestedModal";
import s from "./payment.module.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const {
    user: { sub, email },
    user,
  } = useAuth0();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [compraConcretada, setCompraConcretada] = useState(false);

  const authUser = useSelector((state) => state.authState);
  const idUser = sub;
  const workers = useSelector((state) => state.workers);
  const worker = workers.filter((e) => e.UserID === idUser);
  const workerId = worker[0].ID;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCompraConcretada("");
    setCargando(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setError(error.message);
      setCargando(false);

      return;
    }
    setError("");
    let data = {};
    data = await dispatch(pay(paymentMethod));
    setCargando(false);
    if (data.status === "succeeded") {
      dispatch(
        sendNotification(
          email,
          "Tu cuenta ha adquirido el caracter PREMIUM de manerra exitosa !"
        )
      );
      setCompraConcretada(true);
      dispatch(premiumPay(workerId));
      elements.getElement(CardElement).clear();
      //navigate('/popUpSuccess')
    } else {
      setError("Sorry, something as wrong ");
    }
  };

  return (
    <div className={s.cardPayment}>
      <div className={s.formPayment}>
        <div className={s.textPaymentContainer}>
          <h1>¿Porque elegir ser premium?</h1>
          <p>
            Changuitas es una plataforma totalmente gratuita. Nuestro sueño es
            que informal trabajadores de todo el país pueden formar una red de
            clientes, dar mayor visibilidad a su trabajo, inspirarse y conectar
            con colegas.
          </p>
          <p>
            Ser premium aumentará su visibilidad en la página y mejorará tu red
            de trabajo
          </p>
          <h3>¡Gracias por tu ayuda!</h3>
        </div>
        <form className={s.forPaymentContainer} onSubmit={handleSubmit}>
          <img
            src="https://thancguide.org/wp-content/uploads/2021/04/help-others-Artboard-10@3x.png"
            alt="donation"
            className={s.donationImage}
          />
          <h5 className={s.formPaymentTitle}>
            Ser premium cuesta solo 1 dollar!!!
          </h5>
          <p className={s.formPaymentSubtitle}>
            (Tu tarjeta la convierte a tu moneda local)
          </p>
          <CardElement className={s.cardElementPayment} />
          {error && <div className={s.paymentError}>{error}</div>}
          <button className={s.btnPayment} type="submit" disabled={cargando}>
            {" "}
            SE PREMIUM{" "}
          </button>

          {cargando && <div>Cargando...</div>}
        </form>
      </div>
      {compraConcretada && <NestedModal />}
    </div>
  );
}
