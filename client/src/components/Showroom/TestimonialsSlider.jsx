import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import info from './data.js'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./TestimonialsSlider.css";

const TestiMonials = () => {  

    const workersState = useSelector((state) => state.workers);
    const workersToShow = workersState < 8 ? info.examples.slice(0,10) : workersState.slice(0,10);

    const options = info.opt
    const userPic = info.pic

  return (
    <section id="testimonial" className="testimonials pt-70 pb-70">
      <div className="container mt-5">
        <hr />
        <Container maxWidth="string" align="center">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            width="max-content"
            color="text.primary"
            gutterBottom
            className="title"
          >
            Testimonials about our workers
          </Typography>
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
                    <img class="img-circle" src={`${userPic}`} alt="pic2" />

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna.
                    </p>
                  </div>
                  <div class="testimonial-name">
                    <h5>Rajon Rony</h5>
                    <small>ITALY</small>
                  </div>
                </div>
              ) : (
                workersToShow.map((t) => {
                  return (
                    <div class="item">
                      <div class="shadow-effect">
                        <div class="img-circle" >
                          <img src={t.User.img} alt="pics"/>
                        </div>
                        <p>{t.Contracts.comment_U}</p>
                      </div>
                      <div class="testimonial-name">
                        <h5>{t.User.name} {t.User.lastName}</h5>
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
