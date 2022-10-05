import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import Slider from 'react-slick';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { getWorkers } from '../../redux/actions/actions.js'
import settings from './Settings.jsx';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSlider.css';


const CardSlider = () => {  
  
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkers());        
  }, [dispatch]);

  const workers = useSelector((state) => state.workersPremium)  
    
  return (
    <div className="Carousel">
      <Slider {...settings}>
        {workers.map((w) => (          
          <div className="card" key={w.User.name}>
            <div className="card-top">
              <img
                src={w.User.img}
                alt='imagenWorkerr'                
              />
            </div>
            <div className='nameLastname'>
              <h1>{w.User.name} {w.User.lastName}</h1>
            </div>
            <div className="card-bottom">
                {w.Jobs.map((each) => {
                  return (
                    <h3>{each.name}</h3>
                  )
                })}                
            </div>
            <div className='Rating'>
              <Stack spacing={1}>
                  <Rating name="half-rating-read" defaultValue="3" precision={0.5} readOnly />    {/* CAMBIAR defaultValue=w.rating* Cuando haya DB con contratos hechos*/}
              </Stack>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardSlider;

