import React from "react";
import { useSelector } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import info from "./data.js";

import Typography from "@mui/material/Typography";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./TestimonialsSlider.css";

const TestiMonials = () => {
  // const workersState = useSelector((state) => state.workers);
  const workers = info.examples;

  const options = info.opt;

  return (
    <section id="testimonial" className="testimonials pt-70 pb-70">
      <div>
        <div className="title">Testimonios acerca de nuestros trabajadores</div>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          ¿Que dicen nuestros clientes?
        </Typography>
        <div className="row">
          <div className="col-md-12">
            <OwlCarousel
              id="customer-testimonoals"
              className="owl-carousel owl-theme"
              {...options}
            >
              {workers.length === 0 ? (
                <div className="item">
                  <div className="shadow-effect">
                    <p>
                      "Muy buena pagina para contratar, te permite contactarte
                      de manera rapida y con referencias con una persona. Super
                      contento con Gustavo, se toco unos temas despues de
                      arreglarme el calefon"
                    </p>
                  </div>
                  <div className="testimonial-name">
                    <h5>Gustavo Cerati</h5>
                    <small>PROGRAMADOR</small>
                  </div>
                </div>
              ) : (
                workers.map((t, index) => {
                  return (
                    <div key={index} className="item">
                      <div className="shadow-effect">
                        <p>{t.Contracts.comment_U}</p>
                      </div>
                      <div className="testimonial-name">
                        <h5>
                          {t.User.name} {t.User.lastName}
                        </h5>
                        <small>{t.Jobs[0].name}</small>
                      </div>
                    </div>
                  );
                })
              )}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestiMonials;
