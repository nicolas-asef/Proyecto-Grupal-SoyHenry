import * as React from 'react';
import { getWorkers } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import TestimonialShower from '../Showroom/TestimonialSlider.jsx'
import Footer from '../Footer/Footer';
import Payment from '../Payment/Payment'


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import s from './LandingPage.module.css'

const options = [
  {
    title: 'QUIERO CONTRATAR',
    description:[
      'Soluciones 24hs',
      'Seguridad en tu hogar',
      'Profesionales altamente capacitados'
    ],
    buttonText: 'Contratar',
    pages: '/home',
    buttonVariant: 'outlined',
  },
  {
    title: 'SOY PROFESIONAL',
    description:[
      'Trabajo de manera segura',
      'Seguro laboral',
      'Posicionamiento profesional'
    ],
    buttonText: 'Registrarse',
    buttonVariant: 'outlined',
    pages: '/users/register'
  },
]
const cards = [
  {
    value:3,
    title: 'Albañil',
  },{
    value:4,
    title: 'Gasista'
  },{
    value:5,
    title: 'Plomero'
  }];

const theme = createTheme();
  
export default function Album() {
 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWorkers())
  }, [])
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
          <Container maxWidth="string" align="center">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              width="max-content"
              color="text.primary"
              gutterBottom
              className={s.title}
            >
              La nueva era del oficio
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Resolvemos de manera segura
            </Typography>
            <div className={s.containerOptions}>
              { options && options.map( (option, index) => (
                <div key={index} className={s.card}>
                  <div className={s.titleContainer}>
                    <h3>{option.title}</h3>
                  </div>
                  <div className={s.description}>
                    {option.description.map( desc => (
                      <p key={desc} className={s.desc}>• {desc}</p>
                    ))}
                  </div>
                    <Button 
                    fullWidth 
                    variant='contained'
                    component={Link}
                    href={option.pages}
                    >{option.buttonText}</Button>
                </div>
              ))
              }
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <Rating name="read-only" value={card.value} readOnly />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Mas info...</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

