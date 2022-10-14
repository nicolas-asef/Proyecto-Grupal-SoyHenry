import React from 'react'
import style from './PopUp.module.css'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'

function PopUp({img,name,description}) {
  return (
    
      
      <Link to ="#" className={style.link}>
          <div className={style.popUp}>
        <div className={style.img}>
          <Avatar
          alt={name} 
          src ={img}
          sx={{ width: "8vh", height: "8vh" ,marginTop:"0.7vw"}}
          />
        </div>
        <div className={style.right}>
          <p><b>{name}</b> {description}</p>
        </div>
        </div>
      </Link>
    
  )
}

export default PopUp