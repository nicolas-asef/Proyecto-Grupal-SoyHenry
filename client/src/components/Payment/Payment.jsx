import React from "react";
// import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51LpAvyEFrIl6D2r0YwjMOXxIzJf0wtJxVjAMgZlPwjSlC66w4BpncdKgs6QRWoKEOB5THrgeiv2fVddPq8tUimIC00AdvHr9RN");


export default function Payment() {
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};


