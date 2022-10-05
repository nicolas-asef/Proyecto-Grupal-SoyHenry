
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
//import ModalPayment from "./modalPayment/ModalPayment.js";
import { pay, premiumPay } from '../../redux/actions/actions'
import {useState} from 'react'

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [compraConcretada, setCompraConcretada] = useState("");
    
    
    const authUser = useSelector((state) => state.authState)
    console.log("auth")
    console.log(authUser)
    const idUser = authUser.user.id
    console.log("idUser")
    console.log(idUser)
    const workers = useSelector((state) => state.workers)
    console.log("workers")
    console.log(workers)
    const worker = workers.filter(e => e.UserID === idUser)
    console.log("worker")
    console.log(worker)
    const workerId = worker[0].ID
    console.log(workerId)


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
        console.log("data abajo")
        console.log(data)
        setCargando(false)
        if ( data.status === "succeeded") {
            setCompraConcretada(data.payment)
            dispatch(premiumPay(workerId))
            elements.getElement(CardElement).clear()
        } else {
            setError("Sorry, something as wrong ")
        }
    }

    return (
        <div className="card-payment">
            <div className="form-payment">
                <div className="text-payment-container">
                    <h1>¿Why choose to be premium?</h1>
                    <p>JobsOffice is a totally free platform. Our dream is that informal workers from all over the country can form a network of clients, give greater visibility to their work, be inspired and connect with colleagues.</p>
                    <p>Being premium will increase your visibility on the page and enhance your work network</p>
                    <h3>¡Thanks for your help!</h3>
                </div>
                <form className="form-payment-container" onSubmit={handleSubmit}>
                    <img
                        src="https://thancguide.org/wp-content/uploads/2021/04/help-others-Artboard-10@3x.png"
                        alt="donation"
                        className="donation-image"
                    />
                    <h5 className="form-payment-title">Premium has a cost of 100 dollars</h5>
                    <p className="form-payment-subtitle">(Your card converts it to your local currency)</p>
                    
                    <CardElement className="card-element-payment" />
                    {error && <div className="payment-error">{error}</div>}
                    <button className="btn-payment" type="submit" disabled={cargando}> BE PREMIUM </button>
                    
                    {cargando && <div >Loading...</div>}
                </form>
            </div>
        </div>
    )
}
