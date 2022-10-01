import React from 'react'
import './Buttons.css'

export default function Buttons() {
  return (
    <div className="buttons-container">
        <div className="b-left">
            <button className='worker-button'><span>Iniciar chat</span></button>
        </div>
        <div className="b-right">
        <button className='worker-button'><span>Contratar</span></button>
        </div>
    </div>
  )
}
