
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
//import ModalPayment from "./modalPayment/ModalPayment.js";
import { pay } from '../../redux/actions/actions'
import {useState} from 'react'

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [compraConcretada, setCompraConcretada] = useState("");
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        setCompraConcretada("")
        setCargando(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })
        if (error) {
            setError(error.message)
            setCargando(false)

            return
        }
        setError("")      
        let data = {}
        data = await dispatch(pay( paymentMethod))
        console.log(data)
        setCargando(false)
        if ( data.status === "succeeded") {
            setCompraConcretada(data.payment)
            elements.getElement(CardElement).clear()
        } else {
            setError("Lo sentimos, algo salio mal ")
        }
    }

    return (
        <div className="card-payment">
            <div className="form-payment">
                <div className="text-payment-container">
                    <h1>¿Por qué colaborar?</h1>
                    <p>Timberli es una plataforma totalmente gratuita. Nuestro sueño es que desarrolladores de todo el mundo puedan dar mayor visibilidad a sus trabajos, inspirarse y conectar con colegas y reclutadores.</p>
                    <p>Si la plataforma te parece útil, considera hacer una donación! Gracias a la participación de gente como tú, Timberli crece cada día y permanece sin publicidad y accesible para todos.</p>
                    <h3>¡Gracias por tu ayuda!</h3>
                </div>
                <form className="form-payment-container" onSubmit={handleSubmit}>
                    <img
                        src="https://thancguide.org/wp-content/uploads/2021/04/help-others-Artboard-10@3x.png"
                        alt="donation"
                        className="donation-image"
                    />
                    <h5 className="form-payment-title">Selecciona el monto a donar en dolares:</h5>
                    <p className="form-payment-subtitle">(Tu tarjeta lo convierte a tu moneda local)</p>
                    
                    <CardElement className="card-element-payment" />
                    {error && <div className="payment-error">{error}</div>}
                    <button className="btn-payment" type="submit" disabled={cargando}> CONTRIBUIR </button>
                    
                    {cargando && <div >Cargando...</div>}
                </form>
            </div>
        </div>
    )
}
