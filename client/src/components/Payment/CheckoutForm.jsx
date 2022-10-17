
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
//import ModalPayment from "./modalPayment/ModalPayment.js";
import { pay, premiumPay } from '../../redux/actions/actions'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import s from './payment.module.css'
import { NestedModal } from "./NestedModal";

export default function CheckoutForm() {
    const stripe = useStripe();
    const { user: { sub } } = useAuth0();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [compraConcretada, setCompraConcretada] = useState(false);
    
    
    const authUser = useSelector((state) => state.authState)
    const idUser = sub;
    const workers = useSelector((state) => state.workers)
    const worker = workers.filter(e => e.UserID === idUser)
    const workerId = worker[0].ID

    
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
        data = await dispatch(pay(paymentMethod))
        setCargando(false)
        if ( data.status === "succeeded") {
            setCompraConcretada(true)
            dispatch(premiumPay(workerId))
            elements.getElement(CardElement).clear()
            //navigate('/popUpSuccess')

        } else {
            setError("Sorry, something as wrong ")
        }
    }

    return (
        <div className={s.cardPayment}>
            <div className={s.formPayment}>
                <div className={s.textPaymentContainer}>
                    <h1>¿Why choose to be premium?</h1>
                    <p>JobsOffice is a totally free platform. Our dream is that informal workers from all over the country can form a network of clients, give greater visibility to their work, be inspired and connect with colleagues.</p>
                    <p>Being premium will increase your visibility on the page and enhance your work network</p>
                    <h3>¡Thanks for your help!</h3>
                </div>
                <form className={s.forPaymentContainer} onSubmit={handleSubmit}>
                    <img
                        src="https://thancguide.org/wp-content/uploads/2021/04/help-others-Artboard-10@3x.png"
                        alt="donation"
                        className={s.donationImage}
                    />
                    <h5 className={s.formPaymentTitle}>Premium has a cost of 1 dollar!!!</h5>
                    <p className={s.formPaymentSubtitle}>(Your card converts it to your local currency)</p>                   
                    <CardElement className={s.cardElementPayment} />
                    {error && <div className={s.paymentError}>{error}</div>}
                    <button className={s.btnPayment} type="submit" disabled={cargando}> BE PREMIUM </button>
                    
                    {cargando && <div >Loading...</div>}
                </form>
            </div>
            {compraConcretada &&  (
                <NestedModal/>
            )}
        </div>
    )
}
