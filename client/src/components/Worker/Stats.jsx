import React from 'react'
import './Stats.css'
import Estrella from '../../img/estrella.png';

function Stats() {
  return (
    <div className="stats">
        <div className="s-left">
            <p>Cantidad de trabajos terminados en la plataforma: 35</p>
        </div>
        <div className="s-right">
            <p>Rating: 4.3</p>
            <img src={Estrella} alt="Estrellita donde esta" />
        </div>
    </div>
  )
}

export default Stats