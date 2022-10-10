import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import info from "./data.js";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./TestimonialsSlider.css";

const TestiMonials = () => {
  const workersState = useSelector((state) => state.workers);
  const workersToShow = workersState;

  const options = info.opt;  

  return (
    <section id="testimonial" className="testimonials pt-70 pb-70">
      <div className="container mt-5">        
        <Container maxWidth="string" align="center">
            <div className="title">
              Testimonials about our workers
            </div>          
        </Container>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          What Our Clients are Saying?
        </Typography>
        <div className="row">
          <div className="col-md-12">
            <OwlCarousel
              id="customer-testimonoals"
              className="owl-carousel owl-theme"
              {...options}
            >
              {workersToShow.length === 0 ? (
                <div class="item">
                  <div class="shadow-effect">
                    <img class="img-circle" src={`${info.pic}`} alt="pic2" />

                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna."
                    </p>
                  </div>
                  <div class="testimonial-name">
                    <h5>Gustavo Cerati</h5>
                    <small>PROGRAMADOR</small>
                  </div>
                </div>
              ) : (
                workersToShow.map((t) => {
                  return (
                    <div class="item">
                      <div class="shadow-effect">
                        <div class="img-circle">
                          <img src={t.User.img} alt="pics" />
                        </div>
                        <p>{t.Contracts.comment_U}</p>
                      </div>
                      <div class="testimonial-name">
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
