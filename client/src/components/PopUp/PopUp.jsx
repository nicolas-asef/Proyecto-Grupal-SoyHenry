import React from 'react'
import style from './PopUp.module.css'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";

function PopUp({img,name,description}) {
  const {
    user: { sub },
  } = useAuth0();
  return (
    
      
      <Link to ={"contracts/user/"+sub} className={style.link}>
          <div className={style.popUp}>
        <div className={style.img}>
          <Avatar
          alt={name} 
          src ={img}
          sx={{ width: "8vh", height: "8vh" }}
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