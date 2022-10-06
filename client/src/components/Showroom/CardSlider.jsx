import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


import { getWorkers } from '../../redux/actions/actions.js'
import settings from './Settings.jsx';

import style from './CardSlider.module.css'

const image = "https://pymstatic.com/111973/conversions/personas-honestas-wide.jpg"

const CardSlider = () => {  

  // const workers = useSelector((state) => state.workers)    
  const workersPerPage = 8;
  const [position, setPosition] = useState(1);  

  const workers = [ 
    {
      User: {
        img: image,
        name: "Lucas",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Plomero"
        },
        {
          name: "Gasista"
        },
        {
          name: "Planero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Micaela",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Jorge",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Piletero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Susana",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Juega al bulbo"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Lucas",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Durlero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Rodrigo",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Martina",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Palomon",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]      
    },
    {
      User: {
        img: image,
        name: "Valentina",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]      
    },
    {
      User: {
        img: image,
        name: "Alfonsina",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Plomero"
        },
        {
          name: "Gasista"
        },
        {
          name: "Planero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Ignacio",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Lautaro",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Piletero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "ElFlaco",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Juega al bulbo"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Esmirlo",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Durlero"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Alejito",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Tanito",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    },
    {
      User: {
        img: image,
        name: "Manolo",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]      
    },
    {
      User: {
        img: image,
        name: "Fabrizio",
        lastName: "Rodriguez",        
      },
      Jobs: [
        {
          name: "Gasista"
        }
      ]
      
    }
  ]

  const lastWorker = position * workersPerPage;
  const firstWorker = lastWorker - workersPerPage;  
  var workersToShow = workers.slice(firstWorker, lastWorker);  

  var quantity = workers.slice(lastWorker, workers.length)  

  const positionLess = function() {
    setTimeout(() => {
      setPosition(position < 2 ? position : position-1)      
    }, 500);
  };

  const positionMore = function() {
    setTimeout(() => {
      setPosition(quantity.length < 8 ? position : position+1)      
    }, 500);
  };

  return (      
    <div className={style.container}>
      <div className={style.cardsContainer}>
        {workersToShow && workersToShow.map( w => {
          return (
            <div className={style.card}>              
              <img src={image} alt='imagW'/>            
              <div className={style.title}>
                <h3 >{w.User.name} {w.User.lastName}</h3>
              </div>            
              <div className={style.job}>
                {w.Jobs && w.Jobs.map(j => <li>* {j.name}</li>)}
              </div>
              <div className={style.rating}>
                <Stack spacing={1}>
                  <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly />    {/* CAMBIAR defaultValue=w.rating* Cuando haya DB con contratos hechos*/}
                </Stack>
              </div>
              <div className={style.btn}>
                <a className={style.effect}href={`http://localhost:3000/worker/${w.id}`} title="View Profile">View Profile</a>
              </div>
            </div>   
          )
        })}
      </div>
      <div className={style.btns}>
        <div className={style.btnLeft}>
          <Stack spacing={2} direction="row">          
            <Button variant="contained" onClick={positionLess}>View Lesss</Button>          
          </Stack>
        </div>
        <div className={style.btnRight}>
          <Stack spacing={2} direction="row">          
            <Button variant="contained" onClick={positionMore}>View More</Button>          
          </Stack>
        </div>
      </div>
    </div>
  )};

export default CardSlider;

