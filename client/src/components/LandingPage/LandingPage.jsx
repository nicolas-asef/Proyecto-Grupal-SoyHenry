import * as React from "react";
import {
  getUserId,
  getWorkers,
  changeStatus,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Footer from "../Footer/Footer";
import TestiMonials from "../Showroom/TestimonialsSlider.jsx";
import DemoCarousel from "../Showroom/LandingSlider.jsx";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import s from "./LandingPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Album() {
  const userRedux = useSelector((state) => state.users);
  const { isAuthenticated, user } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(changeStatus(user.sub, true));
    }
  }, [dispatch, userRedux.isOnline]);

  return (
    <div className={s.container}>
      <div className={s.carouselContainer}>
        <div className={s.titletypo}>La nueva era del oficio</div>
        <DemoCarousel className={s.carousel} />
      </div>
      <div className={s.testimonials}>
        <TestiMonials />
      </div>
      <div className={s.containerOptions}></div>
      <Footer />
    </div>
  );
}
