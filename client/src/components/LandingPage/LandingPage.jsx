import * as React from "react";
import { getUserId, getWorkers,changeStatus } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Footer from "../Footer/Footer";
import Payment from "../Payment/Payment";
import TestiMonials from "../Showroom/TestimonialsSlider.jsx";
import DemoCarousel from "../Showroom/LandingSlider.jsx";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import s from "./LandingPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const options = [
  {
    title: "QUIERO CONTRATAR",
    description: [
      "Soluciones 24hs",
      "Seguridad en tu hogar",
      "Profesionales altamente capacitados",
    ],
    buttonText: "Contratar",
    pages: "/home",
    buttonVariant: "outlined",
  },
  {
    title: "SOY PROFESIONAL",
    description: [
      "Trabajo de manera segura",
      "Seguro laboral",
      "Posicionamiento profesional",
    ],
    buttonText: "Registrarse",
    buttonVariant: "outlined",
    pages: "/users/register",
  },
];
const cards = [
  {
    value: 3,
    title: "Albañil",
  },
  {
    value: 4,
    title: "Gasista",
  },
  {
    value: 5,
    title: "Plomero",
  },
];

const theme = createTheme();

export default function Album() {
  const userRedux = useSelector( state => state.users);
  const {isAuthenticated, user} = useAuth0();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkers());
  }, [dispatch]);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(changeStatus(user.sub, true));
    }
  }, [dispatch, userRedux.isOnline]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <div className={s.carousel}>
            <DemoCarousel autoplay={true} />
          </div>
          <div className={s.titleUp}>
            <Container maxWidth="string" align="center">
              <div className={s.titletypo}>La nueva era del oficio</div>
            </Container>
          </div>
        </Box>
        <div className={s.testimonial}>
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
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
