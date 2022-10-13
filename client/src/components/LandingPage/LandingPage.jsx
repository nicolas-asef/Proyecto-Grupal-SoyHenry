import * as React from "react";
import { getWorkers } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Footer from "../Footer/Footer";
import TestiMonials from "../Showroom/TestimonialsSlider.jsx";
import DemoCarousel from "../Showroom/LandingSlider.jsx";
import options from "./options.js";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import s from "./LandingPage.module.css";

export default function Album() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkers());
  }, []);

  return (
    <div className={s.container}>
      <div className={s.carouselContainer}>
        <div className={s.titletypo}>La nueva era del oficio</div>
        <DemoCarousel className={s.carousel} />
      </div>
      <div className={s.testimonials}>
        <TestiMonials />
      </div>
      <div className={s.containerOptions}>
        {options &&
          options.map((option, index) => (
            <div key={index} className={s.card}>
              <div className={s.titleContainer}>
                <h3>{option.title}</h3>
              </div>
              <div className={s.description}>
                {option.description.map((desc) => (
                  <p key={desc} className={s.desc}>
                    • {desc}
                  </p>
                ))}
              </div>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                href={option.pages}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
