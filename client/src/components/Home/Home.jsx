import React from 'react';
import  SearchBar  from '../SearchBar/SearchBar'
import { getJobs, getWorkers } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {

let dispatch = useDispatch();
	useEffect(() => {
      dispatch(getJobs());
      dispatch(getWorkers())
   }, [dispatch]);
      
	return (
    <div className="all-home">
      <div className="header-container">
        <Card sx={{ minWidth: 575 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <SearchBar/>
            </Typography>
          </CardContent>
        </Card>

        <div className="filters">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Componente Filtros
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container-cards">
        <div className="about-card">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Componente Carousel
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="about-card">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Componente Carousel
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="paginado">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Componente Paginado
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
