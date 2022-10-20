import * as React from "react";
import {
  getUserId,
  getWorkers,
  changeStatus,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../Footer/Footer";
import TestiMonials from "../Showroom/TestimonialsSlider.jsx";
import DemoCarousel from "../Showroom/LandingSlider.jsx";
import CardSlider from "../Showroom/CardSlider.jsx";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import s from "./LandingPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Album() {
  const userRedux = useSelector((state) => state.users);
  const { isAuthenticated, user } = useAuth0();
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(changeStatus(user.sub, true));
    }
  }, [dispatch, userRedux.isOnline]);

  const hidenTestimonials = () => {
    if (window.scrollY >= 650) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  window.addEventListener("scroll", hidenTestimonials);

  return (
    <div className={s.container}>
      <div className={s.carouselContainer}>
        <div className={s.titletypo}>La nueva era del oficio</div>
        <div className={s.subTitletypo}>
          Solos podemos hacer poco, juntos podemos hacer mucho.
        </div>
        <DemoCarousel className={s.carousel} />
      </div>
      <div className={s.premiumContainer}>
        <CardSlider />
      </div>
      <div className={hidden ? s.testimonials : s.testimonialsHidden}>
        <TestiMonials />
      </div>
      <div className={s.containerOptions}></div>
      <Footer />
    </div>
  );
}
