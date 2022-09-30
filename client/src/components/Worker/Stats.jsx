import React from 'react'
import './Stats.css'
import Estrella from '../../img/estrella.png';
import { Typography, Rating,Box } from '@mui/material';

//{contratosTerminados,value}

function Stats() {
  const contratosTerminados = 99999
  const value = 4.4

  let calificacion = "Safa"
  if(value >= 0 && value < 1)
    calificacion = "Malo-"
  if(value >= 1 && value < 2)
    calificacion = "Malo"
  if(value >= 2 && value < 2.5)
    calificacion = "Regular"
  if(value >= 2.5 && value < 3)
    calificacion = "Regular+"
  if(value >= 3 && value < 3.5)
    calificacion = "Optimo"
  if(value >= 3.5 && value < 4)
    calificacion = "Bueno"
  if(value >= 4 && value < 4.5)
    calificacion = "Bueno+"
  if(value >= 4.5)
    calificacion = "Excelente"
  
  return (
    <div className="stats">
        <div className="s-left" style={{paddingLeft:"30px"}}>
            <p>Cantidad de trabajos terminados: {contratosTerminados}</p>
        </div>
        <div className="s-right">
          {/* <p>Rating</p> */}
          <Typography component="legend">Rating</Typography>
          <div className="rating">
          <Rating name="read-only" value={value} readOnly  precision={0.1}/>
          <Box sx={{ ml: 2 }}>{calificacion}</Box>
          </div>
          
            {/* <img src={Estrella} alt="Estrellita donde esta" /> */}
        </div>
    </div>
  )
}

export default Stats